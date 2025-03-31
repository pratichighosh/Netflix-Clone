import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const OMDB_API_KEY = 'b873f80b'; // Make sure this is kept secure (e.g., in .env)

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (cardsRef.current) {
        cardsRef.current.scrollLeft += event.deltaY;
      }
    };

    const fetchUrl = `https://www.omdbapi.com/?s=${category || 'popular'}&apikey=${OMDB_API_KEY}`;

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
          console.error('No results found');
        }
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <Link to={`/player/${card.imdbID}`} className="card" key={card.imdbID}>
            <img src={card.Poster !== 'N/A' ? card.Poster : 'https://via.placeholder.com/500'} alt={card.Title} />
            <p>{card.Title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
