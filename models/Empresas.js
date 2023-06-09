const Sequelize = require('sequelize')
const { db } = require('../config/')
const Vacantes = require('./Vacantes')

const Empresas = db.define('empresas', {
    empresaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreEmpresa: Sequelize.STRING,
    password: {type: Sequelize.STRING(100),allowNull: true,},
    descripcion:{type: Sequelize.STRING, allowNull:false},
    ciudad: {type: Sequelize.STRING, allowNull:false},
    logo: {type: Sequelize.STRING, allowNull:true},
    rfc: {type: Sequelize.STRING(32), allowNull:false},
    giro: {type: Sequelize.STRING, allowNull:false},
    razonSocial: {type: Sequelize.STRING(32), allowNull:false},
    email: {type: Sequelize.STRING(32), allowNull:false},
    telefonoEmpresa: {type: Sequelize.STRING(32), allowNull:false},
    sitioWeb: {type: Sequelize.STRING(32), allowNull:false},
    fechaRegistro: {type: Sequelize.DATEONLY,allowNull: true, defaultValue: Sequelize.NOW},
    direccion: {type: Sequelize.STRING, allowNull:false},
    colonia: {type: Sequelize.STRING, allowNull:false},
    ciudad: {type: Sequelize.STRING(32), allowNull:false},
    codigoPostal: {type: Sequelize.STRING(32), allowNull:false},
    estado: {type: Sequelize.STRING(32), allowNull:false},
    nombreReclutador: {type: Sequelize.STRING, allowNull:false},
    emailReclutador: {type: Sequelize.STRING(32), allowNull:false},
    telefonoReclutador:{type: Sequelize.STRING(32), allowNull:false},
    usuario:{type: Sequelize.STRING(32), allowNull:true},
    status:{type: Sequelize.INTEGER(1),allowNull: true, defaultValue: 2},
})

// Empresas.hasMany(Vacantes, {
//     foreignKey: {
//         name: 'empresaId',
//         allowNull: true
//     }
// })
Vacantes.belongsTo(Empresas, {
    foreignKey: {
        name: 'empresaId',
        allowNull: true
    }
});

module.exports = Empresas;