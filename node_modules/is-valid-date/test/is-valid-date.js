var test = require('tape');
var isValidDate = require('../is-valid-date');

test('is valid date', function (t) {
  t.plan(8);

  t.equal(isValidDate('21/09/1991'), true);
  t.equal(isValidDate('21/9/1991'), true);
  t.equal(isValidDate('21.09.1991'), true);
  t.equal(isValidDate('21-09-1991'), true);
  t.equal(isValidDate('21-14.1991'), false);
  t.equal(isValidDate('21/09/19991'), false);
  t.equal(isValidDate({}), false);
  t.equal(isValidDate(), false);
});
