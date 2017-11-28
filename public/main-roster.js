const ConstTeam = {
        currentTeam : undefined,

        util : {
             uuid : function () {
                        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                        );
                      }
        }
    };


/**
    * class Team defines the soccer team.
    * It can generate all methods with CRUD of players and matches,
    * mostly by calling methods in class Roster
    */
class Team {
	constructor (teamName){
		this.name = teamName;
		this.roster = new Roster();
	}

	addPlayer(name, number,position, matchCount = -1, goals = -1, redCards = -1){
		this.roster.addPlayer(name, number, position, matchCount, goals, redCards);
	}
	findPlayer(playerId) {
        this.roster.findPlayer(playerId);
    }
    editPlayer(playerId, name, number, position) {
        this.roster.editPlayer(playerId, name, number, position);
    }
    removePlayer(playerId) {
        this.roster.removePlayer(playerId);
    }
    renderRoster() {
        this.roster.render();
    }
}

/**
    * class Roster defines an array of players.
    */
class Roster{
	// roster is an array of player! so this.roster[i] represents a player
	constructor(){
		this.roster = [];
	}

	isPlayerActive(playerId){
		return this.findPlayer(playerId).archived;
	}

	isNumberTaken(number){
		for(let i = 0; i < this.roster.length; i++){
			if(!this.roster[i].archived && (this.roster[i],number == number))
				return true;
		}
		return false;
	}

	addPlayer(name, number, position, matchCount = -1, goals = -1, redCards = -1){
		let player = new Player(name, number, position, matchCount, goals, redCards);
		this.roster.push(player);
		// add ele to array in js uses push
	}

	editPlayer(playerId, name, number, position){
		let player = this.findPlayer(playerId);
		player.edit(name, number, position);
	}

	findPlayer(playerId){
		for(let i = 0; i < this.roster.length; i++){
			if(this.roster[i].playerId == playerId){
				return(this.roster[i]);
			}
		}
		return -1;
	}

	removePlayer(playerId){
		let player = this.findPlayer(playerId);
		player.remove();
	}

	get(){
		return this.roster;
	}

	render() {
		let template = document.querySelector('#roster');

		let markupPlayerList = '<ul>';
		// here roster[i] is a player. So iteratively calling player.render() here.
		for(let i = 0; i < this.roster.length; i++){
			markupPlayerList += this.roster[i].render();
		}
		markupPlayerList += '</ul>';
		// ?? why here need the ".content"
		template.content.querySelector('#playerList').innerHTML = markupPlayerList;


		let clonedTemplate = document.importNode(template.content, true);
		let view = document.querySelector('#view');
		view.innerHTML = "";
		view.appendChild(clonedTemplate);

		document.querySelector('#addBtn').addEventListener(
          'click', function () {
              ConstTeam.currentTeam.roster.renderAddForm();
          }, false
        );
		// renderAddForm no parameter: so in this case, "if(playerId)" will fail
	}


	// edit of single player or add through "add" button both go here
	renderAddForm(playerId){
		let template = document.querySelector('#playerFormTemplate'),
            clonedTemplate = document.importNode(template.content, true),
            view = document.querySelector('#view');

		view.innerHTML = "";
		view.appendChild(clonedTemplate);

		// if the player already exsist, display its info in the input field
		if (playerId) {
                let player = ConstTeam.currentTeam.roster.findPlayer(playerId);

                document.querySelector('#playerName').value = player.name;
                document.querySelector('#playerPosition').value = player.position;
                document.querySelector('#playerNumber').value = player.number;
                document.querySelector('#addPlayerBtn').setAttribute('data-action','edit');
                document.querySelector('#addPlayerBtn').setAttribute('data-playerid',playerId);
        }// data-action data-playerid ??


		document.querySelector('#addPlayerBtn').addEventListener('click', function() {
				let name, position, number, playerId;

				name = document.querySelector('#playerName').value;
				position = document.querySelector('#playerPosition').value;
				number = document.querySelector('#playerNumber').value;
				playerId = document.querySelector('#addPlayerBtn').getAttribute('data-playerid');

				if (playerId) {
	                ConstTeam.currentTeam.editPlayer(playerId,name,number,position);
	            } else {
	                ConstTeam.currentTeam.addPlayer(name,number,position);
	            }
	            // according to different playerId, there could be two cases:
	            //	 the player already exists => editPlayer
	            //	 the player is new => addPlsyer
	            ConstTeam.currentTeam.renderRoster();
	    }, false);

	    document.querySelector('#cancelPlayerBtn').addEventListener('click', function () {
	        ConstTeam.currentTeam.renderRoster();
	    }, false);
	}
}



/**
    * Class Player defines one single player on the soccer team.
    * for each player, it can be edit, delete or show more infornmation about the player.
    */
class Player {
	constructor (name, number, position, matchCount, goals, redCards){
		this.playerId = ConstTeam.util.uuid();
		this.name = name;
		this.number = number;
		this.position = position;
		this.archived = false;
		this.matchCount = matchCount;
		this.goals = goals;
		this.redCards = redCards;
	}

	edit(name, number, position){
		this.name = name;
		this.number = number;
		this.position = position;
	}

	remove(){
		this.archived = true;
	}

	get(){
		if(!this.archived){
			return{
				id: this.playerId,
				name: this.mame,
				number: this.number,
				position: this.position
			};
		}
	}
	// be careful about the , and the position of ;

	render(){
		let MARKUP = '';
		if(!this.archived){
			MARKUP =
			`<li class="player"><strong>Name: ${this.name}</strong> <br>
			Title: ${this.position} <br>
			Jersey #: ${this.number} <br>

             <div class="recordControls">
                [ <span class="editBtn" onclick="ConstTeam.currentTeam.roster.renderAddForm(this.id)" id="${this.playerId}"> Edit </span>
                ] &nbsp;&nbsp;
          		[<span class="editBtn" onclick="ConstTeam.currentTeam.removePlayer(this.id); ConstTeam.currentTeam.renderRoster()" id="${this.playerId}"> Delete </span>
                ] &nbsp;&nbsp;
                [ <span class="infoBtn" onclick="ConstTeam.currentTeam.roster.findPlayer(this.id).showInfo(this.id)" id="${this.playerId}"> More Info! </span>
            	]
            </div>
            </li>`;

			// be careful here it is a ` not a '
			// wait before it is '' now it is `` ???
			// watch out! here the class of the delete btn is still editBtn
		}
		return MARKUP;
	}


	showInfo(playerId){
		let template = document.querySelector('#playerInfoTemplate');

        let MARKUP = '';
        if (playerId) {
            MARKUP =
            `<div class="playerBasicInfo">
            <h2>Personal Information:</h2>
	            <ul class="playerInfo">
	            	<li>Name:  ${this.name}</li>
	            	<li>Jersey #:  ${this.number} </li>
	            	<li>Position:  ${this.position} </li>
	             </ul>
	         </div>
             <hr>

             <div class="playerMatchInfo">
             <h2>Match Statistics:</h2>
	            <ul class="playerInfo">
	            	<li>Matches so far:  ${this.matchCount} </li>
            		<li>Goals:  ${this.goals} </li>
            		<li>Red Cards:  ${this.redCards} </li>
	             </ul>
	         </div>
             <br>`;
        }
        template.content.querySelector('#playerInfo').innerHTML = MARKUP;


        let clonedTemplate = document.importNode(template.content, true),
            view = document.querySelector('#view');
        view.innerHTML = "";
        view.appendChild(clonedTemplate);
	}
}




   /**
     * Class representing the team's schedule of games, practices
     * and other events
     */
     class Schedule {

      /**
       *  Define the schedule.  Just an array will be ordered by add
       *  but generally shown in date or type order
       */
      constructor ()  {
        this.schedule = [];
      }

      render() {
        let template = document.querySelector('#schedule');

        let clonedTemplate = document.importNode(template.content, true);

        let view = document.querySelector('#view');
        view.innerHTML = "";
        view.appendChild(clonedTemplate);
      }

    } /* Schedule */


    /**
     *  Class Stats will contain all the statistics for the team and player.
     *  Methods limited due to nature of the app.
     */
    class Stats {
        constructor() {
            this.stats = [];
        }

        render() {

          let template = document.querySelector('#stats');

          let clonedTemplate = document.importNode(template.content, true);

          let view = document.querySelector('#view');
          view.innerHTML = "";
          view.appendChild(clonedTemplate);
        }
    } /* Stats */



    window.addEventListener('DOMContentLoaded', function () {
        // create the team
        ConstTeam.currentTeam = new Team(store.teamname);
        for (let i = 0; i < store.roster.length; i++) {
            ConstTeam.currentTeam.addPlayer(store.roster[i].name, store.roster[i].number, store.roster[i].position,
            	store.roster[i].matchCount, store.roster[i].goals, store.roster[i].redCards);
        }

        ConstTeam.currentTeam.renderRoster();

        // bind the nav handlers
        document.querySelector('#rosterNav').addEventListener('click', function () { ConstTeam.currentTeam.renderRoster(); }, false);
        document.querySelector('#scheduleNav').addEventListener('click', function ()  { window.location.assign("hw4_schedule.html"); }, false);
        document.querySelector('#statsNav').addEventListener('click', function () { window.location.assign("hw4_home.html") }, false);
    }, false);

