import React from 'react'
import { motion } from 'framer-motion'
import { EXPERIENCES } from '../constants'

const Experience = () => {
    return (
        <section className='px-6 py-10' id='experience'> 
            <motion.h2 
                className='text-4xl md:text-6xl font-medium tracking-tight mb-10'
                initial={{opacity: 0, x:-200}}
                whileInView={{opacity: 1, x:0}}
                viewport={{once: true}}
                transition={{duration: .5, type:'spring', damping: 18, stiffness: 400, delay: .3}}>
                    Work Experience
            </motion.h2>

            <div className='h-1 w-20 mb-8 bg-white'></div>

            <motion.div
                className='space-y-10'
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.3 }}
            >
                {EXPERIENCES.map((experience, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className='flex flex-col md:flex-row md:justify-between'>
                            <div className='text-sm md:w-1/4 mb-2 md:mb-8 p-4'>
                                {experience.yearRange}
                            </div>

                            <div className='md:w-3/4 mb-10'>
                                <div className='max-w-3xl backdrop-blur-3xl p-4 bg-stone-600/10 rounded-lg'>
                                    <h2 className='text-xl mb-2'>{experience.title}</h2>
                                    <p className='mb-4 text-sm italic'>{experience.location}</p>
                                    <ul className='list-disc list-inside space-y-2'>
                                        {experience.description.map((desc, index) => (
                                            <li key={index}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default Experience
