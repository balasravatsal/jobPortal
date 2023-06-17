import {Outlet} from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import {BigSidebar, Navbar, SmallSidebar} from "../../components";

const SharedLayout = () => {

    const style = {
        width: 'auto',
        display: 'block'
    }
    return (
        <Wrapper>
            <main className={'dashboard'} >
                <SmallSidebar />
                <BigSidebar />
                <div>
                    <Navbar />
                    <div className={'dashboard'} style={style}>
                    {/*<div className={'dashboard'}>*/}
                        <Outlet />
                    </div>
                </div>
            </main>
        </Wrapper>
    );
};

export default SharedLayout;
