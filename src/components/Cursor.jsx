import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Define the size of the cursor
    const cursorSize = 30; // Adjust according to your cursor size

    useEffect(() => {
        const handleMouseMove = (e) => {

            setPosition({ x: e.clientX - cursorSize / 2, y: e.clientY - cursorSize / 2 });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-5 h-5 rounded-full border-2 border-white pointer-events-none z-50"
            style={{
                width: `${cursorSize}px`,
                height: `${cursorSize}px`,
            }}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{
                duration: 0, // Instant response for real-time tracking
            }}
        />
    );
};

export default CustomCursor;
