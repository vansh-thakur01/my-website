import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const NavHeader = ()=>{
    useEffect(() => {
      gsap.to("#scroll-progress", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          scrub: true,
        },
      });


    return ()=>ScrollTrigger.getAll().forEach(section => section.kill());  
    }, []);

    return (
       <div className="relative">
            <div className="fixed grid grid-cols-[auto_1fr_auto_auto] h-20 w-dvw border-b-2 border-gray-400 z-20">
                <div className="w-20">2</div>
                <div className="bg-red-400">2</div>
                <div className="w-10">2</div>
                <div className="w-5">2</div>

            </div>
                <div
                id="scroll-progress"
                className="fixed top-19.5 w-0 bg-amber-50 z-20  border-t-2 border-gray-600 "
                ></div>
        </div> 
    );
}

export default NavHeader