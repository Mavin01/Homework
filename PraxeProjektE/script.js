var size = 10;
var pole = document.getElementById('pole');
var source = "";
var pocet_min = 15;
var barvy = ["","#0100FE","#017F01","#FE0000","#010080","#810102","#008081","#000000","#808080"];
var zakryta_policka = size*size;
var vyhraEl = document.getElementById('vyhra');
var prohraEl = document.getElementById('prohra');

//vytváøení dvojrozmìrného pole
var hodnota = [];
for(var i = 1;i <= size;i++){

	hodnota[i] = [];

}

//generování min
for(var i = 1;i <= pocet_min;i++){

	do{

		var x = Math.floor(Math.random() * (size)) + 1;
		var y = Math.floor(Math.random() * (size)) + 1;

	}while(hodnota[x][y]=="o")

	hodnota[x][y] = "o";

	//poèet sousedù
	if(x<size)hodnotaPlus((x+1),y);
	if(y<size)hodnotaPlus(x,(y+1));
	if(x>1)hodnotaPlus((x-1),y);
	if(y>1)hodnotaPlus(x,(y-1));
	if(x<size&&y<size)hodnotaPlus((x+1),(y+1));
	if(x>1&&y>1)hodnotaPlus((x-1),(y-1));
	if(x<size&&y>1)hodnotaPlus((x+1),(y-1));
	if(x>1&&y<size)hodnotaPlus((x-1),(y+1));
}

//zobrazení pole
for(var i = 1;i <= size;i++){

	source += "<tr>";

	for(var j = 1;j <= size;j++){

		source += "<td onclick='show(" + i + "," + j + ")' id='p" + i + j + "'>";

		//zobrazování hodnot bez klikání
		/*if(hodnota[i][j]){

			source += hodnota[i][j];
			
		}*/

		source += "</td>";

	}

	source += "</tr>";
	
}

pole.innerHTML = source;

//funkce
function hodnotaPlus(x,y){

	if(hodnota[x][y] != "o"){

		if(hodnota[x][y]){

			hodnota[x][y]++;

		}else{

			hodnota[x][y] = 1;

		}

	}

}

function show(x,y){

	if(!document.getElementById('p' + x + y).classList.contains("viditelne")){

		if(hodnota[x][y] && hodnota[x][y] != "viditelne"){

			if(hodnota[x][y] == "o"){

				document.getElementById('p' + x + y).innerHTML = "<img src='https://cdn2.iconfinder.com/data/icons/font-awesome/1792/bomb-24.png'>";
				showAll();
				document.getElementById('p' + x + y).style.background = "red";
				prohra();

			}else{

				document.getElementById('p' + x + y).innerHTML = hodnota[x][y];
				document.getElementById('p' + x + y).style.color = barvy[hodnota[x][y]];

			}

		}

		
		zakryta_policka--;
		console.log(zakryta_policka);
		document.getElementById('p' + x + y).classList.add("viditelne");

		if(!hodnota[x][y]){

			hodnota[x][y] = "viditelne";
			if(x<size)show((x+1),y);
			if(y<size)show(x,(y+1));
			if(x>1)show((x-1),y);
			if(y>1)show(x,(y-1));
			if(x<size&&y<size)show((x+1),(y+1));
			if(x>1&&y>1)show((x-1),(y-1));
			if(x<size&&y>1)show((x+1),(y-1));
			if(x>1&&y<size)show((x-1),(y+1));

		}

		if(zakryta_policka == pocet_min){
			showAll();
			vyhra();
		}

	}

}

function showAll(){

	for(var x = 1;x <= size;x++){

		for(var y = 1;y <= size;y++){

			if(hodnota[x][y] && hodnota[x][y] != "viditelne"){

				if(hodnota[x][y] == "o"){

					document.getElementById('p' + x + y).innerHTML = "<img src='https://cdn2.iconfinder.com/data/icons/font-awesome/1792/bomb-24.png'>";

				}else{

					document.getElementById('p' + x + y).innerHTML = hodnota[x][y];
					document.getElementById('p' + x + y).style.color = barvy[hodnota[x][y]];

				}

			}

			document.getElementById('p' + x + y).classList.add("viditelne");

		}

	}

}

function prohra(){

	prohraEl.style.display = "block";

}

function vyhra(){

	vyhraEl.style.display = "block";

}