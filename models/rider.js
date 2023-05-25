const Joi = require('joi');
const JoiObjectId = require('joi-objectid');
const mongoose = require('mongoose');
const {teamSchema} = require('./team');
const {raceSchema} = require('./race');

const Rider = mongoose.model("riders",new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    wins:{
        type: Number,
        required: false
    },
    team:{
      type: teamSchema,
      required: false
    },
    race:{
        type: raceSchema,
        required: false
    }
  }));

  function validateRider(rider) {
    Joi.objectId = JoiObjectId(Joi);
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      wins:Joi.number(),
      teamId: Joi.objectId().required(),
      raceId: Joi.objectId().required()
    });
    return schema.validate(rider)
  }
  
  
  exports.Rider = Rider;
  exports.validate = validateRider;