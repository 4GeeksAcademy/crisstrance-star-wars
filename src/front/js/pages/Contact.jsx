import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ContactCard } from "../component/AddCard.jsx";

const Contacts = () => {


    return (
        <div className="container agenda-container mt-4">
            <div className="row agenda-header align-items-center mb-3 p-3 rounded">
                <div className="col-6">
                    <h2 className="agenda-title">My contacts</h2>
                </div>
                <div className="col-6 text-end">
                    <NavLink className="btn btn-success" to="/add">Add new contact</NavLink>
                </div>
            </div>
            <div className="agenda-body row">
                <div className="col-12">
                    <ContactCard />
                </div>
            </div>
        </div>
    )
};

export default Contacts;