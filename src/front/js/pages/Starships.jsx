import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Spinner } from "../component/Spinner.jsx";


export const Starships = () => {
    const { store, actions } = useContext(Context)


    return (
        <div className="container">
            <h1 className="text-light">Starships</h1>

            <div className="row">
                {store.starships.map((item) => (
                    <div key={item.uid} className="card text-bg-warning m-1 " style={{ width: '18rem', transition: 'transform 0.3s ease-in-out' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                            <img 
                            src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`} 
                            onError={(e) => e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'} 
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
        </div>
    );
};