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

// Initialize Firebase
var config = {
  apiKey: "AIzaSyASJCB6FqMc6FiroJGWAHViOdLiI1eGHYk",
  authDomain: "catwebsite-7bf63.firebaseapp.com",
  databaseURL: "https://catwebsite-7bf63.firebaseio.com",
  projectId: "catwebsite-7bf63",
  storageBucket: "catwebsite-7bf63.appspot.com",
  messagingSenderId: "505732270795"
};
firebase.initializeApp(config);
var db = firebase.firestore();
firebase.firestore().enablePersistence()
.then(function() {
  db = firebase.firestore();
   // Initialize Cloud Firestore through firebase
})
.catch(function(err) {
   if (err.code == 'failed-precondition') {
       // Multiple tabs open, persistence can only be enabled
       // in one tab at a a time.
       // ...
   } else if (err.code == 'unimplemented') {
       // The current browser does not support all of the
       // features required to enable persistence
       // ...
   }
});
db.collection("roster").onSnapshot( snapshot => {
  snapshot.docChanges.forEach( change => {
    if(change.type === "added" || change.type === "modified" ){
      setPlayerInfoByPlayerId(change.doc.data().playerId, change.doc.data());
    }
    else{
      removePlayerById(change.doc.data().playerId);
    }
    console.log(change.doc.data());
  });
  if(typeof afterRosterUpdate !== 'undefined'){
    afterRosterUpdate();
  }
});
db.collection("schedule").onSnapshot( snapshot => {
  snapshot.docChanges.forEach( change => {
  });
  if(typeof afterScheduleUpdate !== 'undefined'){
    afterScheduleUpdate();
  }
});

var getSchedule = function(){
  return store.schedule;
};
var createGame = function(){
  store.schedule.push({
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
  });
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
  store.schedule[id] = Object.assign({}, newGame);
  store.schedule[id].highlights = [];
  for(var num = 0; num < newGame.highlights.length; ++num){
    store.schedule[id].highlights.push(newGame.highlights[num]);
  }
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
var setPlayerInfoByPlayerId = function(id, playerObject){
  var playerIdFound = false;
  for(rosterNum in store.roster){
    if(store.roster[rosterNum].playerId == id){
      store.roster[rosterNum] = Object.assign({}, playerObject);
      playerIdFound = true;
    }
  }
  if(!playerIdFound){
    store.roster.push(Object.assign({}, playerObject));
  }
};
var removePlayerById = function(id){
  for(rosterNum in store.roster){
    if(store.roster[rosterNum].playerId+"" == id+""){
      store.roster.splice(rosterNum, 1);
    }
  }
};

var fire_updateRosterInfo = function(id, playerObject){
  db.collection("roster").doc(""+id).set(playerObject);
};
var fire_removeRosterPlayer = function(id){
  console.log(id);
  db.collection("roster").doc(""+id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
};
