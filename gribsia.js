/* This is gribsia, the structured button-and-text-adventure engine. It is the sister of gribsaba, a prototype unstructured engine I never released as it was too mess, and the daughter of gribso, the pure text adventure engine I haven't yet had call to make.
   Conceptually, every gribsia game is just one big (javascript) object, in the following form:
rooms = {
  vars : {bleh: "any spare variables you want to keep around go here, maybe (maybe they would be better off in a room, or just under their own name...)"}
  "player position" : "Main Menu"
  "" : /*title of room (string)
  { (not sure if himg is going to make the cut...)
    description: "" (sf, gets displayed when in room),
    doors: [["",""]] (array of (optionally, pairs of) sfs, first in pair is displayed on the button, second in pair is destination. Will default to "go to x" if only a bare sf is there instead of a pair.)
    //you're going to mess up a lot and forget the outer [] on doors arrays that consist only of a single door (pair). However, that pair could ambiguously be a 2-array of proper doors, so I can't help you.
    nooks: [["",""]] (array of pairs of strings or fns returning string, first is put on a button, second is displayed when button is pressed)
    slots: [["","",""]] (array of triples of strings or fns returning string, first is item required to show button, second is put on a button, third is displayed when button is pressed) (really just a specialized nook)
    items: [""] (array of strings, loose items in the room that can be picked up)
    commentary: "" (a string, author's commentary)
  }
  //and so on, for all the rooms
  //note that an sf is a string or function returning string, and if the return value of the display sf is falsy (null, undefined, or empty) the door/nook/slot will not show.
};
  That's it, that's all you need to know! It's a very powerful system once you learn the convention, especially because you can throw in arbitrary code almost anywhere.
  There's also a powerful inventory system in place, and various options your game can set.
  This makes saving and loading very easy, just write out or replace the object.
  You can also put each room into the rooms object sequentially, instead of all at once, using the other notation:
  rooms['New Room'] = {description: "blah blah blah"};
  In fact, you probably want to do that to preserve all the other properties of the object instead of overwritting them.
  Note: you have to load this file, then the source file of the particular game. Then, in the game source code, call go("Main Menu"); or whereever you want your first room to be.
*/

var title = document.getElementById("title");
var himg = document.getElementById("himg"); //header image
var nook = document.getElementById("nook");
var description = document.getElementById("description");
var commentary = document.getElementById("commentary");
var ops = document.getElementById("ops"); //options
var hud = document.getElementById("hud"); //heads-up display

function refreshhud(){
  if (showhud == true){
    hud.innerHTML = player.name +" | "+player.power+" | "+(time? time+" | ": "") +inventory.list();
  } else {
    hud.innerHTML = "";
  }
}
function clearall(){
  title.innerHTML = "";
  himg.innerHTML = "";
  nook.innerHTML = "";
  description.innerHTML = "";
  ops.innerHTML = "";
  commentary.innerHTML = "";
}

function settitle(arg){
  title.innerHTML = "<h1>"+arg+"</h1>";
}

//Some default values that can be set by the game that runs on this engine.
if (typeof rooms == "undefined") {rooms = {};}
if (typeof showhud == "undefined") {showhud = true;}
if (typeof showcommentary == "undefined") {showcommentary = false;}
if (typeof time == "undefined") {time = "";}

var roomhist = []; //stack to track player's path. the current room is always roomhist[0], the prev room is always roomhist[1], etc. Unclear if this is really needed. We do currently use it for refresh, though, though that could probably use something else...

function go(room){
  roomhist.unshift(room);
  clearall();
  sethimg(room);
  displayroom(room);
  refreshhud();
}

function adddescription(arg){
  description.innerHTML = description.innerHTML + arg.replaceAll("\n","<br>") +"<br>";
  //It's technically poor practice to disregard <p>s and just throw in <br>s when you need linebreaks but I don't really buy into having two different types of linebreaks
}
function addop(displaytext, action){
  if(!displaytext){console.log("didn't create op because displaytext was empty");return;}
  b = document.createElement("button");
  b.innerText = displaytext;
  b.onclick = action;
  ops.appendChild(b);
}

function addcommentary(arg){
  if(showcommentary){
    commentary.innerHTML = commentary.innerHTML + arg.replaceAll("\n","<br>") + "<br>"; //technically, you're allowed to have multiple calls to addcommentary for one room, but I don't do this.
  }
}

function imgfile(arg){return "assets/"+arg.replaceAll("\'","")+".png"}
function img(arg){return "<img src='"+imgfile(arg.replaceAll("\'",""))+"'>"}
function sethimg(room){
  //note that this fn may not give you the img you expect for some reason...
  //himg.innerHTML = "<img src='"+imgfile(room)+"' onerror=\"sethimg('"+room.replace("\'","")+"', null);\">"; console.log(1+himg.innerHTML)
}

function stringeval(sf){
  if (typeof sf == "string"){
    return sf;
  }
  if (typeof sf == "function"){
    return sf();
  }
  return sf; //probably an object
}

function refresh(){go(roomhist[0]); roomhist.shift();/*Don't count the refresh in roomhist*/} //not necessarily idempotent!

function adddoor(displaytext, locationtext){ //Only takes strings, not sfs!
  addop(displaytext, function(){go(locationtext);});
}

function additem(displaytext, item){ //Only takes strings, not sfs!
  addop(displaytext, function(){inventory.add(item); rooms[roomhistory[0]].items.remove(item);});
}

function addnook(displaytext, description){ //Only takes strings, not sfs!
  addop(displaytext, function(){nook.innerHTML = stringeval(description).replaceAll("\n","<br>")});
}

function displayroom(room){
  settitle(room); // can be overridden by calling settitle in the body of the description function
  rooms[room].description && (desc = stringeval(rooms[room].description)) && adddescription(desc); //these && chains are in a very particular order to allow for missing and nullable attributes.
  rooms[room].commentary && (comm = stringeval(rooms[room].commentary)) && addcommentary(comm);

  rooms[room].nooks && rooms[room].nooks.map(function f(n){ //shortcircuit and makes a bash style if
     var nn = stringeval(n[0]);
     nn && addnook(nn, n[1]);
  })

  if(rooms[room].doors){
    for (door of rooms[room].doors){
      var result = stringeval(door); //detect if it's a bare sf or a pair
      if (typeof result == "string" && result){
        adddoor("Go to "+result, result);
      } else if (typeof result == "object") { //doors with name and location pair
        var result = stringeval(door[0]);
        var result2 = stringeval(door[1]);
        if(result){
          adddoor(result, result2); //have to do this redirection or you get confusing string reference errors. Too dynamic!
        }
      }
    }
  }

  rooms[room].items && rooms[room].items.map(function f(i){ 
    var ii = stringeval(i);
    if (ii){
    additem("Take "+ii, ii);
    }
  })
}

// We have an (over)complicated inventory system, which tries to account for the fact that sometimes you want to just slap in a string and sometimes you want complex behavior in the items.
inventory = {

items: [], //items can be set to [] to clear the inventory.

itemify: function(item){ //Turn an underspecified item into an item with default properties
  if(typeof item === 'string' || item instanceof String){
    item = {name: item};
  }
  item.count = (item.count? item.count : 1);//assume no count = 1
  item.plural = (item.plural? item.plural : item.name +"s");
  return item;
},

add: function(item){ //Add a negative number to remove items
  if (Array.isArray(item)){ //recurse on arrays
    for(var i = 0; i < item; i++){inventory.add(item[i]);}
  }
  item = inventory.itemify(item);
  items = inventory.items;
  var added = false;
  for(var i=0; i<items.length; i++){
    if (items[i].name == item.name){
      items[i].count += item.count
      added = true;
    }
  }
  if(!added){items.push(item);}
},

list: function(){ //print a listing of all the items in the inventory
  items = inventory.items;
  list = "";
  if (items.length == 0){return "<i>Nothing</i>";}
  else{
    for(var i=0; i< items.length; i++){
      var item = items[i];
      if(item.count > 1){
        list += item.count +" "+ item.plural;
      }
      else{
        list += item.name;
      }
      list += (i<items.length-1?", ":"");
    }
  }
  return list;
},

contains: function(item, required=1){ //checks if a certain number (default 1) of an item is present
  if (Array.isArray(item)){ //recurse on arrays
    tmp = true;
    for(var i = 0; i < item; i++){tmp = tmp && inventory.contains(item[i]);}
  }
  item = inventory.itemize(item);
  items = inventory.items;
  for(var i=0; i<items.length; i++){
    if (items[i].name == item.name){
      required -= items[i].count;
    }
  }
  return required <= 0;
}
}