const knex = require('../../database')

class SessionController {
    async create(request,response) {
        const { id } = request.body
        const ongData =  await knex('ongs')
            .select('name')
            .where('id', id)
            .first()
        if(!ongData)
            return response.status(404).json({ error:'ong não encontrada' })

        return  response.json(ongData)
    }
}

module.exports = new SessionController()