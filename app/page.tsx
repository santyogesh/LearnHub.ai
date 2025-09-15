import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Users, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            Welcome to the Future of Learning
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">
            Learn Through
            <span className="text-primary"> Interactive </span>
            Experiences
          </h1>
          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            Combine the power of academic blogging with hands-on coding notebooks. Learn, experiment, and share
            knowledge in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <BookOpen className="h-4 w-4" />
                Explore Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">Everything You Need to Learn</h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Our platform combines traditional learning with modern interactive tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Academic Blog</CardTitle>
                <CardDescription>In-depth articles and tutorials from experts in various fields</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Expert-written content</li>
                  <li>• Peer-reviewed articles</li>
                  <li>• Multiple disciplines</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Interactive Notebooks</CardTitle>
                <CardDescription>
                  Hands-on coding experiences with real-time execution and visualization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Live code execution</li>
                  <li>• Multiple languages</li>
                  <li>• Collaborative editing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Learning Community</CardTitle>
                <CardDescription>Connect with learners and educators from around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Discussion forums</li>
                  <li>• Study groups</li>
                  <li>• Mentorship programs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Blog Posts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Interactive Notebooks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-6">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground text-pretty mb-8">
            Join thousands of learners who are already advancing their skills with our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                <Zap className="h-4 w-4" />
                Start Learning Now
              </Button>
            </Link>
            <Link href="/notebooks">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                <Code className="h-4 w-4" />
                Try Notebooks
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
