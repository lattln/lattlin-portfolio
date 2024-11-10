import { motion } from 'framer-motion'
import React from 'react'

const BlurBackground = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full overflow-hidden -z-10 
        pointer-events-none flex justify-center items-center filter blur-[150px] 
        opacity-70'>
            <motion.div 
                className="bg-green-50 w-[350px] h-[250px] rounded-full absolute"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            /> 

            <motion.div 
                className="bg-white w-[360px] h-[260px] rounded-full absolute"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 120, 0],
                    y: [0, -60, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            /> 

            <motion.div 
                className="bg-green-500 w-[370px] h-[260px] rounded-full absolute"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 140, 0],
                    y: [0, 70, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            /> 

            <motion.div 
                className="bg-purple-500 w-[380px] h-[260px] rounded-full absolute"
                animate={{
                    scale: [1, 1.4, 1],
                    x: [0, 160, 0],
                    y: [0, -80, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            /> 

            <motion.div 
                className="bg-emerald-300 w-[390px] h-[260px] rounded-full absolute"
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, 180, 0],
                    y: [0, 90, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            /> 

            <motion.div 
                className="bg-gray-500 w-[400px] h-[260px] rounded-full absolute"
                animate={{
                    scale: [1, 1.6, 1],
                    x: [0, 280, 0],
                    y: [0, -100, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            /> 
        </div>
    )
}

export default BlurBackground
