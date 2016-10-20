showhud =false;//shouldn't show before the game begins
player={name: "Zalphalo", power: 10, picture: "assets/zalphalo.png"}
inventory = [];
oial= false;
var plothooked = false;

rooms = {};//figure out how to make this non-destructive, so to speak
rooms['Main Menu'] = function(text)
{
	if(text == '')
	{
		settitle("Zalphalo");
		addcontent("Welcome to Zalphalo! Good to have you with us!");
		addop('Begin the Adventure!');
		addop("Options");
		addop("Help");
	}
	if(text == 'Begin the Adventure!')
	{
		
		go("Home");
	}
	if(text == "Options")
	{
		go("Options");
	}
	if(text == "Help")
		go("Help");
}

rooms['Help'] = function(text)
{
	addcontent("I made this!");
	addop("Go back");
	if (text == "Go back"){go(roomhist[1]);} 
}

rooms["Options"] = function(text)
{
	addcontent("Look, man, your only options are to play the game or not play the game, man.");
	addop("Go back");
	if (text == "Go back"){go(roomhist[1]);} 
}


rooms['Home'] = function(text)
{
	if(!oial)
	{
		addcontent("<center><i>And you may find yourself<br>"+
"Living in a shotgun shack<br>"+
"And you may find yourself<br>"+
"In another part of the world<br></i></center>");
		oial = true;
	}
	
	if(text == "Use Bed")
	{
		if (player.power < 10)
		{
			addcontent("<img src='assets/bed.png'></img>");
			player.power = 10;
			addcontent("You sleep deep, dreamless sleep. Your power has been restored to 10")
		}
		if (player.power == 10)
		{
			addcontent("<img src='assets/bed.png'></img>");
			player.power = 10;
			addcontent("You sleep restlessly. You must press on!");
		}
		if (player.power > 10 && power < 1000)
		{
			addcontent("You are not tired.");
		}
		if(player.power >= 1000)
		{
			addcontent("You are beyond sleep.");
		}
	} else if(text == "Look in Mirror") {
		addcontent("<img src='assests/zalphalo.png'></img>");
		addcontent("Yep. That's you.");
	} else {
		addcontent("<img src='assets/home.png'></img>");
	}
	addcontent("You are in your home.")
	showhud = true;
	addop("Look in Mirror");
	addop("Use Bed");
	addop("Leave Home");
	if(text == "Leave Home")
	{
		go("Home Town");
	}
}

rooms['Home Town'] = function(text)
{
	if(text == "Talk to Miranda")
	{
		addcontent("<img src='assets/miranda.png'></img>");
		if(!plothooked)
		{
			addcontent("Miranda informs you that a local warlord has stolen all of the things.<br>You find this unacceptable, and resolve to do something about it.");
			plothooked = true;
		} else {
			addcontent("You talk to Miranda a little. She asks how the crusade against the warlord is going.");
		}
	}
	addcontent("You stand in your home town-- what's left of it.");
	if(!plothooked)
	{
		addcontent("Miranda looks worried.");
	}
	addop("Talk to Miranda");
	addop("Go Home");
	addop("Leave Town");
	if(text == "Go Home")
	{
		go("Home");
	}
	if(text=="Leave Town")
	{
		go("Map");
	}
}

rooms['Map'] = function(text)
{

}

rooms['Fight'] = function(text)
{

}

rooms['Reference Room'] = function(text)
{
	settitle("Something about coffee beans?");
	if(text == '')
	{
		addcontent("Hello World");
		addop("Greet the World with a Hearty Handshake");
	}
	if(text == "Greet the World with a Hearty Handshake")
	{
		addcontent("Same as it ever was.");
	}
	addcontent("I say again, Hello World!");
}
