import { ChevronRight } from "lucide-react";

interface CustomNextArrowProps {
  onClick?: VoidFunction;
}

export default function CustomNextArrow(props: CustomNextArrowProps) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-24 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-teal-500/30 bg-gradient-to-br from-teal-600/80 to-cyan-700/80 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:from-teal-600 hover:to-cyan-700 sm:top-1/2 sm:right-4 sm:h-12 sm:w-12 sm:-translate-y-1/2"
    >
      <ChevronRight className="h-5 w-5 text-white sm:h-6 sm:w-6" />
    </button>
  );
}
