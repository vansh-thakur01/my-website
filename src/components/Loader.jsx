import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HorizontalScroll from "./HorizontalScroll";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lineRef = useRef(null);
  const stripesRef = useRef([]);
  const stripeCount = 20;
  const stripeWidth = 100 / stripeCount;

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => setIsLoaded(true),
    });

    // Get the actual length of the path for dynamic stroke animation
    const pathLength = lineRef.current.getTotalLength();

    // STEP 1: Draw the line slowly
    tl.fromTo(
      lineRef.current,
      {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      },
      {
        strokeDashoffset: 0,
        duration: 1.5, // slowed down
        ease: "power2.out",
      }
    );

    // STEP 2: Erase the line
    tl.to(
      lineRef.current,
      {
        strokeDashoffset: pathLength,
        duration: 1,
        ease: "power2.in",
      },
      "+=0.1"
    );

    // STEP 3: Stripe wave
    tl.to(
      stripesRef.current,
      {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.inOut",
        transformOrigin: "right",
        stagger: {
          each: 0.05,
          from: "start",
        },
      },
      "+=0.2"
    );
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* LOADER */}
      {!isLoaded && (
        <div className="fixed  inset-0 z-50 bg-black pointer-events-none overflow-hidden">
          {/* Curvy SVG Line */}
          <svg
            width="300"
            height="100"
            viewBox="0 0 300 100"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={lineRef}
              d="
                M10,50 
                Q70,20 50,75 
                T200,50 
                Q260,80 70,50"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Stripes */}
          {[...Array(stripeCount)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (stripesRef.current[i] = el)}
              className="absolute top-0 h-screen z-40"
              style={{
                left: `${i * stripeWidth}%`,
                width: `${stripeWidth}%`,
                backgroundColor: `hsl(${i * 18}, 70%, 45%)`,
              }}
            />
          ))}
        </div>
      )}

      {/* MAIN PAGE */}
      <HorizontalScroll />
    </div>
  );
}
