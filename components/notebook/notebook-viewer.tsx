"use client"

import { useState } from "react"
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

const mockCells: NotebookCell[] = [
  {
    id: "1",
    type: "markdown",
    content:
      "# Linear Regression Analysis\n\nThis notebook demonstrates linear regression using Python and scikit-learn.",
  },
  {
    id: "2",
    type: "code",
    content:
      "import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nfrom sklearn.linear_model import LinearRegression\n\nprint('Libraries imported successfully!')",
    output: "Libraries imported successfully!",
  },
  {
    id: "3",
    type: "code",
    content:
      "# Generate sample data\nnp.random.seed(42)\nX = np.random.randn(100, 1)\ny = 2 * X.flatten() + 1 + np.random.randn(100) * 0.1\n\nprint(f'Generated {len(X)} data points')\nprint(f'X shape: {X.shape}, y shape: {y.shape}')",
    output: "Generated 100 data points\nX shape: (100, 1), y shape: (100,)",
  },
]

export function NotebookViewer() {
  const [cells, setCells] = useState<NotebookCell[]>(mockCells)
  const [isKernelRunning, setIsKernelRunning] = useState(false)

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
                <Textarea
                  value={cell.content}
                  onChange={(e) => updateCellContent(cell.id, e.target.value)}
                  className={`font-mono text-sm resize-none ${cell.type === "code" ? "bg-muted/50" : "bg-background"}`}
                  rows={cell.content.split("\n").length + 1}
                />

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
