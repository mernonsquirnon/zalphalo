//# Zalphalo #
//This big, beautiful source document is split into many parts
//each one titled with a comment in the style of a markdown title
//with the hashmarks. This file contains the entire game Zalphalo,
//but relies on some utility funcitons from gribsaba.js,
//such as addcontent().

//##Misc variables and stuff
showhud =false;//shouldn't show before the game begins
player={name: "Zalphalo", power: 100, picture: "zalphalo"};
var epigraph= false;
var plothooked = false;
var tutorialcomplete = false;
var potterrescued = false;
var apprenticerescued = false;
var sonrescued = false;
rooms = {};
symbols = {};

//##Main Menu##
rooms['Main Menu'] = function(arg){
	if(arg == ''){
		settitle("Zalphalo");
		addcontent("<pre>"+
			"  ______     _       _           _       \n"+
			" |___  /    | |     | |         | |      \n"+
			"    / / __ _| |_ __ | |__   __ _| | ___  \n"+
			"   / / / _` | | '_ \\| '_ \\ / _` | |/ _ \\ \n"+
			"  / /_| (_| | | |_) | | | | (_| | | (_) |\n"+
			" /_____\\__,_|_| .__/|_| |_|\\__,_|_|\\___/ \n"+
			"              | |                        \n"+
			"              |_|                        \n"+
			"</pre>\n"+
			"Welcome to Zalphalo! Good to have you with us!"
		);
		addop('Begin the Adventure!');
		addop("Options");
		addop("Help");
	}
	if(arg == 'Begin the Adventure!'){
		go('An Understanding Barely Tasted In A Dream The Night Before');
	}
	if(arg == "Options"){
		go("Options");
	}
	if(arg == "Help")
		go("Help");
}

rooms['An Understanding Barely Tasted In A Dream The Night Before'] = function(arg){
			addcontent("In seven days, God created the world.");
			addcontent("In seven days, He will end it.");
			addcontent("Kill him before he does.");
			addop("Wake up");
			if(arg=="Wake up"){go("Home");}
}

rooms['Help'] = function(arg){
	addcontent("I made this!");
	addop("Go back");
	if (arg == "Go back"){go(roomhist[1]);}
}

rooms["Options"] = function(arg){
	addcontent("Look, man, your only options are to play the game or not play the game, man.");
	addop("Go back");
	if (arg == "Go back"){go(roomhist[1]);}
}

//##Map##
rooms['Map'] = function(arg){

}
function map(x,y) {return "@";}

maparray = [
[""],
];

//##The Mainland##
rooms['Home'] = function(arg){
/*I imagine Working Lunch is on a little pedestal/shine in the home,
and I imagine the home is small and also in a state of destruction,
without most of a roof. There is an empty bottle of cooking sherry
floor, which you drank the night before your adventure started.*/
	if(!epigraph){//Maybe put more epigraphs in other places, maybe less
		addcontent("<center><i>And you may find yourself<br>"+
"Living in a shotgun shack<br>"+
"And you may find yourself<br>"+
			   "In another part of the world<br></i></center>");
	    //This is from Once In A Lifetime, but I have elected to leave it uncited, as it looks cleaner that way.
		epigraph = true;
	}

	if(arg == "Use Bed"){
		if (player.power < 100){
			addcontent(img('bed'));
			player.power = 100;
			addcontent("You sleep deep, dreamless sleep. Your power has been restored to 10")
		} else if (player.power == 100){
			addcontent(img('bed'));
			player.power = 100;
			addcontent("You sleep restlessly. You must press on!");
		} else if (power < 1000){
			addcontent("You are not tired.");
		} else {
			addcontent("You are beyond sleep.");
		}
	} else if(arg == "Look in Mirror") {
		addcontent(img('zalphalo'));
		addcontent("Yep. That's you.");
	} else {
		addcontent(img('home'));
	}
	addcontent("You are in your home.")
	showhud = true;
	addop("Look in Mirror");
	addop("Use Bed");
	addop("Read your Cookbook");
	addop("Leave Home");
	if(arg == "Read your Cookbook")
	{
		go("<i>Working Lunch</i>");
	}
	if(arg == "Leave Home")
	{
		go("Home Town");
	}

}

rooms['<i>Working Lunch</i>'] = function(arg){
	addcontent("You open your tattered and dog-eared copy of <i>Working Lunch: A Cookbook</i>. Your eyes catch a snippet of the preface:"+
 "<blockquote>...The title of this book is, in fact, a quadruple entendre: First of all, there is the sense of a \"Working Lunch\" in which one might discuss business over food. When you read this book, we are fulfilling that sense, because I am discussing your business with you over food. Secondly, every lunch a chef partakes in is a \"Working Lunch\" of a different sort, because one must experience flavors through meals in order to improve one's craft. Thirdly, there is the sense that a chef will often be \"Working Lunch\", ie making the lunches at a restaurant. Fourthly, the title is meant to evoke the euphamism of a \"Working Girl\" as every act of culinary creation is intimate, and thus exchanging food for money must be akin to prostitution. Fifth, the title of this book conveys one of the main messages of the book, consistent improvement: whatever meal you create is not a final, perfect lunch-- there is always room for experiment, improvement-- it is a \"Working Lunch\"....</blockquote>"+
	"Before everything went to shit, this was a pretty important book. Now only Chapter 3, <i>On The First Principles of Chefjutsu</i>, matters anymore. You turn to that page, and begin to read."+
	chefjutsuexplanation+
	"The rest of the book mostly involves ingredients that you'd have to get from a grocery store. Grocery stores are notoriously hard to find in the post-apocalyptic wasteland, so you close the book.");
	addop("Go back");
	if (arg == "Go back"){go(roomhist[1]);}
}

rooms['Home Town'] = function(arg){
	if(arg == "Talk to Miranda"){
		addcontent(img('miranda'));
		if(!plothooked){
			addcontent("Miranda informs you that a local warlord has stolen all of the things.<br>You find this unacceptable, and resolve to do something about it.");
			plothooked = true;
		} else {
			addcontent("You talk to Miranda a little. She asks how the crusade against the warlord is going.");
		}
	}
	addcontent("You stand in your home town-- what's left of it.");
	if(!plothooked){
		addcontent("Miranda looks worried.");
	}
	addop("Talk to Miranda");
	addop("Go Home");
	addop("Go to the Potter's Shop");
	addop("Go to Funston's Barn")
	addop("Leave Town");
	if(arg == "Go to the Potter's Shop"){
		go("The Potter's Shop");
	}
	if(arg == "Go to Funstons Barn"){
		go("Funston's Barn");
	}
	if(arg == "Go Home"){
		go("Home");
	}
	if(arg=="Leave Town"){
		if(tutorialcomplete){
			go("Map");
		} else {
			addcontent("<b>You must gather supplies before you can leave town!</b>");
		}
	}
}

var tennismachinedefeated = false;
var millettaken = false;
rooms["Funston's Barn"] = function(arg){
	addcontent(img("Funston's Barn"));
	addcontent("You are in Funston's Barn.");
	if(!tennismachinedefeated){
		addcontent("You can hear the whirring of your tennis machine-- "+
		"a contraption that launches tennis balls at you for training purposes-- "+
		"coming from behind the barn.")
		if(!inv.contains("tennis racket")){
			addcontent("You've relieved your frustrations by hitting tennis balls "+
			"plenty of times, but unless you find your racket "+
			"it seems like you'll never beat the machine.");
		}
	}
	if(arg == "Take Millet" && !millettaken){
		inv.add({name: "Millet", count: "Sack of", umami: 1});
		millettaken = true;
	}
	if(!millettaken){
		addcontent("There is a bag of millet here.");
		addop("Take Millet");
	}
	addop("Go out Back");
	if(arg == "Go out Back"){
		fight("Tennis Ball");
	}
	addop("Go back to the Town");
	if(arg == "Go back to the Map"){go("Home Town");}
}


rooms["The Potter's Shop"] = function(arg){
	if(potterrescued){
		addcontent("You greet the potter. After exchanging pleasantries like \"Thanks again for saving me from the warlord's prison camp.\" and \"No problem.\", you as him to make you some plates. He does so, with an enthusiasm that borders on the sexual. Five minutes later, he gives you ten large plates.");
		inv.add({name: "Large Plate", plate: 10, count: 10});
	} else if (apprenticerescued){
		addcontent("You ask the apprentice to make you some plates. He does. They're alright. After about 10 minutes, he gives you five medium plates");
		inv.add({name: "Medium Plate", plate: 5, count: 5});
	} else if (sonrescued){
		addcontent("You feel a little bad about asking the potter's son, barely more than a toddler, to make plates for you, but you gotta get those plates one way or another. After about 20 minutes of fumbling and nonsense, you have 3 new small plates");
	inv.add({name: "Small Plate", plate: 3, count: 3});
	} else {
		addcontent("The potter's shop is pretty busted up. You were hoping to get some plates from here, but it looks like these shards of broken pottery will have to do. You carefully take several from the ground.");
		inv.add({name: "Plate Shard", plate: 1, count: 5});
	}
	addop("Get More Plates");
	addop("Go back");
	if (arg == "Go back"){go(roomhist[1]);}
	//if(arg == "Get More Plates"){action("");}//unneeded
}

var beancount = 10000;
rooms['Coffee Shop'] = function(arg){
	if(beancount > 0){
		addcontent("There are coffee beans covering the floor of the ruins of this coffeeshop");
		addop("Take a Handful of Beans");
		if(inv.contains('sack')){addop("Take all coffee beans");}
	} else {
		addcontent("With all the beans gone, you spot a trapdoor on the ground");
		addop("Go into the Trapdoor");
	}
	addop("Leave the Coffee Shop");
	if (arg == "Leave the Coffee Shop"){go("Map");}
}


rooms['Talk to the Theologician'] = function(arg){
	addop("Ask about the Structure of the Universe");
	addop("Ask about the Creation of the Universe");
	addop("Ask about the Fertility Goddess");
	addop("Ask about the Eagles");
	addop("Ask about the Wolf Gods");
	addop("Ask about God");
	addop("Go back");
	addcontent("The Theologician stands before you. He is dressed in ragged priest's attire. He has messy black hair and frameless glasses. He is carrying a Rosary and a knowing grin.");
	if(arg == "Ask about the Structure of the Universe"){
		addcontent('"Who are you?" you ask.<br><br> He explains: "I am a Theologician, or Computational Theologian. Through study of various informational structures, I have derived the true nature of the universe. This is what allows me to exist simultaneously in various places and times-- in fact, they are the same place and the same time, but among mortal only I have discerned this fact.<br><br>"Personspacetime is like a string of prayer beads" he explains, holding up the rosary so you can get a good look. "Each bead is a room, and the path you trace is the sequence of beads. It\'s fairly trivial to appear in multiple beads of another\'s Personspacetime at the same time if," he folds the string of beads multiple times with a flourish "You know the secret."');
	}
	if(arg == "Ask about the Creation of the Universe"){
		addcontent("\"The universe was created yesterday,\" he tells you.<br><br>\"Impossible!\" you  say, \"I remember so much before yesterday!\"<br><br>\"God created those memories yesterday,\" he says.<br><br>You stay silent.<br><br>\"He's going to destroy the world tomorrow,\" he says.<br><br>\"Then I'd better go stop him,\" you say. He nods.");
	}
	if(arg == "Ask about the Fertility Goddess"){
		addcontent('"What\'s up with that mural?" you ask');
	}
	if(arg == "Ask about the Eagles"){
		addcontent("\"It's just a well-packed n-dimensional cube of eagles, bro,\" he reassures you.");
	}
	if(arg == "Ask about Wolf Gods"){
		addcontent("\"Ah, Gold Wolf and Silver Wolf. Say hi to them for me.\"");
	}
	if(arg == "Ask about God"){
		addcontent('"If you want to kill God," he says, "You\'re going to need trigger a nuclear explosion with this." he hands you the Eucharist. "This will get you to the God Realm. Good luck."');
		inv.push({name: "Eucharist", umami: 1, plate: 0});
	}
	if (arg == "Go Back"){go(roomhist[1]);}
}

rooms['The Soldier\'s Cross'] = function(arg){
	if(arg == "Inspect the Dog Tags"){
		addcontent('On one dog tag is engraved the phrase "IF GOD KILLS YOUR FAMILY". On the other "YOU KILL GOD BACK".\n\nYou Smile.');
	}else if(arg == "Take the Dog Tags"){
		addcontent('It would not do to desecrate a grave.');
	}else{
	addcontent('A pile of disturbed earth lies before you. Short, about the size of a small bed. At its head is a small wooden cross, on which dog tags hang.');
	}
	addop("Inspect the Dog Tags");
	addop("Take The Dog Tags");
	addop("Go Back");
	if (arg == "Go Back"){go(roomhist[1]);}
}

rooms['The Graveyard'] = function(arg){
	addop("Look at Your Own Grave");
	if(arg == "Look at your Grave"){
	//I picture this grave as rectangular, with "bites" taken out of the top two corners
		addcontent('There it is. Your own grave, marked with a tombstone, waiting for you. On the tombstone is engraved the phrase "HIC EST ZALPHALO". And hic you est, indeed.');
	}
	addop("Look at Your Family's Graves");
	if(arg == "Look at Your Familys Graves"){
	//I picture these graves as rounded
		addcontent('On either side of your own grave are the grave of your daughter and the grave of your wife. What was left of them. The graves are marked by tombstones, but they are smooth and unengraved; you weren\'t sure what to put on them. You thought about putting the date, but you\'re never really sure of the date anymore. You thought about putting their names, but you didn\'t want them to be dead.');
	}
	addop("Go Back");
	if (arg == "Go Back"){go(roomhist[1]);}
}

rooms[''] = function(arg){
	if(arg == ""){
		addcontent('');
		addop('');
	}
	addop("Go Back");
	if (arg == "Go Back"){go(roomhist[1]);}
}

//##Sapphire Island##

//##Lupa Minora##

//##Lupa Majora##

//##Godrealm##
function ascend(){
rooms = {};
rooms["Home"] = function(arg){
	if(text == "Look in Mirror"){
		addcontent("<img src='assests/god/zalphalo.png'></img>");
		addcontent("Yep. That's you.");
	} else {
		addcontent("<img src='assets/god/home.png'></img>");
	}
	addcontent("You are in your home.")
	addop("Look in Mirror");
	addop("Leave Home");
	if(text == "Leave Home"){
		go("Home Town");
	}
}
}

//##Inventory##
inv = {

items: [], //items can be set to [] to clear the inventory.

itemize://Turn an underspecified item into an item with default properties
	function(item){
		if(typeof item === 'string' || item instanceof String){
			item = {name: item};
		}
		item.count = (item.count? item.count : 1);//assume no count = 1
		item.plural = (item.plural? item.plural : item.name +"s");
		return item;
	}
,
add://Add a negative number to remove items
	function(item){
		if (Array.isArray(item)){ //recurse on arrays
			for(var i = 0; i < item; i++){inv.add(item[i]);}
		}
		item = inv.itemize(item);
		items = inv.items;
		var added = false;
		for(var i=0; i<items.length; i++){
			if (items[i].name == item.name){
				items[i].count += item.count
				added = true;
			}
		}
		if(!added){items.push(item);}
	}
,

list:
	function(){
		items = inv.items;
		list = "";
		if (items.length == 0){return "<i>Nothing</i>";}
		else{
			for(var i=0; i< items.length; i++){
				var item = items[i];
				if(item.count > 1){
					list += item.count +" "+ item.plural;
				}
				else{
					list += item.name;
				}
				list += (i<items.length-1?", ":"");
			}
		}
		return list;
	}
,

contains: //checks if a certain number (default 1) of an item is present
	function(item){
		if (Array.isArray(item)){ //recurse on arrays
			tmp = true;
			for(var i = 0; i < item; i++){tmp = tmp && inv.contains(item[i]);}
		}
		item = inv.itemize(item);
		items = inv.items;
		var required = item.count;
		for(var i=0; i<items.length; i++){
			if (items[i].name == item.name){
				required -= items[i].count;
			}
		}
		return required <= 0;
	}
}

//##Fight##
symbols.sweet = "♥" //heart = love = sweet
symbols.salty = "♦" //salt crytals sort of look like this
symbols.sour = "♠" //a "sharp" taste... though bitter is also called "sharp" sometimes
symbols.bitter = "♣"//literal clovers are bitter, taste planty. I'm told.
symbols.umami = "<b>U</b>"//other candidates for this symbol include:
//★, ☆, †, or 🍖 (meat on bone emoji)
monster = {};
combo = [];
monsters = [
	{name: "Bear", power: 15},
	{name: "Dancing Bear", power: 20, pictures: ["dancingbear", "dancingbear2", "dancingbear3"]},
	{name: "Cybear", power: 25},
	{name: "Bunny", power: 2},
	{name: "Cyberbunny", power: 12},
	{name: "Elk", power: 12},
	{name: "Cyberelk", power: 22},
	{name: "Bandit", power: 22},
	{name: "Motorcycle Bandit", power: 32},
	{name: "Car Bandit", power: 42},
	{name: "Truck Bandit", power: 52},
	{name: "Monster Truck Bandit", power: 102},
	{name: "Horse Thief", power: 22},
	{name: "Tennis Ball", power: 1},
	{name: "", power: 0},
	{name: "", power: 0},
	{name: "", power: 0},
	{name: "", power: 0},

];

function defaulttalk(){
	addcontent("Your adversary seems uninterested in talking. "+
	"Looks like you'll have to fight");
	addop("Fight")
	if(arg == "Fight"){go("Fight");}
}

function defaultlose(){
addcontent("You win.");
inv.add(monster.spoils);
addop("Go Back");
}

function defaultwin(){
addcontent("You lose.");
addop("Go Back");
}

function defaultflee(){
if(simplecontest()){
			addcontent("You escaped. Congratulations, coward.")
			addop("Go Back");
		} else {
			addcontent("You fail to escape. Now you must fight.");
			addop("Fight");
		}
}

function defaultturn(combo){
	//todo: this
}

function simplecontest(){
return Math.random()*player.power > Math.random()*monster.power;
}

function monsterretrieve(monstername){
	for(var i=0; i<monsters.length; i++){
		if (monsters[i].name == monstername){
			return monsters[i];
		}
	}
}

function monsterize(monster){//designed to be similar to inv's itemize
	if(typeof monster === 'string' || monster instanceof String){
		monster = {name: monster};
	}
		monster.power = (monster.power? monster.power : 1);//assume no power = 1
		monster.talk = (monster.talk? monster.talk : defaulttalk)
		if(monster.pictures !== false && !monster.pictures){//false means purposefully nothing
			monster.pictures = [monster.name.toLowerCase()];
		}
		//these should be defined as the monster doing something
		monster.flee = monster.flee? monster.flee : defaultflee;
		monster.win = monster.win? monster.win : defaultwin;
		monster.lose = monster.lose? monster.lose : defaultlose;
		monster.turn = monster.turn? monster.turn : defaultturn;
		monster.spoils = monster.spoils? monster.spoils : [];
		return monster;
}

function pic(){
	return img(monster.pictures[Math.floor(Math.random() * pictures.length)])
}

rooms['prefight'] = function(arg){
	settitle(monster.name);
	if(monster.pictures){
		addcontent(pic);
	}
	if(arg == "Talk"){
		monster.talk();
	} else if (arg == "Flee"){
		monster.flee();
	} else if (arg == "Continue"){
		go(roomhist[1]);
	} else if(arg == "Fight"){
		go("Fight");
	} else {
	addop("Fight");
	addop("Talk");
	addop("Flee");
	}
}
var chefjutsuexplanation = "<blockquote>Chefjustu is the art of using food not for eating, but for combat. The basic idea of chefjustu is to combine foods together on a plate, and then hurl the plate at your opponent.<br>"+
	"There are 5 different basic tastes: Sweet("+symbols.sweet+"), Salty("+symbols.sweet+"), Sour("+symbols.sour+"), Bitter("+symbols.bitter+"), and Umami("+symbols.umami+"). In any given dish, the amount of Sweet must equal the amount of Sour, the amount of Salty must equal the amount of Bitter, and the amount of Umami must equal or exceed the sum total of the four other flavors.<br>"+
	"The size of your plate will limit the number of items you can fit on it. Your power (the little italicized number in the Heads-Up Display at the bottom of the screen) divided 100 will be multiplied by your flavor score, as it represents how healthy you are and thus how hard you can throw the plate.</blockquote>";

rooms['Fight'] = function(arg){
addcontent("<table id='fight table'>"+
"<tr><td><img src='"+player.picture+"'></td><td>vs</td><td><img src='"+monster.picture+"'></td></tr>"+
"<tr>Current combo:"+combo+"</tr></table>");
	if (arg == "Help"){
		addcontent("You remember the relevant portion of your favorite cookbook:" + chefjutsuexplanation);
	}
	if (arg == "Go Back"){go(roomhist[1]);}
}

function fight(monstername){
	monster = monsterretrieve(monstername);
	monster = monsterize(monster);
	yourturn = true;
	go("Fight"); //remember not to load more than one room on the prevroom stack!
		//DUMMY FIGHITING FUNCTION:
	monster.lose();
}
