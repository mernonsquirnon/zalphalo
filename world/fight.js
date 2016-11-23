monster = {};
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
	{name: "", power: },
	{name: "", power: },
	{name: "", power: },
	{name: "", power: },
	{name: "", power: },


];

function defaulttalk(){
	addcontent("Your adversary seems uninterested in talking."+
	"Looks like you'll have to fight");
	addop("Fight")
	if(arg == "Fight"){go("Fight");}
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
		monster.flee = monster.flee? monster.flee : defaultflee;
		monster.win = monster.win? monster.win : defaultwin;
		monster.lose = monster.lose? monster.lose : defaultlose;
		monster.turn = monster.turn? monster.turn : defaultturn;
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
		if(simplecontest()){
			addcontent("You escaped. Congratulations, coward.")
			addop("Continue");
		} else {
			addcontent("You fail to escape. Now you must fight.");
			addop("Fight");

		}
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

rooms['Fight'] = function(arg){
addcontent("<table id='fight table'>"+
"<tr><td><img src='"+player.picture+"'></td><td>vs</td><td><img src='"+monster.picture+"'></td></tr>"+
"<tr>Current combo:"+combo+"</tr></table>");
	if (arg == "Help"){
		addcontent("You remember the relevant portion of your favorite cookbook. <blockquote>There are 5 different basic tastes: Sweet(♥), Salty(♦), Sour(♣), Bitter(♠), and Umami(<b>U</b>). In any given dish, the amount of Sweet must equal the amount of Bitter, the amount of Salty must equal the amount of Sour, and the amount of Umami must equal or exceed the sum total of the four other flavors.<br>"+
	"The size of your plate will limit the number of items you can fit on it. Your power (the little italicized number in the Heads-Up Display at the bottom of the screen) divided 100 will be multiplied by your flavor score, as it represents how healthy you are and thus how hard you can throw the plate.</blockquote>");
	}
}

function fight(monstername){
	monster = monsterretrieve(monstername);
	monster = monsterize(monster);
	yourturn = true;
}