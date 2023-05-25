const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth')
const admin = require('../middleware/admin');

const {Rider, validate} = require('../models/rider'); 
const {Team} = require('../models/team');
const {Race} = require('../models/race');

// @route   GET api/riders
router.get('/', async (req, res) => {
  try{
    const riders = await Rider.find().sort('name')
    if (!riders) return res.status(404).send('no riders found');

    res.send(riders);
    
  }catch (error) {
    res.status(500).send(`Error during GET api/riders : ${error.message}`);
  }
  
});

// @route   GET api/riders/:id
router.get('/:id', async(req, res) => {
  try{
    const rider = await Rider.findById(req.params.id);
    if (!rider) return res.status(404).send('The rider with the given ID was not found.');

    res.send(rider);
    
  }catch (error) {
    res.status(500).send(`Error during GET api/riders/:id : ${error.message}`);
  }
  
});

// @route   POST api/riders
router.post('/', auth,async(req, res) => {
  try{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const team = await Team.findById(req.body.teamId);
    if (!team) return res.status(400).send('Invalid team.');
  
    const race = await Race.findById(req.body.raceId);
    if (!race) return res.status(400).send('Invalid race.');
    
    let rider = new Rider({
      name: req.body.name,
      wins: req.body.wins,
      team: {
      _id: team._id,
      name: team.name,
      teamLeader: team.teamLeader,
      wins: team.wins
      },
      race: {
        _id: race._id,
        name: race.name,
        raceType: race.raceType
        }  
    })
    await rider.save();
    res.send(rider);
  }catch (error) {
    res.status(500).send(`Error during POST api/riders : ${error.message}`);
  }
  
});

// @route   PUT api/riders/:id
router.put('/:id',auth, async(req, res) => {
  try{
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const team = await Team.findById(req.body.teamId);
    if (!team) return res.status(400).send('Invalid team.');
  
    const race = await Race.findById(req.body.raceId);
    if (!race) return res.status(400).send('Invalid race.');
  
    const rider = await Rider.findByIdAndUpdate(req.params.id,
      {
         name: req.body.name,
         wins: req.body.wins,
         team: {
           _id: team._id,
           name: team.name,
           teamLeader: team.teamLeader,
           wins: team.wins
         },
         race: {
           _id: race._id,
          name: race.name,
          raceType: race.raceType
        },
        
      },{new:true});
  
      if (!rider) return res.status(404).send('The rider with the given ID was not found.');
        
      res.send(rider);
  }catch (error) {
    res.status(500).send(`Error during PUT api/riders/:id : ${error.message}`);
  }
  
});
  
// @route   DELETE api/riders/:id
router.delete('/:id', [auth, admin], async(req, res) => {
  try{
    const rider = await Rider.findByIdAndRemove(req.params.id);
    if (!rider) return res.status(404).send('The rider with the given ID was not found.');

    res.send(rider);

  }catch (error) {
    res.status(500).send(`Error during DELETE api/riders/:id : ${error.message}`);
  }
  
});
  
module.exports = router;