 // defalut data used for roster.js
 var store = {
    "teamid" : 3,
    "teamname" : "The Bare Bears Team",
    "roster" : [
        {
         "playerId" : 1,
         "name" : "Grizzly",
         "position" : "Captain",
         "number" : 3,
         "matchCount" : 8,
         "goals" : 3,
         "redCards": 2
         //"active" : true
        },

        {
         "playerId" : 2,
         "name" : "Panda",
         "position" : "Defender",
         "number" : 8,
         "matchCount" : 6,
         "goals" : 1,
         "redCards": 1
         // "active" : true
        },

        {
         "playerId" : 3,
         "name" : "White Bear",
         "position" : "Forward",
         "number" : 9,
         "matchCount" : 10,
         "goals" : 8,
         "redCards": 0
         // "active" : false
        },

        {
         "playerId" : 4,
         "name" : "Sparrow",
         "position" : "Midfield",
         "number" : 2,
         "matchCount" : 3,
         "goals" : 1,
         "redCards": 0
         // "active" : true
        }
    ],

    "schedule":[
      {
        "enemyTeam": "Jaguar High",
        "date": "10/11/2017",
        "time": "2:00PM",
        "finished": false,
        "ourScore": 0,
        "enemyScore": 0,
        "won": false,
        "practice": true,
        "highlights": [

        ],
        "vod": "",
        "hlvod": ""
      },
      {
        "enemyTeam": "Jaguar High",
        "date": "10/1/2017",
        "time": "3:00PM",
        "finished": true,
        "ourScore": 4,
        "enemyScore": 3,
        "won": true,
        "practice": false,
        "highlights": [
          {
            "time": 0,
            "desc": "Match begins"
          },
          {
            "time": 4,
            "desc": "Alex S. from Kitty High scores"
          }
        ],
        "vod": "",
        "hlvod": ""
      }

    ]

};

var getSchedule = function(){
  return store.schedule;
};
var defaultGame = {
  "enemyTeam": "Enemy",
  "date": "date (month/day/year)",
  "time": "time(h:mmAM/PM)",
  "finished": false,
  "ourScore": 0,
  "enemyScore": 0,
  "won": false,
  "practice": false,
  "highlights": [
  ],
  "vod": "",
  "hlvod": ""
};
var createGame = function(){
  store.schedule.push(defaultGame);
};
var createUpTo = function(id){
  while(!store.schedule[id]){
    createGame();
  }
};
var deleteGame = function(id){
  store.schedule.splice(id, 1);
};
var setGame = function(id, newGame){
  store.schedule[id] = newGame;
};
var orderHighlightsByTime = function(id){

};
var clearHighlights = function(id){
  store.schedule[id].highlights = [];
};
var deleteHighlight = function(id, highlightNum){
  store.schedule[id].highlights.splice(highlightNum, 1);
};
var addOrEditHighlight = function(id, description){
  store.schedule[id].highlights = description;
  orderHighlightsByTime();
};
var getTeam = function(){
  return store;
};
