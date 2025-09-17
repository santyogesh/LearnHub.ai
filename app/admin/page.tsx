"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogForm } from "@/components/admin/blog-form"
import { NotebookForm } from "@/components/admin/notebook-form"
import { ContentList } from "@/components/admin/content-list"
import { FileText, Code, BookOpen, List } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-balance mb-4">Content Management</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Add new blog posts and notebooks to your learning platform. No programming knowledge required!
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notebooks</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Interactive tutorials</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,235</div>
            <p className="text-xs text-muted-foreground">Content views</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Management Tabs */}
      <Tabs defaultValue="manage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            Manage Content
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Add Blog Post
          </TabsTrigger>
          <TabsTrigger value="notebook" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Add Notebook
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <ContentList />
        </TabsContent>

        <TabsContent value="blog">
          <BlogForm />
        </TabsContent>

        <TabsContent value="notebook">
          <NotebookForm />
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>Quick tips for creating great content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">📝 Blog Posts</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Keep titles clear and descriptive</li>
              <li>• Write engaging excerpts (under 200 characters)</li>
              <li>• Use headings to structure your content</li>
              <li>• Include code examples when relevant</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">💻 Notebooks</h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Start with a markdown cell explaining the topic</li>
              <li>• Alternate between explanation and code cells</li>
              <li>• Keep code examples simple and well-commented</li>
              <li>• Test your code before publishing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
