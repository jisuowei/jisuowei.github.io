function wbAnimateShow(openAni){
	createBubbles(openAni, "#wb-ai", 	0.18, '152,57,0', 	'255,113,28', 	'AI');
	createBubbles(openAni, "#wb-apache", 0.23, '118,10,46', '205,12,77', 	'Apache');
	createBubbles(openAni, "#wb-cad", 	0.85, '16,132,153', '24,207,240', 	'AutoCAD');
	createBubbles(openAni, "#wb-css", 	0.86, '0,114,191', 	'35,171,213', 	'CSS3');
	createBubbles(openAni, "#wb-html", 	0.89, '225,55,11', 	'243,137,86', 	'HTML5');
	createBubbles(openAni, "#wb-java", 	0.10, '130,0,0', 	'240,0,1', 		'Java');
	createBubbles(openAni, "#wb-js", 	0.45, '191,167,41', '253,216,60', 	'Javascript');
	createBubbles(openAni, "#wb-jq", 	0.75, '7,105,173', 	'62,170,245', 	'jQuery');
	createBubbles(openAni, "#wb-mysql", 0.15, '163,103,37', '234,162,90', 	'MySQL');
	createBubbles(openAni, "#wb-php", 	0.35, '113,57,211', '174,129,255', 	'PHP');
	createBubbles(openAni, "#wb-ps", 	0.90, '13,64,95', 	'25, 139, 201', 'Photoshop');
	createBubbles(openAni, "#wb-sql", 	0.18, '21,78,202', 	'70,124,245', 	'SQL');
	createBubbles(openAni, "#wb-ug", 	0.73, '173,31,78', 	'247,64,121', 	'UG');
}

function createBubbles(openAni, ele, data, color, bg, txt){

	var radius = 48;

	$(ele).waterbubble({
		radius: radius,
		lineWidth: 2,
		data: data,
		waterColor: 'rgba(' + bg + ', 1)',
		textColor: 'rgba(' + color + ', 1)',
		txt: txt,
		font: 'bold 12px "Microsoft YaHei"',
		wave: true,
		animation: openAni
	});
}