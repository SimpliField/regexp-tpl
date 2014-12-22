var escRegExp = require('escape-regexp-component');
var miniquery = require('miniquery');

var DEFAULT_TEMPLATE = /(.*|^)\{([a-z0-9_\-\.\*\@\#]+)\}(.*|$)/i;

function regexpTpl(objs, regExpTemplate, regExpFlags, templateRegExp) {
  var hasUnmatchedTemplateValues = false;

  if(!(objs instanceof Array)) {
    throw Error('`objs` must be an instanceof `Array`');
  }
  if('string' !== typeof regExpTemplate) {
    throw Error('`regExpTemplate` must be a string');
  }

  while((templateRegExp || DEFAULT_TEMPLATE).test(regExpTemplate)) {
    regExpTemplate = regExpTemplate.replace(
      (templateRegExp || DEFAULT_TEMPLATE),
      function($, $1, $2, $3) {
        var values = miniquery($2, objs);
        if(values.length) {
          return $1 + (1 === values.length ?
            escRegExp(values[0]) :
            '(' + values.map(escRegExp).join('|') + ')') + $3;
        }
        hasUnmatchedTemplateValues = true;
      });
  }

  if(hasUnmatchedTemplateValues) {
    return {}.undef;
  }

  return new RegExp(regExpTemplate, regExpFlags);
}

module.exports = regexpTpl;
