require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { engine } = require('express-handlebars');

const userRoutes = require('./routes/UserRoutes');

app.engine('hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`App in ascolto --> localhost:${process.env.PORT}`)
});