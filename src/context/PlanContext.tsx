"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { Workout, PlanWorkout } from "@types";

interface PlanContextType {
  plan: PlanWorkout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  metrics: {
    exercises: number;
    minutes: number;
    calories: number;
  };
}

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  //  Load from localStorage on mount 
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (err) {
      console.error("Failed to load from localStorage", err);
    }
    setIsHydrated(true);
  }, []);

  //  Persist plan
  useEffect(() => {
    if (!isHydrated) return; // avoid overwriting with [] 
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, isHydrated]);

  //  Persist saved
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, isHydrated]);

  //  Add to Plan
  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      toast.error("Plan is full! Max 5 workouts.");
      return;
    }
    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in your plan!");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, isDone: false }]);
    toast.success("Added to today's plan! 💪");
  };

  //  Add to Saved
  const addToSaved = (workout: Workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved!");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success(`${workout.name} saved for later!`);
  };

  //  Remove from Plan
  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from plan");
  };

  //  Remove from Saved
  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved");
  };

  //  Mark as Done
  const markAsDone = (id: number) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: true } : item
      )
    );
    toast.success("Workout done! Great job! 🎉");
  };

  // Metrics — derived, NOT state
  const metrics = {
    exercises: plan.length,
    minutes: plan.reduce((sum, w) => sum + w.duration, 0),
    calories: plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        metrics,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

//Custom hook
export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside PlanProvider");
  return ctx;
}