import type { Rule } from 'eslint';
import type { ForStatement } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce using Array methods instead of inefficient loops',
      category: 'Performance',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      ForStatement(node: ForStatement): void {
        if (node.body.type === 'BlockStatement' && 
            node.body.body.length === 1 && 
            node.body.body[0].type === 'ExpressionStatement' &&
            node.body.body[0].expression.type === 'AssignmentExpression') {
          context.report({
            node,
            message: 'Consider using Array methods like map, filter, or reduce instead of for loops for better performance and readability'
          });
        }
      }
    };
  }
};

export = rule; 