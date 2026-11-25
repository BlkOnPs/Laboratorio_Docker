const { Role } = require('../models');

const getRoles = async () => {
    const roles = await Role.findAll({
        order: [['name', 'ASC']],
        raw: true
    });
    console.log(roles);
    return roles;
};

module.exports = {
    getRoles
}