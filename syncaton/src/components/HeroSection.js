import React from 'react'
import '../App.css';
import { Button } from './Button'
import './HeroSection.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import RoundButton from './RoundButton';


function HeroSection() {

    return (
        <div className = 'hero-container'>
            <img src="/image/mainbg.jpg"alt="Background"/>
            <br></br>
            {/* <div className="hero-btns">
                <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large' to="/main">GET STARTED</Button>
                <Button className = 'btns' buttonStyle = 'btn--primary' 
                buttonSize = 'btn--large'>WATCH TRAILER<i className = 'far fa-play-circle'/></Button>
            </div> */}

            <br></br><br></br><br></br><br></br>

            <div className="hero-btns">
                <RoundButton className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large' to="/main">내 소비캐릭터 확인하기</RoundButton>
            </div>

            
            {/* <Link to="/your-route">
            <img src="./buttonimg.png" alt="Button"
            style={{ width: `50px`, height: '20px' }}/>
            </Link> */}
            
        </div>
    )
}

export default HeroSection