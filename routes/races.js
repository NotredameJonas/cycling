const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth')
const admin = require('../middleware/admin');

const { Race, validate } = require('../models/race');

// @route GET api/races
router.get('/', async (req, res) => {
  try{
    const races = await Race.find().sort('name')
    if (!races) return res.status(404).send('no races found');

    res.send(races);

  }catch (error) {
    res.status(500).send(`Error during GET api/races : ${error.message}`);
  }
});

// @route GET api/races/:id
router.get('/:id', async(req, res) => {
  try{
    const race = await Race.findById(req.params.id);
    if (!race) return res.status(404).send('The race with the given ID was not found.');
  
    res.send(race);

  }catch (error) {
    res.status(500).send(`Error during GET api/races/:id : ${error.message}`);
  }
});

// @route POST api/races
router.post('/', auth, async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  try{
    let race = new Race({
      name: req.body.name,
      raceType: req.body.raceType
    })

    race = await race.save();

    res.send(race);

  }catch (error) {
    res.status(500).send(`Error during POST api/races : ${error.message}`);
  }
});

// @route PUT api/races/:id
router.put('/:id',auth, async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  try{
    const race = await Race.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name, 
        raceType: req.body.raceType
      },{new:true});

    if (!race) return res.status(404).send('The race with the given ID was not found.');

    res.send(race);

  }catch (error) {
    res.status(500).send(`Error during Put api/races/:id : ${error.message}`);
  }
});

// @route DELETE api/races/:id
router.delete('/:id', [auth, admin], async(req, res) => {
  try{
    const race = await Race.findByIdAndRemove(req.params.id);
    if (!race) return res.status(404).send('The race with the given ID was not found.');
  
    res.send(race);

  }catch (error) {
    res.status(500).send(`Error during Delete api/races/:id : ${error.message}`);
  }
});
  
module.exports = router;