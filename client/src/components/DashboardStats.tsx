import { Link2, MousePointerClick, TrendingUp } from "lucide-react";

interface StatsData {
  totalLinks: number;
  totalClicks: number;
  AvgClicks: number;
}

interface StatCardProps {
  statsData?: StatsData;
}

const DashboardStats: React.FC<StatCardProps> = ({ statsData }) => {
  const statss = [
    {
      label: "Your Links",
      value: statsData?.totalLinks?.toString() || "0",
      description: "Total shortened links created",
      icon: Link2,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      iconBg: "bg-emerald-100",
    },
    {
      label: "Total Clicks",
      value: statsData?.totalClicks?.toString() || "0",
      description: "Clicks across all your links",
      icon: MousePointerClick,
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      iconBg: "bg-blue-100",
    },
    {
      label: "Avg. Clicks/Link",
      value: statsData?.AvgClicks?.toFixed(2)?.toString() || "0",
      description: "Average engagement per link",
      icon: TrendingUp,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      iconBg: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {statss.map((stat, idx) => {
        const Icon = stat.icon;

        return (
          <div
            key={idx}
            className={`${stat.bgColor} rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.iconBg} rounded-xl p-3`}>
                <Icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
            <p className="text-xs text-gray-600">{stat.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;