import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const notebooksDir = path.join(process.cwd(), "notebooks")
    const filePath = path.join(notebooksDir, `${params.slug}.ipynb`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Notebook not found" }, { status: 404 })
    }

    const content = fs.readFileSync(filePath, "utf8")
    const notebook = JSON.parse(content)

    return NextResponse.json(notebook)
  } catch (error) {
    console.error("Error reading notebook:", error)
    return NextResponse.json({ error: "Failed to read notebook" }, { status: 500 })
  }
}
