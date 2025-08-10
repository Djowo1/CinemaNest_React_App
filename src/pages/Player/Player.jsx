import React, { useState, useEffect, useMemo } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = useMemo(() => ({
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
    }
  }), []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        if (!response.results || response.results.length === 0) {
          setApiData(null);
        } else {
                const trailer = response.results.find(
            vid => vid.type === 'Trailer' && vid.site === 'YouTube'
          );
          const fallback = response.results.find(
            vid => vid.site === 'YouTube'
          );
          setApiData(trailer || fallback || null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Video fetch error:", err);
        setError('Failed to fetch video data.');
        setLoading(false);
      });
  }, [id, options]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-2)} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : apiData && apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <div>No trailer available for this movie.</div>
      )}
      <div className="player-info">
        <p>{apiData && apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
        <p>{apiData && apiData.name}</p>
        <p>{apiData && apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;