import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Detect potential memory leaks in event listeners and timers',
      category: 'Memory',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    let hasEventListener = false;
    let hasRemoveListener = false;

    return {
      CallExpression(node: CallExpression): void {
        if (node.callee.type === 'MemberExpression') {
          const callee = node.callee as MemberExpression;
          if (callee.property.type === 'Identifier') {
            const methodName = (callee.property as Identifier).name;
            
            // Check for event listener additions
            if (methodName === 'addEventListener') {
              hasEventListener = true;
            }
            
            // Check for event listener removals
            if (methodName === 'removeEventListener') {
              hasRemoveListener = true;
            }

            // Check for setInterval without clearInterval
            if (methodName === 'setInterval') {
              context.report({
                node,
                message: 'Make sure to clear intervals when they are no longer needed to prevent memory leaks'
              });
            }
          }
        }
      },
      'Program:exit'(): void {
        // Report if event listeners are added but not removed
        if (hasEventListener && !hasRemoveListener) {
          context.report({
            loc: { line: 1, column: 0 },
            message: 'Event listeners should be removed when no longer needed to prevent memory leaks'
          });
        }
      }
    };
  }
};

export = rule; 