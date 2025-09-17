"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Save, Eye } from "lucide-react"

interface BlogFormData {
  title: string
  excerpt: string
  content: string
  category: string
  authorName: string
  readTime: number
}

export function BlogForm() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    authorName: "",
    readTime: 5,
  })
  const [isPreview, setIsPreview] = useState(false)

  const categories = ["Machine Learning", "Computer Science", "Web Development", "Statistics", "Data Science"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving blog post:", formData)
    alert("Blog post saved successfully!")

    // Reset form
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      authorName: "",
      readTime: 5,
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Blog Post
        </CardTitle>
        <CardDescription>
          Create a new blog post for your learning platform. Fill out the form below and click save.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter blog post title"
                required
              />
              {formData.title && (
                <p className="text-xs text-muted-foreground">URL will be: /blog/{generateSlug(formData.title)}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author Name *</Label>
              <Input
                id="author"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                placeholder="Your name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="readTime">Estimated Read Time (minutes)</Label>
              <Input
                id="readTime"
                type="number"
                min="1"
                max="60"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: Number.parseInt(e.target.value) || 5 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Short Description *</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Write a brief description that will appear on the blog list"
              rows={3}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.excerpt.length}/200 characters (keep it under 200 for best display)
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Content *</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
            </div>

            {isPreview ? (
              <Card className="p-4 min-h-[300px]">
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, "<br>") }} />
                </div>
              </Card>
            ) : (
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog post content here. You can use basic HTML tags like <h2>, <p>, <strong>, <em>, etc."
                rows={15}
                className="font-mono text-sm"
                required
              />
            )}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>
                💡 <strong>Formatting Tips:</strong>
              </p>
              <p>
                • Use <code>&lt;h2&gt;Section Title&lt;/h2&gt;</code> for headings
              </p>
              <p>
                • Use <code>&lt;strong&gt;bold text&lt;/strong&gt;</code> for emphasis
              </p>
              <p>
                • Use <code>&lt;code&gt;code snippet&lt;/code&gt;</code> for inline code
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Blog Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
