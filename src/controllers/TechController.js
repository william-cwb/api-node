const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, { include: { association: 'techs' } });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        return res.json(user.techs);
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const [tech, created] = await Tech.findOrCreate({
            where: { name }
        })

        await user.addTech(tech);

        return res.json(tech);
    },

    async delete(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const tech = await Tech.findOne({
            where: { name }
        })

        await user.removeTech(tech);

        return res.json({})
    }
}