var stubber = require('./stubber');

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
  return stubs;
};
