let libreriaArr = [];
let listaLecturaArr = [];

// * Apartado 1 - Cargar Libros
const cargarLibros = async () => {
	const respuesta = await fetch("books.json");

	const datos = await respuesta.json();

	let librosHTML = "";
	datos.library.forEach((item) => {
		const libro = item.book;
		// Guardamos todo los libros en un array externo
		libreriaArr.push(libro);
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

	document.getElementById("colgar-libros").innerHTML = librosHTML;
	actualizarLibros();
	vincularEventListeners();
};

//TODO Funcion auxiliar para actualizar el estado de los libros y la lista de lectura
function actualizarLibros() {
	let contadorLibros = `${libreriaArr.length} libros disponibles <i class="bi bi-book"></i>`;
	let contadorListaLectura = `Tienes ${listaLecturaArr.length} libros en tu lista de lectura`;
	document.getElementById("libros-disponibles").innerHTML = contadorLibros;
	document.getElementById("libros-lista-lectura").innerHTML = contadorListaLectura;
}

//* Apartado 2 - Creacion de la lista de lectura
//TODO Funcion para cuando se añade un libro a la lista
function anadirLista(libro) {
	const isbn = libro.value;
	let posicion = -1;
	for (let i = 0; i < libreriaArr.length; i++) {
		if (libreriaArr[i].ISBN == isbn) {
			posicion = i;
			break;
		}
	}
	meterListaLectura(posicion);
	//document.getElementById("colgar-lista-lectura").innerHTML = ;
}

function meterListaLectura(posicion) {
	console.log(`Funcion meterListaLectura --> Posicion del libro seleccionado ${posicion}`);
	let libroLectura = libreriaArr.splice(posicion, 1);
	listaLecturaArr.push(libroLectura);
	actualizarLibros();
}

//TODO Vincular eventos a cada boton
function vincularEventListeners() {
	document.querySelectorAll(".agregar-lista").forEach(e =>
		e.addEventListener("click", function (e) {
			anadirLista(e.target);
		}));
}

//!Flujo del programa
console.log(libreriaArr);
cargarLibros();

/*btnEliminarLista.addEventListener("click", eliminarLista);*/
