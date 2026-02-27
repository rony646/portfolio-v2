import { ChevronDown } from "lucide-react";

type ScrollIndicatorProps = {
  className?: string;
};

export function ScrollIndicator({ className = "" }: ScrollIndicatorProps) {
  return (
    <div className={`pointer-events-none mt-8 flex justify-center md:mt-10 ${className}`}>
      <div className="flex animate-bounce flex-col items-center gap-2">
        <span className="text-xs tracking-widest text-gray-500 uppercase">Scroll for more</span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-teal-500/50 p-2">
          <div className="h-2 w-1 animate-scroll-down rounded-full bg-teal-500"></div>
        </div>
        <ChevronDown className="h-5 w-5 text-teal-500/70" />
      </div>
    </div>
  );
}
