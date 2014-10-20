var stubs = require('./automock')([
  './big-complex-module'
]);

var proxyquire = require('proxyquire');
var mymodule = proxyquire('./mymodule', stubs);

var assert = require('assert');


describe('MyModule', function() {
  it('should return undefined', function() {
    var m = mymodule();
    assert.equal(undefined, m.num);
    assert.equal(undefined, m.cfoo);
  });
});
