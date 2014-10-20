var mockRequire = require('./automock')([
  './big-complex-module'
]);
var mymodule = mockRequire('./mymodule');

var assert = require('assert');


describe('MyModule', function() {
  it('should return undefined', function() {
    var m = mymodule();
    assert.equal(undefined, m.num);
    assert.equal(undefined, m.cfoo);
  });
});
