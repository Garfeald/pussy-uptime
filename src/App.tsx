import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pussy from '../public/large-purple-circle.23506e149e.png'
import './App.css'
import { ViewValidators } from "./components/view-validators/ViewValidators";

function App() {
    return (
        <>
            <div>
                {/*rgb(246, 43, 253)*/}
                <div>
                    <h1 style={{ color: 'rgb(246, 43, 253)' }}>Space-pussy</h1>
                </div>
                <img src={pussy} className="logo" alt="Vite logo"/>
            </div>
            <ViewValidators/>
        </>
    )
}

export default App
