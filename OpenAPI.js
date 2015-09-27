var request = new XMLHttpRequest();
var parsedRequest;
request.open('GET', 'http://www.reddit.com/.json');
request.onreadystatechange = function(){
	if((request.status==200) && (request.readyState==4)){
		parsedRequest = JSON.parse(request.responseText);
		console.log(parsedRequest);
		
	}
}
request.send();