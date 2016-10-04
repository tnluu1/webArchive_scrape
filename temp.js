var excelbuilder = require('msexcel-builder');
var config = require('./output.json');
  	
  	var pA = (JSON.stringify(config.priceA)).split(", ");
  	var pB = (JSON.stringify(config.priceB)).split(", ");
  	var ss = (JSON.stringify(config.stoage_size)).split("\' ,");
  	var des = (JSON.stringify(config.description)).split(", ");
  	//ss = (JSON.stringify(ss)).split("\' ,");
  	
  	console.log(ss);
  	console.log(des);
  	console.log(pA);
  	console.log(pB);
  	
// Create a new workbook file in current working-path
  var workbook = excelbuilder.createWorkbook('./', 'sample1.xlsx')

  // Create a new worksheet with 10 columns and 12 rows
  var sheet1 = workbook.createSheet('sheet1', pA.length, ss.length*2);

  // Fill some data
  sheet1.set(1, 1, 'Climate Controlled');
  sheet1.set(1, 5, 'Non Climate Controlled');
  var cntA = 1;
  var cntB = 1;
  for (var i = 0; i < pA.length-1; i++){
  	if(des[i].length>10){
  		sheet1.set(cntA, 2, ss[i]);
  		sheet1.set(cntA, 3, pA[i]);
  		sheet1.set(cntA, 4, pB[i]);
  		cntA++;
  	}
 	else{
 		sheet1.set(cntB, 6, ss[i]);
 		sheet1.set(cntB, 7, pA[i]);
 		sheet1.set(cntB, 8, pB[i]);
 		cntB++;
 	}
  }
    

  // Save it
  workbook.save(function(err){
    if (err)
      throw err;
    else
      console.log('congratulations, your workbook created');
  });

