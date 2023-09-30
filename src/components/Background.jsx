import React from 'react'
import '../App.css';
import blue_color from '../img/blue_color.mp4';
import red_color from '../img/artvideo2.mp4';
import giraffe from '../img/giraffe.jpg'

function Background() {
  return (
    <div className='back'>
        <video src={blue_color} autoPlay muted loop></video>
        <img src={giraffe} alt='Giraffe'></img>
    </div>
  )
}

export default Background