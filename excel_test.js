var excelbuilder = require('msexcel-builder');
var workbook = excelbuilder.createWorkbook('./', 'sample.xlsx');
  // Create a new workbook file in current working-path 
  	/*var config = require('./output.json');
	//console.log(config.stoage_size + ' ' + config.description);
  	
  	var pA = (JSON.stringify(config.priceA)).split(", ");
  	var pB = (JSON.stringify(config.priceB)).split(", ");
  	var ss = (JSON.stringify(config.stoage_size)).split("\' ,");
  	var des = (JSON.stringify(config.description)).split(", ");
  	//ss = (JSON.stringify(ss)).split("\' ,");
  	console.log(ss);
  	console.log(des);
  	console.log(pA);
  	console.log(pB);
  	*/
  	// Create a new worksheet with 10 columns and 12 rows 
  	var sheet1 = workbook.createSheet('sheet1', 10, 12);
  
 	 // Fill some data 
  	sheet1.set(1, 1, 'I am title');
  	for (var i = 2; i < 5; i++)
    	sheet1.set(i, 1, 'test'+i);
  
 	 // Save it 
  	workbook.save(function(ok){
  	if (!ok) 
  	    workbook.cancel();
   	else
    	console.log('congratulations, your workbook created');
  	});

  	workbook.save(function(ok){
 		console.log('workbook saved ' + (ok?'ok':'failed'));
	});

	if (process.argv.length < 3) {
  		console.log('Usage: node ' + process.argv[1] + 'output.json');
  		process.exit(1);
	}
// Read the file and print its contents.

