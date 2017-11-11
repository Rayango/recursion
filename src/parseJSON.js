// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // search for [] and {} to determine if json string is of an array and/or object
    // 
  if (json.indexOf('{') === -1 && json.indexOf('[') === -1) {
  	return parseString(json);
  } else if (json.indexOf('{') === 0) {
    return parseObject(json);
  } else if (json.indexOf('[') === 0) {
  	return parseArray(json);
  }

};

function parseStringOrNumber(json) {
  var parsedValue;
  if (json.indexOf('"') === -1) {
    json.indexOf('.') === -1 ? parsedValue = parseInt(json) : parsedValue = parseFloat(json);	
  } else {
  	parsedValue = json.replace(/"/g, '');
  }
  return parsedValue;
}

function parseObject(json) {
  var jsonString = json.slice(1, json.length - 1);
  var object = {};
  var key;
  var value;

  while (jsonString.indexOf(':') !== -1) {
  	key = jsonString.slice(jsonString.indexOf('"') + 1, jsonString.indexOf(':') - 1);
  	if (jsonString.indexOf(',') !== -1) {
  	  value = jsonString.slice(jsonString.indexOf(':') + 1, jsonString.indexOf(','));	
  	} else {
  	  value = jsonString.slice(jsonString.indexOf(':') + 1);	
  	}  
  	if (value.indexOf('{') === 0 || value.indexOf('[') === 0) {
  	  value = parseJSON(value);	
  	}
  	object[key] = value;
  	jsonString = jsonString.slice(0, jsonString.indexOf(',') + 1);
  }

  return object;
}

function parseArray(json) {
  var jsonString = json.slice(1, json.length - 1);
  var array = [];	
  var value;
  while (jsonString.indexOf(',') !== -1) {
  	if (jsonString.indexOf(',')) {
  	  value = jsonString.slice(0, jsonString.indexOf(','));
  	} else {
  	  value = jsonString;	
  	}
  	if (value.indexOf('{') === 0 || value.indexOf('[') === 0) {
  	  value = parseJSON(value);	
  	}
  	array.push(value);
  	jsonString = jsonString.slice(0, jsonString.indexOf(',') + 1);
  }

  return array;
}



