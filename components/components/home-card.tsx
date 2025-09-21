import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface HomeCardProps {
  className?: string;
  navigate: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonName: string;
}

export function HomeCard({ className, navigate, icon, title, description, buttonName }: HomeCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
      onClick={navigate}
    >
      <CardHeader className="text-center pb-4">
        <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4">
          {icon}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button className="w-full cursor-pointer" size="lg">
          {buttonName}
        </Button>
      </CardContent>
    </Card>
  )
}
