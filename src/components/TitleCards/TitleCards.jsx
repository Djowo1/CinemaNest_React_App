import React, {useState, useEffect, useRef} from 'react'
import "./TitleCards.css"
import { Link } from 'react-router-dom';
//import cards_data from '../../assets/cards/Cards_data'



const TitleCards = ({title, category}) => {

const [apiData, setApiData] = useState([]);

const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
};

const handleWheel =(event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;}

useEffect(() =>{

console.log("TMDB Key:", import.meta.env.VITE_TMDB_API_KEY);


  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));
  
  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) =>{
          return <Link to ={`/player/${card.id}`}className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` +card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
