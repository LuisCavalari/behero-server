const crypto = require('crypto')
const knex = require('../../database')

class OngsController {
    async store(request, response) {
        const { name, email, whatsapp, city, uf } = request.body
        const id = crypto.randomBytes(4).toString('HEX')
        await knex('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        return response.json({ id })
    }
    async index (request,response) {
        const ongs = await knex('ongs').select('*')
        return response.json(ongs)
    }
}
module.exports = new OngsController()