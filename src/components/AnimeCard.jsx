import React from 'react'

const AnimeCard = ({anime:{
    title,
    title_english,
    score,
    images,
    year,
    type,
    aired
}}) => {
  return (
    <div className='anime-card'>
        <img src={images?.jpg?.image_url || '/no-anime.png'} alt={title_english || title} />

        <div className='mt-4'>
            <h3>{title_english || title}</h3>

            <div className="content">

                <div className="rating">
                    <img src="star.svg" alt="Star Icon" />
                    <p>{score ? score.toFixed(1) : 'N/A'}</p>
                </div>

                <span>•</span>
                <p className="lang">{type}</p>
                
                <span>•</span>
                <p className="year">
                    {/* Jikan provides a simple 'year' field, or we check the aired date */}
                    {year || (aired?.prop?.from?.year) || 'N/A'}
                </p>
            </div>

            
        </div>
    </div>
  )
}

export default AnimeCard
{/* <p key={anime.mal_id} className="text-white">{anime.title_english || anime.title
}</p> */}