import axios from "axios";

const API_KEY = "?api_key=0fea96f52adb72362ab056b98ce1f36d"  

const PopularGet = async (state) => {
    const API = "https://api.themoviedb.org/3/movie/popular"
    
    const getSearch = await axios.get(`${API}${API_KEY}${"&page=2"}`)
    state(getSearch.data.results)
  
}
const TopRated = async (state) =>{
    const API = "https://api.themoviedb.org/3/movie/top_rated"
    const getTopRated = await axios.get(`${API}${API_KEY}${"&page=2"}`)
    state(getTopRated.data.results)
   
}
const Upcoming = async (state) =>{
    const API = "https://api.themoviedb.org/3/movie/upcoming?"
    const getUpcoming = await axios.get(`${API}${API_KEY}`)
    state(getUpcoming.data.results)
   
}
const watchResult = async (id, state) => {
    const API = "https://api.themoviedb.org/3/movie/"
    
    const getWatch = await axios.get(`${API}${id}${API_KEY}`)
    state(getWatch.data)
}

const NowPlaying = async (state) =>{
    const API = "https://api.themoviedb.org/3/discover/movie"
    const getNowPlaying = await axios.get(`${API}${API_KEY}${"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=3&with_watch_monetization_types=flatrate"}`)
    state(getNowPlaying.data.results)
   
}
 


export {PopularGet, watchResult, NowPlaying, TopRated, Upcoming, 
}