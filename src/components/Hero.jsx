import React from 'react'
import { motion, spring } from 'framer-motion'
import { HERO_CONTENT } from '../constants'
import latt from "../assets/latt-root.webp"

const Hero = () => {
    return (
        <section>
            <div className='relative z-10 min-h-screen flex flex-wrap flex-col md:flex-row items-center justify-center text-white'>
                <motion.div 
                    className='w-full md:w-1/2 p-8'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.3 }}
                >
                    <motion.h1 
                        className='text-2xl md:text-3xl lg:text-5xl my-14'
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {HERO_CONTENT.greeting}
                    </motion.h1>

                    <motion.p
                        className='text-xl md:text-2xl lg:text-4xl mb-4'
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {HERO_CONTENT.introduction}
                    </motion.p>

                    <motion.p
                        className='text-xl md:text-2xl lg:text-4xl mb-4'
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {HERO_CONTENT.description}
                    </motion.p>

                    <motion.a
                        className='bg-stone-50 text-stone-900 p-3 lg:p-4 mt-8 inline-block rounded-2xl cursor-none'
                        href={HERO_CONTENT.resumeLink}
                        download
                        rel='noopener noreferrer'
                        target='_blank'
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring'}}
                        whileHover={{scale: 1.1}}
                    >
                        {HERO_CONTENT.resumeLinkText}
                    </motion.a>
                </motion.div>

                <motion.div
                    className='w-full md:w-1/2 p-8'
                    initial={{ clipPath: "inset(0 50% 0 50%)" }}
                    animate={{ clipPath: "inset(0 0% 0 0%)" }}
                    drag
                    dragConstraints={{ left: -50, right: 50, top: -100, bottom: 100 }}
                    whileDrag={{opacity: .5, scale: .9}}
                    whileHover={{scale: 1.05}}
                    transition={{ duration: 1.3, ease: "easeInOut", type:'spring'}}
                >
                    <img 
                        src={latt} alt='lin latt' width={650} height={650} className='rounded-3xl'
                        onDragStart={(e) => e.preventDefault()}/>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
