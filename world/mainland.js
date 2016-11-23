showhud =false;//shouldn't show before the game begins
tutorialcomplete = false;
player={name: "Zalphalo", power: 100, picture: "zalphalo"};


oial= false;
var plothooked = false;
var tutorialcompleted = false;
var potterrescued = false;
var apprenticerescued = false;
var sonrescued = false;

//figure out how to make this non-destructive, so to speak
rooms['Main Menu'] = function(arg){
	if(arg == ''){
		settitle("Zalphalo");
		addcontent("Welcome to Zalphalo! Good to have you with us!");
		addop('Begin the Adventure!');
		addop("Options");
		addop("Help");
	}
	if(arg == 'Begin the Adventure!'){
		go("Intro");
	}
	if(arg == "Options"){
		go("Options");
	}
	if(arg == "Help")
		go("Help");
}

rooms['Intro'] = function(arg){
			addcontent("Yesterday, God created the world.");
			addcontent("Tomorrow, He will end it.");
			addcontent("Kill him before he does.");
			addop("Continue");
			if(arg=="Continue"){go("Home");}
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


rooms['Home'] = function(arg){
/*I imagine Working Lunch is on a little pedestal/shine in the home,
and I imagine the home is small and also in a state of destruction,
without most of a roof.*/
	if(!oial){
		addcontent("<center><i>And you may find yourself<br>"+
"Living in a shotgun shack<br>"+
"And you may find yourself<br>"+
"In another part of the world<br></i></center>");
		oial = true;
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
 "<blockquote>...The title of this book is, in fact, a quadruple entendre: First of all, there is the sense of a \"Working Lunch\" in which one might discuss business over food. When you read this book, we are fulfilling that sense, because I am discussing your business with you over food. Secondly, every lunch a chef partakes in is a \"Working Lunch\" of a different sort, because one must experience flavors through meals in order to improve one's craft. Thirdly, there is the sense that a chef will often be \"Working Lunch\", ie making the lunches at a restaurant. Fourthly, the title of this book conveys one of the main messages of the book, consistent improvement: whatever meal you create is not a final, perfect lunch-- there is always room for experiment, improvement-- it is a \"Working Lunch\"....</blockquote>"+
	"Before everything went to shit, this was a pretty important book. Now only Chapter 3, <i>On The First Principles of Chefjutsu</i>, matters anymore. You turn to that page, and begin to read."+
	"<blockquote>Chefjustu is the art of using food not for eating, but for combat. The basic idea of chefjustu is to combine foods together on a plate, and then hurl the plate at your opponent.<br>"+
	"There are 5 different basic tastes: Sweet(♥), Salty(♦), Sour(♣), Bitter(♠), and Umami(<b>U</b>). In any given dish, the amount of Sweet must equal the amount of Bitter, the amount of Salty must equal the amount of Sour, and the amount of Umami must equal or exceed the sum total of the four other flavors.<br>"+
	"The size of your plate will limit the number of items you can fit on it. Your power (the little italicized number in the Heads-Up Display at the bottom of the screen) divided 100 will be multiplied by your flavor score, as it represents how healthy you are and thus how hard you can throw the plate.</blockquote>"+
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
	if(arg == "Go to the Potters Shop"){
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
			addcontent("You must gather supplies before you can leave town!");
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
		"a contraption that launches tennis balls at you for training purposes--"+
		"coming from behind the barn.")
		if(!inv.contains("tennis racket")){
			addcontent("You've relieved your frustrations by hitting tennis balls"+
			"plenty of times, but unless you find your racket"+
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
	if (arg == "Go back"){go(roomhist[1]);} 
}
