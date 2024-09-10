import React from "react";
import { useParams } from "react-router-dom";


export const CharacterDetails = () => {
    const params = useParams()
    console.log(params)

    return (
        <div className="container">
            <h1 className="text-light">Details</h1>
            <p>

            </p>
        </div>
    )
}