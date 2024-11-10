import React from 'react'
import { motion } from 'framer-motion'
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
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {HERO_CONTENT.greeting}
                    </motion.h1>

                    <motion.p
                        className='text-xl md:text-2xl lg:text-4xl mb-4'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {HERO_CONTENT.introduction}
                    </motion.p>

                    <motion.p
                        className='text-xl md:text-2xl lg:text-4xl mb-4'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {HERO_CONTENT.description}
                    </motion.p>

                    <motion.a
                        className='bg-stone-50 text-stone-900 p-3 lg:p-4 mt-8 inline-block rounded-2xl'
                        href={HERO_CONTENT.resumeLink}
                        download
                        rel='noopener noreferrer'
                        target='_blank'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {HERO_CONTENT.resumeLinkText}
                    </motion.a>
                </motion.div>

                <motion.div
                    className='w-full md:w-1/2 p-8'
                    initial={{ clipPath: "inset(0 50% 0 50%)" }}
                    animate={{ clipPath: "inset(0 0% 0 0%)" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                >
                    <img src={latt} alt='lin latt' width={650} height={650} className='rounded-3xl' />
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
