import React, { useRef } from "react";

interface FocusedProps {
    children: React.JSX.Element[] | React.JSX.Element;
    onFocusChange: (isFocused: boolean) => void; // Callback to notify parent
}

const Focused: React.FC<FocusedProps> = ({ children, onFocusChange }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleClick = () => {
        onFocusChange(true); // Trigger focus on click
    };

    return (
        <div
            ref={containerRef}
            onMouseDown={handleClick} // Trigger focus on mousedown (click)
            className="w-full h-full"
        >
            {children}
        </div>
    );
};

export default Focused;
