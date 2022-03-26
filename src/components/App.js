import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header    from "./Header";
import "./../css/reset.css";
import "./../css/style.css";


export default function App(){
    return(
        <BrowserRouter>
            <Header />
            {/* <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/filme" element={<Sessions />} />
                <Route path="/sessao" element={<Session />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes> */}
        </BrowserRouter>
    );
}