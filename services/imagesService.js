/**
 * Servicio para la carga de imágenes localmante
 */

const path = require("path");
const fs = require("fs");
// const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary');
/**
 * Se intenta almacenar una imagen de forma local y generarle un nombre único.
 * @param file que se va almacenar localmente.
 * @returns Devuelve una respuesta {ok,message,data:Url del imagen} con el resultado de la operación.
 */
const uploadImage = async (file) => {

	// Validar que exista el archivo
	if (!file) {
		return {
			ok: false,
			message: "No hay ningún archivo para subir.",
			data: null
		};
	}

	// Validar extension
	const fileNameSegments = file.name.split('.'); // archivo.ejemplo.ext
	const fileExtension = fileNameSegments[fileNameSegments.length - 1]; // .ext

	const validateExtensions = ['png', 'jpg', 'jpeg', 'gif'];

	if (!validateExtensions.includes(fileExtension)) {
		return {
			ok: false,
			message: "Tipo de archivo no permitido, sólo se permiten imágenes.",
			data: null
		};
	}

	// Generar el nombre del archivo
	const filename = `${uuidv4()}.${fileExtension}`;
	// Path para guardar a imagen
	const path = `uploads/${filename}`;

	try {
		// Mover la imagen
		let newPath
		await file.mv(path);
		//AQUI TA SE MOVIO LA IMAGEN
		console.log(path)
		console.log("inicio--------")

    await cloudinary.uploader.upload(path,
			(result)=> { 
				console.log("mitad--------")
				console.log(result) 
				newPath = result.url
			})

		// Si todo está correcto, devuelve la ruta de donde se guardó
		return {
			ok: true,
			message: "Imagen guardada correctamente.",
			data: newPath
		};
	} catch (error) {
		console.log(error)
		return {
			ok: false,
			message: "No se pudo cargar la imagen.",
			data: "nosrivio"
		};
	}
}

/**
 * Intenta obtener la dirección de la imagen que se busca, sino existe, devuelve una por defecto.
 * @param fileName Nombre del archivo de la imagen que se quiere consultar.
 * @returns Devuelve una respuesta (ok, message, data) con la ruta local del archivo.
 */
const getImage = (fileName) => {
	// let pathImg = path.join(__dirname, `../uploads/${fileName}`);
	let pathImg =  `https://bolsa-uaq-api-2022.herokuapp.com/api/uploads/${fileName}`;

	console.log(pathImg);
	console.log('--------------',fileName)

	// imagen por defecto
	// if (!fs.existsSync(pathImg)) {
	// Si no existe la imagen, se cambia a una por defecto
	// 	pathImg = path.join(__dirname, "../uploads/no-image.jpg");
	// }

	return {
		ok: true,
		message: null,
		data: pathImg
	};
}

/**
 * Intenta eliminar una imagen local desde la ruta local del archivo.
 * @param path Dirección local de la imagen que se quiere eliminar.
 * @returns Devuelve una respuesta (ok, message, data) con el resultado de la operación.
 */
const deleteImage = (path) => {

	if (fs.existsSync(path)) {

		fs.unlinkSync(path);
		return {
			ok: true,
			message: "Imagen eliminada correctamente.",
			data: path
		};
	}

	return {
		ok: false,
		message: "La imagen no existe o ya fue eliminada.",
		data: null
	};

}

module.exports = {
	uploadImage,
	getImage,
	deleteImage
};