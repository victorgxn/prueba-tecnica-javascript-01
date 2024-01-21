const btnAgregarLista = document.getElementById('agregar-lista');

const cargarLibros = async () => {
	const respuesta = await fetch("books.json");

	const datos = await respuesta.json();
	console.log(datos); // Contenido de books.json en la consola.

	let librosHTML = "";
	datos.library.forEach((item) => {
		const libro = item.book;
		librosHTML += `
		<div class="col-md-3 col-sm-6 mb-4">
			<div class="border p-3 d-flex flex-column align-items-center">
					<img class="img-fluid rounded mb-2" src="${libro.cover}">
					<h5 class="font-weight-bold titulo-libro text-center">${libro.title}</h5>
					<p class="text-center">${libro.genre}</p>
					<button class="btn btn-primary mt-auto" id="agregar-lista">Añadir</button>
			</div>
		</div>
	`;

	});

	let contadorLibros = `${datos.library.length} libros disponibles`;
	document.getElementById("colgar").innerHTML = librosHTML;
	document.getElementById('libros-disponibles').innerHTML = contadorLibros;
};

cargarLibros();


btnAgregarLista.addEventListener("click", añadirLista);
btnEliminarLista.addEventListener("click", eliminarLista);