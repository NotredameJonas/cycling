const Joi = require('joi');
const mongoose = require('mongoose');


const raceSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    raceType:{
      type: String,
      required: false
    }
  });

const Race = mongoose.model('Race',raceSchema);

function validateRace(race) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      raceType: Joi.string().min(3).required()
    });
  
    return schema.validate(race)
}

exports.raceSchema = raceSchema;
exports.Race = Race;
exports.validate = validateRace;