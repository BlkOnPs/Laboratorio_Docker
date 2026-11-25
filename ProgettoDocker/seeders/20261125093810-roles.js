'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'Dipendente',
        description: "È il lavoratore assunto dall'azienda che svolge le mansioni previste dal suo contratto."
      },
      {
        name: 'Operaio',
        description: 'Svolge lavoro manuale, produttivo o logistico, spesso in fabbrica o in magazzino.'
      },
      {
        name: 'Commerciale',
        description: 'Gestisce i rapporti con i clienti e si occupa della vendita di prodotti o servizi.'
      },
      {
        name: 'Impiegato',
        description: "Svolge lavoro d'ufficio, amministrativo, contabile o tecnico."
      },
      {
        name: 'Segretario',
        description: "Gestisce la corrispondenza, gli appuntamenti e l'organizzazione generale dell'ufficio."
      },
      {
        name: 'Contabile',
        description: "Si occupa della gestione finanziaria, delle fatture e dei bilanci dell'azienda."
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};