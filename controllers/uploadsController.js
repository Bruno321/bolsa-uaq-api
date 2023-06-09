const path = require("path");
const { imagesService } = require("../services/");
const cloudinary = require('cloudinary');
const fs = require('fs');

const getImage = (req, res) => {
	const { filename } = req.params;
	// const response = imagesService.getImage(filename); // Busca la ruta del archivo

	// res.sendFile(response.data); // Devuelve el archivo correspondiente
	
	// console.log(filename);
	// console.log(__dirname);
	// res.sendFile(filename , { root: __dirname });

	// let pathImg = path.join('api', 'uploads', filename);

	res.sendFile(filename, { root: path.join(__dirname, `../uploads`, 'uploads') });
}

const uploadImage = async (req, res) => {
	const file = req.files?.imagen;
	const response = await imagesService.uploadImage(file); // intenta cargar el archivo

	if (!response.ok) {
		return res.status(400).json({
			ok: false,
			message: response.message,
		});
	}

	res.json({
		ok: true,
		message: response.message,
		data: response.data
	});

}

module.exports = {
	getImage,
	uploadImage
}; 