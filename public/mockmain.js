var store = {
  "team":{
    "name": "Kitty High",
    "players": [
      {
        "name": "Alex S."
      }
    ]
  },
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
var createGame = function(){
  store.schedule.push({
    "enemyTeam": "Enemy",
    "date": "date",
    "time": "time",
    "finished": false,
    "ourScore": 0,
    "enemyScore": 0,
    "won": false,
    "practice": false,
    "highlights": [
    ],
    "vod": "",
    "hlvod": ""
  });
};
var deleteGame = function(id){
  store.schedule.pop(id);
};
var editGame = function(id, key, value){
  store.schedule[id].key = value;
};
var orderHighlightsByTime = function(id){

};
var clearHighlights = function(id){
  store.schedule[id].highlights = [];
};
var deleteHighlight = function(id, highlightNum){
  store.schedule[id].highlights.pop(highlightNum);
};
var addOrEditHighlight = function(id, description){
  store.schedule[id].highlights = description;
  orderHighlightsByTime();
};
var getTeam = function(){
  return store.team;
};
var getTeamByName = function(name){
  return {};
}
