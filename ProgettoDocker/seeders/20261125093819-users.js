'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Mario',
        surname: 'Rossi',
        address: 'Via Roma 10',
        city: 'Milano',
        phone_number: '3471234567',
        role_id: 1
      },
      {
        name: 'Laura',
        surname: 'Bianchi',
        address: 'Via Verdi 25',
        city: 'Torino',
        phone_number: '3482345678',
        role_id: 1
      },
      {
        name: 'Giuseppe',
        surname: 'Ferrari',
        address: 'Via Dante 15',
        city: 'Bergamo',
        phone_number: '3493456789',
        role_id: 2
      },
      {
        name: 'Antonio',
        surname: 'Russo',
        address: 'Via Manzoni 7',
        city: 'Brescia',
        phone_number: '3504567890',
        role_id: 2
      },
      {
        name: 'Marco',
        surname: 'Esposito',
        address: 'Via Torino 40',
        city: 'Napoli',
        phone_number: '3515678901',
        role_id: 3
      },
      {
        name: 'Chiara',
        surname: 'Romano',
        address: 'Via Mazzini 18',
        city: 'Bologna',
        phone_number: '3526789012',
        role_id: 3
      },
      {
        name: 'Elena',
        surname: 'Greco',
        address: 'Via Garibaldi 55',
        city: 'Firenze',
        phone_number: '3537890123',
        role_id: 4
      },
      {
        name: 'Paolo',
        surname: 'Conti',
        address: 'Via Leopardi 12',
        city: 'Genova',
        phone_number: '3548901234',
        role_id: 4
      },
      {
        name: 'Sara',
        surname: 'Gallo',
        address: 'Via Carducci 8',
        city: 'Padova',
        phone_number: '3559012345',
        role_id: 5
      },
      {
        name: 'Valentina',
        surname: 'Ricci',
        address: 'Via Colombo 22',
        city: 'Verona',
        phone_number: '3560123456',
        role_id: 5
      },
      {
        name: 'Luca',
        surname: 'Moretti',
        address: 'Via XX Settembre 30',
        city: 'Parma',
        phone_number: '3571234567',
        role_id: 6
      },
      {
        name: 'Federica',
        surname: 'Marini',
        address: 'Via Cavour 14',
        city: 'Modena',
        phone_number: '3582345678',
        role_id: 6
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};