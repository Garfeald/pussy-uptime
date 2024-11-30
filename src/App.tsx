import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import pussy from '../public/large-purple-circle.23506e149e.png'
import './components/footer/Header.module.scss'
import { ViewValidators } from "./components/view-validators/ViewValidators";
import Header from "./components/footer/Header";
import cls from './App.module.scss'

function App() {
    return (
        <div className={cls.app}>
            <Header/>
            <ViewValidators/>
        </div>
    )
}

export default App
