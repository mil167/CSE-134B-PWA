//install serviceworker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


 // defalut data used for roster.js
var uuid = function () {
           return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
           (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
           );
         };

 var store = {
    "teamid" : 3,
    "teamname" : "The Bare Bears Team",
    "roster" : [
    ],

    "schedule":[
    ]
};

if(typeof firebase !== 'undefined'){
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
    });
    if(typeof afterRosterUpdate !== 'undefined'){
      afterRosterUpdate();
    }
  });
  db.collection("schedule").onSnapshot( snapshot => {
    snapshot.docChanges.forEach( change => {
      if(change.type === "added" || change.type === "modified" ){
        editGameById(change.doc.data().id, change.doc.data());
      }
      else{
        removeGameById(change.doc.data().id);
      }
    });
    if(typeof afterScheduleUpdate !== 'undefined'){
      afterScheduleUpdate();
    }
  });
  var fire_updateRosterInfo = function(id, playerObject){
    db.collection("roster").doc(""+id).set(playerObject);
  };
  var fire_removeRosterPlayer = function(id){
    db.collection("roster").doc(""+id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  };
  var fire_updateGameInfo = function(id, gameObject){
    db.collection("schedule").doc(""+id).set(gameObject);
  };
  var fire_removeGame = function(id){
    db.collection("schedule").doc(""+id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  };
}



var getSchedule = function(){
  return store.schedule;
};
var createGame = function(){
  var createdGameID = uuid();
  fire_updateGameInfo(createdGameID, {
    "id": createdGameID,
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
var removeGameById = function(id){
  for(gameNum in store.schedule){
    if(store.schedule[gameNum].id == id){
      store.schedule.splice(gameNum, 1);
    }
  }
};
var editGameById = function(id, gameObject){
  var gameIdFound = false;
  for(gameNum in store.schedule){
    if(store.schedule[gameNum].id == id){
      store.schedule[gameNum] = Object.assign({}, gameObject);
      store.schedule[gameNum].highlights = [];
      for(var num = 0; num < gameObject.highlights.length; ++num){
        store.schedule[gameNum].highlights.push(gameObject.highlights[num]);
      }
      gameIdFound = true;
    }
  }
  if(!gameIdFound){
    store.schedule.push(Object.assign({}, gameObject));
    store.schedule[store.schedule.length-1].highlights = [];
    for(var num = 0; num < gameObject.highlights.length; ++num){
      store.schedule[store.schedule.length-1].highlights.push(gameObject.highlights[num]);
    }

  }
}
var getGameById = function(id){
  for(gameNum in store.schedule){
    if(store.schedule[gameNum].id+"" == id+""){
      return store.schedule[gameNum];
    }
  }
  return 0;
}
var clearHighlights = function(id){
  store.schedule[id].highlights = [];
};
var addOrEditHighlight = function(id, description){
  store.schedule[id].highlights = description;
  //orderHighlightsByTime();
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

