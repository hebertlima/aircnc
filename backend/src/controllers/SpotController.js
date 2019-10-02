const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(request, response) {
        const { tech } = request.query;

        const spots = await Spot.find({ techs: tech });

        return response.json(spots);
    },
    async store(request, response) {

        const { filename: thumbnail } = request.file;
        const { company, price, techs } = request.body;
        const { user } = request.headers;

        const userAuth = await User.findById(user);

        if (!userAuth) {
            return response.status(400).json({ error: 'Users does not exists' });
        }

        const spot = await Spot.create({
            user,
            thumbnail,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price,
        })

        return response.json(spot);
    }
}