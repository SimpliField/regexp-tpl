var assert = require('assert');
var regexpTpl = require('../src/index');

describe('regexpTpl', function () {

  it('should be a function', function() {
    assert(regexpTpl instanceof Function);
  });

  it('should fail with a bad objs value', function() {
    assert.throws(function() {
      regexpTpl({}, 'rr');
    });
  });

  it('should fail with a bad regexpTpl value', function() {
    assert.throws(function() {
      regexpTpl([], {});
    });
  });

  it('should return undefined with an unmatched template', function() {
    var tree = [];

    assert.equal(
      typeof regexpTpl(tree, 'a {foo.bar} b'),
      'undefined'
    );
  });

  it('should work with simple property addressing', function() {
    var tree = [{
      foo: {
        bar: 'test'
      },
      bar: {
        bar: 'test2'
      }
    }];

    assert.equal(
      regexpTpl(tree, 'a {foo.bar} b').toString(),
      '/a test b/'
    );
  });

  it('should work with flags', function() {
    var tree = [{
      foo: {
        bar: 'test'
      },
      bar: {
        bar: 'test2'
      }
    }];

    assert.equal(
      regexpTpl(tree, 'a {foo.bar} b', 'img').toString(),
      '/a test b/gim'
    );
  });

  it('should work with any property addressing', function() {
    var tree = [{
      foo: {
        bar: 'test'
      },
      bar: {
        bar: 'test2'
      }
    }];


    assert.equal(
      regexpTpl(tree, '/:@.bar', '', /(.*\/|^):([a-z0-9_\-\.\*\@\#]+)(\/.*|$)/i).toString(),
      '/\\/(test|test2)/'
    );
  });

  it('should work with a custom template regexp', function() {
    var tree = [{
      foo: {
        bar: 'test'
      },
      bar: {
        bar: 'test2'
      }
    }];


    assert.equal(
      regexpTpl(tree, 'a {@.bar} b').toString(),
      '/a (test|test2) b/'
    );
  });

  it('should work with README samples', function() {
    var fruits = [{
      name: 'orange',
      count: 2,
      colors: ['orange']
    }, {
      name: 'banana',
      count: 0,
      colors: ['yellow', 'white']
    }, {
      name: 'kiwi',
      count: 8,
      colors: ['brown', 'green']
    }];

    assert(regexpTpl(fruits, 'My car is {colors.#}!').test('My car is brown!'));
    assert(!regexpTpl(fruits, 'My car is {colors.#}!').test('My car is blue!'));
  });

});
