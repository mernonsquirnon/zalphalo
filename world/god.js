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
