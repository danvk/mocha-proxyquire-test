var U = require('underscore');


// ... one problem here is circular references, e.g.
// underscore's _._ == _.
function replaceFunctionsWithStubs(rootObj) {
  var replacedObjs = [];  // array of [original, replacement] pairs.

  function previousReplacement(obj) {
    for (var i = 0; i < replacedObjs.length; i++) {
      if (replacedObjs[i][0] == obj) {
        return replacedObjs[i][1];
      }
    }
    return null;
  }

  function replacer(obj) {
    var t = typeof(obj);
    if (t != 'function' && t != 'object') {
      // Simple data.
      return obj;
    }

    // Return previous mock to break circular references.
    var prevRep = previousReplacement(obj);
    if (prevRep) return prevRep;

    if (t == 'function') {
      var f = function() {};
      replacedObjs.push([obj, f]);
      if (!U.isEmpty(obj.prototype)) {
        // This might actually be a class. Need to stub its prototype, too.
        // console.log('stubbing prototype');
        // console.log('obj.prototype ', obj.prototype);
        var newPrototype = replacer(obj.prototype);
        for (var k in newPrototype) {
          f.prototype[k] = newPrototype[k];
        }
        // console.log('f.prototype ', f.prototype);
      }

      // Stub any properties the function might have.
      for (var k in obj) {
        f[k] = replacer(obj[k]);
      }
      return f;
    } else if (typeof(obj) == 'object') {
      // TODO: Do I need to handle arrays differently?
      var newObj = {};
      replacedObjs.push([obj, newObj]);

      for (var k in obj) {
        // console.log(k);
        newObj[k] = replacer(obj[k]);
      }
      // console.log('returning ', newObj);
      return newObj;
    } else {
      return obj;  // string, number, null, undefined, ...
    }
  }

  return replacer(rootObj);
}


module.exports = function(m) {
  return replaceFunctionsWithStubs(m);
};
