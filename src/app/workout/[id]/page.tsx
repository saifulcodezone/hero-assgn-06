"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { usePlan } from "@context/PlanContext";
import { getWorkoutById } from "@utils/api";
import { Workout } from "@types";

export default function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="animate-pulse grid lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-[#111] rounded-2xl" />
          <div className="space-y-4">
            <div className="h-10 bg-[#111] rounded w-3/4" />
            <div className="h-4 bg-[#111] rounded w-full" />
            <div className="h-4 bg-[#111] rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Not Found</h1>
        <Link href="/" className="text-[#ccff00] hover:underline">
          ← Back to library
        </Link>
      </div>
    );
  }

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-[#111] border border-white/5">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">
            {workout.name}
          </h1>
          <p className="text-gray-400 mb-6">{workout.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {workout.muscleGroups.map((g) => (
              <span
                key={g}
                className="text-xs font-bold tracking-wider bg-[#ccff00] text-black px-3 py-1 rounded"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Specs */}
          <div className="bg-[#111] border border-white/5 rounded-xl p-5 mb-8">
            <dl className="divide-y divide-white/5">
              {[
                ["EQUIPMENT", workout.equipment],
                ["DIFFICULTY", workout.difficulty],
                ["SETS", workout.sets],
                ["REPS", workout.reps],
                ["DURATION", `${workout.duration} min`],
                ["CALORIES", `${workout.caloriesBurned} kcal`],
                ["RATING", workout.rating],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="flex justify-between py-2.5 text-sm"
                >
                  <dt className="text-gray-500 tracking-wider text-xs font-semibold">
                    {label}
                  </dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="font-display font-bold text-lg mb-3 tracking-wide">
              INSTRUCTIONS
            </h2>
            <ol className="space-y-2">
              {workout.instructions.map((step, i) => (
                <li key={i} className="text-sm text-gray-400 flex gap-3">
                  <span className="text-gray-600 font-mono">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull || isAlreadyInPlan}
              className="flex-1 bg-[#ccff00] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#b8e600] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isAlreadyInPlan
                ? "Already in Plan"
                : isPlanFull
                ? "Plan Full"
                : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              className="flex-1 border border-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/5 transition-colors"
            >
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}