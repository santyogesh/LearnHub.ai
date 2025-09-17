"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, Clock, RefreshCw } from "lucide-react"

interface NotebookData {
  id: string
  title: string
  filename: string
  language: string
  cellCount: number
  lastModified: string
  size: number
}

interface BlogData {
  id: string
  title: string
  author: string
  category: string
  publishedAt: string
  readTime: number
  status: string
}

export function ContentList() {
  const [activeTab, setActiveTab] = useState<"blogs" | "notebooks">("blogs")
  const [searchTerm, setSearchTerm] = useState("")
  const [notebooks, setNotebooks] = useState<NotebookData[]>([])
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(false)

  const fetchNotebooks = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/notebooks")
      if (response.ok) {
        const data = await response.json()
        setNotebooks(data)
      }
    } catch (error) {
      console.error("Failed to fetch notebooks:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBlogs = async () => {
    // For now, using empty array since we don't have blog API yet
    setBlogs([])
  }

  useEffect(() => {
    fetchNotebooks()
    fetchBlogs()
  }, [])

  const filteredBlogs = blogs.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredNotebooks = notebooks.filter(
    (notebook) =>
      notebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notebook.filename.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRefresh = () => {
    if (activeTab === "notebooks") {
      fetchNotebooks()
    } else {
      fetchBlogs()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Content</CardTitle>
        <CardDescription>View, edit, and manage your existing blog posts and notebooks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Tab Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
              <Button
                variant={activeTab === "blogs" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("blogs")}
              >
                Blog Posts ({blogs.length})
              </Button>
              <Button
                variant={activeTab === "notebooks" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("notebooks")}
              >
                Notebooks ({notebooks.length})
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Content Tables */}
          {activeTab === "blogs" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Read Time</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBlogs.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{post.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.readTime} min
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === "notebooks" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Cells</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotebooks.map((notebook) => (
                    <TableRow key={notebook.id}>
                      <TableCell className="font-medium">{notebook.title}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{notebook.filename}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{notebook.language}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{notebook.cellCount} cells</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(notebook.lastModified).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {((activeTab === "blogs" && filteredBlogs.length === 0 && !loading) ||
            (activeTab === "notebooks" && filteredNotebooks.length === 0 && !loading)) && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {activeTab === "notebooks"
                  ? "No notebook files found. Place .ipynb files in the 'notebooks' folder to see them here."
                  : "No blogs found matching your search."}
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Loading {activeTab}...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
