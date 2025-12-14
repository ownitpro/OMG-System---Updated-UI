// config/relationships.ts

import {
  appsConfig,
  type AppConfig,
  type AppId,
  type IndustryId,
  type SolutionId,
  type AppIndustryRelation,
  type AppSolutionRelation,
  type AppAppRelation,
} from "./apps_config";
import {
  solutionsConfig,
  type SolutionConfig,
} from "./solutions_config";
import {
  industriesConfig,
  type IndustryConfig,
} from "./industries_config";
import {
  getRoleWeight,
  getEffectiveRelationWeight,
  type RelationRole,
} from "@/lib/relationsHelpers";

type WeightOptions = {
  primaryOnly?: boolean;
};

function relationScore(
  rel: { priority?: RelationRole; weight?: number },
): number {
  // Use centralized helper for consistent scoring
  return getEffectiveRelationWeight(rel);
}

// 🔹 Apps for a given industry (Industry → Apps), sorted by weight
export function getAppsForIndustry(
  industryId: IndustryId,
  opts: WeightOptions = {},
): (AppConfig & {
  relation?: AppIndustryRelation;
  score: number;
})[] {
  const industry = industriesConfig.find((i) => i.id === industryId);
  const candidates: { app: AppConfig; relation: AppIndustryRelation; score: number }[] = [];
  const seenAppIds = new Set<AppId>();

  // First: Check industry's own apps array (new source of truth)
  if (industry?.apps) {
    industry.apps.forEach((indAppRel) => {
      if (opts.primaryOnly && indAppRel.role !== "primary") return;
      
      const app = appsConfig.find((a) => a.id === indAppRel.appId);
      if (!app) return;

      seenAppIds.add(app.id);
      
      // Convert IndustryAppRelation to AppIndustryRelation format
      const relation: AppIndustryRelation = {
        industryId,
        priority: indAppRel.role === "primary" ? "primary" : "secondary",
        weight: indAppRel.priority,
      };

      candidates.push({
        app,
        relation,
        score: relationScore(relation),
      });
    });
  }

  // Second: Fall back to appsConfig (apps have industries arrays) for any not already found
  appsConfig.forEach((app) => {
    if (seenAppIds.has(app.id)) return; // Skip if already added from industry.apps

    // Try new weighted relations first
    const rel = app.industries?.find(
      (r: AppIndustryRelation) => r.industryId === industryId,
    );
    
    if (rel) {
      if (opts.primaryOnly && rel.priority !== "primary") return;
      candidates.push({
        app,
        relation: rel,
        score: relationScore(rel),
      });
      return;
    }

    // Fallback to legacy appearsInIndustries for backward compatibility
    if (app.appearsInIndustries?.includes(industryId)) {
      candidates.push({
        app,
        relation: { industryId, priority: "secondary" } as AppIndustryRelation,
        score: 50, // default score for legacy relations
      });
    }
  });

  return candidates
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      ...item.app,
      relation: item.relation,
      score: item.score,
    }));
}

// 🔹 Get industry relation for an app
export function getIndustryRelationForApp(
  appId: AppId,
  industryId: IndustryId,
): AppIndustryRelation | undefined {
  const app = appsConfig.find((a) => a.id === appId);
  if (!app || !app.industries) return undefined;

  return app.industries.find((rel) => rel.industryId === industryId);
}

// 🔹 Get industries for an app (App → Industries), sorted by weight
export function getIndustriesForApp(
  appId: AppId,
  opts: WeightOptions = {},
): (IndustryConfig & {
  relation?: AppIndustryRelation;
  score: number;
})[] {
  const app = appsConfig.find((a) => a.id === appId);
  if (!app || !app.industries) return [];

  return app.industries
    .map((rel) => {
      if (opts.primaryOnly && rel.priority !== "primary") return null;
      
      const industry = industriesConfig.find((i) => i.id === rel.industryId);
      if (!industry) return null;

      return {
        ...industry,
        relation: rel,
        score: relationScore(rel),
      };
    })
    .filter((x): x is IndustryConfig & { relation: AppIndustryRelation; score: number } => !!x)
    .sort((a, b) => b.score - a.score);
}

// 🔹 Get solution relation for an app
export function getSolutionRelationForApp(
  appId: AppId,
  solutionId: SolutionId,
): AppSolutionRelation | undefined {
  const app = appsConfig.find((a) => a.id === appId);
  if (!app || !app.solutions) return undefined;

  return app.solutions.find((rel) => rel.solutionId === solutionId);
}

// 🔹 Get solutions for an app (App → Solutions), sorted by weight
export function getSolutionsForApp(
  appId: AppId,
  opts: WeightOptions = {},
): (SolutionConfig & {
  relation?: AppSolutionRelation;
  score: number;
})[] {
  const candidates: { solution: SolutionConfig; relation: AppSolutionRelation; score: number }[] = [];
  const seenSolutionIds = new Set<SolutionId>();

  // First: Check each solution's apps array (new source of truth)
  solutionsConfig.forEach((solution) => {
    if (!solution.apps) return;
    
    const appRel = solution.apps.find((r) => r.appId === appId);
    
    if (appRel) {
      if (opts.primaryOnly && appRel.role !== "primary") return;
      
      seenSolutionIds.add(solution.id);
      
      // Convert SolutionAppRelation to AppSolutionRelation format
      const relation: AppSolutionRelation = {
        solutionId: solution.id,
        priority: appRel.role === "primary" ? "primary" : "secondary",
        weight: appRel.priority,
      };
      
      candidates.push({
        solution,
        relation,
        score: relationScore(relation),
      });
    }
  });

  // Second: Fall back to appsConfig (app has solutions array) for any not already found
  const app = appsConfig.find((a) => a.id === appId);
  if (app && app.solutions) {
    app.solutions.forEach((rel) => {
      if (seenSolutionIds.has(rel.solutionId)) return; // Skip if already added from solution.apps
      
      if (opts.primaryOnly && rel.priority !== "primary") return;
      
      const solution = solutionsConfig.find((s) => s.id === rel.solutionId);
      if (!solution) return;

      candidates.push({
        solution,
        relation: rel,
        score: relationScore(rel),
      });
    });
  }

  return candidates
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      ...item.solution,
      relation: item.relation,
      score: item.score,
    }));
}

// 🔹 Apps for a given solution (Solution → Apps), sorted by weight
export function getAppsForSolution(
  solutionId: SolutionId,
  opts: WeightOptions = {},
): (AppConfig & {
  relation?: AppSolutionRelation;
  score: number;
})[] {
  const solution = solutionsConfig.find((s) => s.id === solutionId);
  const candidates: { app: AppConfig; relation: AppSolutionRelation; score: number }[] = [];
  const seenAppIds = new Set<AppId>();

  // First: Check solution's relatedApps array (new preferred source of truth)
  if (solution?.relatedApps) {
    solution.relatedApps.forEach((solAppRel) => {
      if (opts.primaryOnly && solAppRel.role !== "primary") return;
      
      const app = appsConfig.find((a) => a.id === solAppRel.appId);
      if (!app) return;

      seenAppIds.add(app.id);
      
      // Convert SolutionAppRelation to AppSolutionRelation format
      const relation: AppSolutionRelation = {
        solutionId,
        priority: solAppRel.role === "primary" ? "primary" : "secondary",
        weight: solAppRel.priority,
      };

      candidates.push({
        app,
        relation,
        score: relationScore(relation),
      });
    });
  }
  
  // Second: Fall back to legacy apps array if relatedApps not present
  if (solution?.apps && !solution.relatedApps) {
    solution.apps.forEach((solAppRel) => {
      if (opts.primaryOnly && solAppRel.role !== "primary") return;
      if (seenAppIds.has(solAppRel.appId)) return; // Skip if already added
      
      const app = appsConfig.find((a) => a.id === solAppRel.appId);
      if (!app) return;

      seenAppIds.add(app.id);
      
      const relation: AppSolutionRelation = {
        solutionId,
        priority: solAppRel.role === "primary" ? "primary" : "secondary",
        weight: solAppRel.priority,
      };

      candidates.push({
        app,
        relation,
        score: relationScore(relation),
      });
    });
  }

  // Second: Fall back to appsConfig (apps have solutions arrays) for any not already found
  appsConfig.forEach((app) => {
    if (seenAppIds.has(app.id)) return; // Skip if already added from solution.apps

    // Try new weighted relations first
    const rel = app.solutions?.find(
      (r: AppSolutionRelation) => r.solutionId === solutionId,
    );
    
    if (rel) {
      if (opts.primaryOnly && rel.priority !== "primary") return;
      candidates.push({
        app,
        relation: rel,
        score: relationScore(rel),
      });
      return;
    }

    // Fallback to legacy pairsWithSolutions for backward compatibility
    if (app.pairsWithSolutions?.includes(solutionId)) {
      candidates.push({
        app,
        relation: { solutionId, priority: "secondary" } as AppSolutionRelation,
        score: 50, // default score for legacy relations
      });
    }
  });

  return candidates
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      ...item.app,
      relation: item.relation,
      score: item.score,
    }));
}

// 🔹 Solutions for a given industry (Industry → Solutions)
// First checks solution.industries arrays, then falls back to apps aggregation
export function getSolutionsForIndustry(
  industryId: IndustryId,
  opts: WeightOptions = {},
): (SolutionConfig & {
  relation?: { priority?: "primary" | "secondary"; score: number };
  score: number;
})[] {
  const solutionScores = new Map<SolutionId, { score: number; maxPriority: "primary" | "secondary" | undefined }>();
  const seenSolutionIds = new Set<SolutionId>();

  // First: Check each solution's industries array (new source of truth)
  solutionsConfig.forEach((solution) => {
    if (!solution.industries) return;
    
    const indRel = solution.industries.find(
      (r) => r.industryId === industryId,
    );
    
    if (indRel) {
      if (opts.primaryOnly && indRel.role !== "primary") return;
      
      seenSolutionIds.add(solution.id);
      
      // Score based on role (primary = 100, secondary = 60)
      const score = indRel.role === "primary"
        ? (indRel.priority ?? 100)
        : (indRel.priority ?? 60);
      
      solutionScores.set(solution.id, {
        score,
        maxPriority: indRel.role === "primary" ? "primary" : "secondary",
      });
    }
  });

  // Second: Fall back to appsConfig aggregation for any not already found
  appsConfig.forEach((app) => {
    // Try new weighted relations first
    const industryRel = app.industries?.find(
      (r: AppIndustryRelation) => r.industryId === industryId,
    );
    
    let baseScore: number | null = null;
    
    if (industryRel) {
      if (opts.primaryOnly && industryRel.priority !== "primary") return;
      baseScore = relationScore(industryRel);
    } else if (app.appearsInIndustries?.includes(industryId)) {
      // Fallback to legacy
      baseScore = 50;
    } else {
      return;
    }

    // Aggregate solution scores (only for solutions not already in solution.industries)
    app.solutions?.forEach((solRel: AppSolutionRelation) => {
      if (seenSolutionIds.has(solRel.solutionId)) return; // Skip if already added from solution.industries
      
      const solScore = baseScore! * (relationScore(solRel) / 100); // scale by solution strength
      const existing = solutionScores.get(solRel.solutionId);
      const newPriority = solRel.priority || (existing?.maxPriority === "primary" ? "primary" : "secondary");
      
      solutionScores.set(solRel.solutionId, {
        score: (existing?.score ?? 0) + solScore,
        maxPriority: existing?.maxPriority === "primary" || newPriority === "primary" ? "primary" : "secondary",
      });
    });

    // Also check legacy pairsWithSolutions
    app.pairsWithSolutions?.forEach((solutionId) => {
      if (seenSolutionIds.has(solutionId)) return; // Skip if already added
      
      if (!app.solutions?.some((r) => r.solutionId === solutionId)) {
        const existing = solutionScores.get(solutionId);
        solutionScores.set(solutionId, {
          score: (existing?.score ?? 0) + baseScore! * 0.5, // legacy gets 50% weight
          maxPriority: existing?.maxPriority || "secondary",
        });
      }
    });
  });

  const candidates: { solution: SolutionConfig; relation: { priority?: "primary" | "secondary"; score: number }; score: number }[] = [];

  solutionScores.forEach((data, solutionId) => {
    const sol = solutionsConfig.find((s) => s.id === solutionId);
    if (!sol) return;
    candidates.push({
      solution: sol,
      relation: { priority: data.maxPriority, score: data.score },
      score: data.score,
    });
  });

  return candidates
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      ...item.solution,
      relation: item.relation,
      score: item.score,
    }));
}

// 🔹 Industries for a given solution (Solution → Industries)
// First checks solution's own industries array, then falls back to apps aggregation
export function getIndustriesForSolution(
  solutionId: SolutionId,
  opts: WeightOptions = {},
): (IndustryConfig & {
  relation?: { priority?: "primary" | "secondary"; score: number };
  score: number;
})[] {
  const solution = solutionsConfig.find((s) => s.id === solutionId);
  const scores = new Map<IndustryId, { score: number; maxPriority: "primary" | "secondary" | undefined; relation: { priority?: "primary" | "secondary"; score: number } }>();
  const seenIndustryIds = new Set<IndustryId>();

  // First: Check solution's relatedIndustries array (new preferred source of truth)
  if (solution?.relatedIndustries) {
    solution.relatedIndustries.forEach((solIndRel) => {
      if (opts.primaryOnly && solIndRel.role !== "primary") return;
      
      const industry = industriesConfig.find((i) => i.id === solIndRel.industryId);
      if (!industry) return;

      seenIndustryIds.add(industry.id);
      
      const score = getEffectiveRelationWeight(solIndRel);
      
      scores.set(solIndRel.industryId, {
        score,
        maxPriority: solIndRel.role === "primary" ? "primary" : "secondary",
        relation: { priority: solIndRel.role, score },
      });
    });
  }
  
  // Fall back to legacy industries array if relatedIndustries not present
  if (solution?.industries && !solution.relatedIndustries) {
    solution.industries.forEach((solIndRel) => {
      if (opts.primaryOnly && solIndRel.role !== "primary") return;
      if (seenIndustryIds.has(solIndRel.industryId)) return;
      
      const industry = industriesConfig.find((i) => i.id === solIndRel.industryId);
      if (!industry) return;

      seenIndustryIds.add(industry.id);
      
      const score = getEffectiveRelationWeight(solIndRel);
      
      scores.set(solIndRel.industryId, {
        score,
        maxPriority: solIndRel.role === "primary" ? "primary" : "secondary",
        relation: { priority: solIndRel.role, score },
      });
    });
  }

  // Second: Fall back to appsConfig aggregation for any not already found
  appsConfig.forEach((app) => {
    // Try new weighted relations first
    const solRel = app.solutions?.find(
      (r: AppSolutionRelation) => r.solutionId === solutionId,
    );
    
    let baseScore: number | null = null;
    
    if (solRel) {
      if (opts.primaryOnly && solRel.priority !== "primary") return;
      baseScore = relationScore(solRel);
    } else if (app.pairsWithSolutions?.includes(solutionId)) {
      // Fallback to legacy
      baseScore = 50;
    } else {
      return;
    }

    // Aggregate industry scores (only for industries not already in solution.industries)
    app.industries?.forEach((indRel: AppIndustryRelation) => {
      if (seenIndustryIds.has(indRel.industryId)) return; // Skip if already added from solution.industries
      
      const indScore = baseScore! * (relationScore(indRel) / 100);
      const existing = scores.get(indRel.industryId);
      scores.set(
        indRel.industryId,
        {
          score: (existing?.score ?? 0) + indScore,
          maxPriority: existing?.maxPriority || (indRel.priority === "primary" ? "primary" : "secondary"),
          relation: { priority: indRel.priority === "primary" ? "primary" : "secondary", score: (existing?.score ?? 0) + indScore },
        }
      );
    });

    // Also check legacy appearsInIndustries
    app.appearsInIndustries?.forEach((industryId) => {
      if (seenIndustryIds.has(industryId)) return; // Skip if already added
      
      if (!app.industries?.some((r) => r.industryId === industryId)) {
        const existing = scores.get(industryId);
        scores.set(
          industryId,
          {
            score: (existing?.score ?? 0) + baseScore! * 0.5, // legacy gets 50% weight
            maxPriority: existing?.maxPriority || "secondary",
            relation: { priority: "secondary", score: (existing?.score ?? 0) + baseScore! * 0.5 },
          }
        );
      }
    });
  });

  const candidates: (IndustryConfig & { relation?: { priority?: "primary" | "secondary"; score: number }; score: number })[] = [];

  scores.forEach((data, industryId) => {
    const ind = industriesConfig.find((i) => i.id === industryId);
    if (!ind) return;
    
    // Handle both old format (number) and new format (object with relation)
    if (typeof data === "number") {
      candidates.push({
        ...ind,
        score: data,
      });
    } else {
      candidates.push({
        ...ind,
        relation: data.relation,
        score: data.score,
      });
    }
  });

  return candidates.sort((a, b) => b.score - a.score);
}

// 🔹 Related apps for an app (App → Apps, using weighted relatedApps)
export function getRelatedAppsForApp(
  appId: AppId,
  opts: WeightOptions = {},
): AppConfig[] {
  const app = appsConfig.find((a) => a.id === appId);
  if (!app) return [];

  const candidates: { app: AppConfig; score: number }[] = [];

  // Try new weighted relations first
  if (app.relatedApps) {
    app.relatedApps.forEach((rel: AppAppRelation) => {
      if (opts.primaryOnly && rel.priority !== "primary") return;

      const target = appsConfig.find((a) => a.id === rel.appId);
      if (!target) return;

      candidates.push({
        app: target,
        score: relationScore(rel),
      });
    });
  }

  // Fallback to legacy pairsWithApps for backward compatibility
  if (app.pairsWithApps && candidates.length === 0) {
    app.pairsWithApps.forEach((relatedAppId) => {
      const target = appsConfig.find((a) => a.id === relatedAppId);
      if (!target) return;
      
      // Check if already added via weighted relations
      if (!candidates.some((c) => c.app.id === relatedAppId)) {
        candidates.push({
          app: target,
          score: 50, // default score for legacy relations
        });
      }
    });
  }

  return candidates
    .sort((a, b) => b.score - a.score)
    .map((item) => item.app);
}

// Small utility you already had
export function topN<T>(items: T[], n: number): T[] {
  return items.slice(0, n);
}

// 🔹 Badge label helper for solutions
export function getSolutionBadgeLabel(relation?: AppSolutionRelation | { priority?: "primary" | "secondary" }): string {
  if (!relation?.priority) return "Recommended";

  if (relation.priority === "primary") return "Core Automation Solution";
  if (relation.priority === "secondary") return "Optional Add-On";

  return "Recommended";
}

// 🔹 Badge label helper for industries
export function getIndustryBadgeLabel(relation?: AppIndustryRelation | { priority?: "primary" | "secondary" }): string {
  if (!relation?.priority) return "Recommended";

  if (relation.priority === "primary") return "Core Industry App";
  if (relation.priority === "secondary") return "Optional Add-On";

  return "Recommended";
}

