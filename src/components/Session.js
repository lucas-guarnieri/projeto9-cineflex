import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


export default function Session(){
    const [movieInfo, setMovieInfo] = useState({});
    const [seatsList, setSeatsList] = useState([]);
    const {  idSessao } = useParams();

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        request.then(ans => {
            setMovieInfo(ans.data);
            setSeatsList(ans.data.seats);
        });
        request.catch(() => console.log("erro"));
    }, []);

    function Seats(){
        return(
            <div className="seats">
                {seatsList.map(e => e.isAvailable ? (<AvailableSeat key={e.id} id={e.id} name={e.name}/>) : (<TakenSeat key={e.id} id={e.id} name={e.name} />))}
            </div>
        );
    }
    function AvailableSeat(props){
        const {id, name} = props;
        return(
            <div className="seat available" key={id}>
                 <p>{name.padStart(2, '0')}</p>
            </div>
        );
    }
    function TakenSeat(props){
        const {id, name} = props;
        return(
            <div className="seat taken" key={id}>
                <p>{name.padStart(2, '0')}</p>
            </div>
        );
    }

    if (seatsList.length === 0){
        return(
                <div className='loading'>LOADING</div>
        );
   }

   return(
       <div className="session">
           <p className="top-text">Selecione o(s) assento(s)</p>
           <Seats />
           <div className="footer">
                <img src={movieInfo.movie.posterURL} alt={movieInfo.movie.title}/>
                <div className="movie-info">
                    <p>{movieInfo.movie.title}</p>
                    <p>{`${movieInfo.day.weekday} - ${movieInfo.day.date}`}</p>
                </div>
            </div>
       </div>
       
   );
}


