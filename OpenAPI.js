
var redditApp = new Object();
redditApp.linkManager = [];
var request = new XMLHttpRequest();
var parsedRequest;
var comments = "";
var titleLink;

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
			//if = "nsfw" or ""
			redditData[x].data.thumbnail,
			redditData[x].data.title,
			redditData[x].data.url
			);
		redditApp.linkManager.push(myLink);
	}
}

var pic = "";

redditApp.updateThumbnail = function(x){

	
		
		if(this.linkManager[x].thumbnail == "nsfw"){
			pic = "http://i.imgur.com/UHzw6.png";
		}
		else if(this.linkManager[x].thumbnail == ""){
			pic = "https://lh3.googleusercontent.com/-I7VHiw7eMcM/AAAAAAAAAAI/AAAAAAAAAAA/v9t8aXluKrs/photo.jpg"}
		else if(this.linkManager[x].thumbnail == "self"){
			pic = "http://i.imgur.com/Obq6XD6.png";
		}
		else if(this.linkManager[x].thumbnail == "default"){
			pic = "http://i.stack.imgur.com/kL2G9.png";
		}
		else{
			pic = this.linkManager[x].thumbnail;
		
	}
}
redditApp.writeToScreen = function(){
	var comments = "";
	var info = "";
	var title = "";
	for (x in this.linkManager){
		
		comments = "http://www.reddit.com"+redditApp.linkManager[x].permalink;

		redditApp.updateThumbnail(x);
		//placeholder imgs for nothing and nsfw
		// add self and default categories
		
		title += "<article class = \"group\"><a class = \"picture\" href = "+this.linkManager[x].url+ "><img class = \"thumbnail\" src = "+pic+"alt = \"broken!!\" height = \"100\" width = \"100\"></a>";
		
		//add NSFW if()

		title += "<ul class = \"titleLink\" style = \"list-style-type:none\"><li><a href = "+this.linkManager[x].url+">"+this.linkManager[x].title+"</a></li><li><a href = "+comments+">Click here to view "+this.linkManager[x].num_comments+" comments.</a></li><li class=\"notSafe\">NSFW!</li></ul>";

			//<li><a href = "+this.linkManager[x].url+">"+this.linkManager[x].title+"</a></li>
		title += "<ul class = \"infoList\">"
		title += "<li>Points:"+this.linkManager[x].score+"</li> ";
		title += "<li>Sub:"+this.linkManager[x].subreddit+"</li> ";
		title += "<li>By:"+this.linkManager[x].author+"</li></ul></article>";
		

		
		


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