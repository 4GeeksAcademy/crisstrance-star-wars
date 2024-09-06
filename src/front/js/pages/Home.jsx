import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ContextExample } from "../component/ContentExample.jsx"
import { AddCard } from "../component/AddCard.jsx"
import rigoImageUrl from "../../img/rigo-baby.jpg";
import swland from "../../img/star-wars-back0.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			{/* <ContextExample /> */}
			<img src={swland} class="img-fluid" alt="..."></img>

			<AddCard />
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
	);
};
