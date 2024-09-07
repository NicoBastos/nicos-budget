import React, { useState } from "react";
import { cn } from "@/src/utils/utils";

interface CardProps {
    children: React.JSX.Element[] | React.JSX.Element;
    isVertical?: boolean; // Whether the layout is vertical or horizontal
    childContainerClassName?: string; // Optional prop for custom child container styling
}

const Card: React.FC<CardProps> = ({
    children,
    isVertical = false,
    childContainerClassName = "",
}) => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Handle focusing by clicking directly on the child
    const handleChildClick = (index: number) => {
        setFocusedIndex(index);
    };

    const childContainerBaseStyles =
        "transition-all duration-300 ease-in-out overflow-hidden";

    const focusStyles = (i: number) => {
        // Calculate flex size based on focus state
        if (focusedIndex === i) {
            return "flex-[3]"; // Focused section is large
        } else {
            return focusedIndex === null ? "flex-[1]" : "flex-[0.5]"; // Default size or reduced size when something else is focused
        }
    };

    const verticalStyles = isVertical ? "w-full" : "h-full";

    return (
        <div
            className={`flex w-full h-full ${isVertical ? "flex-col" : "flex-row"}`}
        >
            {React.Children.map(children, (child, index) => (
                <div
                    className={cn(
                        childContainerBaseStyles,
                        focusStyles(index),
                        verticalStyles,
                        childContainerClassName,
                    )}
                    onClick={() => handleChildClick(index)} // Handle focus manually on click
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default Card;
