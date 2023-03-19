/*Settings*/
var gamemode = 0;
var starting_player=1;		/*X(1) O(-1) random(0) - singleplayer default*/
var starting_player_2=0;	/*X(1) O(-1) random(0) - multiplayer default*/
var sign_setting=1;					/*X(1) O(-1)*/
var difficulty_setting=0;
/*Game variable*/
var sign=1;					/*X(1) O(-1)*/
var difficulty=0;
var playboard = [[0,0,0],[0,0,0],[0,0,0]];
var player = 1;
var game = false;
var round = 0;
/*Dictionaries*/
var player_sign_dict = {1:"X",[-1]:"O"};
var player_name_dict = {1:1,[-1]:2};

function init()
{
	var i = 0;
	document.querySelectorAll("td").forEach((element)=>
	{
		element.setAttribute("onclick", "playerClick(this,"+i+")");
		i++;
	});
}

function playerClick(obj,id)
{
	if(playboard[Math.floor(id/3)][id%3]!= 0 || game == false || (gamemode == 0 && player!=sign)){return;}
	playboard[Math.floor(id/3)][id%3]=player;
	obj.innerHTML="<img src='img/"+player_sign_dict[player]+".png' alias='cross'>";
	round++;
	checkWin();
	if(!game){return;}
	player*=-1;
	setLabel();
	if(gamemode==0)
	{
		setTimeout(() => {AImove();}, 500);
	}
}

function checkWin()
{
	for(var i=0;i<3;i++)
	{
		if(Math.abs(playboard[i][0]+playboard[i][1]+playboard[i][2])==3)
		{
			endGame();
			return;
		}
	}
	for(var i=0;i<3;i++)
	{
		if(Math.abs(playboard[0][i]+playboard[1][i]+playboard[2][i])==3)
		{
			endGame();
			return;
		}
	}
	if(Math.abs(playboard[0][0]+playboard[1][1]+playboard[2][2])==3)
	{
		endGame();
		return;
	}
	if(Math.abs(playboard[0][2]+playboard[1][1]+playboard[2][0])==3)
	{
		endGame();
		return;
	}
	if(round==9)
	{
		game = false;
		document.querySelectorAll("#play")[0].innerHTML="Play again";
		document.querySelectorAll("#gameover")[0].style.display="block";
		document.querySelectorAll("#gameover h4")[0].innerHTML = "Draw!";
		setLabel("Draw!");
	}
}

function endGame()
{
	var text=""
	if(gamemode==0 && player==sign){text="You won!";}
	else if(gamemode==0 && player!=sign){text="You lost!";}
	else if(gamemode==1){text="Player "+player_name_dict[player]+" ("+player_sign_dict[player]+") won!";}
	game = false;
	document.querySelectorAll("#play")[0].innerHTML="Play again";
	document.querySelectorAll("#gameover")[0].style.display="block";
	document.querySelectorAll("#gameover h4")[0].innerHTML = text;
	setLabel(text);
}

function changeMode(id)
{
	gamemode = id;
	var nodeList = document.querySelectorAll(".sign");
	var i=0;
	nodeList.forEach((element)=>
	{
		if(i == id){element.innerHTML = "X";}
		else {element.innerHTML = "";}
		i++;
	});
	reset();
	var temp=starting_player;
	starting_player=starting_player_2;
	starting_player_2=temp;
	document.querySelectorAll("#play")[0].innerHTML ="Play";
	var title = document.querySelectorAll("h2");
	text="Tic-Tac-Toe - ";
	if(id==0)
	{
		text+="Singleplayer gamemode";
		document.querySelectorAll("#singleplayer")[0].style.display="block";
		document.querySelectorAll("#multiplayer")[0].style.display="none";
	}
	else
	{
		text+="Multiplayer gamemode";
		document.querySelectorAll("#singleplayer")[0].style.display="none";
		document.querySelectorAll("#multiplayer")[0].style.display="block";
	}
	title[0].innerHTML=text;
	setLabel("Click Play to start");
	close_window();
}

function reset()
{
	game = false;
	playboard = [[0,0,0],[0,0,0],[0,0,0]];
	document.querySelectorAll("td").forEach((element)=>
	{
		element.innerHTML="";
	});
	round=0;
}

function play()
{
	reset();
	document.querySelectorAll("#play")[0].innerHTML ="Restart";
	close_window();
	game=true;
	sign=sign_setting;
	difficulty=difficulty_setting;
	if(starting_player!=0){player = starting_player;}
	else{player=parseInt((RandInt(2)-0.5)*2);}
	setLabel();
	if(gamemode==0 && player!=sign){AImove();}
}

function setLabel(text="")
{
	if(text=="")
	{
		if(gamemode==0 && player==sign){text="Player's turn";}
		else if(gamemode==0 && player!=sign){text="Bot's turn";}
		else{text="Player "+player_name_dict[player]+" ("+player_sign_dict[player]+") turn";}
	}
	document.querySelectorAll("h3")[0].innerHTML = text;
}

function ChangeStartingPlayer(obj)
{
	starting_player = parseInt(obj.value);
}

function ChangePlayerSign(obj)
{
	sign_setting = parseInt(obj.value);
	var list = document.querySelectorAll("#player_starts");
	if(list[0].value=="y")
	{
		starting_player=sign_setting;
	}
	else if(list[0].value=="n")
	{
		starting_player=-sign_setting;
	}
}

function ChangePlayerStarts(obj)
{
	if(obj.value=="y")
	{
		starting_player=sign_setting;
	}
	else if(obj.value=="n")
	{
		starting_player=-sign_setting;
	}
	else{starting_player=0;}
}

function ChangeDifficulty(obj)
{
	difficulty_setting = parseInt(obj.value);
}

function AImove()
{
	var choosenField=-1;
	var freearr=[];
	var winarr=[];
	var lostarr=[];
	var goodarr=[];
	for(var i=0;i<3;i++)
	{
		var sum = playboard[i][0]+playboard[i][1]+playboard[i][2];
		for(var j=0;j<3;j++)
		{
			if(playboard[i][j]==0)
			{
				var field = i*3+j;
				/*Easy*/
				freearr.push(field);
				/*Medium*/
				if(difficulty>0 && Math.abs(sum) == 2)
				{
					if(sum*player>0){winarr.push(field);}
					else{lostarr.push(field);}
				}
				/*Hard*/
				if(difficulty==2 && sum == player)
				{
					goodarr.push(field);
				}
			}
		}
	}
	for(var i=0;i<3;i++)
	{
		var sum = playboard[0][i]+playboard[1][i]+playboard[2][i];
		for(var j=0;j<3;j++)
		{
			if(playboard[j][i]==0)
			{
				var field = j*3+i;
				/*Easy*/
				freearr.push(field);
				/*Medium*/
				if(difficulty>0 && Math.abs(sum) == 2)
				{
					if(sum*player>0){winarr.push(field);}
					else{lostarr.push(field);}
				}
				/*Hard*/
				if(difficulty==2 && sum == player)
				{
					goodarr.push(field);
				}
			}
		}
	}
	var sum_right = playboard[0][0]+playboard[1][1]+playboard[2][2];
	for(var j=0;j<3;j++)
	{
		if(playboard[j][j]==0)
		{
			var field = j*4;	/*j*3+j*/
			/*Easy*/
			freearr.push(field);
			/*Medium*/
			if(difficulty>0 && Math.abs(sum_right) == 2)
			{
				if(sum_right*player>0){winarr.push(field);}
				else{lostarr.push(field);}
			}
			/*Hard*/
			if(difficulty==2 && sum == player)
			{
				goodarr.push(field);
			}
		}
	}
	var sum_left = playboard[0][2]+playboard[1][1]+playboard[2][0];
	for(var j=0;j<3;j++)
	{
		if(playboard[j][2-j]==0)
		{
			var field = j*2+2;	/*j*3+2-j*/
			/*Easy*/
			freearr.push(field);
			/*Medium*/
			if(difficulty>0 && Math.abs(sum_left) == 2)
			{
				if(sum_left*player>0){winarr.push(field);}
				else{lostarr.push(field);}
			}
			/*Hard*/
			if(difficulty==2 && sum == player)
			{
				goodarr.push(field);
			}
		}
	}
	/*Medium*/
	if(difficulty>0)
	{
		if(winarr.length>0){choosenField = winarr[RandInt(winarr.length)];}
		else if(lostarr.length>0){choosenField = lostarr[RandInt(lostarr.length)];}
	}
	/*Hard*/
	if(difficulty==2 && choosenField==-1)
	{
		if(goodarr.length>0){choosenField = goodarr[RandInt(goodarr.length)];}
	}
	/*Easy*/
	if(choosenField==-1)
	{
		freearr = Array.from(new Set(freearr));
		choosenField = freearr[RandInt(freearr.length)]
	}
	/*Move*/
	playboard[Math.floor(choosenField/3)][choosenField%3]=player;
	var nodeList = document.querySelectorAll("td");
	nodeList[choosenField].innerHTML="<img src='img/"+player_sign_dict[player]+".png' alias='cross'>";
	round++;
	checkWin();
	if(!game){return;}
	player*=-1;
	setLabel();
}

function close_window()
{
	document.querySelectorAll("#gameover")[0].style.display="none";
}

function RandInt(max)
{
	return Math.floor(Math.random() * max);
}
