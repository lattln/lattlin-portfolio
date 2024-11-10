import React from 'react'
import BlurBackground from './components/BlurBackground'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Experience from './components/Experience'
import { Contacts } from './components/Contacts'
import Cursor from './components/Cursor'


const App = () => {
    return (
        <>
            <BlurBackground />
            <NavBar />
            <Cursor />
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
