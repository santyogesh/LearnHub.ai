import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen, Code, Users } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/notebooks">
            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 bg-transparent">
              <Code className="h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">Browse Notebooks</div>
                <div className="text-xs text-muted-foreground">Interactive coding</div>
              </div>
            </Button>
          </Link>

          <Link href="/blog">
            <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 bg-transparent">
              <BookOpen className="h-4 w-4" />
              <div className="text-left">
                <div className="text-sm font-medium">Read Blog</div>
                <div className="text-xs text-muted-foreground">Latest articles</div>
              </div>
            </Button>
          </Link>

          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 bg-transparent">
            <Plus className="h-4 w-4" />
            <div className="text-left">
              <div className="text-sm font-medium">Create Content</div>
              <div className="text-xs text-muted-foreground">New post or notebook</div>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-2 h-auto py-3 bg-transparent">
            <Users className="h-4 w-4" />
            <div className="text-left">
              <div className="text-sm font-medium">Community</div>
              <div className="text-xs text-muted-foreground">Connect with others</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
