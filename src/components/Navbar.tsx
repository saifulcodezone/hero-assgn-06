"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const linkClass = (href: string) =>
    `text-sm transition-colors ${
      pathname === href
        ? "text-[#ccff00] font-medium"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo — anchor icon + FITLOG */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/anchor-icon.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
          />
          <span className="font-display font-bold text-lg tracking-wide">
            FITLOG
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden sm:flex items-center gap-8">
          <Link href="/" className={linkClass("/")}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass("/my-plan")}>
            My Plan
          </Link>
        </div>

        {/* Badges */}
        <Link href="/my-plan" className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-gray-400">
            Plan
            <span className="bg-[#ccff00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {plan.length}
            </span>
          </span>
          <span className="hidden sm:flex items-center gap-2 text-gray-400">
            Saved
            <span className="border border-white/20 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {saved.length}
            </span>
          </span>
        </Link>
      </div>
    </nav>
  );
}