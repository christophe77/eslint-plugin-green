import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce using efficient array operations',
      category: 'Performance',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      CallExpression(node: CallExpression): void {
        if (node.callee.type === 'MemberExpression' &&
            (node.callee as MemberExpression).property.type === 'Identifier' &&
            ((node.callee as MemberExpression).property as Identifier).name === 'push' &&
            node.arguments.length === 1) {
          context.report({
            node,
            message: 'Consider using spread operator or Array.from() for better performance when creating new arrays'
          });
        }
      }
    };
  }
};

export = rule; 