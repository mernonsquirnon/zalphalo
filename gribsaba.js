//FOR INTERNAL USE:
var title = document.getElementById("title");
var content = document.getElementById("content");
var ops = document.getElementById("ops");
var hud = document.getElementById("hud");

function refreshhud(){
	if (showhud == true){
		hud.innerHTML = player.name +" | "+player.power+" | "+inv.list();
	}
}
function clearall(){
	title.innerHTML = "";
	content.innerHTML = "";
	ops.innerHTML = "";
	//objects can override this if need be:
	settitle(roomhist[0]);
}

//FOR EXTERNAL USE:

var roomhist = ["Main Menu"];
//stack to track player's path
//the current room is always roomhist[0],
//the prev room is always roomhist[1], etc


function action(arg){
	clearall();
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
	var actionarg = arg.replace("\'","");//actions are not allowed to have single quotes, because that would mess up the html
	actionarg = actionarg.replace("\"","");//nor double quotes, for symmetry
	ops.innerHTML = ops.innerHTML + "<button onclick=\"action('"+actionarg+"')\">"+arg+"</button>";
}

function img(arg){return "<img src='"+arg+".png'>"}
//Here we go!
action("");