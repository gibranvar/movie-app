import React, {useEffect, useState} from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { watchResult } from "../../../func/api";
import logo from '../icon.png'
import '../styles.css'
import  Error from "../../Error/Error"
import Footer from '../../Footer/Footer'


const Watch = () =>{
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const POSTER_PATH = "https://image.tmdb.org/t/p/w342/"
    const [watch, setWatch] = useState(null)
    const params = useParams()
    const backHistory = useNavigate()
    useEffect (() =>{
        watchResult(params.id, setWatch)
    },[])

    function handleClick() {
        backHistory("/");
      }
    return (
        <>
            <nav id="navbar-content" className="navbar navbar-expand-lg navbar fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="movie-icon" height="50px" width="80px" />
                    <strong>Movie App</strong>
                </a>
                <button id="nav-toggler" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id="navbar-list" className="navbar me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Movies</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" href="/top_rated">Top Rated</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/popular">Popular</a>
                        </li>
                    </ul>
                    <form id="search-input" className="d-flex" role="search">
                        <button id="search-button" className="btn"  onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
            </nav>
            <div>
                {watch != null ? (
                    <div className="poster-banner" style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${watch.backdrop_path})`}}>
                        <div className="poster-container">
                            <div className="poster-ctnt">
                                
                                    <img className="poster-img" src={`${POSTER_PATH}${watch.poster_path}`} alt={watch.title} />
                                
                                <div className="poster-title">
                                    <div className="original-title">
                                        <h1>{watch.title}</h1>
                                        <h3>{watch.original_title}</h3>
                                    </div>
                                    
                                <div className="poster-info">
                
                                    <div className="movie-details">
                                        <div className="icon-movie">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                            </svg>
                                        </div>
                                        <span>
                                            {watch.vote_average}
                                        </span>
                                       
                                    </div>
                                    
                                    <div className="movie-details">
                                        <div className="icon-movie">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                            </svg>
                                        </div>
                                        
                                        <span>
                                            {`${watch.runtime}${" min."}`}</span>
                                        </div>
                                    <div className="movie-details">
                                        <div className="icon-movie">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar-event" viewBox="0 0 16 16">
                                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg>
                                        </div>
                                        <span>
                                            {watch.release_date}
                                        </span>
                                    </div>
                                </div>
                                <div className="poster-description">
                                    <p>{watch.overview}</p>
                                    <div className="genre-movie"><strong>Genres: </strong> {`${watch.genres[0].name}`}</div>
                                </div>
                            </div>
                        </div>
                        </div>     
                    </div>
                ) : <Error></Error>}
            </div>
            <div>

            </div>
            <Footer></Footer>
        </>
    )
}
export default Watch