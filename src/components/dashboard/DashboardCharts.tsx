"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "@/components/dashboard/charts";

interface DashboardChartsProps {
  revenueData: Array<{ name: string; revenue: number; signups: number }>;
  orgDistributionData: Array<{ name: string; value: number }>;
}

export function DashboardCharts({ revenueData, orgDistributionData }: DashboardChartsProps) {
  return (
    <React.Fragment>
      <Card variant="chart">
        <CardHeader>
          <CardTitle>Revenue & Signups Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <AreaChart
            data={revenueData}
            areas={[
              { dataKey: "revenue", name: "Revenue", color: "#3b82f6", fillOpacity: 0.6 },
              { dataKey: "signups", name: "Signups", color: "#10b981", fillOpacity: 0.4 },
            ]}
            height={300}
          />
        </CardContent>
      </Card>

      <Card variant="chart">
        <CardHeader>
          <CardTitle>Organization Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="grid grid-cols-3 gap-4 w-full">
              {orgDistributionData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">{item.value}</div>
                  <div className="text-sm text-gray-600">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

