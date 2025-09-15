"use client"

import { useState } from "react"
import { NotebookCard } from "./notebook-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Mock data - replace with actual API calls
const mockNotebooks = [
  {
    id: "1",
    title: "Linear Regression Analysis",
    description: "Interactive tutorial on linear regression with real-world datasets and visualizations.",
    author: { name: "Dr. Sarah Chen", avatar: "/placeholder.svg?key=i3pn3" },
    language: "Python",
    difficulty: "Beginner" as const,
    rating: 4.8,
    users: 1250,
    lastUpdated: "2024-01-15",
    slug: "linear-regression-analysis",
  },
  {
    id: "2",
    title: "Neural Networks from Scratch",
    description: "Build and train neural networks without using high-level frameworks. Understand the math behind AI.",
    author: { name: "Prof. Michael Rodriguez", avatar: "/placeholder.svg?key=gngvh" },
    language: "Python",
    difficulty: "Advanced" as const,
    rating: 4.9,
    users: 890,
    lastUpdated: "2024-01-12",
    slug: "neural-networks-scratch",
  },
  {
    id: "3",
    title: "Data Visualization with D3.js",
    description: "Create stunning interactive visualizations using D3.js and modern web technologies.",
    author: { name: "Emma Thompson", avatar: "/placeholder.svg?key=5x0ze" },
    language: "JavaScript",
    difficulty: "Intermediate" as const,
    rating: 4.6,
    users: 675,
    lastUpdated: "2024-01-10",
    slug: "data-viz-d3js",
  },
  {
    id: "4",
    title: "Statistical Hypothesis Testing",
    description: "Learn statistical inference and hypothesis testing with practical R examples.",
    author: { name: "Dr. James Wilson", avatar: "/placeholder.svg?key=8dcmn" },
    language: "R",
    difficulty: "Intermediate" as const,
    rating: 4.7,
    users: 420,
    lastUpdated: "2024-01-08",
    slug: "hypothesis-testing-r",
  },
]

const languages = ["All", "Python", "R", "JavaScript", "SQL"]
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

export function NotebookList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredNotebooks = mockNotebooks.filter((notebook) => {
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notebooks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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

      {/* Notebooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotebooks.map((notebook) => (
          <NotebookCard key={notebook.id} notebook={notebook} />
        ))}
      </div>

      {filteredNotebooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No notebooks found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
