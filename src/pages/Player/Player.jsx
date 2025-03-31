import React, { useEffect, useState } from 'react';
import './player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { OMDB_Access_Key } from '../../config';

const OMDB_API_KEY = 'b873f80b';  // Replace with your OMDb API key

fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${OMDB_Access_Key}`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

const Player = (props) => {
  const { id } = useParams();  // Movie ID passed in the URL
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    Title: "",
    Released: "",
    Genre: "",
    imdbID: ""
  });

  // Fetch movie data from OMDb API
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === "True") {
          setApiData(data);
        } else {
          console.error('Error fetching data:', data.Error);
        }
      })
      .catch(err => console.error('Error fetching data:', err));
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} />
      
      <iframe
        src={`https://www.youtube.com/embed?autoplay=1&rel=0&showinfo=0`}
        title='trailer'
        frameBorder='0'
        allowFullScreen
      ></iframe>
      
      <div className="player-info">
        <p>Released: {apiData.Released}</p>
        <p>Title: {apiData.Title}</p>
        <p>Genre: {apiData.Genre}</p>
      </div>
    </div>
  );
};

export default Player;
