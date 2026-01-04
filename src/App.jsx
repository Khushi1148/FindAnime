import { useEffect, useState } from "react"
import Search from "./components/search"
import Spinner from "./components/Spinner"
import AnimeCard from "./components/AnimeCard"
import {useDebounce} from 'react-use'


const API_BASE_URL = 'https://api.jikan.moe/v4'

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms (0.5s)
  useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500, [searchTerm])


  const fetchAnime = async(query = '') => {
    setLoading(true)
    setErrorMessage(false)

    try{
      const endpoint = query? `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}` : `${API_BASE_URL}/top/anime`

      const response = await fetch(endpoint)
      if(!response.ok){
        throw new Error('Failed to fetch Animes')
      }
      const json = await response.json()

      if (!json.data || json.data.length === 0){
        setErrorMessage('Failed to fetch Animes');
        setAnimeList([])
        return
      }

      setAnimeList(json.data || [])
      console.log(json)


    }catch(error){
      console.error(`Error fetching Anime: ${error}`)
      setErrorMessage('Error fetching anime. Please try again later.')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAnime(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  return (
    <main>
      
      <div className='wrapper'>
        <header>
          <h1>Find <span className='text-gradient'>Anime</span>You Love Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-animes">
          <h2 className="mt-6">All Anime</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-white">{errorMessage}</p>
          ): (
            <ul>
              {animeList.map((anime)=>(
                <AnimeCard key={anime.mal_id} anime={anime}/>
              ))}
            </ul>
          )}

        </section>
        
        
      </div>
    </main>
  )
}

export default App
