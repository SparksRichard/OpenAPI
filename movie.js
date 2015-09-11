

//pulls JSON from HTML


//define movie object constructor @object
function Movie(title, year,																																 company){
	this.title = title;
	this.year = year;
	this.location = location;
	this.company = company;
}

var movieApp = new Object();
movieApp.movieManager = [];

movieApp.requestInfo = function(){
	var myMovie;
	for( x in parsedRequest.data){
		if(parsedRequest.data[x][10]=="Golden Gate Bridge") {
			myMovie = new Movie(parsedRequest.data[x][8],
				parsedRequest.data[x][9],
				parsedRequest.data[x][12]
			);
			movieApp.movieManager.push(myMovie);
		}
	}
}

movieApp.writeToScreen = function(){
	var output = "";
	for(m in this.movieManager){
		output += this.movieManager[m].title + ", ";
		output += this.movieManager[m].year + ", ";
		output += this.movieManager[m].company + "<br /> "
	}
	document.getElementById('result').innerHTML += output;
}

var request = new XMLHttpRequest();
var parsedRequest;
request.open('GET', 'https://data.sfgov.org/api/views/yitu-d5am/rows.json?accessType=DOWNLOAD');
request.onreadystatechange = function(){
	if((request.status==200) && (request.readyState==4)){
		parsedRequest = JSON.parse(request.responseText);
		movieApp.requestInfo();
		movieApp.writeToScreen();
		
	}
}
request.send();

//search for info @strings

// only include golden
//



