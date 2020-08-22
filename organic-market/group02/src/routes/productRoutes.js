const express = require('express');
const debug = require('debug')('app:heroRoutes');
const { MongoClient, ObjectID } = require('mongodb');
const path = require('path');
const DATABASE_CONFIG = require("../database/DATABASE_CONFIG");
const ROUTES = require('./ROUTES');
const { products } = require('./ROUTES');

const productRoutes = express.Router();

function addProductToCart(userId, addedProductId) {
	(async function addProductToCart() {
		let client;
		try {
			client = await MongoClient.connect(DATABASE_CONFIG.url);
			const db = client.db(DATABASE_CONFIG.dbName);
			const collection = db.collection(DATABASE_CONFIG.cartsCollection);


			const query = await collection.findOne({ userID: userId })

			if (query) {
				await collection.updateOne({ userID: userId }, { $push: { product: addedProductId } });
				res.redirect(ROUTES.products.path);
			} else {
				await collection.insertOne({ userID: userId, userName: username, product: [addedProductId], active: true });
				res.redirect(ROUTES.products.path);
			}
		} catch (error) {
			debug(error.stack);
		}
	}())
}

function router(nav) {
	productRoutes
		.route('/')

		.post((req, res) => {
			const { deleteProduct } = req.body;
			const { addedProductId } = req.body;
			const { username } = req.user;
			const { _id } = req.user;

			if (deleteProduct) {
				(async function deleteProductFromList() {
					let client;
					try {
						client = await MongoClient.connect(DATABASE_CONFIG.url);
						debug('Connection to db established...');
						const db = client.db(DATABASE_CONFIG.dbName);
						const collection = db.collection(DATABASE_CONFIG.productCollection);

						await collection.deleteOne({ _id: new ObjectID(deleteProduct) });
						res.redirect(ROUTES.products.path);
					} catch (error) {
						debug(error.stack);
					}
				})();
			} else if (addedProductId) {
				addProductToCart(_id, addedProductId)
			}


		})
		.get((req, res) => {
			(async function getAllProducts() {
				let client;
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);

					const colection = db.collection(DATABASE_CONFIG.productCollection);

					const products = await colection.find().sort({ name: 1 }).toArray();

					res.render('index', {
						nav,
						body: ROUTES.products.page,
						title: ROUTES.products.title,
						products,
						ROUTES
					});
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		});


	productRoutes
		.route('/:productId')
		.all((req, res, next) => {
			const { productId } = req.params;
			(async function getProduct() {
				let client;
				try {
					client = await MongoClient.connect(DATABASE_CONFIG.url);
					debug('Connection to db established...');
					const db = client.db(DATABASE_CONFIG.dbName);
					const collection = db.collection(DATABASE_CONFIG.productCollection);
					res.product = await collection.findOne({ _id: new ObjectID(req.params.productId) });
					debug(res.product);
					next();
				} catch (error) {
					debug(error.stack);
				}
				debug('Connection to db closed.');
				client.close();
			})();
		})
		.post((req, res) => {
			// const updateQuery = { $set: req.body };
			// const { productId } = req.params;
			// const filter = { _id: productId };
			// let client;
			// (async function editProduct() {
			// 	try {
			// 		client = await MongoClient.connect(DATABASE_CONFIG.url);
			// 		debug('Connection to db established...');
			// 		const db = client.db(DATABASE_CONFIG.dbName);
			// 		const collection = db.collection(DATABASE_CONFIG.productCollection);
			// 		collection.updateOne(filter, updateQuery, (error, response) => {
			// 			if (error) { throw error }
			// 			debug(response);
			// 			res.redirect(ROUTES.products.path);
			// 		});
			// 		debug(req.body);
			// 	} catch (error) {
			// 		debug(error.stack);
			// 	}
			// 	debug('Connection to db closed.');
			// 	client.close();
			// })();
			const { addedProductId } = req.body;
			const { _id } = req.user;
			console.log(_id, addedProductId);
			addProductToCart(_id, addedProductId)
		})
		.get((req, res) => {
			res.render('index', {
				nav,
				body: ROUTES.product.page,
				title: ROUTES.product.title,
				product: res.product,
				ROUTES
			});
		});

	return productRoutes;
}

module.exports = router;
