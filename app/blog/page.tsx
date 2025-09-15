import { BlogList } from "@/components/blog/blog-list"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-balance mb-4">Learning Blog</h1>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
          Discover in-depth articles, tutorials, and insights from our community of educators and learners.
        </p>
      </div>
      <BlogList />
    </div>
  )
}
