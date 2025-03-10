import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypingEffect = () => {
  const typedElement = useRef(null); // Create a ref for the span element

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Empowering Education with Transparency & Technology.",
        "A Paperless Future: Smart, Secure, and Transparent.",
        "Bridging Trust & Efficiency in College Management.",
        "Real-Time Data, Zero Paperwork, Absolute Trust.",
        "Efficiency Meets Sustainability: The Smart College System.",
      ],
      loop: true,
      typeSpeed: 80,
      backSpeed: 80,
      backDelay: 1000,
    });

    return () => {
      typed.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="text-2xl font-bold text-white ">
      <span ref={typedElement}></span> {/* Using ref instead of class selector */}
    </div>
  );
};

export default TypingEffect;
