var mymodule = require('./mymodule');

var assert = require('assert');

describe('MyModule', function() {
  it('should return 42 and 10', function() {
    var m = mymodule();
    assert.equal(42, m.num);
    assert.equal(10, m.cfoo);
  });
});

