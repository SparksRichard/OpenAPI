
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

var request = new XMLHttpRequest();
var parsedRequest;
request.open('GET', 'http://www.reddit.com/.json');
request.onreadystatechange = function(){
	if((request.status==200) && (request.readyState==4)){
		parsedRequest = JSON.parse(request.responseText);
		redditApp.buildObjects();
		console.log(redditApp.linkManager);
	}
}
request.send();