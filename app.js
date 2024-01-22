const btnAgregarLista = document.getElementById("agregar-lista");
let libreriaArr = [];
let listaLecturaArr = [];

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
					<button class="btn btn-primary mt-auto" id="agregar-lista">Añadir</button>
			</div>
		</div>
	`;
	});

	document.getElementById("colgar").innerHTML = librosHTML;
	actualizarLibros();
};

function actualizarLibros() {
	let contadorLibros = `${libreriaArr.length} libros disponibles <i class="bi bi-book"></i>`;
	let contadorListaLectura = `Tienes ${listaLecturaArr.length} libros en tu lista de lectura`;
	document.getElementById("libros-disponibles").innerHTML = contadorLibros;
	document.getElementById("libros-lista-lectura").innerHTML = contadorListaLectura;
}

console.log(libreriaArr);

cargarLibros();


btnAgregarLista.addEventListener("click", añadirLista);
/*btnEliminarLista.addEventListener("click", eliminarLista);*/
