const express = require('express');
const path = require('path');
const debug = require('debug')('app');
const morgan = require('morgan');
const sql = require('mssql');

const config = {
	user: 'Dani',
	password: 'Patataninja8',
	server: 'skylab-dani.database.windows.net',
	database: 'tohdb',
	option: {
		encrypt: true
	}
};

sql.connect(config).catch(debug);
const laberRoutes = require('./src/laberRoutes')();

const app = express();
const PORT = 3030;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', laberRoutes);
sql.connect(config).catch(debug);
app.listen(PORT, () => debug(`Server is running in port...`));
