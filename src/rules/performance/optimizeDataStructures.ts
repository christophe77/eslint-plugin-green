import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier } from 'estree';

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
        if (node.callee.type === 'MemberExpression') {
          const callee = node.callee as MemberExpression;
          if (callee.property.type === 'Identifier') {
            const methodName = (callee.property as Identifier).name;
            
            // Check for array operations
            if (methodName === 'indexOf' || methodName === 'includes') {
              const ancestors = context.getAncestors();
              const parent = ancestors[ancestors.length - 1];
              const isLoop = parent?.type === 'WhileStatement' || 
                            parent?.type === 'ForStatement' || 
                            parent?.type === 'ForInStatement' || 
                            parent?.type === 'ForOfStatement';

              // Only report if inside a loop
              if (isLoop) {
                context.report({
                  node,
                  message: 'Consider using Set or Map for frequent lookups instead of array methods in loops'
                });
              }
            }

            // Check for object property access
            if (methodName === 'hasOwnProperty') {
              const ancestors = context.getAncestors();
              const parent = ancestors[ancestors.length - 1];
              const isLoop = parent?.type === 'WhileStatement' || 
                            parent?.type === 'ForStatement' || 
                            parent?.type === 'ForInStatement' || 
                            parent?.type === 'ForOfStatement';

              // Only report if inside a loop
              if (isLoop) {
                context.report({
                  node,
                  message: 'Consider using Map for frequent property checks instead of hasOwnProperty in loops'
                });
              }
            }
          }
        }
      },
      VariableDeclarator(node: any): void {
        if (node.init && node.init.type === 'ArrayExpression') {
          const ancestors = context.getAncestors();
          const parent = ancestors[ancestors.length - 1];
          const isLoop = parent?.type === 'WhileStatement' || 
                        parent?.type === 'ForStatement' || 
                        parent?.type === 'ForInStatement' || 
                        parent?.type === 'ForOfStatement';

          // Only report if inside a loop
          if (isLoop) {
            context.report({
              node,
              message: 'Consider using Set for unique values instead of array in loops'
            });
          }
        }
      }
    };
  }
};

export = rule; 