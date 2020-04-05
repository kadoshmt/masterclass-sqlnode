const { Op } = require('sequelize')
const User = require('../models/User')
module.exports = {
  async show(req, res) {
    // Encontrar todos os usuários com email gmail.com 
    // e que moram na Avenida Nigeria
    // e que tenham tecnologias que iniciam como React

    const users = await User.findAll({
      attributes: ['name', 'email'],
      where: {
        email: {
          [Op.iLike]: '%@gmail.com'
        }
      },
      include: [
        { 
          attributes: ['street', 'number', 'zipcode'], 
          association: 'addresses', where: { street: 'Avenida Nigeria' } 
        }, // endereços

        { 
          association: 'techs', 
          attributes: ['name'], 
          through: { attributes: [] }, // não retorna dados da tabela de relacionamento
          // required: false, // inclui o usuario memso que não tenha a tech (outer join)
          where: {
            name: {
              [Op.iLike]: 'React%'
            }
          }
        }, // Tecnologias
      ]
    })

    return res.json(users)
  }
}
