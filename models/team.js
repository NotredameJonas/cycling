const Joi = require('joi');
const mongoose = require('mongoose');


const teamSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    teamLeader:{
        type: String,
        required:false
    },
    wins:{
        type: Number,
        required: false
    }
  })

const Team = mongoose.model('Team',teamSchema)

function validateTeam(team) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      teamLeader: Joi.string().min(3).required(),
      wins: Joi.number()
    });
  
    return schema.validate(team)
  }
  
exports.teamSchema = teamSchema;
exports.Team = Team;
exports.validate = validateTeam;