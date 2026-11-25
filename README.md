# Portale Aziendale - CRUD Utenti

Un semplice progetto CRUD sviluppato con **Node.js**, **Express.js**, **Sequelize**, **MySQL** e **Handlebars**, containerizzato tramite **Docker** e **Docker Compose**.

L'applicazione permette di gestire gli utenti di un'azienda attraverso un'interfaccia web moderna e intuitiva.

---

## Descrizione

Il progetto consente di:

- Visualizzare la lista degli utenti.
- Visualizzare il dettaglio di un utente.
- Creare un nuovo utente.
- Modificare un utente esistente.
- Eliminare un utente.
- Associare un ruolo a ogni utente tramite una relazione con il database.
- Validare i dati inseriti nei form.

L'obiettivo del progetto è dimostrare l'utilizzo dello stack Node.js con un database relazionale, l'ORM Sequelize e la containerizzazione mediante Docker.

---

# Stack Tecnologico

## Backend
- Node.js
- Express.js
- Sequelize ORM

## Database
- MySQL 8.4

## Frontend
- Handlebars (.hbs)
- HTML5
- CSS3
- Bootstrap Icons

## DevOps
- Docker
- Docker Compose

---

# Linguaggi utilizzati

- JavaScript
- HTML
- CSS
- SQL
- YAML
- Dockerfile

---

# Dipendenze principali

- express
- express-handlebars
- sequelize
- mysql2
- dotenv

---

# Struttura del progetto

```text
.
├── config/
│   └── config.js
│
├── controllers/
│   ├── RoleController.js
│   └── UserController.js
│
├── migrations/
│   ├── create-roles.js
│   └── create-users.js
│
├── models/
│   ├── index.js
│   ├── Role.js
│   └── User.js
│
├── routes/
│   └── index.js
│
├── seeders/
│   ├── roles.js
│   └── users.js
│
├── views/
│   ├── layouts/
│   ├── create.hbs
│   ├── edit.hbs
│   ├── index.hbs
│   └── show.hbs
│
├── public/
│   └── style.css
│
├── app.js
├── package.json
├── package-lock.json
├── Dockerfile
├── docker-compose.yaml
├── .env
└── README.md
```

---

# Database

Il database utilizzato è MySQL e si chiama `azienda_portale`.

È composto principalmente da due tabelle.

## Roles

| Campo | Tipo |
|---|---|
| id | INT (PK) |
| name | VARCHAR(255) |
| description | TEXT |

## Users

| Campo | Tipo |
|---|---|
| id | INT (PK) |
| name | VARCHAR(255) |
| surname | VARCHAR(255) |
| address | VARCHAR(255) |
| city | VARCHAR(255) |
| phone_number | VARCHAR(255) |
| role_id | INT (FK) |

### Relazione

```text
Role (1)
   |
   |
   V
User (N)
```

Un ruolo può essere associato a molti utenti, mentre ogni utente è associato a un solo ruolo.

La relazione viene gestita tramite Sequelize attraverso le associazioni tra i modelli.

---

# Installazione e avvio del progetto

## 1. Prerequisiti

Per avviare il progetto tramite Docker sono necessari:

- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Non è necessario installare manualmente Node.js o MySQL sul computer, perché vengono eseguiti all'interno dei rispettivi container Docker.

Prima di procedere, assicurarsi che Docker Desktop sia avviato.

## 2. Clonare il progetto da GitHub

Aprire il terminale e clonare il repository:

```bash
git clone <URL_DEL_REPOSITORY>
```

Entrare nella cartella del progetto:

```bash
cd Laboratorio_Docker/ProgettoDocker
```

Sostituire `<URL_DEL_REPOSITORY>` con il link HTTPS del repository GitHub.

## 3. Configurare il file .env

Nella cartella principale del progetto creare un file chiamato `.env`.

Inserire le seguenti variabili:

```env
# Porta dell'applicazione sul computer host
PORT=3000

# Configurazione database MySQL
DB_HOST=db
DB_PORT=3306

DB_NAME=azienda_portale
DB_USERNAME=appuser
DB_PASSWORD=app_password

# Password dell'utente root di MySQL
DB_ROOT_PASSWORD=pass
```

**Importante:**
- `DB_HOST=db` corrisponde al nome del servizio MySQL definito nel Docker Compose.
- `DB_PORT=3306` è la porta interna di MySQL.
- `PORT=3000` è la porta utilizzata per accedere all'applicazione dal browser.
- Le credenziali devono essere coerenti con quelle definite nel `docker-compose.yaml`.

Il file `.env` non deve essere caricato su GitHub, perché contiene informazioni di configurazione e credenziali.

## 4. Costruire e avviare il progetto

Dalla cartella principale del progetto eseguire:

```bash
docker compose up --build
```

Questo comando costruisce le immagini Docker e avvia automaticamente i container.

Docker Compose gestisce l'ordine di avvio dei servizi e le relative dipendenze.

### Ordine di esecuzione

1. **MySQL (`db`)**: avvia il database.
2. **Healthcheck**: verifica che MySQL sia effettivamente pronto.
3. **Migrations (`migrate`)**: crea le tabelle del database tramite Sequelize.
4. **Seeders (`migrate`)**: inserisce i dati iniziali nelle tabelle.
5. **Applicazione (`app`)**: avvia il server Node.js.

Le migrations e i seeders vengono eseguiti automaticamente grazie al comando configurato nel `docker-compose.yaml`:

```bash
npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
```

L'applicazione parte solamente quando il servizio `migrate` termina correttamente.

## 5. Accedere all'applicazione

Una volta completato l'avvio, aprire il browser e visitare:

```text
http://localhost:3000
```

L'applicazione sarà disponibile attraverso la porta configurata nel file `.env`.

---

# Gestione dei container

## Avviare i container in background

```bash
docker compose up -d
```

## Visualizzare i container attivi

```bash
docker compose ps
```

## Visualizzare i log

```bash
docker compose logs
```

Per visualizzare i log dell'applicazione:

```bash
docker compose logs -f app
```

Per visualizzare i log delle migrations e dei seeders:

```bash
docker compose logs migrate
```

## Arrestare i container

```bash
docker compose down
```

Questo comando arresta ed elimina i container, ma **mantiene i dati del database** grazie al volume persistente.

## Ricostruire le immagini

```bash
docker compose up --build
```

Questo comando ricostruisce le immagini e avvia nuovamente i servizi.

## Eliminare anche i dati del database

```bash
docker compose down -v
```

**Attenzione:** questo comando elimina anche i volumi Docker e quindi i dati persistenti di MySQL. Al successivo avvio il database verrà inizializzato nuovamente.

---

# Funzionalità

- Lista utenti.
- Visualizzazione dettaglio utente.
- Creazione utente.
- Modifica utente.
- Eliminazione utente.
- Associazione di un ruolo all'utente.
- Validazione dei form.
- Gestione delle relazioni tramite Sequelize.
- Creazione automatica delle tabelle tramite migrations.
- Inserimento dei dati iniziali tramite seeders.
- Persistenza del database tramite Docker Volume.

---

# Architettura

Il progetto segue il pattern architetturale MVC (Model-View-Controller).

```text
       Routes
          |
          V
      Controller
          |
          V
        Model
          |
          V
       Database

      Controller
          |
          V
         View
```

- **Models** → gestione dei dati e delle relazioni con il database tramite Sequelize.
- **Controllers** → gestione della logica applicativa.
- **Routes** → gestione delle richieste HTTP.
- **Views** → interfaccia utente realizzata con Handlebars.

---

# Rotte principali

| Metodo | Rotta | Descrizione |
|---|---|---|
| GET | `/` | Lista utenti |
| GET | `/create` | Form creazione utente |
| POST | `/store` | Salvataggio utente |
| GET | `/show/:id` | Dettaglio utente |
| GET | `/edit/:id` | Modifica utente |
| POST | `/update/:id` | Aggiornamento utente |
| POST | `/delete/:id` | Eliminazione utente |

---

# Ulteriori informazioni

Nome e cognome studente: **Amel Cehic**

Classe: **I4BD**

Materia: **Laboratorio di approfondimento 2 (Docker)**

Data consegna: **25.11.2026**

SAMT - Centro professionale tecnico
