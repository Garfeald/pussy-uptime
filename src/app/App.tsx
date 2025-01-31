import { ViewValidators } from "@features/view-validators/ViewValidators";
import Header from "@shared/ui/header/Header";
import cls from './App.module.scss';
import Footer from "@shared/ui/footer/Footer";
import theme from "@app/styles/theme";
import { ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

function App() {

    const [windowHeight, setWindowHeight] = useState<string>('95vh')

    useEffect(() => {
        if (window.outerHeight && window.innerWidth <= 450) {
            setWindowHeight(`${window.outerHeight}px`)
        }
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div className={cls.app} style={{minHeight: `${windowHeight}`}}>
                <div className={cls.stars}></div>
                <div className={cls.stars1}></div>
                <div className={cls.stars2}></div>
                <div>
                    <Header/>
                    <ViewValidators/>
                </div>
                <Footer/>
            </div>
        </ThemeProvider>
    )
}

export default App
