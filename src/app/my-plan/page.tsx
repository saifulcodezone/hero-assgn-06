"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@context/PlanContext";

type Tab = "plan" | "saved";
type SortBy = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone, metrics } =
    usePlan();
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold">MY PLAN</h1>
        <p className="text-gray-500 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Exercises", value: metrics.exercises },
          { label: "Minutes", value: metrics.minutes },
          { label: "Calories", value: metrics.calories },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-[#111] border border-white/5 rounded-xl p-5"
          >
            <p className="text-xs text-gray-500 tracking-wider mb-1">
              {m.label}
            </p>
            <p className="font-display text-3xl font-bold text-[#ccff00]">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-1 bg-[#111] border border-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black font-semibold"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="bg-[#111] border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ccff00]/50"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* List or Empty State */}
      {sortedList.length === 0 ? (
        <div className="bg-[#0d0d0d] border border-dashed border-white/10 rounded-2xl py-20 text-center">
          <h3 className="font-display text-2xl font-bold mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#b8e600] transition-colors"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedList.map((item) => (
            <div
              key={item.id}
              className="bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-24 h-24 sm:h-16 object-cover rounded-lg"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-base truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{item.equipment}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>⏱ {item.duration} min</span>
                  <span>🔥 {item.caloriesBurned} kcal</span>
                  <span>⭐ {item.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/workout/${item.id}`}
                  className="border border-white/10 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  View Details
                </Link>

                {activeTab === "plan" && (
                  <button
                    onClick={() => markAsDone(item.id)}
                    className="bg-[#ccff00] text-black text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#b8e600] transition-colors"
                  >
                    ✓ Mark as Done
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "plan"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="text-gray-500 hover:text-red-400 text-lg px-2 transition-colors"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}