import React from 'react'
import ha1 from './img/ha1.png';
import "./Auth.css";
import Signin from '../../Components/Rester/Signin';
import { useLocation } from 'react-router-dom';
import Signup from '../../Components/Rester/Signup';

const Auth = () => {

  const location = useLocation();
  return (
    <div>
        <div className='flex w-[95%] items-center justify-center'>
          
            <div className='relative hidden lg:block'>
                <div className='h-[35.3rem] w-[45rem]'>
                    <img className='h-full w-full' 
                    src={ha1} alt="" />
                </div>
            </div>

           <div className='w-[40vw] lg:w-[25vw]'>
           {location.pathname === "/login"? <Signin/> : <Signup/>}
        </div>
        </div>

     
    </div>
  )
}

export default Auth