function SimpleClass() {
  console.log('Instantiating a simple class.');
};

SimpleClass.prototype.foo = function() {
  console.log('Making a really Simple Class foo');
  return 0;
};

var stubs = {
  './big-complex-module': {
    'complexfoo': function() {
      console.log('Doing something fast and simple.');
      return 0;
    },
    'ComplexClass': SimpleClass,
    '@global': true
  }
};

var proxyquire = require('proxyquire');

var mymodule = proxyquire('./mymodule', stubs);

var assert = require('assert');


describe('MyModule', function() {
  it('should return 0 and 0', function() {
    var m = mymodule();
    assert.equal(0, m.num);
    assert.equal(0, m.cfoo);
  });
});
