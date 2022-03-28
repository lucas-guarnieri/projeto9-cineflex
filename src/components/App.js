import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header    from "./Header";
import Movies from "./Movies"
import Sessions from "./Sessions";
import Session from "./Session"
import "./../css/reset.css";
import "./../css/style.css";


export default function App(){
    
    return(
        <BrowserRouter>
            <Header />
            { <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/filme/:idFilme" element={<Sessions />} />
                <Route path="/sessao/:idSessao" element={<Session />} />
                {/* <Route path="/sucesso" element={<Success />} /> */}
            </Routes> }
        </BrowserRouter>
    );
}