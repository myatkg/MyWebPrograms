//Declaing variables
var numSquares = 6;//default number of squares
var colors = [];
var pickedcolor;
var squares = document.querySelectorAll(".square");
var objcolor = document.querySelector("#objcolor");
var resetbtn = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var mode = document.querySelectorAll(".mode");

/*----------------------------------------------------------------------------------------*/

//preparing and loading everything when the page is loaded or refreshed
initialize();
//resetting or creating new colors when "New Colors" or "Play Again" is clicked and Also adding Event Listener for "New Colors" or "Play Again" button
resetbtn.addEventListener("click", function(){
	reset();
});

/*----------------------------------------------------------------------------------------*/

function initialize(){
	setupMode();
	setupSquares();
	reset();
}

function setupMode(){
	//adding EventListner for each mode button (Easy or Hard or Super) and resetting colors when clicked
	for (i=0; i<mode.length; i++){
		mode[i].addEventListener("click", function(){
			for(j=0; j<mode.length; j++){
				mode[j].classList.remove("selected");
				this.classList.add("selected");//adding highlight to selected mode
			}
			//setting number of squares depending on the selected mode
			//note that default numSquares is 6 as defined above
			//this.textContent==="Easy" ? numSquares=3: numSquares = 6;// this is called trinary operator
			if(this.textContent==="Easy"){
				numSquares = 3;
				resizeSquares(30,30,1.667);
			} else if(this.textContent === "Hard"){
				numSquares = 6;
				resizeSquares(30,30,1.667);
			} else {
				numSquares = 12;
				resizeSquares(22.5, 22.5, 1.25);
			}
			//resetting colors of squares depending on the selected mode
			reset();
		});
	}
}

function setupSquares(){
	//adding colors to the squares and adding Event Listener for squares
	for (var i=0; i<squares.length; i++){
		//add click listener for squares;
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			if(clickedColor===pickedcolor){
				changeColor(clickedColor);
				document.querySelector("#reportmessage").textContent = "Correct";
				resetbtn.textContent="Play Again?"
				h1.style.backgroundColor = pickedcolor;
			} else {
				this.style.backgroundColor = "#232323";
				document.querySelector("#reportmessage").textContent = "try again";
			}
		});
	}
}

//function for resetting/re-generating colors and background
function reset(){
	//generate new colors
	colors = genRC(numSquares);

	//pick new color
	pickedcolor = colors[pickColorfnc()];

	//change objective message
	objcolor.textContent = pickedcolor;

	//changing header background color
	h1.style.backgroundColor = "steelblue";

	//setting to "New Colors" when clicked "Play again"
	resetbtn.textContent = "New Colors";

	//hidding out report message
	document.querySelector("#reportmessage").textContent = "";

	//change color of squares
	for (var i = 0; i<squares.length; i++){
		if(colors[i]){ //checking if there is a color in colors array, it will add that color to squares array
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];	
		}else {
			squares[i].style.display = "none";
		}
		
	}
}

//randomly generating red,green,blue
function randomizeColor(){
	var r = Math.floor(Math.random()*256);
	var g = Math.floor(Math.random()*256);
	var b = Math.floor(Math.random()*256);
	return "rgb("+r+", "+g+", "+b+")"	
}

//function for generating random colors and storing them in array
function genRC(num){
	var arr = [];
	for(i=0; i<num; i++){
		arr.push(randomizeColor());
	}
	return arr;
}


//function for changing color of all squares when correct color is clicked!
function changeColor(color){
	for(i=0; i<squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

//function for picking the objective color
function pickColorfnc(color){
	var color = Math.floor(Math.random()*colors.length);
	return color;
}

//for defining size of squares to make desire rows and columns
function resizeSquares(w,h,margin){
	for(i=0; i<squares.length;i++){
		squares[i].style.width = (w+"%");
		squares[i].style.padding= ("0 0 "+w+"%"+" 0");
		squares[i].style.margin = (margin+"%");
	}
}