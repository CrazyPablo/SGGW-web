function resize()
{
	var max_height = 0;
	var list = document.querySelectorAll(".text");
	list.forEach((element)=>
	{
		element.style.height="auto";
	});
	list.forEach((element)=>
	{
		if(element.offsetHeight>max_height)
		{
			max_height=element.offsetHeight;
		}
	});
	list.forEach((element)=>
	{
		element.style.height=max_height+"px";
	});
}

function imgshow()
{
	document.querySelector("#img_frame").setAttribute("style", "display:block");
	document.querySelector("#grey").setAttribute("style", "display:block");
	imgresize();
}

function imgresize()
{
	var img = document.querySelector("#img_frame").querySelector("img");
	var width = img.naturalWidth;
	if(window.innerWidth>width)
	{
		width=(window.innerWidth-width)/2;
	}
	else
	{
		width=0;
	}
	var height = img.naturalHeight;
	if(window.innerHeight>height)
	{
		height=(window.innerHeight-height)/2;
	}
	else
	{
		height=0;
	}
	img.setAttribute("style",`margin:${height}px ${width}px ${height}px ${width}px`);
}

function imgclose()
{
	document.querySelector("#img_frame").setAttribute("style", "display:none");
	document.querySelector("#grey").setAttribute("style", "display:none");
}