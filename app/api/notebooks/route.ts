import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    const notebooksDir = path.join(process.cwd(), "notebooks")

    // Create notebooks directory if it doesn't exist
    if (!fs.existsSync(notebooksDir)) {
      fs.mkdirSync(notebooksDir, { recursive: true })
      return NextResponse.json([])
    }

    const files = fs.readdirSync(notebooksDir)
    const notebookFiles = files.filter((file) => file.endsWith(".ipynb"))

    const notebooks = notebookFiles.map((file, index) => {
      const filePath = path.join(notebooksDir, file)
      const stats = fs.statSync(filePath)

      try {
        const content = fs.readFileSync(filePath, "utf8")
        const notebook = JSON.parse(content)

        // Extract metadata from notebook
        const title = notebook.metadata?.title || file.replace(".ipynb", "").replace(/-/g, " ")
        const description = notebook.metadata?.description || "Interactive notebook"
        const language = notebook.metadata?.kernelspec?.display_name || "Python"
        const author = notebook.metadata?.author || "Unknown"

        return {
          id: (index + 1).toString(),
          title,
          description,
          author: { name: author, avatar: "/placeholder.svg?key=notebook" },
          language,
          difficulty: notebook.metadata?.difficulty || "Beginner",
          rating: 4.5,
          users: Math.floor(Math.random() * 1000) + 100,
          lastUpdated: stats.mtime.toISOString().split("T")[0],
          slug: file.replace(".ipynb", ""),
          filename: file,
        }
      } catch (error) {
        console.error(`Error parsing notebook ${file}:`, error)
        return {
          id: (index + 1).toString(),
          title: file.replace(".ipynb", "").replace(/-/g, " "),
          description: "Interactive notebook (parsing error)",
          author: { name: "Unknown", avatar: "/placeholder.svg?key=notebook" },
          language: "Python",
          difficulty: "Beginner" as const,
          rating: 4.0,
          users: 0,
          lastUpdated: stats.mtime.toISOString().split("T")[0],
          slug: file.replace(".ipynb", ""),
          filename: file,
        }
      }
    })

    return NextResponse.json(notebooks)
  } catch (error) {
    console.error("Error reading notebooks:", error)
    return NextResponse.json([])
  }
}
