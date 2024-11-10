import React from 'react'
import { motion } from 'framer-motion'
import { CONTACT_CONTENT } from '../constants'

export const Contacts = () => {
    return (
        <section className='min-h-screen flex flex-col justify-center px-4 md:px-10' id='contact'>
            <h2 className='text-4xl md:text-6xl font-medium tracking-tight mb-10'>
                Contact
            </h2>
            <div className='h-1 w-20 bg-white mb-8'></div>

            <motion.h3
                className='text-6xl md:text-8xl leading-none'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
                {CONTACT_CONTENT.headline}
            </motion.h3>

            <motion.p
                className='text-lg md:text-2xl mt-6 max-w-3xl'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
            >
                {CONTACT_CONTENT.description}
            </motion.p>

            <motion.a
                href={`mailto:${CONTACT_CONTENT.email}`}
                className='text-2xl md:text-3xl font-medium mt-8'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
            >
                {CONTACT_CONTENT.email}
            </motion.a>

            <div className='flex space-x-6 mt-8'>
                {CONTACT_CONTENT.socialLinks.map((link, index) => (
                    <motion.a 
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel='noopener noreferrer'
                        aria-label={link.ariaLabel}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 1.0 + index * 0.2 }}
                    >
                        <link.icon size={36} />
                    </motion.a>
                ))}
            </div>

            <motion.p 
                className='text-sm text-stone-400 mt-36'
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 1.6 }}
            >
                {CONTACT_CONTENT.footerText}
            </motion.p>
        </section>
    )
}
