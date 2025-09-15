import { StatsCard } from "@/components/dashboard/stats-card"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { LearningProgress } from "@/components/dashboard/learning-progress"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { BookOpen, Code, Clock, Trophy } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-balance mb-2">Dashboard</h1>
        <p className="text-lg text-muted-foreground text-pretty">Welcome back! Here's your learning overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Blog Posts Read"
          value={24}
          description="This month"
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Notebooks Completed"
          value={8}
          description="This month"
          icon={Code}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Learning Hours"
          value="42h"
          description="This month"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard title="Achievements" value={15} description="Total earned" icon={Trophy} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <LearningProgress />
          <RecentActivity />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
