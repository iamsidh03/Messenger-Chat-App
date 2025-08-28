import React, { useState, useRef } from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
  // State to store the position of the cursor for the parallax effect.
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to track if the mouse is hovering over the animation area.
  const [isHovered, setIsHovered] = useState(false);
  // A ref to get the dimensions of the container div.
  const containerRef = useRef(null);

  /**
   * This function is called whenever the mouse moves over the container.
   * It calculates the cursor's position relative to the center of the container
   * and updates the state.
   */
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    // Get the bounding box of the container element.
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate the cursor's position from the center of the container.
    // We divide by a number (e.g., 10) to create a subtle parallax effect,
    // so the circle doesn't move as much as the cursor.
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;

    setPosition({ x, y });
  };

  /**
   * When the mouse enters the container, we set isHovered to true.
   * This will stop the floating animation on the inner circle.
   */
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  /**
   * When the mouse leaves, we reset the position back to the center (0,0)
   * and set isHovered to false to resume the floating animation.
   */
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 p-12 h-full">
      <div className="max-w-md text-center">
        {/* The main animation container. We attach event listeners here. */}
        <div
          ref={containerRef}
          className="relative h-64 w-64 mx-auto mb-12 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Outer and Middle circles with faster animation durations */}
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-[float_4s_ease-in-out_infinite]" />
          <div className="absolute inset-8 rounded-full bg-primary/10 animate-[float_3.5s_ease-in-out_infinite_1s]" />

          {/* Inner Circle: This one is now interactive! */}
          <div
            className={`absolute inset-16 rounded-full bg-primary/20 transition-transform duration-300 ease-out ${
              // We conditionally apply the faster float animation. It's removed on hover.
              !isHovered ? 'animate-[float_3s_ease-in-out_infinite]' : ''
            }`}
            style={{
              // We apply a transform to move the circle based on the cursor's position.
              transform: `translateX(${position.x}px) translateY(${position.y}px)`,
            }}
          />
        </div>

        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/70 max-w-xs mx-auto">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
