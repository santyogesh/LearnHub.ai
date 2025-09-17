"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Course {
  id: string
  title: string
  progress: number
  totalLessons: number
  completedLessons: number
  category: string
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Machine Learning Fundamentals",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    category: "AI/ML",
  },
  {
    id: "2",
    title: "Web Development with React",
    progress: 45,
    totalLessons: 20,
    completedLessons: 9,
    category: "Web Dev",
  },
  {
    id: "3",
    title: "Data Analysis with Python",
    progress: 90,
    totalLessons: 15,
    completedLessons: 13,
    category: "Data Science",
  },
]

export function LearningProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
        <CardDescription>Track your course completion</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockCourses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-balance">{course.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
