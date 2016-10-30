function ascend(){
rooms = {};
/*When in fourfold land I saw a face
That in eldritch time did not appear
Sans the wrath of god or gods unknown
Suddenly my stomach did go queer*/
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
