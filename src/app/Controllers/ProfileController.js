const knex = require('../../database')

class ProfileController {
    async index(request, resposne) {
        const ong_id = request.headers.authorization
        const incidentsList = await knex('incidents')
            .select('*')
            .where('ong_id', ong_id)
        return resposne.json(incidentsList)
    }
}

module.exports = new ProfileController()