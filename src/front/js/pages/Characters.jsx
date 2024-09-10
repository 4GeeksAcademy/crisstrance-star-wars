import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const Characters = () => {
    const { store, actions } = useContext(Context)
    const handleDetails = []

    return (
        <div className="container">
            <h1 className="text-light">Characters</h1>
            {store.characters.length === 0 ? <Spinner /> : 
                <div className="row">
                    {store.characters.map((item) => (
                        <div key={item.uid} className="card text-bg-warning m-1" style={{ width: '18rem', transition: 'transform 0.3s ease-in-out' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                            <img 
                                src={`https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`}
                                className="card-img-top"
                                alt={item.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div className="card-body d-flex justify-content-between">
                                <h5 className="card-title">{item.name}</h5>
                                <button className="btn btn-warning">Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};