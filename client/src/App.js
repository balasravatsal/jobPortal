import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Error, Landing, ProtectedRoute, Register} from "./pages";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {AddJob, AllJobs, Profile, SharedLayout, Stats} from "./pages/Dashboad";
import {useSelector} from "react-redux";

const App = () => {
    const {user} = useSelector(store => store.user)
    // console.log(user)
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={
                        <ProtectedRoute>
                            <SharedLayout/>
                        </ProtectedRoute>
                    }>
                        <Route index element={<Stats/>}/>
                        <Route path={'all-jobs'} element={<AllJobs/>}/>
                        { user && user.role === 'employer' && <Route path={'add-job'} element={<AddJob/>}/> }
                        <Route path={'profile'} element={<Profile/>}/>
                    </Route>
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
