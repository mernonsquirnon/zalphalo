//Here we go!
		var currentroom = "Main Menu";
		var title = document.getElementById("title");
		var content = document.getElementById("content");
		var ops = document.getElementById("ops");
		function action(text)
		{
			rooms[currentroom](text)
		}
		function go(room)
		{
		currentroom = room;
		rooms[room]("main");
		clearall();
		addtitle(room);//the main method can override if need be
		}
		function clearall()
		{
		title.innerHTML = "";
		content.innerHTML = "";
		ops.innerHTML = "";
		}
		function addtitle(text)
		{			
			title.innerHTML = "<h1>"+text+"</h1>";
		}
		function addcontent(text)
		{
			content.innerHTML = content.innerHTML + text;
		}
		function addop(text)
		{			
			var ops = document.getElementById("ops");
			ops.innerHTML = "<button onclick=\"action('"+text+"')\">"+text+"</button>";
		}
		var rooms = {};
		rooms['Main Menu'] = function(text){addtitle("Zalphalo");addcontent("Oh hi\nMark.");}
		action("text");
