import main from '../assets/images/main.svg'
import Wrapper from "../assets/wrappers/LandingPage";
import {Logo} from "../components";
import {Link} from "react-router-dom";

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo/>
            </nav>
            <div className="container page">

                <div className="info">
                    <h1>Your <span>One Stop</span> for Jobs</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis delectus distinctio
                        ducimus esse ex impedit ipsam, ipsum labore magnam minima molestiae nemo quibusdam,
                        repellendus sint velit? Corporis ex minima optio.</p>
                    <Link to={'/register'} className={'btn btn-hero'}>Login/Register</Link>
                </div>
                <img src={main} alt="finding job" className={'img main-img'}/>
            </div>
        </Wrapper>);
};

export default Landing;