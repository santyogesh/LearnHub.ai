"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Save, X } from "lucide-react"

interface NotebookCell {
  id: string
  type: "code" | "markdown"
  content: string
}

interface NotebookFormData {
  title: string
  description: string
  language: string
  difficulty: string
  authorName: string
  cells: NotebookCell[]
}

export function NotebookForm() {
  const [formData, setFormData] = useState<NotebookFormData>({
    title: "",
    description: "",
    language: "",
    difficulty: "",
    authorName: "",
    cells: [{ id: "1", type: "markdown", content: "# Welcome to your notebook\n\nStart writing here..." }],
  })

  const languages = ["Python", "R", "JavaScript", "SQL", "Julia"]
  const difficulties = ["Beginner", "Intermediate", "Advanced"]

  const addCell = (type: "code" | "markdown") => {
    const newCell: NotebookCell = {
      id: Date.now().toString(),
      type,
      content: type === "code" ? "# Write your code here" : "## New section\n\nAdd your content here...",
    }
    setFormData({ ...formData, cells: [...formData.cells, newCell] })
  }

  const updateCell = (cellId: string, content: string) => {
    setFormData({
      ...formData,
      cells: formData.cells.map((cell) => (cell.id === cellId ? { ...cell, content } : cell)),
    })
  }

  const removeCell = (cellId: string) => {
    setFormData({
      ...formData,
      cells: formData.cells.filter((cell) => cell.id !== cellId),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving notebook:", formData)
    alert("Notebook saved successfully!")

    // Reset form
    setFormData({
      title: "",
      description: "",
      language: "",
      difficulty: "",
      authorName: "",
      cells: [{ id: "1", type: "markdown", content: "# Welcome to your notebook\n\nStart writing here..." }],
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
          Add New Notebook
        </CardTitle>
        <CardDescription>Create a new interactive notebook. Add cells with code and explanations.</CardDescription>
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
                placeholder="Enter notebook title"
                required
              />
              {formData.title && (
                <p className="text-xs text-muted-foreground">URL will be: /notebooks/{generateSlug(formData.title)}</p>
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
              <Label htmlFor="language">Programming Language *</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level *</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what this notebook teaches"
              rows={3}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Notebook Cells</Label>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => addCell("markdown")}>
                  Add Text Cell
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addCell("code")}>
                  Add Code Cell
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {formData.cells.map((cell, index) => (
                <Card key={cell.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={cell.type === "code" ? "default" : "secondary"} className="text-xs">
                          {cell.type === "code" ? "Code" : "Text"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">Cell {index + 1}</span>
                      </div>
                      {formData.cells.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeCell(cell.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Textarea
                      value={cell.content}
                      onChange={(e) => updateCell(cell.id, e.target.value)}
                      placeholder={
                        cell.type === "code"
                          ? "Enter your code here..."
                          : "Enter markdown text here (use # for headings, ** for bold, etc.)"
                      }
                      rows={Math.max(3, cell.content.split("\n").length + 1)}
                      className={`font-mono text-sm ${cell.type === "code" ? "bg-muted/50" : ""}`}
                    />
                    {cell.type === "markdown" && (
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 Use markdown: # Heading, **bold**, *italic*, `code`
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Notebook
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
