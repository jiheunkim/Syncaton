import React from 'react'
import '../App.css';
import { Button } from './Button'
import './HeroSection.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';


function HeroSection() {

    return (
        <div className = 'hero-container'>
            <img src="/image/mainbg.jpg"/>
            <br></br>
            {/* <div className="hero-btns">
                <Button className='btns' buttonStyle='btn--outline'
                buttonSize='btn--large' to="/main">GET STARTED</Button>
                <Button className = 'btns' buttonStyle = 'btn--primary' 
                buttonSize = 'btn--large'>WATCH TRAILER<i className = 'far fa-play-circle'/></Button>
            </div> */}
        </div>
    )
}

export default HeroSection