"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Apple, Calendar, Plus, Utensils } from "lucide-react"
import type { DayPlan } from "@/types/gym"

interface NutritionDashboardScreenProps {
  currentPlan: DayPlan
  selectedDate: Date
  onBack: () => void
  onCreateMealPlan: () => void
  onViewFoods: () => void
}

export function NutritionDashboardScreen({
  currentPlan,
  selectedDate,
  onBack,
  onCreateMealPlan,
  onViewFoods,
}: NutritionDashboardScreenProps) {
  const totalCalories = currentPlan.meals.reduce((sum, meal) => sum + meal.totalCalories, 0)
  const totalProtein = currentPlan.meals.reduce((sum, meal) => sum + meal.totalProtein, 0)
  const totalCarbs = currentPlan.meals.reduce((sum, meal) => sum + meal.totalCarbs, 0)
  const totalFat = currentPlan.meals.reduce((sum, meal) => sum + meal.totalFat, 0)

  const calorieProgress = (totalCalories / currentPlan.targetCalories) * 100
  const proteinProgress = (totalProtein / currentPlan.targetProtein) * 100
  const carbsProgress = (totalCarbs / currentPlan.targetCarbs) * 100
  const fatProgress = (totalFat / currentPlan.targetFat) * 100

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
                <div className="p-2 bg-accent rounded-lg">
                  <Apple className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Alimentação</h1>
                  <p className="text-sm text-muted-foreground">Planeje suas refeições e monitore nutrição</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onViewFoods}>
                Ver Alimentos
              </Button>
              <Button onClick={onCreateMealPlan} className="gap-2">
                <Plus className="h-4 w-4" />
                Planejar Refeição
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Date and Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {selectedDate.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Calorias</span>
                    <span>
                      {Math.round(totalCalories)}/{currentPlan.targetCalories}
                    </span>
                  </div>
                  <Progress value={Math.min(calorieProgress, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(calorieProgress)}% da meta</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Proteína</span>
                    <span>
                      {Math.round(totalProtein)}g/{currentPlan.targetProtein}g
                    </span>
                  </div>
                  <Progress value={Math.min(proteinProgress, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(proteinProgress)}% da meta</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Carboidratos</span>
                    <span>
                      {Math.round(totalCarbs)}g/{currentPlan.targetCarbs}g
                    </span>
                  </div>
                  <Progress value={Math.min(carbsProgress, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(carbsProgress)}% da meta</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Gorduras</span>
                    <span>
                      {Math.round(totalFat)}g/{currentPlan.targetFat}g
                    </span>
                  </div>
                  <Progress value={Math.min(fatProgress, 100)} className="h-2" />
                  <p className="text-xs text-muted-foreground">{Math.round(fatProgress)}% da meta</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Refeições de Hoje</h2>
              <Button onClick={onCreateMealPlan} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Refeição
              </Button>
            </div>

            {currentPlan.meals.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <div className="mx-auto p-4 bg-muted rounded-full w-fit mb-4">
                    <Utensils className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Nenhuma refeição planejada</h3>
                  <p className="text-muted-foreground mb-6">Comece planejando sua primeira refeição do dia</p>
                  <Button onClick={onCreateMealPlan} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Planejar Primeira Refeição
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPlan.meals.map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Calorias</p>
                            <p className="font-medium">{Math.round(meal.totalCalories)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Proteína</p>
                            <p className="font-medium">{Math.round(meal.totalProtein)}g</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Carboidratos</p>
                            <p className="font-medium">{Math.round(meal.totalCarbs)}g</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Gorduras</p>
                            <p className="font-medium">{Math.round(meal.totalFat)}g</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Alimentos:</p>
                          <div className="space-y-1">
                            {meal.foods.map((foodItem, index) => (
                              <p key={index} className="text-xs">
                                {foodItem.quantity}x {foodItem.food.name}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
