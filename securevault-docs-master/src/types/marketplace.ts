export type SvdTemplate = {
  id: string;
  title: string;
  vertical: 'business' | 'personal';
  summary: string;
  version: string;
  author: string;
  icon?: string;
  tags?: string[];
};

export type InstallTarget = 'business' | 'personal';

export type InstallRequest = {
  templateId: string;
  target: InstallTarget;
  mode?: 'dry-run' | 'install';
};

export type InstallResult = {
  ok: boolean;
  mode: 'dry-run' | 'install';
  template: SvdTemplate;
  appliedChanges: Array<{ kind: string; path: string; note?: string }>; // human-readable preview
  message?: string;
};

