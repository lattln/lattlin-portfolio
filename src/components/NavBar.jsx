import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LINKS } from '../constants'
import { RiCloseFill, RiMenu3Fill } from '@remixicon/react'

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLinkClick = () => {
        setMenuOpen(false)
    }

    return (
        <motion.nav
            className='fixed top-0 left-0 w-full z-40'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className='flex justify-between items-center max-w-6xl mx-auto md:my-2 bg-stone-950/30 p-4 md:rounded-xl backdrop-blur-lg'>
                <div className='text-white font-semibold text-lg uppercase'>
                    <a href='/'>Lin Latt</a>
                </div>  
                
                <div className='hidden md:flex space-x-8'>
                    {LINKS.map((link, index) => (
                        <a 
                            href={link.href} 
                            key={index} 
                            className='text-white hover:text-stone-400 transition duration-300'
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className='md:hidden'>
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)}
                        className='text-white focus:outline-none' 
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {menuOpen ? (
                            <RiCloseFill className='w-6 h-6' />
                        ) : (
                            <RiMenu3Fill className='w-6 h-6' />
                        )}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <motion.div
                    className='md:hidden p-4 bg-stone-950/30 backdrop-blur-lg rounded-xl flex flex-col space-y-4 max-w-6xl mx-auto'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    {LINKS.map((link, index) => (
                        <a
                            href={link.href}
                            key={index}
                            className='text-white hover:text-stone-400 transition duration-300'
                            onClick={handleLinkClick}
                        >
                            {link.label}
                        </a>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    )
}

export default NavBar
