const { User, Role } = require('../models');

const getUsers = async () => {
    try {
        const users = await User.findAll({
            include: [{
                model: Role,
                as: 'role'
            }],
            raw: true,
            nest: true
        });

        return users;
    } catch (err) {
        console.error(err);
        return [];
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: {
                model: Role,
                as: 'role'
            }
        });
        return JSON.parse(JSON.stringify(user));
    } catch (err) {
        console.error(err);
        return null;
    }
};

const storeUser = async (req, res) => {
    const errors = validateUser(req.body);

    if (Object.keys(errors).length > 0) {
        const roles = await Role.findAll({ raw: true });

        return res.render('create', {
            title: 'Creazione nuovo utente',
            errors,
            roles,
            user: req.body
        });
    }

    try {
        await User.create({
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            city: req.body.city,
            phone_number: req.body.phone_number,
            role_id: req.body.role_id
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

const updateUser = async (req, res) => {

    const errors = validateUser(req.body);

    if (Object.keys(errors).length > 0) {

        const roles = await Role.findAll({ raw: true });

        return res.render('edit', {
            title: 'Modifica utente',
            errors,
            roles,
            user: {
                id: req.params.id,
                ...req.body
            }
        });
    }

    try {
        await User.update({
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            city: req.body.city,
            phone_number: req.body.phone_number,
            role_id: req.body.role_id
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

const validateUser = (body) => {
    const errors = {};

    if (!body.name || body.name.trim() === '') {
        errors.name = 'Il nome è obbligatorio.';
    }

    if (!body.surname || body.surname.trim() === '') {
        errors.surname = 'Il cognome è obbligatorio.';
    }

    if (!body.address || body.address.trim() === '') {
        errors.address = 'L\'indirizzo è obbligatorio.';
    }

    if (!body.city || body.city.trim() === '') {
        errors.city = 'La città è obbligatoria.';
    }

    if (!body.phone_number || body.phone_number.trim() === '') {
        errors.phone_number = 'Il numero di telefono è obbligatorio.';
    } else if (!/^[0-9+\s-]{6,20}$/.test(body.phone_number)) {
        errors.phone_number = 'Numero di telefono non valido.';
    }

    if (!body.role_id) {
        errors.role_id = 'Seleziona un ruolo.';
    }

    return errors;
};

const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};

module.exports = {
    getUsers,
    getUser,
    storeUser,
    updateUser,
    deleteUser
};