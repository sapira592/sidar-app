html5sql.openDatabase(
     "sidar", "sidar", 3*1024*1024);
     
html5sql.process("SELECT * FROM graphic;", 
function(data){
	console.log(data)
}, 
function(err){
	console.log(err)
})