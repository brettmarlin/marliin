import { useState, useEffect, useRef } from "react";

export default function RotatingWord({ words = [], style = {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("enter");
  const timeoutRef = useRef(null);
  const mounted = useRef(false);

  const timing = { hold: 2400, transition: 600 };
  const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

  // Animate first word in on mount
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setPhase("active");
        mounted.current = true;
      });
    });
  }, []);

  // Cycle through words
  useEffect(() => {
    if (words.length < 2) return;
    if (!mounted.current) return;

    const cycle = () => {
      setPhase("exit");
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % words.length);
        setPhase("enter");
        timeoutRef.current = setTimeout(() => {
          setPhase("active");
          timeoutRef.current = setTimeout(cycle, timing.hold);
        }, 30);
      }, timing.transition);
    };

    timeoutRef.current = setTimeout(cycle, timing.hold);
    return () => clearTimeout(timeoutRef.current);
  }, [words.length, mounted.current]);

  const phases = {
    enter: { transform: "translateX(120px)", opacity: 0, filter: "blur(20px)" },
    active: { transform: "translateX(0px)", opacity: 1, filter: "blur(0px)" },
    exit: { transform: "translateX(-120px)", opacity: 0, filter: "blur(20px)" },
  };

  return (
    <span
      style={{
        display: "inline-block",
        transition: `all ${timing.transition}ms ${easing}`,
        willChange: "transform, opacity, filter",
        ...phases[phase],
        ...style,
      }}
    >
      {words[currentIndex] || "Experience"}
    </span>
  );
}