"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Play, Square, RotateCcw, Download, Share } from "lucide-react"

interface NotebookCell {
  id: string
  type: "code" | "markdown"
  content: string
  output?: string
  isRunning?: boolean
}

interface NotebookViewerProps {
  slug: string
}

export function NotebookViewer({ slug }: NotebookViewerProps) {
  const [cells, setCells] = useState<NotebookCell[]>([])
  const [isKernelRunning, setIsKernelRunning] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNotebook = async () => {
      try {
        const response = await fetch(`/api/notebooks/${slug}`)
        if (response.ok) {
          const notebook = await response.json()

          // Convert Jupyter notebook format to our cell format
          const convertedCells: NotebookCell[] =
            notebook.cells?.map((cell: any, index: number) => ({
              id: (index + 1).toString(),
              type: cell.cell_type === "code" ? "code" : "markdown",
              content: Array.isArray(cell.source) ? cell.source.join("") : cell.source || "",
              output:
                cell.outputs && cell.outputs.length > 0
                  ? cell.outputs
                      .map((output: any) => {
                        if (output.text) {
                          return Array.isArray(output.text) ? output.text.join("") : output.text
                        }
                        if (output.data && output.data["text/plain"]) {
                          return Array.isArray(output.data["text/plain"])
                            ? output.data["text/plain"].join("")
                            : output.data["text/plain"]
                        }
                        return "Output available"
                      })
                      .join("\n")
                  : undefined,
            })) || []

          setCells(convertedCells)
        }
      } catch (error) {
        console.error("Error loading notebook:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNotebook()
  }, [slug])

  const runCell = async (cellId: string) => {
    setCells((prev) => prev.map((cell) => (cell.id === cellId ? { ...cell, isRunning: true } : cell)))

    // Simulate code execution
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCells((prev) =>
      prev.map((cell) =>
        cell.id === cellId
          ? {
              ...cell,
              isRunning: false,
              output: cell.type === "code" ? "Code executed successfully!" : undefined,
            }
          : cell,
      ),
    )
  }

  const runAllCells = async () => {
    setIsKernelRunning(true)
    for (const cell of cells) {
      if (cell.type === "code") {
        await runCell(cell.id)
      }
    }
    setIsKernelRunning(false)
  }

  const updateCellContent = (cellId: string, content: string) => {
    setCells((prev) => prev.map((cell) => (cell.id === cellId ? { ...cell, content } : cell)))
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading notebook...</p>
      </div>
    )
  }

  if (cells.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No cells found in this notebook.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Notebook Controls */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Notebook Controls</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={isKernelRunning ? "destructive" : "secondary"}>
                {isKernelRunning ? "Running" : "Ready"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Button onClick={runAllCells} disabled={isKernelRunning} size="sm">
              <Play className="h-4 w-4 mr-2" />
              Run All
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart Kernel
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notebook Cells */}
      <div className="space-y-4">
        {cells.map((cell, index) => (
          <Card key={cell.id} className="relative">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {cell.type === "code" ? "Code" : "Markdown"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Cell {index + 1}</span>
                </div>
                {cell.type === "code" && (
                  <Button size="sm" variant="outline" onClick={() => runCell(cell.id)} disabled={cell.isRunning}>
                    {cell.isRunning ? <Square className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {cell.type === "markdown" ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{cell.content}</pre>
                  </div>
                ) : (
                  <Textarea
                    value={cell.content}
                    onChange={(e) => updateCellContent(cell.id, e.target.value)}
                    className="font-mono text-sm resize-none bg-muted/50"
                    rows={Math.max(3, cell.content.split("\n").length + 1)}
                  />
                )}

                {cell.output && (
                  <div className="bg-muted/30 p-3 rounded-md border-l-4 border-primary">
                    <pre className="text-sm font-mono whitespace-pre-wrap text-foreground">{cell.output}</pre>
                  </div>
                )}

                {cell.isRunning && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    Running...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
