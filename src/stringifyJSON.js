// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  if (obj === null) {
  	return 'null';
  } else if (obj === undefined || typeof obj === 'function') {
  	return undefined;
  } else if (typeof obj === 'boolean' || typeof obj === 'number') {
  	return obj.toString();
  } else if (typeof obj === 'string') {
  	return '"' + obj + '"';
  } else if (Array.isArray(obj)) {
  	var string = '[';
  	obj.forEach(function(element, index) {
  	  if (element === undefined || typeof element === 'function') {
  	  	string += null;
  	  } else {
  	    string += stringifyJSON(element);	
  	  }  
  	  if (index !== obj.length - 1) {
  	  	string += ',';
  	  }
  	});
  	string += ']';
  	return string;
  } else if (typeof obj === 'object') {
    var string = '{';
    var lastProperty = Object.keys(obj)[Object.keys(obj).length - 1];
    for (var property in obj) {
  	  if (obj[property] === undefined || typeof obj[property] === 'function') {
  	  	continue;
  	  } else if (obj.hasOwnProperty(property)) {
  	    string += '"' + property + '":';
  		string += stringifyJSON(obj[property]);
  	    if (property !== lastProperty) {
  	      string += ',';
  	    }
  	  }	
    }
    string += '}';
    return string;
  } 
};
