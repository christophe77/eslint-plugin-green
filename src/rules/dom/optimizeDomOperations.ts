import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce efficient DOM operations',
      category: 'DOM',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      CallExpression(node: CallExpression): void {
        if (node.callee.type === 'MemberExpression' &&
            (node.callee as MemberExpression).object.type === 'Identifier' &&
            ((node.callee as MemberExpression).object as Identifier).name === 'document' &&
            (node.callee as MemberExpression).property.type === 'Identifier' &&
            ((node.callee as MemberExpression).property as Identifier).name === 'getElementById') {
          context.report({
            node,
            message: 'Consider caching DOM elements in variables to avoid repeated lookups'
          });
        }
      }
    };
  }
};

export = rule; 