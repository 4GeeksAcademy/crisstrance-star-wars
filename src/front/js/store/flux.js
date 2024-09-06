const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host: 'https://playground.4geeks.com/contact/agendas/cristian/contacts',
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: 'Cristian',
			cohorte: 'Spain-77',
			number: 8,
			isLoged: false,
			alert: {
				text: 'A simple primary alert—check it out!',
				background: 'primary',
				visible: false
			  }

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setIsLoged: (newState) => { setStore({isLoged: newState})}
			// getPublications: async () => {
			// 	// 1 defino la uri
			// 	const uri = `https://playground.4geeks.com/contact/agendas/cristian/contacts`  // string
			// 	// 2 defino las opciones
			// 	const options = {
			// 	  method: 'GET'
			// 	}  // objeto
			// 	// 3 ejecuto el fetch que demora y lo tengo esperar
			// 	const response = await fetch(uri, options)
			// 	// 4 verifico si el fetch dió error
			// 	if (!response.ok) {
			// 	  // 4.1 Trato el error y salgo de la fucnion
			// 	  console.log('Error: ', response.status, response.statusText)
			// 	  return // IMPORTANTE
			// 	}
			// 	// 5 obtengo los datos json del response y espero xq demora
			// 	const data = await response.json()
			// 	// console.log('Data es = ', data);
			// 	// 6 ejecuto la lógica necesaria de la app
			// 	setPublications(publications.data.results)
			//   }
		}
	};
};

export default getState;
