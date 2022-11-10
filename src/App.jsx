import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Pages/Home/Home'
import Popular from './components/Pages/Popular/Popular'
import TopRated from './components/Pages/Top-rated/Top-Rated'
import Watch from './components/Pages/Watch/Watch'
function App() {
    return(
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path="/popular" element={<Popular></Popular>}></Route>
                    <Route path="/top_rated" element={<TopRated></TopRated>}></Route>
                    <Route path="/watch/:id" element={<Watch></Watch>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App