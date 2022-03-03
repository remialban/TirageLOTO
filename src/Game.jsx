import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Number from "./Number";

function random(number)
{
    return Math.floor(Math.random() * (number + 1))
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Game({changeMode})
{
    const [cookies, setCookie, removeCookie] = useCookies(['numbers', 'urns', 'currentNumber']);
    var [working, setWorking] = useState(false);

    useEffect(() => {
        if (cookies.numbers === undefined)
        {
            setCookie("numbers", []);
            var urns = [];
            for (let index = 0; index < 90; index++) {
                urns.push(index + 1);
            }
            setCookie("urns", urns);
        }
    });

    var take = async () => {
        var number;
        setWorking(true);
        for (let index = 0; index < 1; index++) {
            await sleep(200);
            number = cookies.urns[random(cookies.urns.length - 1)]
            setCookie("currentNumber", number);
        }
        var newUrns = cookies.urns.slice();
        var newNumbers = cookies.numbers.slice();
        var index = newUrns.indexOf(number);
        newUrns.splice(index, 1);
        newNumbers.push(number);
        newNumbers.sort(function(a, b){return a-b});
        setCookie("numbers", newNumbers);
        setCookie("urns", newUrns);
        setWorking(false);
    }

    return (
        <div>
            <button onClick={() => changeMode()} className="btn btn-secondary">Revenir à l'écran d'accueil</button>
            <hr />
            {cookies.numbers !== undefined && <div>
                {cookies.currentNumber !== undefined && <div>
                    <p className="text-center fs-2 fw-bold">
                        {working && "Tirage en cours ..."}
                        {!working && "Numéro tiré :"}
                    </p>
                    <p className="text-center">
                        <Number number={cookies.currentNumber} />
                    </p>
                </div>}
                <button onClick={take} className="btn btn-primary w-100" disabled={working || cookies.urns.length == 0}>Tirer un numéro</button>
                {cookies.urns.length == 0 &&
                <p className="text-center fs-2 fw-bold">
                    Tout les numéros ont été tirés !
                </p>}
                <p className="text-center fs-2 fw-bold">
                    Numéros tirés :
                </p>
                {cookies.numbers !== undefined && <div className="d-flex flex-row flex-wrap">
                    {cookies.numbers.map((number, index) => {
                        return (
                            <Number key={index} number={number} />
                        )
                    })}
                </div>}      
            </div> }     
        </div>
    )
}
