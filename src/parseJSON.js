// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // search for [] and {} to determine if json string is of an array and/or object
    // 
  if (json === 'true') {
    return true;
  } else if (json === 'false') {
    return false;
  } else if (json === 'null') {
    return null;
  }
  if (json.indexOf('{') === -1 && json.indexOf('[') === -1) {
  	return parseStringOrNumber(json);
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
  	parsedValue = json.replace(/"/g, '').trim();
  }
  return parsedValue;
}

function parseObject(json) {
  var jsonString = json.slice(1, json.length - 1);
  var object = {};
  var key;
  var value;

  while (jsonString.length) {
  	key = parseJSON(jsonString.slice(0, jsonString.indexOf(':')));
  	if (jsonString.indexOf(',') !== -1) {
  	  value = parseJSON(jsonString.slice(jsonString.indexOf(':') + 1, jsonString.indexOf(',')));
      jsonString = jsonString.slice(jsonString.indexOf(',') + 1);	
  	} else {
  	  value = parseJSON(jsonString.slice(jsonString.indexOf(':') + 1));	
      jsonString = jsonString.slice(jsonString.length);
  	}  
  	if (value.indexOf('{') === 0 || value.indexOf('[') === 0) {
  	  value = parseJSON(value);	
  	}
  	object[key] = value;
  }

  return object;
}

function parseArray(json) {
  var jsonString = json.slice(1, json.length - 1);
  var array = [];	
  var value;
  while (jsonString.length) {
  	if (jsonString.indexOf(',') !== -1) {
  	  value = parseJSON(jsonString.slice(0, jsonString.indexOf(',')));
      jsonString = jsonString.slice(jsonString.indexOf(',') + 1);
  	} else {
  	  value = parseJSON(jsonString);
      jsonString = jsonString.slice(jsonString.length);	
  	}
  	if (typeof value === 'string' && (value.indexOf('{') === 0 || value.indexOf('[') === 0)) {
  	  value = parseJSON(value);	
  	}
  	array.push(value);
  }

  return array;
}



