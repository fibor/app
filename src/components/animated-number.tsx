"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 2,
  duration = 600,
  className = "",
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = value;

    if (from === to) return;

    const start = performance.now();
    const diff = to - from;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + diff * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(to);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export function AnimatedUSDC({
  value,
  compact = false,
  className = "",
  duration = 600,
}: {
  value: bigint | undefined;
  compact?: boolean;
  className?: string;
  duration?: number;
}) {
  const dollars = value ? Number(value) / 1e6 : 0;

  if (compact) {
    return <AnimatedCompactUSDC dollars={dollars} className={className} duration={duration} />;
  }

  return (
    <AnimatedNumber
      value={dollars}
      prefix="$"
      decimals={2}
      duration={duration}
      className={className}
    />
  );
}

function AnimatedCompactUSDC({
  dollars,
  className,
  duration = 600,
}: {
  dollars: number;
  className?: string;
  duration?: number;
}) {
  if (dollars >= 1_000_000) {
    return (
      <AnimatedNumber
        value={dollars / 1_000_000}
        prefix="$"
        suffix="M"
        decimals={1}
        duration={duration}
        className={className}
      />
    );
  }
  if (dollars >= 1_000) {
    return (
      <AnimatedNumber
        value={dollars / 1_000}
        prefix="$"
        suffix="K"
        decimals={0}
        duration={duration}
        className={className}
      />
    );
  }
  return (
    <AnimatedNumber
      value={dollars}
      prefix="$"
      decimals={0}
      duration={duration}
      className={className}
    />
  );
}
