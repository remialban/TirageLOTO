import React from "react";

export default function Number({number})
{
    return (
        <span className="bg-dark p-1 fw-bold fs-4 align-self-center" style={{margin: "10px"}}>
            {number.toString().length == 1 && <span>0</span>}
            {number}
        </span>        
    )
}
