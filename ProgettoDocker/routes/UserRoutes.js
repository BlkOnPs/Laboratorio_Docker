const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const RoleController = require('../controllers/RoleController');

router.get('/', async (req, res) => {
    const users = await UserController.getUsers();
    res.render('index', { title: 'Lista utenti', users });
});

router.get('/create', async (req, res) => {
    const roles = await RoleController.getRoles();
    res.render('create', { title: 'Creazione nuovo utente', roles });
});

router.post('/store', UserController.storeUser);

router.get('/show/:id', async (req, res) => {
    const user = await UserController.getUser(req);
    res.render('show', { title: 'Dettagli utente', user });
});

router.get('/edit/:id', async (req, res) => {
    const roles = await RoleController.getRoles();
    const user = await UserController.getUser(req);
    res.render('edit', { title: 'Modifica ', user, roles});
});

router.post('/update/:id', UserController.updateUser);

router.post('/delete/:id', UserController.deleteUser);

module.exports = router;