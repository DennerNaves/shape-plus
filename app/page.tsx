"use client"

import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { HomeScreen } from "@/components/screens/home-screen"
import { WorkoutListScreen } from "@/components/screens/workout-list-screen"
import { CreateWorkoutScreen } from "@/components/screens/create-workout-screen"
import { ActiveWorkoutScreen } from "@/components/screens/active-workout-screen"
import { NutritionDashboardScreen } from "@/components/screens/nutrition-dashboard-screen"
import type { Workout, Exercise, DayPlan } from "@/types/gym"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<"home" | "training" | "nutrition">("home")

  // Training state
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>("gym-app-workouts", [
    {
      id: "1",
      name: "Treino de Peito e Tríceps",
      description: "Foco em desenvolvimento do peitoral e tríceps",
      exercises: [
        { id: "1", name: "Supino Reto", muscleGroup: "Peito", sets: 4, reps: 12, weight: 80, completed: false },
        { id: "2", name: "Supino Inclinado", muscleGroup: "Peito", sets: 3, reps: 10, weight: 70, completed: false },
        { id: "3", name: "Tríceps Pulley", muscleGroup: "Tríceps", sets: 3, reps: 15, weight: 40, completed: false },
      ],
      completed: false,
      createdAt: new Date(),
    },
  ])

  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null)
  const [trainingView, setTrainingView] = useState<"list" | "create" | "workout">("list")
  const [newWorkout, setNewWorkout] = useState<Partial<Workout>>({ name: "", description: "", exercises: [] })

  // Nutrition state
  const [dayPlans, setDayPlans] = useLocalStorage<DayPlan[]>("gym-app-nutrition", [
    {
      id: "1",
      date: new Date(),
      meals: [
        {
          id: "1",
          name: "Café da Manhã",
          foods: [
            {
              food: { id: "1", name: "Aveia", calories: 150, protein: 5, carbs: 27, fat: 3, serving: "50g" },
              quantity: 1,
            },
            {
              food: { id: "2", name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0, serving: "1 unidade" },
              quantity: 1,
            },
          ],
          totalCalories: 255,
          totalProtein: 6,
          totalCarbs: 54,
          totalFat: 3,
        },
      ],
      targetCalories: 2000,
      targetProtein: 150,
      targetCarbs: 250,
      targetFat: 67,
    },
  ])

  const [nutritionView, setNutritionView] = useState<"dashboard" | "plan" | "foods">("dashboard")
  const [selectedDate, setSelectedDate] = useState(new Date())

  const muscleGroups = ["Peito", "Costas", "Ombros", "Bíceps", "Tríceps", "Pernas", "Abdômen", "Glúteos"]

  // Training functions
  const createWorkout = () => {
    if (newWorkout.name && newWorkout.exercises && newWorkout.exercises.length > 0) {
      const workout: Workout = {
        id: Date.now().toString(),
        name: newWorkout.name,
        description: newWorkout.description || "",
        exercises: newWorkout.exercises,
        completed: false,
        createdAt: new Date(),
      }
      setWorkouts([...workouts, workout])
      setNewWorkout({ name: "", description: "", exercises: [] })
      setTrainingView("list")
    }
  }

  const addExerciseToNewWorkout = (exercise: Exercise) => {
    setNewWorkout((prev) => ({
      ...prev,
      exercises: [...(prev.exercises || []), exercise],
    }))
  }

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout)
    setTrainingView("workout")
  }

  const toggleExerciseComplete = (exerciseId: string) => {
    if (!activeWorkout) return

    const updatedExercises = activeWorkout.exercises.map((ex) =>
      ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex,
    )

    const updatedWorkout = { ...activeWorkout, exercises: updatedExercises }
    setActiveWorkout(updatedWorkout)
    setWorkouts((prev) => prev.map((w) => (w.id === activeWorkout.id ? updatedWorkout : w)))
  }

  const completeWorkout = () => {
    if (!activeWorkout) return

    const completedWorkout = { ...activeWorkout, completed: true }
    setWorkouts((prev) => prev.map((w) => (w.id === activeWorkout.id ? completedWorkout : w)))
    setActiveWorkout(null)
    setTrainingView("list")
  }

  // Nutrition functions
  const getCurrentDayPlan = () => {
    return (
      dayPlans.find((plan) => plan.date.toDateString() === selectedDate.toDateString()) || {
        id: Date.now().toString(),
        date: selectedDate,
        meals: [],
        targetCalories: 2000,
        targetProtein: 150,
        targetCarbs: 250,
        targetFat: 67,
      }
    )
  }

  // Navigation logic
  if (activeSection === "training") {
    if (trainingView === "create") {
      return (
        <CreateWorkoutScreen
          newWorkout={newWorkout}
          setNewWorkout={setNewWorkout}
          muscleGroups={muscleGroups}
          addExerciseToNewWorkout={addExerciseToNewWorkout}
          createWorkout={createWorkout}
          onBack={() => setTrainingView("list")}
        />
      )
    }

    if (trainingView === "workout" && activeWorkout) {
      return (
        <ActiveWorkoutScreen
          workout={activeWorkout}
          toggleExerciseComplete={toggleExerciseComplete}
          completeWorkout={completeWorkout}
          onBack={() => setTrainingView("list")}
        />
      )
    }

    return (
      <WorkoutListScreen
        workouts={workouts}
        onBack={() => setActiveSection("home")}
        onCreateWorkout={() => setTrainingView("create")}
        onStartWorkout={startWorkout}
      />
    )
  }

  if (activeSection === "nutrition") {
    return (
      <NutritionDashboardScreen
        currentPlan={getCurrentDayPlan()}
        selectedDate={selectedDate}
        onBack={() => setActiveSection("home")}
        onCreateMealPlan={() => setNutritionView("plan")}
        onViewFoods={() => setNutritionView("foods")}
      />
    )
  }

  return <HomeScreen onNavigate={setActiveSection} />
}
