const Address = require('../models/Address')
const User = require('../models/User');
const { associations } = require('../models/User');

module.exports = {

    async index(req, res) {

        const { user_id } = req.params

        const user = await User.findByPk(user_id, { include: { association: 'addresses' } });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        return res.json(user);
    },

    async store(req, res) {
        const { zipcode, street, number } = req.body;
        const { user_id } = req.params;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const address = await Address.create({ zipcode, street, number, user_id });

        return res.json(address);
    },
}