import { NotebookViewer } from "@/components/notebook/notebook-viewer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Star, Users, Code } from "lucide-react"
import Link from "next/link"

interface NotebookPageProps {
  params: {
    slug: string
  }
}

async function getNotebookMetadata(slug: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/notebooks`, {
      cache: "no-store",
    })
    if (response.ok) {
      const notebooks = await response.json()
      return notebooks.find((notebook: any) => notebook.slug === slug)
    }
  } catch (error) {
    console.error("Error fetching notebook metadata:", error)
  }

  // Fallback metadata
  return {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
    description: "Interactive notebook",
    author: { name: "Unknown", avatar: "/placeholder.svg?key=notebook" },
    language: "Python",
    difficulty: "Beginner",
    rating: 4.0,
    users: 0,
    lastUpdated: new Date().toISOString().split("T")[0],
  }
}

export default async function NotebookPage({ params }: NotebookPageProps) {
  const notebook = await getNotebookMetadata(params.slug)

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
            {notebook.language}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {notebook.difficulty}
          </Badge>
        </div>

        <h1 className="text-4xl font-bold text-balance mb-4">{notebook.title}</h1>

        <p className="text-lg text-muted-foreground text-pretty mb-6 max-w-3xl">{notebook.description}</p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={notebook.author.avatar || "/placeholder.svg"} alt={notebook.author.name} />
                <AvatarFallback className="text-xs">
                  {notebook.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold">{notebook.author.name}</span>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
                {notebook.rating}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {notebook.users} users
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotebookViewer slug={params.slug} />
    </div>
  )
}
