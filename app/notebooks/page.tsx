import { NotebookList } from "@/components/notebook/notebook-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function NotebooksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-balance mb-4">Interactive Notebooks</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
            Explore hands-on coding tutorials and interactive learning experiences. Run code, experiment, and learn by
            doing.
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Notebook
        </Button>
      </div>
      <NotebookList />
    </div>
  )
}
