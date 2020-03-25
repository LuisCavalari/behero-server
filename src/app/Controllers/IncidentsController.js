const knex = require('../../database')

class IncidentesController {
    async store(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization
        const newIncident = await knex('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json(newIncident)
    }

    async index(request, response) {
        const { page = 1 } = request.query
        const offset = (page-1) * 5
        const limit = 5
        
        const [count] = await knex('incidents').count()
        response.header('X-total-count',count['count(*)'])

        const incidents = await knex('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .offset(offset)
        .limit(limit)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf'])

        return response.json(incidents)
    }

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await knex('incidents')
            .select('ong_id')
            .where('id', id)
            .first()


        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Não autorizado' })
        }

        await knex('incidents')
            .delete()
            .where('id', id)
        return response.json({
            ok:true
        })
    }

}

module.exports = new IncidentesController()