"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

type LoaderProps = {
  time: number;
};

export default function Loader({ time } : LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const increment = 100 / (time * 10); // Calculate increment based on time
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + increment;
      });
    }, 100); // Update progress every 100ms

    return () => clearInterval(interval);
  }, [time]);



  return (
    <div className="loader">
      <Progress value={progress} className="w-[60%]" />
    </div>
  );
}
