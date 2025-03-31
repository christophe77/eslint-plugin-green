import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier, ArrayExpression } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce efficient data structure usage',
      category: 'Performance',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      CallExpression(node: CallExpression): void {
        // Check for inefficient array operations
        if (node.callee.type === 'MemberExpression') {
          const callee = node.callee as MemberExpression;
          if (callee.property.type === 'Identifier') {
            const methodName = (callee.property as Identifier).name;
            
            // Check for array includes on large arrays
            if (methodName === 'includes') {
              const arrayNode = callee.object;
              if (arrayNode.type === 'ArrayExpression' && arrayNode.elements.length > 100) {
                context.report({
                  node,
                  message: 'Consider using Set for large arrays to improve lookup performance'
                });
              }
            }

            // Check for array indexOf on large arrays
            if (methodName === 'indexOf') {
              const arrayNode = callee.object;
              if (arrayNode.type === 'ArrayExpression' && arrayNode.elements.length > 100) {
                context.report({
                  node,
                  message: 'Consider using Map for large arrays to improve lookup performance'
                });
              }
            }
          }
        }

        // Check for Set constructor usage
        if (node.callee.type === 'Identifier' && node.callee.name === 'Set') {
          if (node.arguments[0]?.type === 'ArrayExpression' && 
              node.arguments[0].elements.length > 100) {
            context.report({
              node,
              message: 'Consider using a more memory-efficient data structure for large datasets'
            });
          }
        }
      }
    };
  }
};

export = rule; 