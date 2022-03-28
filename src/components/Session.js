import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


export default function Session(props){
    const [movieInfo, setMovieInfo] = useState({});
    const [seatsList, setSeatsList] = useState([]);
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const {infos, setInfos} = props;
    const { idSessao } = useParams();

    useEffect(() => {
        const request = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        request.then(ans => {
            setMovieInfo(ans.data);
            setSeatsList(ans.data.seats);
        });
        request.catch(() => console.log("erro"));
    }, []);

    function selectSeat(id){
        seatsList.forEach(seat => {
            if (seat.id === id){
                seat.isSelected = true;
            }
        })
        setSeatsList([...seatsList]);
    }
    function deselectSeat(id){
        seatsList.forEach(seat => {
            if (seat.id === id){
                seat.isSelected = false;
            }
        })
        setSeatsList([...seatsList]);
    }
    function Seats(){
        return(
            <div className="seats">
                {seatsList.map(e => e.isAvailable ? (e.isSelected ? (<AvailableSeatSelected key={e.id} id={e.id} name={e.name} />) : (<AvailableSeat key={e.id} id={e.id} name={e.name} />)) : (<TakenSeat key={e.id} id={e.id} name={e.name} />))}
            </div>
        );
    }
    function AvailableSeat(props){
        const {id, name} = props;
        return(
            <div className={`available seat`} key={id} onClick={()=>selectSeat(id)}>
                 <p>{name.padStart(2, '0')}</p>
            </div>
        );
    }

    function AvailableSeatSelected(props){
        const {id, name} = props;
        return(
            <div className={`available seat selected`} key={id} onClick={()=>deselectSeat(id)}>
                 <p>{name.padStart(2, '0')}</p>
            </div>
        );
    }

    function TakenSeat(props){
        const {id, name} = props;
        return(
            <div className="seat taken" key={id} onClick={() => alert("Esse assento não está disponível")}>
                <p>{name.padStart(2, '0')}</p>
            </div>
        );
    }

    function sendRequest(){
        if (name === "" || cpf === ""){
            alert("Preencha os campos necessários antes de continuar!")
        }else{
            let idsList = [];
            let numbersList =[];
            seatsList.forEach(e => {
                if (e.isSelected){
                    idsList.push(e.id);
                    numbersList.push(e.name);
                }
            });
            setInfos({nome: name, cpf: cpf, movieTitle:movieInfo.movie.title, movieWeekDay:movieInfo.day.weekday, movieDate:movieInfo.day.date, seatsNumbers:numbersList});
            console.log(infos);
            axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, {
                ids: idsList,
                name: name,
                cpf: cpf
            })
            .then(ans => {
                console.log(ans);
                console.log(ans.data);
            })
        }
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
           <div className="container">
            <div className="text-session">Nome do comprador:</div>
            <input placeholder="Digite seu nome..." onChange={event => setName(event.target.value)} />
            <div className="text-session">Cpf do comprador:</div>  
            <input placeholder="Digite seu cpf..." onChange={event => setCpf(event.target.value)} />
            <Link className="res-button" to={"/sucesso"} onClick={sendRequest}>Reservar assento(s)</Link>
           </div>
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


