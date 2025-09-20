"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2 } from "lucide-react"
import type { Exercise, Workout } from "@/types/gym"

interface CreateWorkoutScreenProps {
  newWorkout: Partial<Workout>
  setNewWorkout: (workout: Partial<Workout>) => void
  muscleGroups: string[]
  addExerciseToNewWorkout: (exercise: Exercise) => void
  createWorkout: () => void
  onBack: () => void
}

export function CreateWorkoutScreen({
  newWorkout,
  setNewWorkout,
  muscleGroups,
  addExerciseToNewWorkout,
  createWorkout,
  onBack,
}: CreateWorkoutScreenProps) {
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: "",
    muscleGroup: "",
    sets: 3,
    reps: 12,
    weight: 0,
  })

  const addExercise = () => {
    if (newExercise.name && newExercise.muscleGroup) {
      const exercise: Exercise = {
        id: Date.now().toString(),
        name: newExercise.name,
        muscleGroup: newExercise.muscleGroup,
        sets: newExercise.sets || 3,
        reps: newExercise.reps || 12,
        weight: newExercise.weight || 0,
        completed: false,
      }
      addExerciseToNewWorkout(exercise)
      setNewExercise({ name: "", muscleGroup: "", sets: 3, reps: 12, weight: 0 })
    }
  }

  const removeExercise = (exerciseId: string) => {
    setNewWorkout({
      ...newWorkout,
      exercises: newWorkout.exercises?.filter((ex) => ex.id !== exerciseId) || [],
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← Voltar
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Criar Novo Treino</h1>
            </div>
            <Button
              onClick={createWorkout}
              disabled={!newWorkout.name || !newWorkout.exercises?.length}
              className="gap-2"
            >
              Salvar Treino
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workout Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Treino</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="workout-name">Nome do Treino</Label>
                <Input
                  id="workout-name"
                  value={newWorkout.name || ""}
                  onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                  placeholder="Ex: Treino de Peito e Tríceps"
                />
              </div>
              <div>
                <Label htmlFor="workout-description">Descrição (opcional)</Label>
                <Textarea
                  id="workout-description"
                  value={newWorkout.description || ""}
                  onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                  placeholder="Descreva o foco deste treino..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Exercise */}
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Exercício</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="exercise-name">Nome do Exercício</Label>
                <Input
                  id="exercise-name"
                  value={newExercise.name || ""}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  placeholder="Ex: Supino Reto"
                />
              </div>
              <div>
                <Label htmlFor="muscle-group">Grupo Muscular</Label>
                <Select
                  value={newExercise.muscleGroup || ""}
                  onValueChange={(value) => setNewExercise({ ...newExercise, muscleGroup: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o grupo muscular" />
                  </SelectTrigger>
                  <SelectContent>
                    {muscleGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="sets">Séries</Label>
                  <Input
                    id="sets"
                    type="number"
                    value={newExercise.sets || 3}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="reps">Repetições</Label>
                  <Input
                    id="reps"
                    type="number"
                    value={newExercise.reps || 12}
                    onChange={(e) => setNewExercise({ ...newExercise, reps: Number.parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newExercise.weight || 0}
                    onChange={(e) => setNewExercise({ ...newExercise, weight: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <Button onClick={addExercise} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Exercício
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Exercise List */}
        {newWorkout.exercises && newWorkout.exercises.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Exercícios do Treino ({newWorkout.exercises.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {newWorkout.exercises.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-lg">
                          {index + 1}. {exercise.name}
                        </span>
                        <Badge variant="outline">{exercise.muscleGroup}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {exercise.sets} séries × {exercise.reps} repetições
                        {exercise.weight > 0 && ` × ${exercise.weight}kg`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(exercise.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
