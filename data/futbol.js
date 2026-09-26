// FASE FINAL (llave de eliminación directa) — ejemplo, reemplaza con los equipos/resultados reales
// Estructura fija: 2 semifinales (4 equipos) -> final (2 finalistas) -> campeón
// valorA / valorB = goles de cada equipo en ese cruce. El ganador se calcula solo (mayor valor).
// Si hay empate y se define por penales u otro criterio, agrega "ganador:'A'" o "ganador:'B'" en ese cruce.
const futbolBracket = {
	semifinales: [
		{ 
			equipoA: rh,    valorA: 1, 
			equipoB: deais,    valorB: 0 
		},

		{ 
			equipoA: cs,    valorA: 2, 
			equipoB: sa, valorB: 0 
		},
	],
	final: { valorA: null, valorB: null }
};




const futbolMatches = [
	{
		fecha:"21/08/2026", hora:"14:30",
		filas:[
			{ equipo: rh, 	goles:2 },
			{ equipo: admin,       	goles:0 },
		]
	},
	{
		fecha:"21/08/2026", hora:"15:15",
		filas:[
			{ equipo: deis, 	goles:1 },
			{ equipo: sa, 		goles:1 },
		]
	},
	{
		fecha:"21/08/2026", hora:"16:00",
		filas:[
			{ equipo: cs,     	goles:3 },
			{ equipo: deais, 	goles:3 },
		]
	},


	{
		fecha:"28/08/2026", hora:"13:30",
		filas:[
			{ equipo: deais, 	goles:1 },
			{ equipo: sa,  		goles:1 },
		]
	},
	{
		fecha:"28/08/2026", hora:"14:50",
		filas:[
			{ equipo: deis, 	goles:1 },
			{ equipo: admin,  	goles:2 },
		]
	},
	{
		fecha:"28/08/2026", hora:"15:50",
		filas:[
			{ equipo: rh, 		goles:3 },
			{ equipo: cs,  		goles:0 },
		]
	},



	{
		fecha:"04/09/2026", hora:"13:10",
		filas:[
			{ equipo: sa, 		goles:5 },
			{ equipo: admin,  	goles:1 },
		]
	},
	{
		goles:true,
		fecha:"04/09/2026", hora:"14:10",
		filas:[
			{ equipo: rh, 		goles:0 },
			{ equipo: deais,  	goles:2, win: true },
		]
	},
	{
		fecha:"04/09/2026", hora:"12:35",
		filas:[
			{ equipo: deis, 	goles:0 },
			{ equipo: cs,  		goles:5 },
		]
	},



	{
		fecha:"11/09/2026", hora:"13:10",
		filas:[
			{ equipo: deais, 		goles:2 },
			{ equipo: deis,  		goles:4 },
		]
	},
	{
		fecha:"11/09/2026", hora:"14:10",
		filas:[
			{ equipo: cs, 			goles:2 },
			{ equipo: admin,  		goles:0 },
		]
	},
	{
		fecha:"11/09/2026", hora:"12:35",
		filas:[
			{ equipo: rh, 			goles:2 },
			{ equipo: sa,  			goles:4 },
		]
	},



	{
		fecha:"18/09/2026", hora:"13:10",
		filas:[
			{ equipo: rh, 			goles:5 },
			{ equipo: deis,  		goles:0 },
		]
	},
	{
		fecha:"18/09/2026", hora:"14:10",
		filas:[
			{ equipo: cs, 			goles:1 },
			{ equipo: sa,  			goles:0 },
		]
	},
	{
		fecha:"18/09/2026", hora:"12:35",
		filas:[
			{ equipo: deais, 		goles:5 },
			{ equipo: admin,  		goles:1 },
		]
	},


];


