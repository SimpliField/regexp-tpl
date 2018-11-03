'use strict';

const assert = require('assert');
const regexpTpl = require('../src/index');

describe('regexpTpl', () => {

  it('should be a function', () => {
    assert(regexpTpl instanceof Function);
  });

  it('should fail with a bad objs value', () => {
    assert.throws(() => {
      regexpTpl({}, 'rr');
    });
  });

  it('should fail with a bad regexpTpl value', () => {
    assert.throws(() => {
      regexpTpl([], {});
    });
  });

  it('should return undefined with an unmatched template', () => {
    const tree = [];

    assert.strictEqual(
      typeof regexpTpl(tree, 'a {foo.bar} b'),
      'undefined'
    );
  });

  it('should work with simple property addressing', () => {
    const tree = [{
      foo: {
        bar: 'test',
      },
      bar: {
        bar: 'test2',
      },
    }];

    assert.strictEqual(
      regexpTpl(tree, 'a {foo.bar} b').toString(),
      '/a test b/'
    );
  });

  it('should work with flags', () => {
    const tree = [{
      foo: {
        bar: 'test',
      },
      bar: {
        bar: 'test2',
      },
    }];

    assert.strictEqual(
      regexpTpl(tree, 'a {foo.bar} b', 'img').toString(),
      '/a test b/gim'
    );
  });

  it('should work with any property addressing', () => {
    const tree = [{
      foo: {
        bar: 'test',
      },
      bar: {
        bar: 'test2',
      },
    }];


    assert.strictEqual(
      regexpTpl(tree, '/:@.bar', '', /(.*\/|^):([a-z0-9_\-.*@#]+)(\/.*|$)/i).toString(),
      '/\\/(test|test2)/'
    );
  });

  it('should work with a custom template regexp', () => {
    const tree = [{
      foo: {
        bar: 'test',
      },
      bar: {
        bar: 'test2',
      },
    }];


    assert.strictEqual(
      regexpTpl(tree, 'a {@.bar} b').toString(),
      '/a (test|test2) b/'
    );
  });

  it('should work with README samples', () => {
    const fruits = [{
      name: 'orange',
      count: 2,
      colors: ['orange'],
    }, {
      name: 'banana',
      count: 0,
      colors: ['yellow', 'white'],
    }, {
      name: 'kiwi',
      count: 8,
      colors: ['brown', 'green'],
    }];

    assert(regexpTpl(fruits, 'My car is {colors.#}!').test('My car is brown!'));
    assert(!regexpTpl(fruits, 'My car is {colors.#}!').test('My car is blue!'));
  });

});
