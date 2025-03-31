import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier, Literal } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce efficient CSS selector usage',
      category: 'CSS',
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
            
            // Check for inefficient querySelector usage
            if (methodName === 'querySelector' || methodName === 'querySelectorAll') {
              if (node.arguments.length > 0 && node.arguments[0].type === 'Literal') {
                const selector = (node.arguments[0] as Literal).value as string;
                
                // Check for inefficient universal selectors
                if (selector.includes('*')) {
                  context.report({
                    node,
                    message: 'Avoid using universal selectors (*) as they are performance intensive'
                  });
                }
                
                // Check for inefficient descendant selectors
                if (selector.includes(' > ') || /\s+(?!=)/.test(selector)) {
                  context.report({
                    node,
                    message: 'Consider using more specific selectors instead of descendant selectors for better performance'
                  });
                }
                
                // Check for inefficient ID selectors with unnecessary qualifiers
                if (/[a-zA-Z]+#/.test(selector)) {
                  context.report({
                    node,
                    message: 'Avoid qualifying ID selectors with tag names or classes'
                  });
                }
              }
            }
          }
        }
      }
    };
  }
};

export = rule; 