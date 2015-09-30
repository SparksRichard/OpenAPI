


function Link(author, num_comments, over_18, permalink, score, subreddit, thumbnail, title, url){
	this.author = author;
	this.num_comments = num_comments;
	this.over_18 = over_18;
	this.permalink = permalink;
	this.score = score;
	this.subreddit = subreddit;
	this.thumbnail = thumbnail;
	this.title = title;
	this.url = url;
}

var redditApp = new Object();
redditApp.linkManager = [];

redditApp.buildObjects = function(){
	var redditData = parsedRequest.data.children
	var myLink;
	for (x in redditData){
		myLink = new Link(
			redditData[x].data.author,
			redditData[x].data.num_comments,
			redditData[x].data.over_18,
			redditData[x].data.permalink,
			redditData[x].data.score,
			redditData[x].data.subreddit,
			redditData[x].data.thumbnail,
			redditData[x].data.title,
			redditData[x].data.url
			);
		redditApp.linkManager.push(myLink);
	}
}

redditApp.writeToScreen = function(){
	var comments = "";
	var info = "";
	var pic = "";
	var title = "";
	for (x in this.linkManager){
		
		
		title += "<ul style=\"list-style-type:none\"><li><img src="+this.linkManager[x].thumbnail+" alt=\"gah?\" height=\"100\" width=\"100\">"+"</li>";

		title += "<li><a href = "+this.linkManager[x].url;+">"+this.linkManager[x].title+"</a></li>";

		title += "<li>"+this.linkManager[x].score+", ";
		title += this.linkManager[x].subreddit+", ";
		title += this.linkManager[x].author+",";
		title += this.linkManager[x].over_18+"</li>";

		title += "<li><a href = "+this.linkManager[x].num_comments+">"+this.linkManager[x].permalink+"</a></li><ul style=\"list-style-type:none\">";
		


	}
		document.getElementById('title').innerHTML += title;

	/**
	document.getElementById('title').innerHTML += info;
	document.getElementById('title').innerHTML += pic;
	document.getElementById('title').innerHTML += comments;

	document.getElementById('comments').innerHTML += comments;
	document.getElementById('info').innerHTML += info;
	document.getElementById('pic').innerHTML += pic;
	document.getElementById('title').innerHTML += title;
	*/
}




var request = new XMLHttpRequest();
var parsedRequest;
request.open('GET', 'http://www.reddit.com/.json');
request.onreadystatechange = function(){
	if((request.status==200) && (request.readyState==4)){
		parsedRequest = JSON.parse(request.responseText);
		redditApp.buildObjects();
		redditApp.writeToScreen();
		console.log(redditApp.linkManager);
	}
}
request.send();