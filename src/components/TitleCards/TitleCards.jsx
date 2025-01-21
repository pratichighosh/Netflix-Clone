import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const OMDB_API_KEY = 'b873f80b'; 

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    

    const fetchUrl = `http://www.omdbapi.com/?s=${category || 'popular'}&apikey=${OMDB_API_KEY}`; // Adjust the query

    fetch(fetchUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.Search) {
          setApiData(data.Search);
        } else {
          throw new Error('No results found');
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });

    cardsRef.current.addEventListener('wheel', handleWheel);
    return () => {
      cardsRef.current.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.imdbID}`} className="card" key={index}>
            <img src={card.Poster !== 'N/A' ? card.Poster : 'https://via.placeholder.com/500'} alt={card.Title} />
            <p>{card.Title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
