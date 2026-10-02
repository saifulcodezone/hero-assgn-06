import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/anchor-icon.png"
            alt="FitLog logo"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="font-display font-bold tracking-wide">FITLOG</span>
        </div>
        <p className="text-xs text-gray-600">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}