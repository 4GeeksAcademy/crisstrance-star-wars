import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AddCard } from "../component/AddCard.jsx";
import { Context } from "../store/appContext";

const Contacts = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="container agenda-container mt-4">
            <div className="row agenda-header align-items-center mb-3 p-3 rounded">
                <div className="col-6">
                    <h2 className="agenda-title text-light">My contacts</h2>
                </div>
                <div className="col-6 text-end">
                    <NavLink className="btn btn-success" to="/add_contact">Add new contact</NavLink>
                </div>
            </div>
            <div className="agenda-body row">
                <div className="col-12">
                    {/* <AddCard /> */}
                </div>
            </div>
        </div>
    )
};

export default Contacts;