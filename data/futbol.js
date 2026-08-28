// FÚTBOL — datos reales proporcionados
// Solo se ingresan: fecha, hora, equipo y goles.
// numero, resultado (G/E/P) y puntos se calculan automáticamente en render.js
const futbolMatches = [
	{
		fecha:"21/08/2026", hora:"14:30",
		filas:[
			{ equipo:"Planificación y RRHH", 	goles:2 },
			{ equipo:"Administración",       	goles:0 },
		]
	},
	{
		fecha:"21/08/2026", hora:"15:15",
		filas:[
			{ equipo:"Inteligencia sanitaria", 	goles:1 },
			{ equipo:"Saneamiento ambiental", 	goles:1 },
		]
	},
	{
		fecha:"21/08/2026", hora:"16:00",
		filas:[
			{ equipo:"Calidad sanitaria",     	goles:3 },
			{ equipo:"Salud Integral", 			goles:3 },
		]
	},


	{
		fecha:"28/08/2026", hora:"13:30",
		filas:[
			{ equipo:"Salud Integral", 			goles:1 },
			{ equipo:"Saneamiento ambiental",  	goles:1 },
		]
	},
	{
		fecha:"28/08/2026", hora:"14:50",
		filas:[
			{ equipo:"Inteligencia sanitaria", 	goles:1 },
			{ equipo:"Administración",  		goles:2 },
		]
	},
	{
		fecha:"28/08/2026", hora:"14:50",
		filas:[
			{ equipo:"Planificación y RRHH", 	goles:3 },
			{ equipo:"Calidad sanitaria",  		goles:0 },
		]
	},

];


// const futbolStandings = [
// 	{ equipo:"Planificación y RRHH", goles:2, puntos:3 },
// 	{ equipo:"Salud Integral",        goles:3, puntos:1 },
// 	{ equipo:"Calidad sanitaria",     goles:3, puntos:1 },
// 	{ equipo:"Inteligencia sanitaria",goles:1, puntos:1 },
// 	{ equipo:"Saneamiento ambiental", goles:1, puntos:1 },
// 	{ equipo:"Administración",        goles:0, puntos:0 },
// ];