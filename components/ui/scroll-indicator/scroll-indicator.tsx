import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll for more</span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-teal-500/50 p-2">
          <div className="animate-scroll-down h-2 w-1 rounded-full bg-teal-500"></div>
        </div>
        <ChevronDown className="h-5 w-5 text-teal-500/70" />
      </div>
    </div>
  );
}
