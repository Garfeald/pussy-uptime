import './components/header/Header.module.scss'
import { ViewValidators } from "./components/view-validators/ViewValidators";
import Header from "./components/header/Header";
import cls from './App.module.scss'
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div className={cls.app}>
            <div>
                <Header/>
                <ViewValidators/>
            </div>

            <Footer/>
        </div>
    )
}

export default App
