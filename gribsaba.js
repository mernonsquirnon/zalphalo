//FOR INTERNAL USE:
var title = document.getElementById("title");
var content = document.getElementById("content");
var ops = document.getElementById("ops"); //options
var hud = document.getElementById("hud"); //heads-up display
var himg = document.getElementById("himg"); //header image


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
	var actionarg = arg.replace("\'","");//actions are not allowed to have single quotes, because that would mess up the html
	actionarg = actionarg.replace("\"","");//nor double quotes, for symmetry
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
//Here we go!
action("");