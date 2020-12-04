
// Constantes
const longitudX = 8;
const longitudY = 5;


// Variables
let alturas = {};



/**
 * Genera los bloques a partir de las constantes de arriba del todo.
*/

const generaBloques = () => {
	
	const main = document.querySelector(".fila");
	
	
	for (let _columna = 0; _columna < longitudX; _columna ++) {
		
		let columna = document.createElement("div");
		columna.className = "columna";
		
		
		for (let _altura = 0; _altura < longitudY; _altura ++) {
			
			let bloque = document.createElement("div");
			bloque.className = "bloque";
			bloque.onclick = () => pulsaBloque(_columna, _altura);
			bloque.id = `${_columna}_${_altura}`;
			
			columna.appendChild(bloque);
			
		};
		
		main.appendChild(columna);
		alturas[_columna] = 0;
		
	};
	
};



/**
 * Establece la altura de la columna y lanza el re-pintado de todos los bloques.
 * 
 * @param {number} x Columna
 * @param {number} y Fila
*/

const pulsaBloque = (x, y) => {
	
	alturas[x] = y;
	
	pintaBloques();
	pintaAgua();
};



/**
 * Pinta los bloques que están seleccionados.
*/
const pintaBloques = () => {
	
	for (let _columna = 0; _columna < longitudX; _columna ++) {
		for (let _altura = 0; _altura < longitudY; _altura ++) {
			
			let bloque = document.getElementById( `${_columna}_${_altura}`);
			
			if (alturas[_columna] >= _altura) {
				bloque.className = " bloque bloque-pintado";
			} else {
				bloque.className = "bloque bloque-oculto";
			}
			
		};
	};
	
};



/**
 * Pinta agua en los bloques que corresponde.
*/

const pintaAgua = () => {
	
	// Recorro las filas de arriba a abajo
	for (let _altura = longitudY; _altura > 0; _altura --) {	
		
		let idxPrimerBloque = null;
		let idxSegundoBloque = null;
		
		
		// Recorro los índices de la fila de 0 a X
		for (let _columna = 0; _columna < longitudX; _columna ++) {
			
			let alturaActual = alturas[_columna];
			
			
			// Compruebo si es un bloque
			if (_altura <= alturaActual) {
				
				if (idxPrimerBloque === null) { // Si no tengo primer bloque, lo pongo
					idxPrimerBloque = _columna;
				} else { // Si ya tengo el primero, pongo el segundo
					idxSegundoBloque = _columna;
				};
				
				
				if ((idxSegundoBloque - idxPrimerBloque) > 0) {
					pintaFilaAgua(_altura, idxPrimerBloque + 1, idxSegundoBloque - 1)
				};
				
			};
			
		};
		
	};
	
};



/**
 * Pinta agua en los bloques indicados.
 * 
 * @param {number} altura A qué altura se va a pintar
 * @param {number} desde Desde qué columna
 * @param {number} hasta Hasta qué columna
*/

const pintaFilaAgua = (altura, desde, hasta) => {
	
	for (let _columna = desde; _columna <= hasta; _columna ++) {
		
		let bloque = document.getElementById( `${_columna}_${altura}`);
		
		if (alturas[_columna] < altura) bloque.className = " bloque bloque-agua";
		
	};
	
};


/**
 * Reinicia todos los bloques.
*/

const pulsaVaciarTodo = () => {
	
	for (_key in alturas) {
		alturas[_key] = 0;
	};
	
	pintaBloques();
	
};


generaBloques();
pintaBloques();