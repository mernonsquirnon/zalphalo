//FOR INTERNAL USE:
var title = document.getElementById("title");
var content = document.getElementById("content");
var ops = document.getElementById("ops"); //options
var hud = document.getElementById("hud"); //heads-up display
var himg = document.getElementById("himg"); //header image

function refreshhud(){
	if (showhud == true){
		hud.innerHTML = player.name +" | "+player.power+" | "+inv.list();
	} else {
		hud.innerHTML = "";
	}
}
function clearall(){
	title.innerHTML = "";
	content.innerHTML = "";
	ops.innerHTML = "";
	//objects can override this if need be:
	settitle(roomhist[0]);
	himg.innerHTML = "";
}

//FOR EXTERNAL USE:

var roomhist = ["Main Menu"];
//stack to track player's path
//the current room is always roomhist[0],
//the prev room is always roomhist[1], etc


function action(arg){
	clearall();
	sethimg(roomhist[0],arg);
	rooms[roomhist[0]](arg)
	refreshhud()//I'm too lazy to not hard-code this
}
function go(room){
	roomhist.unshift(room);
	action("");
}
function settitle(arg){
	title.innerHTML = "<h1>"+arg+"</h1>";
}
function addcontent(arg){
	content.innerHTML = content.innerHTML + arg.replace("\n","<br>") +"<br>";
	//It's technically poor practice to disregard <p>s
	//and just throw in <br>s when you need linebreaks
	//but I don't really buy into having two different
	//types of linebreaks
}
function addop(arg){
	var actionarg = arg.replace("\'","");//actions are not allowed to have double quotes
	//because that would mess up the html
	ops.innerHTML = ops.innerHTML + "<button onclick=\"action('"+actionarg+"')\">"+arg+"</button>";
}

function imgfile(arg){return "assets/"+arg+".png"}
function img(arg){return "<img src='"+imgfile(arg)+"'>"}
function sethimg(room, op){
	//note that this fn may not give you the img you expect for some reason...
	if(room && op){himg.innerHTML = "<img src='"+imgfile(room+"/"+op)+"' onerror=\"sethimg('"+room+"', null);\">"; console.log(1+himg.innerHTML)}
	else if(room){himg.innerHTML = "<img src='"+imgfile(room+"/index")+"' onerror='sethimg(null, null);'>"; console.log(2+himg.innerHTML)}
	else{himg.innerHTML = ""; console.log(3+himg.innerHTML)}
}

//FOR DEALING WITH ROOMS
if (!rooms) {rooms = {};}

function addroom(title, main, doors, items, nooks, slots, commentary){
	//Title is the name of the room (should not contain ")
	//Title can also just be the room as an obj, as a hack
	//Main is the string to be printed or the fn that returns the string to be printed
	//Each door should either be a string that is a name of a room
	//	or an array of two where the second string is what will be on the button
	//nooks are like psudeo rooms in the same room,
	//	they should be an array of [optext, main]
	//Slots are buttons you only get to see if you have a certain item
	//	amd then they take the item to
	if (typeof title === 'object'){
		rooms[title].title = title;
	} else {
	rooms[title] = {main:main, doors:doors, items:items, nooks:nooks, slots:slots, commentary:commentary}
	}
		doors.map(function f(d){
		if (typeof d == "string"){d = [d, "Go to"+d]};//like a primitive "doorify" fn
	})
	items.map(function f(i){
		if (typeof i == "string"){i = [i, "Take "+i]};//like a primitive "doorify" fn
	})
	slots.map(function f(s){
		if (typeof s == "string"){s = [s, "Use "+s]};//like a primitive "doorify" fn
	})
	if (!commentary){commentary=""}
}

function displayroom(room, arg){
	var main = room.main
	var doors = room.doors
	var door
	var items = room.items
	var item
	var nooks = room.nooks
	var nook
	var slots = room.slots
	var slot
	var commentary = room.commentary
	doors.map(function f(d){
		if (arg == d[1]){ //if the arg is doortext then do the thing later
			door = d[0];
		} else {
			addop(d[1]);
		}
	})
	items.map(function f(i){
		if (arg == i[0]){items = i[1]}//if the arg is optext then do the thing later
		else {addop(i[0]);}//else show the thing as an option
	})
	nooks.map(function f(n){
		if (arg == n[0]){nook = n[1]}//if the arg is optext then do the thing later
		else {addop(n[0]);}//else show the thing as an option
	})
	slots.map(function f(s){
		if (arg == s[1]){slot = s[0]}//if the arg is optext then do the thing later
		else {addop(s[1]);}//else show the thing as an option
	})
		if (typeof main == "function"){main = main(arg);}
		addcontent(main);

		if (arg == d[1]){go(d[0])};
	//}

}

//Here we go!
action("");