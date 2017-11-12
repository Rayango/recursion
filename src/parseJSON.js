// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // search for [] and {} to determine if json string is of an array and/or object
  var trimmedJSON = json.trim();
  if (trimmedJSON === 'true') {
    return true;
  } else if (trimmedJSON === 'false') {
    return false;
  } else if (trimmedJSON === 'null') {
    return null;
  }
  if (trimmedJSON.indexOf('{') === -1 && trimmedJSON.indexOf('[') === -1) {
  	return parseStringOrNumber(trimmedJSON);
  } else if (trimmedJSON.indexOf('{') === 0) {
    return parseObject(trimmedJSON);
  } else if (trimmedJSON.indexOf('[') === 0) {
  	return parseArray(trimmedJSON);
  }

};

function parseStringOrNumber(json) {
  var parsedValue;
  var escapedParsedValue = '';
  if (json.indexOf('"') === -1) {
    json.indexOf('.') === -1 ? parsedValue = parseInt(json) : parsedValue = parseFloat(json);	
  } else {
  	parsedValue = json.slice(1, json.length - 1);
    if (parsedValue.indexOf('\\') !== -1) {
      var index = 0;
      while (parsedValue.indexOf('\\', index) !== -1) {
        escapedParsedValue += parsedValue.slice(index, parsedValue.indexOf('\\', index)) + parsedValue.slice(parsedValue.indexOf('\\', index) + 1, parsedValue.indexOf('\\', index) + 2);
        index = parsedValue.indexOf('\\', index) + 2;
      }
    }  
  }
  return escapedParsedValue || parsedValue;
}

function parseObject(json) {
  var jsonString = json.slice(1, json.length - 1);
  var object = {};
  var key;
  var value;

  while (jsonString.length) {
  	key = parseJSON(jsonString.slice(0, jsonString.indexOf(':')));
    jsonString = jsonString.slice(jsonString.indexOf(':') + 1).trim();
  	if (jsonString.indexOf('{') === 0) {
      value = parseJSON(jsonString.slice(0, jsonString.lastIndexOf('}') + 1));
      jsonString = jsonString.slice(jsonString.lastIndexOf('}') + 2);
    } else if (jsonString.indexOf('[') === 0) {
      value = parseJSON(jsonString.slice(0, jsonString.lastIndexOf(']') + 1));
      jsonString = jsonString.slice(jsonString.lastIndexOf(']') + 2);
    } else if (jsonString.indexOf(',') !== -1) {
  	  value = parseJSON(jsonString.slice(0, jsonString.indexOf(',')));
      jsonString = jsonString.slice(jsonString.indexOf(',') + 1);	
  	} else {
  	  value = parseJSON(jsonString);	
      jsonString = jsonString.slice(jsonString.length);
  	}  
  	// if (typeof value === 'string' && (value.indexOf('{') === 0 || value.indexOf('[') === 0)) {
  	//   value = parseJSON(value);	
  	// }
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



