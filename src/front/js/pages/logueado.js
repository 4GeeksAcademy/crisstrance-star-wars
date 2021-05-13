import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";
import { useHistory } from "react-router-dom";
//import { Search } from "../component/search";]
import Swal from "sweetalert2";

export const Logueado = () => {
	const { store } = useContext(Context);
	const history = useHistory();
	const logAlert = () => {
		Swal.fire({
			icon: "error",
			title: "Acceso restringido, favor ingresar con sus credenciales",
			text: "Redirigiendo a la pagina de Ingreso.",
			showConfirmButton: false,
			timer: 2500
		});
		history.push("/logUserIn");
	};

	if (store.token && store.token !== "" && store.token !== undefined) {
		return (
			<div className="container">
				{/*<h1 className="text-center">Pura Vida Mart</h1>*/}
				<Card />
				<div className="text-center my-4" />
			</div>
		);
	} else {
		return null;
	}
};
