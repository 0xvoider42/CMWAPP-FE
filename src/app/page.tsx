import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRightIcon, BarChart3Icon, LineChart, Settings2Icon } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Campaign Management System
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Create, manage, and optimize your advertising campaigns all in one place. Track performance and scale your success.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild size="lg">
                <Link href="/campaigns/create">Create Campaign</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/campaigns">View Campaigns</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Campaign Analytics</CardTitle>
                <CardDescription>
                  Track performance metrics and optimize your campaigns in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group" asChild>
                  <Link href="/campaigns" className="flex items-center justify-between">
                    View Analytics
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Settings2Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Campaign Management</CardTitle>
                <CardDescription>
                  Create and manage campaigns with our intuitive interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group" asChild>
                  <Link href="/campaigns/create" className="flex items-center justify-between">
                    Create Campaign
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <LineChart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Payout Management</CardTitle>
                <CardDescription>
                  Configure and optimize your campaign payouts by country
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group" asChild>
                  <Link href="/campaigns" className="flex items-center justify-between">
                    Manage Payouts
                    <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">100+</h3>
              <p className="text-gray-500">Active Campaigns</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-gray-500">Countries</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">1M+</h3>
              <p className="text-gray-500">Conversions</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-gray-500">Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}