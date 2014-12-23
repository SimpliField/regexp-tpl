# regexp-tpl

`regexp-tpl` allows you to create templated regular expressions.

[![NPM version](https://badge.fury.io/js/regexp-tpl.png)](https://npmjs.org/package/regexp-tpl) [![Build status](https://secure.travis-ci.org/SimpliField/regexp-tpl.png)](https://travis-ci.org/SimpliField/regexp-tpl) [![Dependency Status](https://david-dm.org/SimpliField/regexp-tpl.png)](https://david-dm.org/SimpliField/regexp-tpl) [![devDependency Status](https://david-dm.org/SimpliField/regexp-tpl/dev-status.png)](https://david-dm.org/SimpliField/regexp-tpl#info=devDependencies) [![Coverage Status](https://coveralls.io/repos/SimpliField/regexp-tpl/badge.png?branch=master)](https://coveralls.io/r/SimpliField/regexp-tpl?branch=master) [![Code Climate](https://codeclimate.com/github/SimpliField/regexp-tpl.png)](https://codeclimate.com/github/SimpliField/regexp-tpl)

## Installation

First install `regexp-tpl` in you project:
```sh
npm install --save regexp-tpl
```

## Getting started

Then, use it:

```js
var regexpTpl = require('regexp-tpl');
var assert = require('assert');

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
```

Note that `regexp-tpl` template values are evaluated with
 [`miniquery`'s' syntax](https://github.com/SimpliField/miniquery).


## API

### regExp:RegExp regexpTpl(objs:Array, regExpTemplate:String, regExpflags:String)
Return a `RegExp` instance made with the given `regExpTemplate` and `regExplags`
 filled with the values picked up in the given `objs`.

## Contribute

Feel free to submit us your improvements. To do so, you must accept to publish
 your code under the MIT license.

To start contributing, first run the following to setup the development
 environment:
```sh
git clone git@github.com:SimpliField/regexp-tpl.git
cd regexp-tpl
npm install
```

Then, run the tests:
```sh
npm test
```

## Stats
[![NPM](https://nodei.co/npm/regexp-tpl.png?downloads=true&stars=true)](https://nodei.co/npm/regexp-tpl/)
[![NPM](https://nodei.co/npm-dl/regexp-tpl.png)](https://nodei.co/npm/regexp-tpl/)
