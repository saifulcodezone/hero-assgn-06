import Link from "next/link";
import { Workout } from "@types";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-[#ccff00]/40 transition-all duration-200"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden bg-[#1a1a1a]">
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {workout.muscleGroups.map((g) => (
            <span
              key={g}
              className="text-[10px] font-bold tracking-wider bg-[#ccff00] text-black px-2 py-0.5 rounded"
            >
              {g.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-base mb-1 group-hover:text-[#ccff00] transition-colors">
          {workout.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4">{workout.equipment}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">⏱ {workout.duration} min</span>
          <span className="flex items-center gap-1">🔥 {workout.caloriesBurned} kcal</span>
          <span className="flex items-center gap-1">⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}