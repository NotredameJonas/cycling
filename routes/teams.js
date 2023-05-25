const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Team, validate } = require('../models/team');
const auth = require('../middleware/auth')
const admin = require('../middleware/admin');

// @route GET api/team
router.get('/', async (req, res) => {
  try{
    const teams = await Team.find().sort('name')
    if (!teams) return res.status(404).send('no teams found');

    res.send(teams);

  }catch (error) {
    res.status(500).send(`Error during GET api/team : ${error.message}`);
  }
 
});

// @route GET api/team/:id
router.get('/:id', async(req, res) => {
  try{
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).send('The team with the given ID was not found.');
    
    res.send(team);

  }catch (error) {
    res.status(500).send(`Error during GET api/team/:id : ${error.message}`);
  }
});

// @route Post api/team
router.post('/',auth, async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  try{
    let team = new Team({
      name: req.body.name,
      teamLeader: req.body.teamLeader,
      wins: req.body.wins
    });
    team = await team.save();
  
    res.send(team);

  }catch (error) {
    res.status(500).send(`Error during Post api/team: ${error.message}`);
  }
});

// @route Put api/team/:id
router.put('/:id',auth, async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  try{
    const team = await Team.findByIdAndUpdate(req.params.id,
      {
        name: req.body.name,
        teamLeader: req.body.teamLeader,
        wins: req.body.wins
      },{new:true});
      if (!team) return res.status(404).send('The team with the given ID was not found.');
    
      res.send(team);

  }catch (error) {
    res.status(500).send(`Error during Put api/team/:id: ${error.message}`);
  }
});
  
// @route DELETE api/team/:id
router.delete('/:id', [auth, admin], async(req, res) => {
  try{
    const team = await Team.findByIdAndRemove(req.params.id);
    if (!team) return res.status(404).send('The team with the given ID was not found.');
  
    res.send(team);

  }catch (error) {
    res.status(500).send(`Error during DELETE api/team/:id : ${error.message}`);
  }
});

module.exports = router;