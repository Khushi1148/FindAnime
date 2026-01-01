import React from 'react'

// Destructuring the passed object
const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />
            <input type="text"
             placeholder="Search for an Anime..."
             value={searchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)}/>
        </div>
    </div>
  )
}

export default Search