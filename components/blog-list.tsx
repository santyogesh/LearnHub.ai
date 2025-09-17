"use client"

import { useState } from "react"
import { BlogCard } from "./blog-card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Mock data - replace with actual API calls
const mockPosts = [
  {
    id: "1",
    title: "Introduction to Machine Learning with Python",
    excerpt:
      "Learn the fundamentals of machine learning using Python and popular libraries like scikit-learn and pandas.",
    author: { name: "Dr. Sarah Chen", avatar: "/diverse-professor-lecturing.png" },
    publishedAt: "2024-01-15",
    readTime: 8,
    category: "Machine Learning",
    slug: "intro-to-ml-python",
  },
  {
    id: "2",
    title: "Advanced Data Structures and Algorithms",
    excerpt:
      "Deep dive into complex data structures and algorithmic thinking for competitive programming and interviews.",
    author: { name: "Prof. Michael Rodriguez", avatar: "/diverse-classroom-teacher.png" },
    publishedAt: "2024-01-12",
    readTime: 12,
    category: "Computer Science",
    slug: "advanced-data-structures",
  },
  {
    id: "3",
    title: "Web Development with React and Next.js",
    excerpt: "Build modern web applications using React and Next.js with best practices and performance optimization.",
    author: { name: "Emma Thompson", avatar: "/developer-working.png" },
    publishedAt: "2024-01-10",
    readTime: 15,
    category: "Web Development",
    slug: "react-nextjs-guide",
  },
  {
    id: "4",
    title: "Statistical Analysis with R",
    excerpt: "Comprehensive guide to statistical analysis and data visualization using R programming language.",
    author: { name: "Dr. James Wilson", avatar: "/statistician.jpg" },
    publishedAt: "2024-01-08",
    readTime: 10,
    category: "Statistics",
    slug: "statistical-analysis-r",
  },
]

const categories = ["All", "Machine Learning", "Computer Science", "Web Development", "Statistics"]

export function BlogList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
