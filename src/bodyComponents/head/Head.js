import React from 'react'
import './Head.css'

const Head = () => {
    return(
        <>
            <span className='title' onClick={() => window.scroll(0, 0)}>THE SILVER SCREEN</span>
        </>
    )
}

export default Head