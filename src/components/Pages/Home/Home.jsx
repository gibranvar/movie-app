import {useEffect, useState} from "react"
import '../styles.css'
import axios from 'axios'
import Youtube from 'react-youtube'
import Footer from '../../Footer/Footer'
import logo from '../icon.png'
import  Error from "../../Error/Error"
import {NowPlaying} from '../../../func/api'

function Home() {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/multi"
    const DISCOVER_API = MOVIE_API + "movie/upcoming"
    const API_KEY = "0fea96f52adb72362ab056b98ce1f36d"
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
    const POSTER_PATH = "https://image.tmdb.org/t/p/w342/"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})
    const [movieNowplaying, setNowPlaying] = useState(null)
  
    
    useEffect(() => {
        fetchMovies()
        NowPlaying(setNowPlaying)
    }, [])

   

    const renderNowPlaying = () => (
        movieNowplaying  != null ? (
            movieNowplaying.map(info => (
                <div class="movie" key={info.id}>
                    <div className="movie-title">
                        <a href={`watch/${info.id}`}>
                            <img src={POSTER_PATH + info.poster_path} alt={info.title}/>
                        </a>    
                        <div className="flex between movie-infos">
                            <h5 className="movie-title">{info.title}</h5>
                            {info.vote_average ? <span className="movie-voting">{info.vote_average}</span> : null}
                        </div>
                    </div>
                </div>
            ))
            ) : ("no hay nada")
    )

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }

    const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })
        setMovies(data.results)
        setMovie(data.results[0])

        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }

    const fetchMovie = async (id) => {
        const {data} = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    const selectMovie = (movie) => {
        fetchMovie(movie.id)
        setPlaying(false)
        setMovie(movie)
        window.scrollTo(0, 0)
    }

     const renderMovies = () => (
        movies.map(movie => (           
            <>
            <div>
                <div onClick={() => selectMovie(movie)} className="comic-container">
                    {movie.poster_path &&
                        <img id="img-comic" src={"https://image.tmdb.org/t/p/w342" + movie.poster_path} alt={movie.title} />}
                </div>
            </div>
            </>
        
        ))
    ) 
     
    
    

    return (
    <div className="App">
        <nav id="navbar-content" className="navbar navbar-expand-lg navbar fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="movie-icon" height="50px" width="80px"/>  
                    <strong>Movie App</strong>
                </a>
                <button id="nav-toggler" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id="navbar-list" className="navbar me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link actived " aria-current="page" href="/">Movies</a>
                        </li>
                        
                        <li className="nav-item">
                        <a className="nav-link" href="/top_rated">Top Rated</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/popular">Popular</a>
                        </li>
                    </ul>
                    <form id="search-input" className="d-flex" onSubmit={fetchMovies} role="search">
                        <input className="form-control me-2" autocomplete="off" type="search" placeholder="Search" aria-label="Search" id="search" onInput={(event) => setSearchKey(event.target.value)}/>
                        <button id="search-button" className="btn" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
            {movies.length ?
                <main>
                    {movie ?
                        <div className="poster"
                             style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                            {playing ?
                                <>
                                    <Youtube
                                        videoId={trailer.key}
                                        className={"youtube "}
                                        ClassName={"youtube-container"}
                                        opts={
                                            {
                                                width: '100%',
                                                height: '100%',
                                                playerVars: {
                                                    
                                                    autoplay: 1,
                                                    controls: 0,
                                                    cc_load_policy: 0,
                                                    fs: 0,
                                                    iv_load_policy: 0,
                                                    modestbranding: 0,
                                                    rel: 0,
                                                    showinfo: 0,
                                                },
                                            }
                                        }
                                    />
                                    <div className="info-trailer">
                                        <div className="info-trailer-content">
                                            <button onClick={() => setPlaying(false)} className={"button close-video btn btn-outline-light"}>Close
                                            </button>  
                                            <h1 >{movie.title}</h1>                           
                                        </div> 
                                    </div>
                                </> :
                                <div className="center-max-size">
                                    <div className="poster-content">
                                        {trailer ?
                                            <button className={"btn btn-outline-light"} onClick={() => setPlaying(true)}
                                                    type="button">Play
                                                Trailer</button>
                                            : 'Sorry, no trailer available'}
                                        <h1>{movie.title}</h1>
                                        <p>{movie.overview}</p>
                                    </div>
                                    
                                </div>
                            }
                        </div>
                        : null}
                        <div id="slider-comic" class="main-comic">
                         {renderMovies()}
                        </div>  
                        <div className="center-max-size container">
                            {renderNowPlaying()}
                        </div>    
                </main>

                : <Error></Error> }
                <Footer></Footer>
        </div>
        
    );
}

export default Home;