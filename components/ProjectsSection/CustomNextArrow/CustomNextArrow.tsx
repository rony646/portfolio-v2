import { ChevronRight } from "lucide-react";

interface CustomNextArrowProps {
  onClick?: VoidFunction;
}

export default function CustomNextArrow(props: CustomNextArrowProps) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-teal-500/30 bg-gradient-to-br from-teal-600/80 to-cyan-700/80 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:from-teal-600 hover:to-cyan-700"
    >
      <ChevronRight className="h-6 w-6 text-white" />
    </button>
  );
}
