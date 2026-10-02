"use client";

import { useState, useEffect } from "react";
import { Workout } from "@types";
import { getAllWorkouts } from "@utils/api";
import WorkoutCard from "./WorkoutCard";

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold">THE LIBRARY</h2>
        <p className="text-gray-500 text-sm mt-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/5 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-[#1a1a1a]" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-[#1a1a1a] rounded w-16" />
                <div className="h-4 bg-[#1a1a1a] rounded w-3/4" />
                <div className="h-3 bg-[#1a1a1a] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {workouts.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}