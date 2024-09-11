import React, { useState, useContext } from "react";


export const AddCard = () => {

  return (
    <div className="container m-5">
				<div className="card">
					<h5 className="card-header"><i class="fas fa-address-card"></i> *CONTACT-NAME* </h5>
					<div className="card-body">
						<form>
							<div className="mb-3">
								<label for="exampleInputEmail1" className="form-label"><i className="fa-solid fa-envelope me-1"></i><strong>Email:</strong> Contact email</label>
								<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
								<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
							</div>
							<div className="mb-3">
								<label for="contactPhone" className="form-label"><i className="fa-solid fa-phone me-1"></i><strong>Phone:</strong> Contact phone</label>
								<input type="text" className="form-control" id="contactPhone" aria-describedby="contactPhoneHelp" />
							</div>
							<div className="mb-3">
								<label for="contactPhone" className="form-label"><i className="fa-solid fa-house me-1"></i><strong>Address:</strong> Contact address</label>
								<input type="text" className="form-control" id="contactPhone" aria-describedby="contactPhoneHelp" />
							</div>
							<button type="submit" className="btn btn-primary">Add Contact</button>
						</form>
					</div>
				</div>
			</div>
  );
};
