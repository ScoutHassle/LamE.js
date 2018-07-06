var debugLog = {
	logs : [],
	maxLog : 10,
	
	addLog : function(str)
	{
		this.logs.push(str);
		
		if(this.logs.length > this.maxLog)
		{
			this.logs.splice(0, 1);
		}
	},
	
	render : function()
	{
		ctx.font = "40px Impact";
		ctx.fillStyle = "rgba(255, 0, 0, 1)";
		ctx.textAlign = "left";
		
		var spacing = 0;
		for(var i = this.logs.length - 1; i > -1; i--)
		{			
			ctx.fillText(this.logs[i], 30, 50 + spacing);
			
			spacing += 50;
		}
	}
}
