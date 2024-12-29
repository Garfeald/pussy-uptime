import { ViewValidators } from "@features/view-validators/ViewValidators";
import Header from "@shared/ui/header/Header";
import cls from './App.module.scss';
import Footer from "@shared/ui/footer/Footer";
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
