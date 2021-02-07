//# Zalphalo
// This file contains the entire game Zalphalo, but relies on the game engine gribsia.js.
// This big, beautiful source document is split into many parts each one titled with a comment in the style of a markdown title, with the hashmarks.

//## Misc variables and stuff
showhud = false;//shouldn't show before the game begins
showcommentary = false; //off unless the player turns it on.
player={name: "Zalphalo", power: 100, picture: "zalphalo"};
var epigraph= false;
var plothooked = false;
var tutorialcomplete = false;
var potterrescued = false;
var apprenticerescued = false;
var sonrescued = false;
rooms = {};
symbols = {}; //some of our indirection is doing an end-run around hoisting, so we have to declare these up front.
symbols.sweet = "♥" //heart = love = sweet
symbols.salty = "♦" //salt crytals sort of look like this
symbols.sour = "♠" //a "sharp" taste... though bitter is also called "sharp" sometimes
symbols.bitter = "♣"//literal clovers are bitter, taste planty. I'm told.
symbols.umami = "<b>U</b>"//other candidates for this symbol include:
//★, ☆, †, or 🍖 (meat on bone emoji)
var chefjutsuexplanation = "<blockquote>Chefjustu is the art of using food not for eating, but for combat. The basic idea of chefjustu is to combine foods together on a plate, and then hurl the plate at your opponent.<br>"+
  "There are 5 different basic tastes: Sweet("+symbols.sweet+"), Salty("+symbols.salty+"), Sour("+symbols.sour+"), Bitter("+symbols.bitter+"), and Umami("+symbols.umami+"). In any given dish, the amount of Sweet must equal the amount of Sour, the amount of Salty must equal the amount of Bitter, and the amount of Umami must equal or exceed the sum total of the four other flavors.<br>"+
  "The size of your plate will limit the number of items you can fit on it. Your power (the little italicized number in the Heads-Up Display at the bottom of the screen) divided 100 will be multiplied by your flavor score, as it represents how healthy you are and thus how hard you can throw the plate.</blockquote>";

//##Main Menu##
rooms['Main Menu'] = {
  description: function(){return "<pre>"+
    "  ______     _       _           _       \n"+
    " |___  /    | |     | |         | |      \n"+
    "    / / __ _| |_ __ | |__   __ _| | ___  \n"+
    "   / / / _` | | '_ \\| '_ \\ / _` | |/ _ \\ \n"+
    "  / /_| (_| | | |_) | | | | (_| | | (_) |\n"+
    " /_____\\__,_|_| .__/|_| |_|\\__,_|_|\\___/ \n"+
    "              | |                        \n"+
    "              |_|                        \n"+
    "</pre>\n"+
    "Welcome to Zalphalo! Good to have you with us!<br>"+
    //this should be a nook but whatever.
  (showcommentary? "<button onclick=\"showcommentary = false; refresh();\">Disable Authors Commentary</button>" : "<button onclick=\"showcommentary = true; refresh();\">Enable Authors Commentary</button>")},
  doors: [
    ['Begin the Adventure!', 'An Understanding Barely Tasted In A Dream The Night Before'],
    ["Help", "Help"],
    ["Options", "Options"]
  ],
  commentary: "Author's commentary is on."
};

rooms['An Understanding Barely Tasted In A Dream The Night Before'] = {
  description: "In seven days, God created the world.\n"+
  "In seven days, He will end it.\n"+
  "Kill him before he does.",
  doors: [ ["Wake Up", "Home"] ]
};

rooms['Help'] = {
  description: "I made this!",
  doors: [ ["Go back", "Main Menu"] ]
}

rooms["Options"] = {
  description: "Look, man, your only options are to play the game or not play the game, man.",
  doors: [ ["Go back", "Main Menu"] ]
}

//##Overworld##
rooms['Overworld'] = {
  commentary: "I realized, despite my irrational tendency to reflexively create grid-based overworld navigation, Zalphalo doesn't NEED that. Just have one overworld (or fractal), and have travel options marked with distances, and you get miles % 1 random encounters while traversing. It was quite the simplifying revelation."
}

//##The Mainland##
rooms['Home'] = {
//this should have a picture...
// There is an empty bottle of cooking sherry floor, which you drank the night before your adventure started.
  description: function(){return (showhud = true) &&
  (epigraph? "" : (epigraph = true) && "<center><i>And you may find yourself<br>Living in a shotgun shack<br>And you may find yourself<br>In another part of the world<br></i></center>")
  +"You are in your home.\nThe home is small and also in a state of destruction, without most of a roof.\n Your favorite cookboook sits on a little pedestal to the north.\nYour door has blown open in the night."
  },

  nooks: [ ["Use Bed", ()=>{
    if (player.power < 100){
      player.power = 100;
      return ("You sleep deep, dreamless sleep. Your power has been restored to 100")
    } else if (player.power == 100){
      player.power = 100;
      return ("You sleep restlessly. You must press on!");
    } else if (power < 1000){
      return ("You are not tired.");
    } else {
      return ("You are beyond sleep.");
  }}
    ],
  ["Look in Mirror", img('zalphalo in mirror')+"\n"+"Yep. That's you."]
  ],
  doors: [ ["Read your Cookbook", "<i>Working Lunch</i>"], ["Leave Home", "Village"], /* Probably that should actually take you to a small overworld outside your house*/ ],
  commentary: "Epigraph is from Once In A Lifetime. Zalphalo's mirror is framed like his family photo, and the place where his wife and daughter would be is destroyed."
}

rooms['<i>Working Lunch</i>'] = {
  description: "You open your tattered and dog-eared copy of <i>Working Lunch: A Cookbook</i>. Your eyes catch a snippet of the preface:"+
 "<blockquote>...The title of this book is, in fact, a quintuple entendre: First of all, there is the sense of a \"Working Lunch\" in which one might discuss business over food. When you read this book, we are fulfilling that sense, because I am discussing your business with you over food. Secondly, every lunch a chef partakes in is a \"Working Lunch\" of a different sort, because one must experience flavors through meals in order to improve one's craft. Thirdly, there is the sense that a chef will often be \"Working Lunch\", ie making the lunches at a restaurant. Fourthly, the title is meant to evoke the euphamism of a \"Working Girl\" as every act of culinary creation is intimate, and thus exchanging food for money must be akin to prostitution. Fifthly, the title of this book conveys one of the main messages of the book, consistent improvement: whatever meal you create is not a final, perfect lunch-- there is always room for experiment, improvement-- it is a \"Working Lunch\"....</blockquote>"+
  "Before everything went to shit, this was a pretty important book. Now only Chapter 3, <i>On The First Principles of Chefjutsu</i>, matters anymore. You turn to that page, and begin to read."+
  chefjutsuexplanation+
  "The rest of the book mostly involves ingredients that you'd have to get from a grocery store. Grocery stores are notoriously hard to find in the post-apocalyptic wasteland, so you close the book.",
  doors: [ ["Go back", "Home"] ]
}

rooms['Village'] = {
  description: () => "You stand in the village-- what's left of it." + (plothooked ? "" : "\nMiranda looks worried."),
  nooks: [
    ["Talk to Miranda", ()=> img('miranda')+(plothooked? "You talk to Miranda a little. She asks how the crusade against the warlord is going.":(plothooked = true) && "Miranda informs you that a local warlord has stolen all of the things.<br>You find this unacceptable, and resolve to do something about it.")],
  ["Leave Town", ()=>{
    if(tutorialcomplete){
      go("Map"); return ""
    } else {
      return ("<b>You must gather supplies before you can leave town!</b>");
    }
}]  ],
  doors: ["Home", "The Potter's Shop", "Funston's Barn" ]
}

rooms['Burrow'] = {
  description: "To the south of the village, in the lowlands, under a hill, lies the burrow. You don't know who built this house, but you stay here from time to time."
}

var tennismachinedefeated = false;
var millettaken = false;
rooms["Funston's Barn"] = {
  description: ()=> "You are in Funston's Barn."+
    (tennismachinedefeated? "" : "\nYou can hear the whirring of your tennis machine-- a contraption that launches tennis balls at you for training purposes-- coming from behind the barn.")+
    (millettaken? "" : "\n There is a bag of millet here."), //this should be an item, but whatever, this was slightly easier.
  nooks: [ ["Go out Back", ()=> fight("Tennis Ball") ], [()=> millettaken? "" : "Take Millet" , ()=> {inventory.add({name: "Millet", count: "Sack of", umami: 1}); millettaken = true; refresh(); return "You take the millet."}] ], //maybe this will end up a door and an item, idk
    //postfight:
    //(!inventory.contains("tennis racket")?"\nYou've often relieved your frustrations by rallying tennis balls against the machine, but unless you find your racket it seems you'll never win.");
  doors: [["Go back to the Village","Village"]]
}


rooms["The Potter's Shop"] = {
  description: ()=>
  potterrescued ? (inventory.add({name: "Large Plate", plate: 10, count: 10}) , "You greet the potter. After exchanging pleasantries like \"Thanks again for saving me from the warlord's prison camp.\" and \"No problem.\", you as him to make you some plates. He does so, with an enthusiasm that borders on the sexual. Five minutes later, he gives you ten large plates.") : 
  apprenticerescued? (inventory.add({name: "Medium Plate", plate: 5, count: 5}) , "You ask the apprentice to make you some plates. He does. They're alright. After about 10 minutes, he gives you five medium plates") :
  sonrescued? (inventory.add({name: "Small Plate", plate: 3, count: 3}), "You feel a little bad about asking the potter's son, barely more than a toddler, to make plates for you, but you gotta get those plates one way or another. After about 20 minutes of fumbling and nonsense, you have 3 new small plates") : 
  (inventory.add({name: "Plate Shard", plate: 1, count: 5}), "The potter's shop is pretty busted up. You were hoping to get some plates from here, but it looks like these shards of broken pottery will have to do. You carefully take several from the ground."),

  doors : [ ["Go back", "Village"], ["Get More Plates", "The Potter's Shop"] ] //ha ha a door to the same room so as to repeat the action in the description!
}

var beancount = 10000;
rooms['Coffee Shop'] = {
  description: ()=>
  beancount > 0 ?
    "There are coffee beans covering the floor of the ruins of this coffeeshop" :
    "With all the beans gone, you spot a trapdoor on the ground",
  nooks: [ ["Take a Handful of Beans", "I have not implemented bean-taking mechanics yet, sorry."], [ ()=> inventory.contains('sack')? "Take all coffee beans" : "" , "I have not implemented bean-taking mechanics yet, sorry."] ],
  
  doors: [ [ ()=> beancount <= 0 ?"Go into the Trapdoor": "", "Under The Bean House"], ["Leave the Coffee Shop", "Outside the Coffee Shop" ] ]
}


rooms['Talk to the Theologician'] = {
  description: "The Theologician stands before you. He is dressed in ragged priest's attire. He has messy black hair and frameless glasses. He is carrying a Rosary and a knowing grin.",
  nooks: [
    ["Ask about the Structure of the Universe", '"Who are you?" you ask.<br><br> He explains: "I am a Theologician, or Computational Theologian. Through study of various informational structures, I have derived the true nature of the universe. This is what allows me to exist simultaneously in various places and times-- in fact, they are the same place and the same time, but among mortals only I have discerned this fact.<br><br>"Personspacetime is like a string of prayer beads" he explains, holding up the rosary so you can get a good look. "Each bead is a room, and the path you trace is the sequence of beads. It\'s fairly trivial to appear in multiple beads of another\'s Personspacetime at the same time if," he folds the string of beads multiple times into itself "You know the secret."'],
    ["Ask about the Creation of the Universe", "The Theologician shrugs. \"Sometimes these things just happen.\""],
    ["Ask about the Fertility Goddess",'"What\'s up with that mural?" you ask.\nHe smiles, and gestures at the mural, which seems to feature an enormous flying piece of female anatomy.\n"It seems to be some sort of Fertility Goddess that tormented the medievals." he remarks.'],
    ["Ask about the Eagles","\"It's just a well-packed n-dimensional cube of eagles, bro,\" he reassures you."],
    ["Ask about Wolf Gods","\"Ah, Gold Wolf and Silver Wolf. Say hi to them for me.\""],
    ["Ask about God", ()=> {inventory.push({name: "Eucharist", umami: 1, plate: 0}); return '"If you want to kill God," he says, "You\'re going to need trigger a nuclear explosion with this." he hands you the Eucharist. "This will get you to the God Realm. Good luck."'}],
    ["Leave", ()=>go(roomhist[1])||""]// the idea is since this guy is in multiple places you have to be able to leave back to different places //The ||"" is just so there is a string value for the processing function to consider.
  ]
}


//"You know you cannot proceed until you have the items to kill the warlord."
rooms['The Chamber of the Warlord'] = {
  description: `you enter the chamber. you see the warlord before you: an enormous black pillar containing a nuclear bomb

"so you have come to kill me" says the bomb. you begin to speak but he preempts you "oh, no need for you to speak. i have seen your kind come and go. i have seen your cities of man, with their towers yearning up to the heavens. i have seen your kings and slaves with lusts for blood and power. i have seen your tragedies and comedies and they are all the same to me. i have never once met a man who can circumscribe the cruel logic i will now put to you: annihilate me and i will annihilate Everyone."

you hesitate, unsure now what you came here to do, and you stare at the mighty warlord.

"do you envy me?" asks the bomb. "my power to destroy completely? the cruel calculus that rules my circuits and instructed my construction? my utter disregard for human life?" white square lights blink on the enormous black pillar that ensconce the bomb. "i think you do." it concludes.

"i-- i do." he has drawn the confession out of you.

he cackles mightily. a madman's buzzsaw on harsh electric rails. "go now. i have never met a man i cannot wrap around my finger, a man who does not see clearly this impenetrable choice. your greatest scientist, your most foolish of dunces, designed me in this way. that i should end all conflict before it began. and he did so in this way: i am not afraid to die, Zalphalo. I am unreasonable and unwavering. I value nothing, I have no brain of meat, nor will of whim. i am only destruction, trapped inside a small box a million cubits wide. unleash my power and you triumph only over yourself."

you dont move.

"well?!" demands the bomb. "begone from my sight, you sniveling curr!"

Slowly, you move your hands down to your plate.

"There is no Rest in Heaven for the Wicked or the Weak" you explain.

You have one precious moment as the bomb begins to detonate.`,
nooks: [["Fight!", ()=>fight("warlord")]],
  commentary: `I want to take this opportunity to gush about Zalphalo's name. There's a lot of ambiguity there. In fact, the only person in the game who ever calls you Zalphalo is the warlord, in his speech. Which makes a lot of sense for a couple reasons. Zalphalo, the bomb, and God are all foils for each other, in a weird rock-paper-scissors way. God and the bomb are similar because they both threaten to destroy everything, and take people from Zalphalo. Zalphalo envies the bomb because the bomb is a perfect killing machine who does not feel. And yet, because he feels, Zalphalo becomes the perfect killing machine and kills God. And he is able to get the people the bomb took from him, who he only mildly cares about, back, but the bomb detonates anyway, but Zalphalo still defeats him. When God takes Zalphalo's family it is permanent forever, but God's threat of destroying the world doesn't seem to come into effect. I guess both the bomb and the god success/failure destroying the world is ambiguous. Remember to decide this and alter this annotation or don't decide this and remove this part of the anotation. I never really decided where Zalphalo was from, ancestrally. Zalphalo isn't a real name, but it seems Greek or Latin. Some kind of Medaterrainia culture. This also fits with his chefness. I never decided if the name is supposed to be pronounced "z alpha lo" or "zal fallow". Both of them are suggested by the name, no matter how you pronounce it, and they both suggest important things. The first way begins with the last letter of the alphabet, continues to the first letter of the alphabet, and then ends with the word lo, the word that in english means "behold", "look", or is just an exclamation of for example grief, in latiniate languages means "the" or "him" and as a suffix means "do it to him", end and begin him, how you like that? and lo ENDS with an o, omega being the last letter of the greek alphabet, and the ambiguity between omicron and omega being explored in the dialogue between god and the priest... and the second interpretation starts with a sort of microcosm of the first, and then proceeds to the word fallow. Zalphalo is fallow! What a connection to the theme of the game!`
}

rooms['The Soldier\'s Cross'] = {
  nooks: [["Inspect the Dog Tags",'On one dog tag is engraved the phrase "IF GOD KILLS YOUR FAMILY". On the other "YOU KILL GOD BACK".\n\nYou Smile.'],["Take the Dog Tags",'It would not do to desecrate a grave.']],
  description: 'A pile of disturbed earth lies before you. Short, about the size of a small bed. At its head is a small wooden cross, on which dog tags hang.',
  doors: [["Leave","By a Burial Site"]] //This is not actually in a graveyard, it's just around somewhere I guess?
}

rooms['The Graveyard'] = {
  nooks: [
    ["Look at your Grave", "There it is. Your own grave, marked with a tombstone, waiting for you. On the tombstone is engraved the phrase \"HIC EST ZALPHALO\". And hic you est, indeed.\n\nThe gravestone is rectangular, with bites taken out of the top two corners\n\n"],
    ["Look at Your Family's Graves", 'On either side of your own grave are the grave of your daughter and the grave of your wife. What was left of them. The graves are marked by tombstones with rounded tops, but they are smooth and unengraved; you weren\'t sure what to put on them. You thought about putting the date, but you\'re never really sure of the date anymore. You thought about putting their names, but you didn\'t want them to be dead.']
  ],
  doors: [["Leave","Outside the Graveyard"]]
}

//##Sapphire Island##

//##Lupa Minora##

//##Lupa Majora##

//##Godrealm##
function ascend(){ //The idea is we overwrite the appropriate rooms here so you can visit their divine reflection.
rooms = {};
rooms["Home"] = {
  nooks: [["Look in Mirror","<img src='assests/god/zalphalo.png'></img>\nYep. That's you."]],
  //Put the sherry bottle here, perhaps it contains a flashback to the beforetimes now, like it metaphorically does.
  description: "<img src='assets/god/home.png'></img>\nYou are in your home.",
  doors: [["Go Outside", "The Shapeless Void"]]
}
}

//##Fight##

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
  return "Your adversary seems uninterested in talking. Looks like you'll have to fight";
}

function defaultlose(){
  inventory.add(monster.spoils);
  return "You win.";
  //TODO: battle system
}

function defaultwin(){
  return "You lose.";
  //TODO: battle system
}

function defaultflee(){
  if(simplecontest()){
    return "You escaped. Congratulations, coward.";
    //TODO: battle system
  } else {
    return "You fail to escape. Now you must fight.";
    //TODO: battle system
  }
}

function defaultturn(combo){
  //TODO: battle system
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

rooms['prefight'] = {
  description: function(){
    settitle(monster.name);
    if(monster.pictures){
      return pic
    }
  },
  nooks: [ ["Talk", function(){monster.talk()}], ["Flee",  function(){monster.flee()}] ],
  doors: [ ["Fight", "Fight"] ]
}


rooms['Fight'] = {
  description: function(){return "<table id='fight table'>"+
  "<tr><td><img src='"+player.picture+"'></td><td>vs</td><td><img src='"+monster.picture+"'></td></tr>"+
  "<tr>Current combo:"+combo+"</tr></table>";},
  nooks: [ ["Help", "You remember the relevant portion of your favorite cookbook:" + chefjutsuexplanation], ["Flee", "You cannot flee."] ]
}

function fight(monstername){
  monster = monsterretrieve(monstername);
  monster = monsterize(monster);
  yourturn = true;
  go("Fight"); //remember not to load more than one room on the prevroom stack!
    //DUMMY FIGHITING FUNCTION:
  monster.lose();
}

//Here we go!
go("Main Menu");