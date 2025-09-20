export interface Exercise {
  id: string
  name: string
  muscleGroup: string
  sets: number
  reps: number
  weight: number
  completed: boolean
}

export interface Workout {
  id: string
  name: string
  description: string
  exercises: Exercise[]
  completed: boolean
  createdAt: Date
}

export interface Food {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving: string
}

export interface Meal {
  id: string
  name: string
  foods: { food: Food; quantity: number }[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

export interface DayPlan {
  id: string
  date: Date
  meals: Meal[]
  targetCalories: number
  targetProtein: number
  targetCarbs: number
  targetFat: number
}
