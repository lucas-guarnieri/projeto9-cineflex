import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Sessions(){
    const [movieSessions, setMovieSessions] = useState({});
    const [daysList, setDaysList] = useState([]);
    const { idFilme } = useParams();

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

        request.then(ans => {
            setMovieSessions(ans.data);
            setDaysList(ans.data.days);
        });
        request.catch(()=>console.log("erro"));
    }, []);

    function Day(props){
        const { day } = props;
        return(
            <div className="day">
                <p>{`${day.weekday} - ${day.date}`}</p>
                <div className="day-sessions">
                    {day.showtimes.map(e => <Link key={e.id} className="session-link" to={`/sessao/${e.id}`}>{e.name}</Link>)}
                </div>
            </div>
        );
    }
    
    if (daysList.length === 0){
	 	return(
	 			<div className='loading'>LOADING</div>
	 	);
	}

    return(
        <div className="sessions">
            <p>Selecione o horário</p>
            <div className='sessions-list'>
                {daysList.map(e => <Day key={e.id} day={e} />)}
			</div>
            <div className="footer">
                <img src={movieSessions.posterURL} />
            </div>
        </div>
    );
}