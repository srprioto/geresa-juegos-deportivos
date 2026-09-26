// FASE FINAL (llave de eliminación directa) — aún no se ha jugado ningún cruce.
// valorA / valorB = sets de cada equipo. Deja en null mientras no se juegue.
const voleyBracket = {
	semifinales: [
		{ 
			equipoA: deais, valorA: null, 
			equipoB: cs,   valorB: null 
		},
		{ 
			equipoA: deis,  valorA: null, 
			equipoB: rh,   valorB: null 
		},
	],
	final: { valorA: null, valorB: null }
};


// VÓLEY — placeholder con las mismas áreas (reemplazar con datos reales)
const voleyMatches = [
	{
		fecha:"21/08/2026", hora:"14:30",
		filas:[
			{ equipo: rh, 	sets:2 },
			{ equipo: admin,       	sets:0 },
		]
	},
	{
		fecha:"21/08/2026", hora:"15:15",
		filas:[
			{ equipo: deis, 	sets:2 },
			{ equipo: sa, 	sets:1 },
		]
	},
	{
		fecha:"21/08/2026", hora:"16:00",
		filas:[
			{ equipo: cs,     	sets:0 },
			{ equipo: deais, 			sets:2 },
		]
	},

	{
		fecha:"28/08/2026", hora:"13:30",
		filas:[
			{ equipo: deais, 			sets:2 },
			{ equipo: sa,  	sets:0 },
		]
	},
	{
		fecha:"28/08/2026", hora:"16:50",
		filas:[
			{ equipo: rh, 	sets:2 },
			{ equipo: cs,  		sets:0 },
		]
	},
	{
		fecha:"28/08/2026", hora:"15:30",
		filas:[
			{ equipo: deis, 	sets:2 },
			{ equipo: admin,  		sets:0 },
		]
	},



	{
		fecha:"04/09/2026", hora:"13:10",
		filas:[
			{ equipo: deis, 	sets:2 },
			{ equipo: cs,  		sets:1 },
		]
	},
	{
		fecha:"04/09/2026", hora:"14:25",
		filas:[
			{ equipo: admin, 			sets:2 },
			{ equipo: sa,  	sets:0 },
		]
	},
	{
		fecha:"04/09/2026", hora:"15:15",
		filas:[
			{ equipo: deais, 			sets:2 },
			{ equipo: rh,  	sets:0 },
		]
	},



	{
		fecha:"11/09/2026", hora:"13:10",
		filas:[
			{ equipo: rh, 		sets:2 },
			{ equipo: sa,  		sets:0 },
		]
	},
	{
		fecha:"11/09/2026", hora:"14:25",
		filas:[
			{ equipo: admin, 	sets:0 },
			{ equipo: cs,  		sets:2 },
		]
	},
	{
		fecha:"11/09/2026", hora:"15:15",
		filas:[
			{ equipo: deis, 	sets:1 },
			{ equipo: deais,  	sets:2 },
		]
	},





	{
		fecha:"18/09/2026", hora:"13:10",
		filas:[
			{ equipo: cs, 		sets:2 },
			{ equipo: sa,  		sets:0 },
		]
	},
	{
		fecha:"18/09/2026", hora:"14:25",
		filas:[
			{ equipo: rh, 		sets:2 },
			{ equipo: deis,  	sets:0 },
		]
	},
	{
		fecha:"18/09/2026", hora:"15:15",
		filas:[
			{ equipo: deais, 	sets:2 },
			{ equipo: admin,  	sets:0 },
		]
	},



	
];


