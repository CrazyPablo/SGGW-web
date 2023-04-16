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