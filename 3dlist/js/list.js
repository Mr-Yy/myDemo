/**
 * 3dlist
 * @authors Yanxinyu (yanxinyuu@icloud.com)
 * @date    2015-07-05 13:33:00
 * @version $Id$
 */
$(function(){
	$("#list").list3D();
});

$.fn.list3D = function(){
	var con = $(this);
	var list = con.find("ul").find("li");

	var offset = 0;
	var speed = 0.01;

	con.on("mousemove", function(e){
		var top = con.offset().top;
		var height = con.height();

		speed = (e.clientY - top) /  height * 0.2 - 0.1;
	});

	for (var i = list.length - 1; i >= 0; i--){
		list[i].angle = i * Math.PI * 2 / list.length;
	}
	
	setInterval(listRound, 20);
	
	function listRound(){
		for (var i = list.length - 1; i >= 0; i--){
			var li = $(list[i]);
			var angle = list[i].angle + offset;
			x = 100;
			y = 45 + Math.cos(angle) * 40;
			size = Math.round(40 - Math.sin(angle) * 40);

			var center = li.width() / 2;
			var left = ((con.width()/2) * x / 100 - center) + "px";

			li.css("fontSize", size + "pt");
			li.css("opacity",size/100);
			li.css("zIndex" ,size);
			li.css("left" ,left);
			li.css("top", y + "%");
		}
		offset += speed;
	}
}
