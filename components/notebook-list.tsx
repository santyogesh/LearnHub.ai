"use client"

import { useState, useEffect } from "react"
import { NotebookCard } from "./notebook-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const languages = ["All", "Python", "R", "JavaScript", "SQL"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

interface Notebook {
  id: string
  title: string
  description: string
  author: { name: string; avatar: string }
  language: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  users: number
  lastUpdated: string
  slug: string
  filename: string
}

export function NotebookList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotebooks = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/notebooks")
      const data = await response.json()
      setNotebooks(data)
    } catch (error) {
      console.error("Error fetching notebooks:", error)
      setNotebooks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotebooks()
  }, [])

  const filteredNotebooks = notebooks.filter((notebook) => {
    const matchesSearch =
      notebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notebook.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLanguage = selectedLanguage === "All" || notebook.language === selectedLanguage
    const matchesDifficulty = selectedDifficulty === "All" || notebook.difficulty === selectedDifficulty
    return matchesSearch && matchesLanguage && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notebooks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon" onClick={fetchNotebooks} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground self-center">Language:</span>
            {languages.map((language) => (
              <Badge
                key={language}
                variant={selectedLanguage === language ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedLanguage(language)}
              >
                {language}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground self-center">Difficulty:</span>
            {difficulties.map((difficulty) => (
              <Badge
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading notebooks...</p>
        </div>
      ) : (
        <>
          {/* Notebooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotebooks.map((notebook) => (
              <NotebookCard key={notebook.id} notebook={notebook} />
            ))}
          </div>

          {filteredNotebooks.length === 0 && notebooks.length > 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No notebooks found matching your criteria.</p>
            </div>
          )}

          {notebooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No notebook files found. Add .ipynb files to the 'notebooks' folder in your project root.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
