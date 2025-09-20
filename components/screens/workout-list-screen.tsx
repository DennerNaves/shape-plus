"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Dumbbell, Plus } from "lucide-react"
import type { Workout } from "@/types/gym"

interface WorkoutListScreenProps {
  workouts: Workout[]
  onBack: () => void
  onCreateWorkout: () => void
  onStartWorkout: (workout: Workout) => void
}

export function WorkoutListScreen({ workouts, onBack, onCreateWorkout, onStartWorkout }: WorkoutListScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Voltar
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Dumbbell className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Meus Treinos</h1>
                  <p className="text-sm text-muted-foreground">Gerencie suas rotinas de exercícios</p>
                </div>
              </div>
            </div>
            <Button onClick={onCreateWorkout} className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Treino
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {workouts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto p-4 bg-muted rounded-full w-fit mb-4">
              <Dumbbell className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum treino criado</h3>
            <p className="text-muted-foreground mb-6">Comece criando seu primeiro treino personalizado</p>
            <Button onClick={onCreateWorkout} className="gap-2">
              <Plus className="h-4 w-4" />
              Criar Primeiro Treino
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Card key={workout.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{workout.name}</CardTitle>
                      <CardDescription className="mt-1">{workout.description}</CardDescription>
                    </div>
                    {workout.completed && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Concluído
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {workout.exercises.length} exercícios
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Grupos musculares:</p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(new Set(workout.exercises.map((ex) => ex.muscleGroup))).map((group) => (
                          <Badge key={group} variant="outline" className="text-xs">
                            {group}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={() => onStartWorkout(workout)} className="w-full" disabled={workout.completed}>
                      {workout.completed ? "Treino Concluído" : "Iniciar Treino"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
