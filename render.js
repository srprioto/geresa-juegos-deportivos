function calcularMatches(rawMatches, statKey){
	return rawMatches.map((m, i) => {
		const [a, b] = m.filas;
		const va = a[statKey];
		const vb = b[statKey];

		let ganador, filaA, filaB;

		if(va === vb){
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
			filas: [filaA, filaB],
		};
	});
}

function calcularClasif(processedMatches, statKey){
	const tabla = {};

	processedMatches.forEach(m=>{
		m.filas.forEach(f=>{
			if(!tabla[f.equipo]){
				tabla[f.equipo] = { equipo: f.equipo, [statKey]: 0, puntos: 0 };
			}
			tabla[f.equipo][statKey] += f[statKey];
			tabla[f.equipo].puntos   += f.puntos;
		});
	});

	return Object.values(tabla);
}

// RENDER
function badgeFor(r){
	if(r==="G") return '<span class="badge badge-g">G</span>';
	if(r==="P") return '<span class="badge badge-p">P</span>';
	return '<span class="badge badge-e">E</span>';
}

function renderClasif(targetId, rows, statKey, statLabel){
	const tbody = document.getElementById(targetId);
	tbody.innerHTML = rows
	.slice()
	.sort((a,b)=> b.puntos - a.puntos || b[statKey]-a[statKey])
	.map((r,i)=>`
		<tr>
			<td><div class="rank-cell"><span class="rank-num">${i+1}</span>${r.equipo}</div></td>
			<td>${r[statKey]}</td>
			<td class="pts-cell">${r.puntos}</td>
		</tr>
	`).join("");
}

function renderMatches(targetId, matches, statKey, statLabel){
	const container = document.getElementById(targetId);
	container.innerHTML = matches.map(m => `
		<div class="match-card">
			<div class="match-head">
				<div class="match-head-left">
					<span class="match-num">Partido ${m.numero}</span>
					<span class="match-meta"><span>${m.fecha}</span><span>·</span><span>${m.hora}</span></span>
				</div>
				<div class="match-result-flag">
					${m.ganador === "Empate" ? "Resultado: <b>Empate</b>" : "Ganador: <b>"+m.ganador+"</b>"}
				</div>
			</div>
			<div class="match-body">
				<table>
					<thead><tr><th>Equipo</th><th>${statLabel}</th><th>Resultado</th><th>Puntos</th></tr></thead>
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
	`).join("");
}

// Escribir
const futbolMatchesProcessed = calcularMatches(futbolMatches, "goles");
const voleyMatchesProcessed  = calcularMatches(voleyMatches, "sets");

const futbolStandingsComputed = calcularClasif(futbolMatchesProcessed, "goles");
const voleyStandingsComputed  = calcularClasif(voleyMatchesProcessed, "sets");

renderClasif("futbol-standings", futbolStandingsComputed, "goles", "Goles");
renderMatches("futbol-matches", futbolMatchesProcessed, "goles", "Goles");

renderClasif("voley-standings", voleyStandingsComputed, "sets", "Sets");
renderMatches("voley-matches", voleyMatchesProcessed, "sets", "Sets");

/* ---------------- TABS ---------------- */
document.querySelectorAll(".tab-btn").forEach(btn=>{
	btn.addEventListener("click", ()=>{
		document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
		document.querySelectorAll(".pane").forEach(p=>p.classList.remove("active"));
		btn.classList.add("active");
		document.getElementById(btn.dataset.target).classList.add("active");
	});
});