import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API calls
const mockPost = {
  id: "1",
  title: "Introduction to Machine Learning with Python",
  content: `
# Introduction to Machine Learning with Python

Machine learning has become one of the most important technologies of our time. In this comprehensive guide, we'll explore the fundamentals of machine learning using Python.

## What is Machine Learning?

Machine learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed for every scenario.

## Getting Started with Python

Python is the most popular language for machine learning due to its simplicity and powerful libraries:

- **NumPy**: For numerical computations
- **Pandas**: For data manipulation and analysis
- **Scikit-learn**: For machine learning algorithms
- **Matplotlib**: For data visualization

## Your First ML Model

Let's create a simple linear regression model:

\`\`\`python
import numpy as np
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict(X)
print(predictions)
\`\`\`

This simple example demonstrates the basic workflow of machine learning: prepare data, train a model, and make predictions.

## Next Steps

Continue your machine learning journey by exploring:
1. Different types of algorithms
2. Data preprocessing techniques
3. Model evaluation methods
4. Advanced topics like deep learning
  `,
  author: { name: "Dr. Sarah Chen", avatar: "/diverse-professor-lecturing.png" },
  publishedAt: "2024-01-15",
  readTime: 8,
  category: "Machine Learning",
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">
            {mockPost.category}
          </Badge>
          <h1 className="text-4xl font-bold text-balance mb-4">{mockPost.title}</h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={mockPost.author.avatar || "/placeholder.svg"} alt={mockPost.author.name} />
                <AvatarFallback>
                  {mockPost.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{mockPost.author.name}</p>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(mockPost.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {mockPost.readTime} min read
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Card>
          <CardContent className="prose prose-lg max-w-none p-8">
            <div dangerouslySetInnerHTML={{ __html: mockPost.content.replace(/\n/g, "<br>") }} />
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center">
          <Link href="/notebooks">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Try Interactive Notebooks
            </Button>
          </Link>
        </div>
      </article>
    </div>
  )
}
