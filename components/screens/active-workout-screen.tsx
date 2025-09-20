"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle } from "lucide-react"
import type { Workout } from "@/types/gym"

interface ActiveWorkoutScreenProps {
  workout: Workout
  toggleExerciseComplete: (exerciseId: string) => void
  completeWorkout: () => void
  onBack: () => void
}

export function ActiveWorkoutScreen({
  workout,
  toggleExerciseComplete,
  completeWorkout,
  onBack,
}: ActiveWorkoutScreenProps) {
  const completedExercises = workout.exercises.filter((ex) => ex.completed).length
  const totalExercises = workout.exercises.length
  const progress = (completedExercises / totalExercises) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Voltar
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{workout.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {completedExercises}/{totalExercises} exercícios concluídos
                </p>
              </div>
            </div>
            <Button onClick={completeWorkout} disabled={completedExercises !== totalExercises} className="gap-2">
              <CheckCircle className="h-4 w-4" />
              Finalizar Treino
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso do Treino</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {workout.exercises.map((exercise, index) => (
              <Card key={exercise.id} className={exercise.completed ? "bg-muted/50" : ""}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExerciseComplete(exercise.id)}
                      className="mt-1 p-1 h-auto"
                    >
                      {exercise.completed ? (
                        <CheckCircle className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3
                          className={`font-semibold ${exercise.completed ? "line-through text-muted-foreground" : ""}`}
                        >
                          {index + 1}. {exercise.name}
                        </h3>
                        <Badge variant="outline">{exercise.muscleGroup}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Séries</p>
                          <p className="font-medium">{exercise.sets}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Repetições</p>
                          <p className="font-medium">{exercise.reps}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Peso</p>
                          <p className="font-medium">{exercise.weight}kg</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {completedExercises === totalExercises && (
            <Card className="border-primary bg-primary/5">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Parabéns! Treino Concluído</h3>
                <p className="text-muted-foreground mb-4">Você completou todos os exercícios deste treino</p>
                <Button onClick={completeWorkout} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Finalizar Treino
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
