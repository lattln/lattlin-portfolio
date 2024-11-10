import React from 'react'
import { motion, spring } from 'framer-motion'
import { ABOUT_CONTENT } from '../constants'

const About = () => {
    return (
        <section className='px-6 py-10' id='about'>
            <motion.h2 
                className='text-4xl md:text-6xl font-medium tracking-tight mb-10'
                initial={{opacity: 0, x:-200}}
                whileInView={{opacity: 1, x:0}}
                viewport={{once: true}}
                transition={{duration: .5, type:'spring', damping: 18, stiffness: 400, delay: .3}}>
                    About
            </motion.h2>
            <div className='h-1 w-20 mb-8 bg-white'></div>

            <div className='max-w-4xl mx-auto'>
                {ABOUT_CONTENT.paragraphs.map((paragraph, index) => (
                    <motion.p 
                        key={index} 
                        className='text-xl md:text-2xl lg:text-4xl mb-10 leading-relaxed' 
                        initial='hidden' 
                        whileInView='visible'
                        viewport={{ once: true, amount: 0.5 }}
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 150,
                            },
                            visible: {
                                opacity: 1.3,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                    ease: 'easeOut'
                                }
                            }
                        }}
                    >
                        {paragraph}
                    </motion.p>
                ))}
            </div>
        </section>
    )
}

export default About
