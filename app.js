let libreriaArr = [];
let listaLecturaArr = [];

// * Apartado 1 - Cargar Libros

const cargarLibros = async () => {
	const respuesta = await fetch("books.json");
	const datos = await respuesta.json();
	datos.library.forEach((item) => {
		const libro = item.book;
		libreriaArr.push(libro);
	});

	actualizarLibros();
};

// * Apartado 4 - Sincronizacion de estado

//TODO Funcion principal del ejercicio, actualiza la libreria, la lista de lectura y los contadores de ambos
function actualizarLibros() {
	//! Contadores de libros disponibles y libros en la lista de lectura
	document.getElementById("libros-disponibles").innerHTML = `${libreriaArr.length} libros disponibles <i class="bi bi-book"></i>`;
	document.getElementById("libros-lista-lectura").innerHTML = `Tienes ${listaLecturaArr.length} libros en tu lista de lectura`;

	//! Código que actualiza la lista de libros
	let librosHTML = "";
	libreriaArr.forEach((libro) => {
		librosHTML += `
		<div class="col-md-4 col-sm-6 mb-4">
			<div class="border p-3 d-flex flex-column align-items-center">
				<img class="img-fluid rounded mb-2" src="${libro.cover}">
				<h5 class="font-weight-bold titulo-libro text-center">${libro.title}</h5>
				<p class="text-center">${libro.genre}</p>
				<button class="btn btn-primary mt-auto agregar-lista" value=${libro.ISBN}>Añadir</button>
			</div>
		</div>
		`;
	});
	//Lo colgamos del div correspondiente del html
	document.getElementById("colgar-libros").innerHTML = librosHTML;

	//! Código que actualiza la lista de lectura
	let libroLectura = "";
	listaLecturaArr.forEach((libro) => {
		libroLectura += `
		<div class="col-md-12 col-sm-6 mb-4">
			<div class="border p-3 d-flex flex-column align-items-center">
				<img class="img-fluid rounded mb-2" src="${libro.cover}">
				<h5 class="font-weight-bold titulo-libro-lista text-center">${libro.title}</h5>
				<p class="text-center">${libro.genre}</p>
				<button class="btn btn-primary mt-auto eliminar-lista" value=${libro.ISBN}>Eliminar</button>
			</div>
		</div>
		`;
	});
	//Lo colgamos del div correspondiente del html
	document.getElementById('colgar-lista-lectura').innerHTML = libroLectura;
	vincularEventListeners();
}

// * Apartado 2 - Creacion de la lista de lectura

//? Codigo para añadir a la lista de lectura
//TODO Funcion para cuando se añade un libro a la lista
function anadirLista(libro) {
	const isbn = libro.value;
	let posicion = libreriaArr.findIndex(libro => libro.ISBN === isbn);
	if (posicion !== -1) {
		meterListaLectura(posicion);
	} else {
		console.error("Libro no encontrado");
	}
}

//TODO Actualizar la lista de los arrays LibreriaArr y listaLecturaArr
function meterListaLectura(posicion) {
	let librosEliminados = libreriaArr.splice(posicion, 1);
	let libroLectura = librosEliminados[0]; // Extrae el libro del array.
	listaLecturaArr.push(libroLectura);
	actualizarLibros();
}

//? Codigo para eliminar de la lista de lectura
function eliminarLista(libro) {
	const isbn = libro.value;
	let posicion = listaLecturaArr.findIndex(libro => libro.ISBN === isbn);
	if (posicion !== -1) {
		sacarListaLectura(posicion);
	} else {
		console.error("Libro no encontrado");
	}
}

function sacarListaLectura(posicion) {
	let librosEliminados = listaLecturaArr.splice(posicion, 1);
	let libroLectura = librosEliminados[0]; // Extrae el libro del array.
	libreriaArr.push(libroLectura);
	actualizarLibros();
}

// * Apartado 3 - Filtrado de Libros por Género

//TODO Ordena los libros por genero
function ordenarPorGenero(selectedValue) {
	console.log('Opción seleccionada:', selectedValue);
	let contador = 0;
	let librosHTML = "";
	libreriaArr.forEach((libro) => {
		if (libro.genre === selectedValue) {
			contador++;
			librosHTML += `
		<div class="col-md-4 col-sm-6 mb-4">
			<div class="border p-3 d-flex flex-column align-items-center">
				<img class="img-fluid rounded mb-2" src="${libro.cover}">
				<h5 class="font-weight-bold titulo-libro text-center">${libro.title}</h5>
				<p class="text-center">${libro.genre}</p>
				<button class="btn btn-primary mt-auto agregar-lista" value=${libro.ISBN}>Añadir</button>
			</div>
		</div>
		`;
		}

	});
	document.getElementById("colgar-libros").innerHTML = librosHTML;
	document.getElementById('cantidad-libros-genero').textContent = `Hay ${contador} libros de ${selectedValue}`;
}

//TODO Evento para cada option
const generoSeleccionado = document.getElementById('filtrar-genero');
generoSeleccionado.addEventListener('change', (event) => {
	const selectedValue = generoSeleccionado.value;
	ordenarPorGenero(selectedValue);
});

//TODO Vincular eventos a cada boton
function vincularEventListeners() {
	//Añadir evento click por cada boton de la libreria
	document.querySelectorAll(".agregar-lista").forEach(e =>
		e.addEventListener("click", function (e) {
			anadirLista(e.target);
		}));

	//Añadir evento click por cada boton de la lista de lectura
	document.querySelectorAll(".eliminar-lista").forEach(e =>
		e.addEventListener("click", function (e) {
			eliminarLista(e.target);
		}));
}

//! Flujo del programa
cargarLibros();
console.log(libreriaArr);
