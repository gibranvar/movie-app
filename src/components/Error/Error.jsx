import React from 'react'
import './error.styles.css'

const Error = () => {
  return (
    <div className='error-container'>
        <div className='error-options'>
        <h3>No matches found!</h3>
            <h4>Suggestions:</h4>
            <ul>
                <li>Try other keywords</li>
                <li>Looking for a movie or series?</li>
                <li>Try a movie or series title. or a cast name or direction</li>
                <li>Try a genre, like a drama, sports, terror or romance</li>
            </ul>
        </div>
    </div>
  )
}

export default Error