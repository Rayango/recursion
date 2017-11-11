// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var body = document.body;
  var result = [];
  function searchNode(node) {
  	var children = node.childNodes;
  	if (node.classList && node.classList.contains(className)) {
  	  result.push(node);
  	}
  	for (var i = 0; i < children.length; i++) {
  	  if (children[i].classList && children[i].classList.contains(className)) {
  	  	result.push(children[i]);
  	  }
  	  if (children[i].childNodes.length !== 0) {
  	  	for (var j = 0; j < children[i].childNodes.length; j++) {
  	  	  searchNode(children[i].childNodes[j]);
  	  	}
  	  }	
  	}
  };	
  searchNode(body);
  return result;
};
