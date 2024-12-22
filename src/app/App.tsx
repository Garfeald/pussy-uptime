import '../components/header/Header.module.scss'
import { ViewValidators } from "../components/view-validators/ViewValidators";
import Header from "../components/header/Header";
import cls from './App.module.scss'
import Footer from "../shared/ui/footer/Footer";
import theme from "@app/styles/theme";
import { ThemeProvider } from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className={cls.app}>
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
