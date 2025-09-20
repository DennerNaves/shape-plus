"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Calendar, Dumbbell, TrendingUp } from "lucide-react"

interface HomeScreenProps {
  onNavigate: (section: "training" | "nutrition") => void
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Dumbbell className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">GymApp</h1>
                <p className="text-sm text-muted-foreground">Seu companheiro de treino</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Transforme seu treino</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Gerencie seus treinos, acompanhe seu progresso e planeje sua alimentação em um só lugar
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
            onClick={() => onNavigate("training")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4">
                <Dumbbell className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Treino</CardTitle>
              <CardDescription className="text-base">Crie e gerencie suas rotinas de exercícios</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" size="lg">
                Acessar Treinos
              </Button>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
            onClick={() => onNavigate("nutrition")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto p-4 bg-accent/10 rounded-full w-fit mb-4">
                <Apple className="h-12 w-12 text-accent" />
              </div>
              <CardTitle className="text-2xl">Alimentação</CardTitle>
              <CardDescription className="text-base">Planeje suas refeições e monitore nutrição</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Acessar Alimentação
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treinos esta semana</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">4</div>
              <p className="text-xs text-muted-foreground">+2 da semana passada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Exercícios favoritos</CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground">Salvos na biblioteca</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">85%</div>
              <p className="text-xs text-muted-foreground">Meta mensal</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
