import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-32 text-center">
      <p className="font-display text-8xl font-bold text-[#ccff00] mb-4">404</p>
      <h1 className="font-display text-3xl font-bold mb-3">Page Not Found</h1>
      <p className="text-gray-500 mb-8">
        That page doesn't exist. Maybe you skipped leg day?
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ccff00] text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#b8e600] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}