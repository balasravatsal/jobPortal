import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Dashboard, Error, Landing, Register} from "./pages";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
    return (
        <>
            <BrowserRouter>

                <Routes>
                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/landing'} element={<Landing/>}/>
                    <Route path={'*'} element={<Error/>}/>
                </Routes>
                <ToastContainer position={'top-center'}/>
            </BrowserRouter>
        </>
    );
}

export default App;