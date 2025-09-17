import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Code, Users, Star } from "lucide-react"
import Link from "next/link"

interface Notebook {
  id: string
  title: string
  description: string
  author: {
    name: string
    avatar?: string
  }
  language: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  users: number
  lastUpdated: string
  slug: string
}

interface NotebookCardProps {
  notebook: Notebook
}

export function NotebookCard({ notebook }: NotebookCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            <Code className="h-3 w-3 mr-1" />
            {notebook.language}
          </Badge>
          <Badge className={`text-xs ${getDifficultyColor(notebook.difficulty)}`}>{notebook.difficulty}</Badge>
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors text-balance">
          {notebook.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed text-pretty">{notebook.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={notebook.author.avatar || "/placeholder.svg"} alt={notebook.author.name} />
              <AvatarFallback className="text-xs">
                {notebook.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{notebook.author.name}</span>
          </div>
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
              {notebook.rating}
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {notebook.users}
            </div>
          </div>
        </div>
        <Link href={`/notebooks/${notebook.slug}`}>
          <Button className="w-full gap-2">
            <Play className="h-4 w-4" />
            Run Notebook
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
