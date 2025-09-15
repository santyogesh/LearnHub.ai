import { NotebookViewer } from "@/components/notebook/notebook-viewer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Users, Code } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API calls
const mockNotebook = {
  id: "1",
  title: "Linear Regression Analysis",
  description: "Interactive tutorial on linear regression with real-world datasets and visualizations.",
  author: { name: "Dr. Sarah Chen", avatar: "/placeholder.svg?key=i3pn3" },
  language: "Python",
  difficulty: "Beginner",
  rating: 4.8,
  users: 1250,
  lastUpdated: "2024-01-15",
}

interface NotebookPageProps {
  params: {
    slug: string
  }
}

export default function NotebookPage({ params }: NotebookPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <Link href="/notebooks">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Notebooks
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="outline" className="text-xs">
            <Code className="h-3 w-3 mr-1" />
            {mockNotebook.language}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {mockNotebook.difficulty}
          </Badge>
        </div>

        <h1 className="text-4xl font-bold text-balance mb-4">{mockNotebook.title}</h1>

        <p className="text-lg text-muted-foreground text-pretty mb-6 max-w-3xl">{mockNotebook.description}</p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={mockNotebook.author.avatar || "/placeholder.svg"} alt={mockNotebook.author.name} />
                <AvatarFallback className="text-xs">
                  {mockNotebook.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">{mockNotebook.author.name}</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                {mockNotebook.rating}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {mockNotebook.users} users
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotebookViewer />
    </div>
  )
}
