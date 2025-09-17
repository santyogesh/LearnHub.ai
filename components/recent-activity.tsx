import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, MessageSquare, Star } from "lucide-react"

interface Activity {
  id: string
  type: "blog_read" | "notebook_run" | "comment" | "rating"
  title: string
  description: string
  timestamp: string
  metadata?: {
    rating?: number
    author?: string
  }
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "notebook_run",
    title: "Linear Regression Analysis",
    description: "Completed notebook execution",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "blog_read",
    title: "Introduction to Machine Learning",
    description: "Read blog post by Dr. Sarah Chen",
    timestamp: "4 hours ago",
    metadata: { author: "Dr. Sarah Chen" },
  },
  {
    id: "3",
    type: "rating",
    title: "Neural Networks from Scratch",
    description: "Rated notebook",
    timestamp: "1 day ago",
    metadata: { rating: 5 },
  },
  {
    id: "4",
    type: "comment",
    title: "Data Visualization with D3.js",
    description: "Added comment on notebook",
    timestamp: "2 days ago",
  },
]

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "blog_read":
      return BookOpen
    case "notebook_run":
      return Code
    case "comment":
      return MessageSquare
    case "rating":
      return Star
    default:
      return BookOpen
  }
}

const getActivityColor = (type: Activity["type"]) => {
  switch (type) {
    case "blog_read":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "notebook_run":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "comment":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "rating":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest learning activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  <Icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.description}
                    {activity.metadata?.rating && <span className="ml-1">({activity.metadata.rating} stars)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
