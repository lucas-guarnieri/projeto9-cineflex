import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


export default function Movies() {
	const [movies, setMovies] = useState([]);
    
	useEffect(() => {
		const request = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

		request.then(ans => {
			setMovies(ans.data);
		});

        request.catch(()=>console.log("erro"));
	}, []);


	function Movie(props){
		const { movie } = props;
		return(
			<Link className="movie-link" to={`/filme/${movie.id}`}>
				<img src={movie.posterURL} alt={movie.title}/>
			</Link>
		);
	}

	if (movies.length === 0){
		return(
				<div className='loading'>LOADING</div>
		);
	}
    
    return(
        <div className='movies'>
			<p>Selecione o filme</p>
			<div className='movies-list'>
				{movies.map(e => <Movie key = {e.id} movie = {e}/>)}
			</div>
        </div>
    );
}