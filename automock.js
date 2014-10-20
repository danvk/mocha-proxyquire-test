var stubber = require('./stubber');
var proxyquire = require('proxyquire');

function makeModuleMock(moduleName) {
  var m = stubber(require(moduleName));
  m['@global'] = true;
  return m;
}

module.exports = function(modulesToMock) {
  var stubs = {};
  modulesToMock.forEach(function(moduleName) {
    stubs[moduleName] = makeModuleMock(moduleName);
  });
  return function(moduleName) {
    return proxyquire(moduleName, stubs);
  };
};
