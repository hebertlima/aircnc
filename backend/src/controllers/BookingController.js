const Booking = require('../models/Booking');

module.exports = {
    async store(request, response) {
        const { user } = request.headers;
        const { id: spot } = request.params;
        const { date } = request.body;

        const booking = await Booking.create({
            date,
            user,
            spot
        });

        await booking.populate('spot').populate('user').execPopulate();

        return response.json(booking);
    }
}