/* ------ CÁLCULO AUTOMÁTICO ------ */
// A partir de { fecha, hora, filas:[{equipo, goles|sets}, {equipo, goles|sets}] }
// calcula: numero (correlativo), ganador, y en cada fila: resultado (G/E/P) y puntos.
function computeMatches(rawMatches, statKey){
	return rawMatches.map((m, i) => {
		const [a, b] = m.filas;
		const va = a[statKey];
		const vb = b[statKey];

		let ganador, filaA, filaB;

		// cambio aqui: victoria forzada — si una fila tiene win:true, gana sin importar los goles/sets
		const aForzado = !!a.win;
		const bForzado = !!b.win;

		if(aForzado || bForzado){
			const aGana = aForzado; // si ambas filas tuvieran win:true (caso inválido), gana "a" por prioridad
			ganador = aGana ? a.equipo : b.equipo;
			filaA = { ...a, resultado: aGana ? "G" : "P", puntos: aGana ? 3 : 0 };
			filaB = { ...b, resultado: aGana ? "P" : "G", puntos: aGana ? 0 : 3 };
		} else if(va === vb){
			ganador = "Empate";
			filaA = { ...a, resultado:"E", puntos:1 };
			filaB = { ...b, resultado:"E", puntos:1 };
		} else {
			const aGana = va > vb;
			ganador = aGana ? a.equipo : b.equipo;
			filaA = { ...a, resultado: aGana ? "G" : "P", puntos: aGana ? 3 : 0 };
			filaB = { ...b, resultado: aGana ? "P" : "G", puntos: aGana ? 0 : 3 };
		}

		return {
			numero: i + 1,
			fecha: m.fecha,
			hora: m.hora,
			ganador,
			ob: !!m.ob,           // partido en observación
			motivo: m.motivo,     // motivo opcional del reclamo (tooltip)
			forzado: aForzado || bForzado, // cambio aqui: true si el resultado se forzó con win:true
			contarStat: m[statKey] === false ? false : true,
			filas: [filaA, filaB],
		};
	});
}

// Suma goles/sets y puntos de cada equipo a partir de los partidos ya calculados.
// El orden final se define en renderStandings: primero por puntos, luego por statKey.
function computeStandings(processedMatches, statKey){
	const tabla = {};

	processedMatches.forEach(m=>{
		if(m.ob) return; // partido en observación no se cuenta en nada

		m.filas.forEach(f=>{
			if(!tabla[f.equipo]){
				tabla[f.equipo] = { equipo: f.equipo, pj: 0, [statKey]: 0, puntos: 0 };
			}
			tabla[f.equipo].pj += 1;
			// cambio aqui: goles/sets solo se suman al marcador si contarStat es true
			if(m.contarStat){
				tabla[f.equipo][statKey] += f[statKey];
			}
			tabla[f.equipo].puntos += f.puntos;
		});
	});

	return Object.values(tabla);
}

/* ------ RENDER ------ */
function badgeFor(r){
	if(r==="G") return '<span class="badge badge-g">G</span>';
	if(r==="P") return '<span class="badge badge-p">P</span>';
	return '<span class="badge badge-e">E</span>';
}

function renderStandings(targetId, rows, statKey, statLabel){
	const tbody = document.getElementById(targetId);
	const sorted = rows.slice().sort((a,b)=> b.puntos - a.puntos || b[statKey]-a[statKey]);

	// cambio aqui: ranking denso — equipos con mismos puntos y mismo goles/sets comparten puesto (1,1,1,2,3...)
	let puesto = 0;
	sorted.forEach((r,i)=>{
		if(i===0){
			puesto = 1;
		} else {
			const prev = sorted[i-1];
			const empatado = r.puntos === prev.puntos && r[statKey] === prev[statKey];
			if(!empatado) puesto += 1;
		}
		r._puesto = puesto;
	});

	tbody.innerHTML = sorted.map(r=>`
		<tr>
			<td><div class="rank-cell"><span class="rank-num ${r._puesto===1 ? 'rank-gold':''}">${r._puesto}</span>${r.equipo}</div></td>
			<td>${r.pj}</td>
			<td>${r[statKey]}</td>
			<td class="pts-cell">${r.puntos}</td>
		</tr>
	`).join("");
}

function renderMatches(targetId, matches, statKey, statLabel){
	const container = document.getElementById(targetId);

	// cambio aqui: se muestra del último partido jugado al primero (la numeración real no cambia)
	const matchesInvertidos = [...matches].reverse();

	container.innerHTML = matchesInvertidos.map(m => {
		// cambio aqui: prioridad de estado — observado (rojo) > forzado por reclamo (celeste) > normal (navy)
		const headClass = m.ob
			? "match-head observado"
			: (m.forzado ? "match-head forzado" : "match-head");

		const flagContent = m.ob
			? `<span class="obs-flag" title="${m.motivo ? m.motivo : 'Reclamo activo'}">⚠ En observación</span>`
			: (m.forzado
				? `Ganador (Por reclamo): <b>${m.ganador}</b>`
				: (m.ganador === "Empate" ? "Resultado: <b>Empate</b>" : "Ganador: <b>"+m.ganador+"</b>"));

		return `
		<div class="match-card">
			<div class="${headClass}">
				<div class="match-head-left">
					<span class="match-num">Partido ${m.numero}</span>
					<span class="match-meta"><span>${m.fecha}</span><span>·</span><span>${m.hora}</span></span>
				</div>
				<div class="match-result-flag">
					${flagContent}
				</div>
			</div>
			<div class="match-body">
				<table>
					<thead><tr><th>Equipo</th><th>${statLabel}</th><th>Result.</th><th>Ptos</th></tr></thead>
					<tbody>
						${m.filas.map(f=>`
							<tr>
								<td><div class="team-name"><span class="dot"></span>${f.equipo}</div></td>
								<td>${f[statKey]}</td>
								<td>${badgeFor(f.resultado)}</td>
								<td>${f.puntos}</td>
							</tr>
						`).join("")}
					</tbody>
				</table>
			</div>
		</div>
	`;}).join("");
}

/* ------ FASE FINAL (LLAVE) ------ */
// Decide el ganador de un cruce ya jugado: mayor valor gana; "ganadorManual" ('A'/'B') resuelve empates (penales, etc.)
function decideCruce(valorA, valorB, ganadorManual){
	if(ganadorManual === 'A') return true;
	if(ganadorManual === 'B') return false;
	if(valorA === valorB) return null; // empate sin definir todavía (ej. falta penales)
	return valorA > valorB;
}

function computeBracket(b){
	const sf = b.semifinales.map(m => {
		const jugado = m.valorA != null && m.valorB != null; // cambio aqui: si falta algún valor, el cruce no se ha jugado
		const resultado = jugado ? decideCruce(m.valorA, m.valorB, m.ganador) : null;
		const decidido = resultado !== null;
		return {
			equipoA:m.equipoA, valorA:m.valorA, aGana: decidido && resultado===true,
			equipoB:m.equipoB, valorB:m.valorB, bGana: decidido && resultado===false,
			jugado, decidido,
			ganador: decidido ? (resultado ? m.equipoA : m.equipoB) : null,
		};
	});

	const finA = sf[0].ganador; // null si semifinal 1 aún no se define
	const finB = sf[1].ganador; // null si semifinal 2 aún no se define
	const finalJugada = !!finA && !!finB && b.final.valorA != null && b.final.valorB != null;
	const resultadoFinal = finalJugada ? decideCruce(b.final.valorA, b.final.valorB, b.final.ganador) : null;
	const finalDecidida = resultadoFinal !== null;

	return {
		campeon: finalDecidida ? (resultadoFinal ? finA : finB) : null,
		finalistaA:{ equipo:finA, valor:b.final.valorA, gana:finalDecidida && resultadoFinal===true, jugado:finalJugada, decidido:finalDecidida },
		finalistaB:{ equipo:finB, valor:b.final.valorB, gana:finalDecidida && resultadoFinal===false, jugado:finalJugada, decidido:finalDecidida },
		sf1: sf[0], sf2: sf[1],
	};
}

function renderBracket(targetId, bracket){
	const container = document.getElementById(targetId);
	const r = computeBracket(bracket);

	// cambio aqui: si el cruce no se jugó (o no está decidido), se pinta "pending" en vez de win/lose
	const hoja = (nombre, valor, gana, jugado, decidido) => {
		const cls = !jugado ? 'pending' : (decidido ? (gana ? 'win':'lose') : 'pending');
		const val = jugado ? valor : '–';
		return `
			<div class="brk-kid ${cls}">
				<div class="brk-box"><span class="brk-name">${nombre || '-'}</span><span class="brk-val">${val}</span></div>
			</div>`;
	};

	const rama = (finalista, sf) => {
		const cls = !finalista.jugado ? 'pending' : (finalista.decidido ? (finalista.gana ? 'win':'lose') : 'pending');
		const val = finalista.jugado ? finalista.valor : '–';
		const stemCls = (sf.jugado && sf.decidido) ? 'win' : '';
		return `
			<div class="brk-kid ${cls}">
				<div class="brk-box"><span class="brk-name">${finalista.equipo || '-'}</span><span class="brk-val">${val}</span></div>
				<div class="brk-stem-single ${stemCls}"></div>
				<div class="brk-kids">
					${hoja(sf.equipoA, sf.valorA, sf.aGana, sf.jugado, sf.decidido)}
					${hoja(sf.equipoB, sf.valorB, sf.bGana, sf.jugado, sf.decidido)}
				</div>
			</div>`;
	};

	container.innerHTML = `
		<div class="brk-box brk-trophy ${r.campeon ? '' : 'pending'}">
			<span class="brk-trophy-icon">🏆</span>
			<span class="brk-trophy-tag">CAMPEÓN</span>
			<span class="brk-team-name">${r.campeon || '-'}</span>
		</div>
		<div class="brk-stem-single ${r.campeon ? 'win':''}"></div>
		<div class="brk-kids">
			${rama(r.finalistaA, r.sf1)}
			${rama(r.finalistaB, r.sf2)}
		</div>
	`;
}

/* ------ TABS ------ */
// cambio aqui: los tabs se inicializan primero, así funcionan
// aunque algo falle más abajo al procesar los datos de un deporte
document.querySelectorAll(".tab-btn").forEach(btn=>{
	btn.addEventListener("click", ()=>{
		document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
		document.querySelectorAll(".pane").forEach(p=>p.classList.remove("active"));
		btn.classList.add("active");
		document.getElementById(btn.dataset.target).classList.add("active");
	});
});

/* ------ PROCESAR + PINTAR ------ */
// cambio aqui: cada deporte va en su propio try/catch — si futbol-femenino.js
// no cargó (o tiene un error), fútbol y vóley igual se pintan y los tabs funcionan
try{
	const futbolMatchesProcessed = computeMatches(futbolMatches, "goles");
	const futbolStandingsComputed = computeStandings(futbolMatchesProcessed, "goles");
	renderStandings("futbol-standings", futbolStandingsComputed, "goles", "Goles");
	renderMatches("futbol-matches", futbolMatchesProcessed, "goles", "Goles");
	renderBracket("futbol-bracket", futbolBracket); // cambio aqui: fase final de fútbol
}catch(err){
	console.error("Error procesando fútbol masculino:", err);
}

try{
	const voleyMatchesProcessed = computeMatches(voleyMatches, "sets");
	const voleyStandingsComputed = computeStandings(voleyMatchesProcessed, "sets");
	renderStandings("voley-standings", voleyStandingsComputed, "sets", "Sets");
	renderMatches("voley-matches", voleyMatchesProcessed, "sets", "Sets");
	renderBracket("voley-bracket", voleyBracket); // cambio aqui: fase final de vóley
}catch(err){
	console.error("Error procesando vóley:", err);
}

try{
	const futbolFemMatchesProcessed = computeMatches(futbolFemMatches, "goles");
	const futbolFemStandingsComputed = computeStandings(futbolFemMatchesProcessed, "goles");
	renderStandings("futbolf-standings", futbolFemStandingsComputed, "goles", "Goles");
	renderMatches("futbolf-matches", futbolFemMatchesProcessed, "goles", "Goles");
	renderBracket("futbolf-bracket", futbolFemBracket); // cambio aqui: fase final de fútbol femenino
}catch(err){
	console.error("Error procesando fútbol femenino:", err);
}