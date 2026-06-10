
const mongo = require("mongoose");
const route=require('express').Router();

//MIDDLEWARE
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

//CONNECTION
let con = mongo.connect("mongodb://localhost:27017/cricket");
let yn = mongo.connection;
yn.on("connected", () => {
  console.log("database Connected Successfully!");
});

//SCHEMA
let schema = mongo.Schema({
team: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  profile_picture: {
    type: String
  },

  captain: {
    type: Boolean,
    default: false
  },

  performance_under_pressure: {
    type: Number,
    min: 0,
    max: 1
  },

  strong: [{
    type: String
  }],

  weak: [{
    type: String
  }],

  best: {
    type: Number
  },

  sr: {
    type: Number
  },

  matchup_rating: {
    right_arm_fast: {
      type: Number,
      min: 0,
      max: 1
    },

    left_arm_fast: {
      type: Number,
      min: 0,
      max: 1
    },

    right_arm_offspin: {
      type: Number,
      min: 0,
      max: 1
    },

    right_arm_legspin: {
      type: Number,
      min: 0,
      max: 1
    }
  },

  last_five_match: [{
    type: Number
  }],

  anchorSkill: {
    type: Number,
    min: 0,
    max: 1
  },

  finisherSkill: {
    type: Number,
    min: 0,
    max: 1
  },

  hasbated: {
    type: Boolean,
    default: false
  },
  recentform:{
    type:Number
  }

});

let model = mongo.model("mymodel", schema, "players");




route.post("/players/:team",async(req,res)=>{
  console.log(req.params.team);
  const team=req.params.team;
  const data=await model.find({team:team});
  
  res.json(data);
})


module.exports=route;