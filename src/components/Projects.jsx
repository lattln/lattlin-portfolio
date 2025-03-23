import React from 'react'
import { motion, spring } from 'framer-motion'
import { PROJECTS } from '../constants'

const Projects = () => {
    return (
        <section className='px-6 py-10' id='work'>
            <motion.h2 
                className='text-4xl md:text-6xl font-medium tracking-tight mb-10'
                initial={{opacity: 0, x:-200}}
                whileInView={{opacity: 1, x:0}}
                viewport={{once: true}}
                transition={{duration: .5, type:'spring', damping: 18, stiffness: 400, delay: .3}}>
                    Work
            </motion.h2>
            
            <div className='h-1 w-20 mb-8 bg-white'></div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {PROJECTS.map((project, index) => (
                    <motion.div
                        key={index}
                        className='relative rounded-lg overflow-hidden h-[500px] transition transform will-change-transform will-change-opacity'
                        initial={{ opacity: 0, x: 200, y: 30, rotate: 10}}
                        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0}}
                        transition={{ duration: 0.05, delay: .2 + index * 0.1, type: 'spring'}}
                        viewport={{ once: true }}
                    >
                        <div className='absolute inset-0 w-full h-full object-cover transition-opacity duration-300 bg-stone-950'></div>
                            
                        

                        <div className='relative z-20 p-6 flex flex-col justify-between h-full bg-black/30 text-white'>
                            <h2 className='text-2xl font-medium mb-4'>{project.name}</h2>

                            <div className='flex flex-col justify-between'>
                                <p className='mb-4 flex-grow text-2xl'>{project.description}</p>
                                <motion.a 
                                    href={project.link} 
                                    whileHover={{scale: 1.1}}
                                    onTap={{scale: .9}}
                                    target='_blank' 
                                    rel='noopener noreferrer' 
                                    className='bg-white text-stone-900 rounded-full py-2 px-2 w-32 text-sm hover:bg-gray-100 text-center cursor-none'
                                >
                                    View on Github
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Projects
