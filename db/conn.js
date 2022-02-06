const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('brainstormingdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

})

try{
    sequelize.authenticate()
    console.log('Conectamos ao sequelize')
}catch(err){
    console.log(`Nao foi possivel conectar: ${err}`)
}

module.exports = sequelize