import React from "react";
import { useCookies } from "react-cookie";

export default function Home({changeMode})
{
    const [cookies, setCookie, removeCookie] = useCookies(['numbers']);

    var newGame = () => {
        removeCookie("numbers");
        removeCookie("urns");
        removeCookie("currentNumber");
        changeMode();
    };

    return (
        <div>
            <h1>Accueil</h1>
            <hr />
            {cookies.numbers !== undefined && <button className="btn btn-primary w-100 mb-3" onClick={changeMode}>Continuez la partie en cours</button>}
            <button className="btn btn-primary w-100 mb-3" onClick={newGame}>Nouvelle Partie</button>
        </div>
    );
}

