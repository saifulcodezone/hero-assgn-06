import { Workout } from "@types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch workouts");
  const data = await res.json();
  return data;
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch workout");
  const data = await res.json();
  return data;
}