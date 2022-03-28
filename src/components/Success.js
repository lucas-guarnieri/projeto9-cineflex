import { Link } from "react-router-dom";

export default function Success(props){
    const {infos, setInfos} = props;
    console.log(infos);
    return(
        <div className="success">
            <div className="success-title">Pedido feito com sucesso!</div>
            <div className="success-subtitles">Filme e sessão</div>
            <p>{infos.movieTitle}</p>
            <p>{`${infos.movieDate} ${infos.movieWeekDay}`}</p>
            <div className="success-subtitles">Ingressos</div>
            <ul className="tickets-list">
                {infos.seatsNumbers.map(num => <li>{`Assento ${num}`}</li>)}
            </ul>
            <div className="success-subtitles">Comprador</div>
            <p>{infos.nome}</p>
            <p>{infos.cpf}</p>
            <Link to={"/"} onClick={()=> setInfos({})}>Voltar pra Home</Link>
        </div>
    );
}