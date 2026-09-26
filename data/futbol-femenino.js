// FASE FINAL (llave de eliminación directa) — aún no se ha jugado ningún cruce.
// valorA / valorB = goles de cada equipo. Deja en null mientras no se juegue.
const futbolFemBracket = {
	semifinales: [
		{ 
			equipoA: deais,   valorA: 1, 
			equipoB: sa,    valorB: 2 
		},
		{ 
			equipoA: rh, valorA: 2, 
			equipoB: deis, valorB: 1 
		},
	],
	final: { valorA: null, valorB: null }
};



const futbolFemMatches = [
	{
		fecha:"26/08/2026", hora:"14:30",
		filas:[
			{ equipo: rh, 	goles:2 },
			{ equipo: admin,       	goles:0 },
		]
	},
	{
		fecha:"26/08/2026", hora:"15:15",
		filas:[
			{ equipo: deais, 			goles:1 },
			{ equipo: cs, 		goles:0 }, 
		]
	},
	{
		fecha:"26/08/2026", hora:"16:00",
		filas:[
			{ equipo: sa,  	goles:1 },
			{ equipo: deis, 	goles:1 }
		]
	},


	{
		fecha:"02/09/2026", hora:"13:10",
		filas:[
			{ equipo: deais,  		goles:1 },
			{ equipo: sa, 	goles:0 }
		]
	},
	{
		fecha:"02/09/2026", hora:"2:00",
		filas:[
			{ equipo: deis,  goles:1 },
			{ equipo: admin, 			goles:1 }
		]
	},
	{
		fecha:"02/09/2026", hora:"2:00",
		filas:[
			{ equipo: cs,  		goles:1 },
			{ equipo: rh, 	goles:1 }
		]
	},



	{
		fecha:"09/09/2026", hora:"13:30",
		filas:[
			{ equipo: admin,  		goles:0 },
			{ equipo: sa, 			goles:1 }
		]
	},
	{
		fecha:"09/09/2026", hora:"14:10",
		filas:[
			{ equipo: rh,  			goles:2 },
			{ equipo: deais, 		goles:2 }
		]
	},
	{
		fecha:"09/09/2026", hora:"14:55",
		filas:[
			{ equipo: deis,  		goles:4 },
			{ equipo: cs, 			goles:2 }
		]
	},

	
	{
		fecha:"17/09/2026", hora:"13:30",
		filas:[
			{ equipo: deais,  		goles:0 },
			{ equipo: deis, 		goles:0 }
		]
	},
	{
		fecha:"17/09/2026", hora:"14:10",
		filas:[
			{ equipo: sa,  			goles:0 },
			{ equipo: rh, 			goles:1 }
		]
	},
	{
		fecha:"17/09/2026", hora:"14:55",
		filas:[
			{ equipo: cs,  			goles:0 },
			{ equipo: admin, 		goles:0 }
		]
	},




	{
		fecha:"23/09/2026", hora:"13:15",
		filas:[
			{ equipo: deis,  		goles:1 },
			{ equipo: rh, 			goles:1 }
		]
	},
	{
		fecha:"23/09/2026", hora:"13:50",
		filas:[
			{ equipo: deais,  		goles:4 },
			{ equipo: admin, 		goles:0 }
		]
	},
	{
		fecha:"23/09/2026", hora:"14:40",
		filas:[
			{ equipo: sa,  			goles:0 },
			{ equipo: cs, 			goles:0 }
		]
	},


];


