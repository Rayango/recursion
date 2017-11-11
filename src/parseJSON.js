// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // search for [] and {} to determine if json string is of an array and/or object
    // 
  if (json.indexOf('{') === -1 && json.indexOf('[') === -1) {
  	return parseString(json);
  } else if (json.indexOf('{') === 1) {
    return parseObject(json);
  }
  
};

function parseString(json) {
  var object = '';
  for (var i = 0; i < json.length; i++) {
    object += json.charAt(i)	
  }
  return object;
}

function parseObject(json) {
  var jsonString = json;
  var object = {};
  var key;
  var value;

  while (jsonString.indexOf(':') !== -1) {
  	key = jsonString.slice(0, jsonString.indexOf(':'));
  	value = jsonString.slice(jsonString.indexOf(':') + 1, jsonString.indexOf(','));	
  	if (value.indexOf('{') === 0 || value.indexOf('[') === 0) {
  	  value = parseJSON(value);	
  	}
  	object[key] = value;
  	jsonString = jsonString.slice(0, jsonString.indexOf(',') + 1);
  }

  return object;
}



