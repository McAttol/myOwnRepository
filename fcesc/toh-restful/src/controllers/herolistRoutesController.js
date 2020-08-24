const Hero = require('../../database/models/heroModel');

const post = (req, res)=>{
  const hero = new Hero(req.body);
  console.log(req.body);
  hero.save((err)=>{res.send(err)});
  res.status(201).json(hero);
};
const get = (req, res)=>{
  const query = {};
  if  (req.query.id) {
    query.id = req.query.id;
    Hero.find(query, (err, heroes)=>{
      if (err) { return res.send(err) }
      return res.json(heroes);
    })
  } else if (req.query.name) {
    query.name = req.query.name;
    Hero.find(query, (err, heroes)=>{
      if (err) { return res.send(err) }
      return res.json(heroes);
    }) 
  } else {
    Hero.find({}, (err, heroes)=>{
      if (err) { return res.send(err) }
      return res.json(heroes);
    })
  }
};

module.exports = { post, get };