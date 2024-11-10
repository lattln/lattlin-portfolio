import React from 'react'
import BlurBackground from './components/BlurBackground'
import NavBar from './components/NavBar'
import Hero from './components/Hero'


const App = () => {
    return (
        <>
            <BlurBackground />
            <NavBar />
            <main className='antialiased overflow-x-hidden max-w-7xl mx-auto relative z-10'>
                <NavBar />
                <Hero />
            </main>
        </>
            

    )
}

export default App
