// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (obj === null) {
  	return 'null';
  } else if (typeof obj === 'number') {
  	return obj.toString();
  } else if (typeof obj === 'object' && obj !== null) {
    var string = '{';
    var lastProperty = Object.keys(obj)[Object.keys(obj).length - 1];
    for (var property in obj) {
  	  if (obj.hasOwnProperty(property)) {
  	    string += '"' + property + '":';
  
  	    if (!isNaN(obj[property])) {
  	      string += obj[property];
  	    } else {
  	    	string += '"' + obj[property] + '"';
  	    }
  
  	    if (property !== lastProperty) {
  	    	string += ',';
  	    }
  	  }	
    }
    string += '}';
    return string;
  } 
};
