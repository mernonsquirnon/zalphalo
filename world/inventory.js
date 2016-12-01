inv = {

items: [], //items can be set to [] to clear the inventory.

itemize://Turn an underspecified item into an item with default properties
	function(item){
		if(typeof item === 'string' || item instanceof String){
			item = {name: item};
		}
		item.count = (item.count? item.count : 1);//assume no count = 1
		item.plural = (item.plural? item.plural : item.name +"s");
		return item;
	}
,
add://Add a negative number to remove items
	function(item){
		if (Array.isArray(item)){ //recurse on arrays
			for(var i = 0; i < item; i++){inv.add(item[i]);}
		} 
		item = inv.itemize(item);
		items = inv.items;
		var added = false;
		for(var i=0; i<items.length; i++){
			if (items[i].name == item.name){
				items[i].count += item.count
				added = true;
			}
		}
		if(!added){items.push(item);}
	}
,

list:
	function(){
		items = inv.items;
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
	}
,

contains: //checks if a certain number (default 1) of an item is present
	function(item){
		if (Array.isArray(item)){ //recurse on arrays
			tmp = true;
			for(var i = 0; i < item; i++){tmp = tmp && inv.contains(item[i]);}
		} 
		item = inv.itemize(item);
		items = inv.items;
		var required = item.count;
		for(var i=0; i<items.length; i++){
			if (items[i].name == item.name){
				required -= items[i].count;
			}
		}
		return required <= 0;
	}
}