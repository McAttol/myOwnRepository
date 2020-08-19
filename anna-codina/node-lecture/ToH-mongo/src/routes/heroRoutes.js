const express = require('express');
const debug = require('debug')('app:heroRoutes');
const { MongoClient, ObjectId } = require('mongodb');

const heroRoutes = express.Router();

function router(nav) {
	heroRoutes.route('/').get((req, res) => {
		const url = 'mongodb://localhost:27017';
		const dbName = 'shieldHeroes';
		let client;
		(async function queryAll() {
			try {
				client = await MongoClient.connect(url);
				debug('conection stablished...');

				const db = client.db(dbName);

				const collection = await db.collection('heroes');

				const heroList = await collection.find().toArray();
				debug(heroList);
				res.render('list', { nav, heroList });
			} catch (error) {
				debug(error.stack);
			}
			client.close();
		})();
	});

	heroRoutes
		.route('/:heroId')
		.all((req, res, next) => {
			const id = req.params.heroId;
			const url = 'mongodb://localhost:27017';
			const dbName = 'shieldHeroes';
			const collectionName = 'heroes';
			let client;
			(async function queryId() {
				try {
					client = await MongoClient.connect(url);
					const db = client.db(dbName);
					const collection = await db.collection(collectionName);
					// res.hero = await collection.findOne({ id });
					res.hero = await collection.findOne({ _id: new ObjectId(id) });

					debug(res.hero);
					next();
				} catch (error) {
					debug(error.stack);
				}
				client.close();
			})();
		})
		.post((req, res) => {
			const updateQuery = { $set: req.body };
			const filter = { _id: new ObjectId(req.params.heroId) };
			const url = 'mongodb://localhost:27017';
			const dbName = 'shieldHeroes';
			const collectionName = 'heroes';
			let client;

			(async function mongo() {
				try {
					client = await MongoClient.connect(url);
					const db = client.db(dbName);
					const collection = await db.collection(collectionName);
					await collection.updateOne(filter, updateQuery, (error, response) => {
						if (error) {
							throw error;
						}
						debug(response);
						res.redirect('/heroes');
					});
				} catch (error) {
					debug(error.stack);
				}
				client.close();
			})();
		})
		.get((req, res) => {
			res.render('detail', { nav, hero: res.hero });
		});
	return heroRoutes;
}

module.exports = router;
