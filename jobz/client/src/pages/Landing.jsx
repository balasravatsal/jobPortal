import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'

const Landing = () => {
    return (
        <>
            <main>
                <nav>
                    <img src={logo} alt={'jobz'}/>
                </nav>
                <div className="container page">

                    <div className="info">
                        <h1>Your <span>One Stop</span> for Jobs</h1>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis delectus distinctio
                            ducimus esse ex impedit ipsam, ipsum labore magnam minima molestiae nemo quibusdam,
                            repellendus sint velit? Corporis ex minima optio.</p>

                        <button className="btn btn-hero">Login/Register</button>
                    </div>
                    <img src={main} alt="finding job" className={'img main-img'}/>
                </div>
            </main>
        </>
    );
};

export default Landing;