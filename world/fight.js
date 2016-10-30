rooms['Fight'] = function(arg){
addcontent("<table id='fight table'>"+
"<tr><td><img src='"+player.picture+"'></td><td>vs</td><td><img src='"+monster.picture+"'></td></tr>"+
"<tr>Current combo:"+combo+"</tr></table>");
	if (arg == "Help"){
		addcontent("You remember the relevant portion of your favorite cookbook. <blockquote>There are 5 different basic tastes: Sweet(♥), Salty(♦), Sour(♣), Bitter(♠), and Umami(<b>U</b>). In any given dish, the amount of Sweet must equal the amount of Bitter, the amount of Salty must equal the amount of Sour, and the amount of Umami must equal or exceed the sum total of the four other flavors.<br>"+
	"The size of your plate will limit the number of items you can fit on it. Your power (the little italicized number in the Heads-Up Display at the bottom of the screen) divided 100 will be multiplied by your flavor score, as it represents how healthy you are and thus how hard you can throw the plate.</blockquote>");
	}
}