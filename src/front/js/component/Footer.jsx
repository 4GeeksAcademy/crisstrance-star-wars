import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Footer = () => {
	const { store } = useContext(Context)
	
	return (
		<footer className="footer mt-auto py-3 text-center ">
			<p className="text-light">
				Made with <i className="fa fa-heart text-danger" /> by {store.user} . . . This web is under contruction <i class="fas fa-tools"></i>
			</p>
		</footer>
	)
};
