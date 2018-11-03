'use strict';

const escRegExp = require('escape-string-regexp');
const miniquery = require('miniquery');
const debug = require('debug')('regexp-tpl');

const DEFAULT_TEMPLATE = /(.*|^)\{([a-z0-9_\-.*@#]+)\}(.*|$)/i;

function regexpTpl(objs, regExpTemplate, regExpFlags, templateRegExp) {
  let hasUnmatchedTemplateValues = false;

  if (!(objs instanceof Array)) {
    throw Error('`objs` must be an instanceof `Array`');
  }
  if ('string' !== typeof regExpTemplate) {
    throw Error('`regExpTemplate` must be a string');
  }

  debug('Creating a regExp from:', regExpTemplate);

  function findTemplateValue($, $1, $2, $3) {
    const values = miniquery($2, objs);

    debug('New template value', $2, values);

    if (values.length) {
      return $1 + (1 === values.length ?
        escRegExp(values[0]) :
        `(${values.map(escRegExp).join('|')})`) + $3;
    }

    hasUnmatchedTemplateValues = true;
    return '';
  }

  while ((templateRegExp || DEFAULT_TEMPLATE).test(regExpTemplate)) {
    regExpTemplate = regExpTemplate.replace(
      (templateRegExp || DEFAULT_TEMPLATE),
      findTemplateValue
    );
  }

  if (hasUnmatchedTemplateValues) {
    debug('Could not build (unmatched template value):', regExpTemplate);
    return {}.undef;
  }

  // eslint-disable-next-line
  const regExp = new RegExp(regExpTemplate, regExpFlags);

  debug('Built:', regExp);

  return regExp;
}

module.exports = regexpTpl;
