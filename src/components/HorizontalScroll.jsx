import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import  {ScrollTrigger} from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
    const containerRef = useRef(null);
    const horizontalRef = useRef(null);

    useEffect(()=>{
        const totalScrollWidth = horizontalRef.current.scrollWidth - window.innerWidth;
        gsap.to(horizontalRef.current,{
            x:()=>-totalScrollWidth,
            ease:"none",
            scrollTrigger:{
                trigger:containerRef.current,
                start:"top top",
                end:()=> `+=${totalScrollWidth}`,
                scrub:1,
                pin:true,
                anticipatePin:1
            } 
        })

    return ()=>ScrollTrigger.getAll().forEach(section => section.kill());
    },[])

    useEffect(()=>{
        gsap.to("#scroll-progress", {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            scrub: true,
          },
        });
            
    },[])
    

    return (
      <div className="relative">
        <div ref={containerRef} className="h-screen relative">
          <div ref={horizontalRef} className="flex w-max">
            {["bg-red-200", "bg-blue-200", "bg-green-300", "bg-yellow-200"].map(
              (bg, index) => (
                <section
                  key={index}
                  className={`panel w-screen h-screen flex items-center justify-center text-black text-6xl ${bg}`}
                >
                  Page {index + 1}V A N S H
                </section>
              )
            )}
          </div>
        </div>
      </div>
    );
}

export default HorizontalScroll