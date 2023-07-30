import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>High IQ - This role requires someone in the top 1% with respect to raw intelligence.
                        The problems you need to solve on a daily basis are extremely challenging becuase they are
                        real and have tangible impact to our business.
                    </p>
                    <Link to='/register' className='btn register-link'>
                        Register
                    </Link>
                    <Link to='/login' className='btn register-link'>
                        Login/Demo User
                    </Link>
                </div>
                <img src={main} alt='job hunt' className='img main-img'></img>
            </div>
        </Wrapper>
    )
}



export default Landing