var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var dates = [];
var jsonOutter = {};
//app.get('/scrape', function(req, res){
function getLinks(url){
	//2015 table div id name change
	//url = "https://web.archive.org/web/20151015034812/http://www.simplyss.com/minnesota/woodbury-oakdale-self-storage/";
	//"https://web.archive.org/web/20151015034812/http://www.simplyss.com/minnesota/woodbury-oakdale-self-storage/"];
	//url = "https://web.archive.org/web/20150211212349/http://www.simplyss.com/minnesota/woodbury-oakdale-self-storage/";
	//2016 table div id name change
	//url = "https://web.archive.org/web/20160325040558/http://www.simplyss.com/minnesota/woodbury-oakdale-self-storage/";
	var json = { stoage_size : "", description: "", priceA: "", priceB: ""};
	
	request(url, function(error, response, html){
	    if(!error){
	    	console.log("Ping successfully.")

	        var $ = cheerio.load(html);
		    var title, release, rating;
			$('.units-wrapper').filter(function() {
			//$('#all_units_holder').filter(function() {
				var data = $(this);
				var ori = data;
				$ = cheerio.load(data.html());
				//console.log("found #all_units_holder");
				$('.unit-row ').filter(function (){
					data = $(this);
					ori1 = $(this);
					$ = cheerio.load(data.html());
					//console.log("found .unit-rows!")
					$('.pull-left.thumb-details').filter(function (){
						data = $(this);
						$ = cheerio.load(data.html());
						///console.log($(this).html());
						//console.log("found first thumb!");
						$('.size-16').filter(function(){
							data = $(this);
							$ = cheerio.load(data.html());
							//console.log($(this).text());
							json.stoage_size += data.text() + ", ";
							//console.log(json.stoage_size);
						})
					})
					$ = cheerio.load(ori1.html());
					$('.pull-left.price').filter(function (){
						$ = cheerio.load($(this).html());
						var count = 0;
						$('.blue.size-16').each(function (){
							if (count == 0) {
								json.priceA += $(this).text() + ", ";
								count++;
							}
							else{
								count =0;
								json.priceB += $(this).text() + ", ";
							}
							//console.log();
							//console.log("Break");
						})
					})
				})
				$ = cheerio.load(ori.html());
				//console.log(ori.text());
					$('.clearfix').find('small').each(function (){
						json.description += $(this).text() + ", ";	
					})
							/*(function (){
						data = $(this);
						$ = cheerio.load(data.html());
						console.log("HERE!!");
						console.log(data.html());
					})*/
			})
			dates.push({
				"stoage_size" : json.stoage_size,
				"description" : json.description,
				"priceA" :  json.priceA,
				"priceB" : json.priceB
			});
		}

		//console.log(json);

	// To write to the system we will use the built in 'fs' library.
	// In this example we will pass 3 parameters to the writeFile function
	// Parameter 1 :  output.json - this is what the created filename will be called
	// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
	// Parameter 3 :  callback function - a callback function to let us know the status of our function
	jsonOutter.dates = dates;
	//console.log("done");
	console.log(jsonOutter);
	fs.writeFile('output.json', JSON.stringify(jsonOutter, null, 4), function(err){
		    console.log('File successfully written! - Check your project directory for the output.json file');
	})
	// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
	//res.send('Check your console!');
	//console.log(jsonOutter);
	})
	
	
}
urls = ["https://web.archive.org/web/20151015034812/http://www.simplyss.com/minnesota/woodbury-oakdale-self-storage/",
"https://web.archive.org/web/20150211212349/http://www.simplyss.com/minnesota/woodbury-oakdale-self-storage/",
"https://web.archive.org/web/20151015034812/http://www.simplyss.com/minnesota/woodbury-oakdale-self-storage/"];
urls.forEach(function(url){
	console.log(url);
	getLinks(url);
});



app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;