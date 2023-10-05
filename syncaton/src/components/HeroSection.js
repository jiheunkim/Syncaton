import React from 'react'
import '../App.css';
import { Button } from './Button'
import './HeroSection.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';


function HeroSection() {

    return (
        <div className = 'hero-container'>
            <img src="/image/main-bg.png"/>
            {/* <video src="/videos/twinkle.mp4" autoPlay loop muted /> */}
            <h1>Syncaton</h1>
            <p style={{ fontSize: '14px' }}>시대의 흐름에 따른 초개인화 서비스</p>
            <p>금융소비자 테스트</p>

            <br></br>
            <div className="hero-btns">
                <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large' to="/main">GET STARTED</Button>
                <Button className = 'btns' buttonStyle = 'btn--primary' 
                buttonSize = 'btn--large'>WATCH TRAILER<i className = 'far fa-play-circle'/></Button>
            </div>
               
        </div>
    )
}

export default HeroSection