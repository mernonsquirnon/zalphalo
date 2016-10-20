var roomhist = ["Main Menu"];
//stack to track player's path
//the current room is always roomhist[0],
//the prev room is always roomhist[1], etc

var title = document.getElementById("title");
var content = document.getElementById("content");
var ops = document.getElementById("ops");
var hud = document.getElementById("hud");
function action(text)
{
	clearall();
	rooms[roomhist[0]](text)
	refreshhud()//I'm too lazy to not hard-code this
}
function go(room)
{
	roomhist.unshift(room);
	action("");
}
function clearall()
{
	title.innerHTML = "";
	content.innerHTML = "";
	ops.innerHTML = "";
	//objects can override this if need be:
	settitle(roomhist[0]);
}
function settitle(text)
{	
	title.innerHTML = "<h1>"+text+"</h1>";
}
function addcontent(text)
{
	content.innerHTML = content.innerHTML + text +"<br>";
	//It's technically poor practice to disregard <p>s
	//and just throw in <br>s when you need line breaks
	//but I don't really buy into having two different linebreaks
}
function addop(text)
{	
	ops.innerHTML = ops.innerHTML + "<button onclick=\"action('"+text+"')\">"+text+"</button>";
}
function refreshhud()
{
	if (showhud == true)
		{
			hud.innerHTML = player.name +" | "+player.power+" | "+(inventory? "<i>Nothing</i>":inventory);
		}
}	
//Here we go!
action("");
