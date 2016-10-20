showhud =false;//shouldn't show before the game begins
player={name: "Zalphalo", power: 10, picture: "assets/zalphalo.png"}
inventory = [];
oial= false;
var plothooked = false;
var tutorialcompleted;

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
		go("Intro");
	}
	if(text == "Options")
	{
		go("Options");
	}
	if(text == "Help")
		go("Help");
}

rooms['Intro'] = function(text)
{
			addcontent("Yesterday, God created the world.");
			addcontent("Tomorrow, He will end it.");
			addcontent("Kill him before he does.");
			addop("Continue");
			if(text=="Continue"){go("Home");}
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
	addop("Read your Cookbook");
	addop("Leave Home");
	if(text == "Read your Cookbook")
	{
		go("<i>Working Lunch</i>");
	}
	if(text == "Leave Home")
	{
		go("Home Town");
	}
}

rooms['<i>Working Lunch</i>'] = function(text)
{
	addcontent("You open your tattered and dog-eared copy of <i>Working Lunch: A Cookbook</i>. Your eyes catch a snippet of the preface:"+
 "<blockquote>...The title of this book is, in fact, a quadruple entendre: First of all, there is the sense of a \"Working Lunch\" in which one might discuss business over food. When you read this book, we are fulfilling that sense, because I am discussing your business with you over food. Secondly, every lunch a chef partakes in is a \"Working Lunch\" of a different sort, because one must experience flavors through meals in order to improve one's craft. Thirdly, there is the sense that a chef will often be \"Working Lunch\", ie making the lunches at a restaurant. Fourthly, the title of this book conveys one of the main messages of the book, consistent improvement: whatever meal you create is not a final, perfect lunch-- there is always room for experiment, improvement-- it is a \"Working Lunch\"....</blockquote>"+
	"Before everything went to shit, this was a pretty important book. Now only Chapter 3, <i>On The First Principles of Chefjutsu</i> matters anymore. You turn to that page, and begin to read.");
	addcontent("<blockquote>Chefjustu is the art of using food not for eating, but for combat. The basic idea of chefjustu is to combine foods together on a plate, and then hurl the plate at your opponent.<br>"+
	"There are 5 different basic tastes: Sweet(♥), Salty(♦), Sour(♣), Bitter(♠), and Umami(<b>U</b>). In any given dish, the amount of Sweet must equal the amount of Bitter, the amount of Salty must equal the amount of Sour, and the amount of Umami must equal or exceed the sum total of the four other flavors.<br>"+
	"The size of your plate will limit the number of items you can fit on it. Your power (the little italicized number in the Heads-Up Display at the bottom of the screen) divided 100 will be multiplied by your flavor score, as it represents how healthy you are and thus how hard you can throw the plate.</blockquote>");
	addcontent("The rest of the book mostly involves ingredients that you'd have to get from a grocery store. Grocery stores are notoriously hard to find in the post-apocalyptic wasteland, so you close the book.");
	addop("Go back");
	if (text == "Go back"){go(roomhist[1]);}
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
	addop("Go to the Potter's Shop");
	addop("Go to Funston's Barn")
	if(text == "Go to the Potter's Shop")
	{
		go("The Potter's Shop");
	}
	if(text == "Go Home")
	{
		go("Home");
	}
	if(text=="Leave Town")
	{
		if(tutorialcomplete)
		{
			go("Map");
		} else {
			addcontent("You must gather supplies before you can leave town!");
		}
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
