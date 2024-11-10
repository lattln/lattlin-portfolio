import React, { useEffect, useState } from 'react'
import BlurBackground from './components/BlurBackground'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Experience from './components/Experience'
import { Contacts } from './components/Contacts'
import Cursor from './components/Cursor'

const App = () => {
    const [isDesktop, setIsDesktop] = useState(false)

    const updateMedia = () => {
        setIsDesktop(window.innerWidth >= 768)
    }

    useEffect(() => {
        updateMedia()
        window.addEventListener('resize', updateMedia)
        return () => window.removeEventListener('resize', updateMedia)
    }, [])

    return (
        <>
            <BlurBackground />
            <NavBar />
            {isDesktop && <Cursor />}
            <main className='antialiased overflow-x-hidden max-w-7xl mx-auto relative z-10'>
                <Hero />
                <Projects />
                <About />
                <Experience />
                <Contacts />
            </main>
        </>
    )
}

export default App
