import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce efficient animation practices',
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
            
            // Check for setInterval usage in animations
            if (methodName === 'setInterval') {
              const parent = context.getAncestors().pop();
              if (parent?.type === 'CallExpression' && 
                  (parent as CallExpression).callee.type === 'MemberExpression' &&
                  ((parent as CallExpression).callee as MemberExpression).property.type === 'Identifier' &&
                  (((parent as CallExpression).callee as MemberExpression).property as Identifier).name === 'style') {
                context.report({
                  node,
                  message: 'Use requestAnimationFrame instead of setInterval for animations to reduce CPU usage'
                });
              }
            }
          }
        }
      },
      JSXOpeningElement(node: any): void {
        if (node.name.name === 'style') {
          const hasTransform = node.attributes.some((attr: any) => 
            attr.name.name === 'transform'
          );
          
          const hasWillChange = node.attributes.some((attr: any) => 
            attr.name.name === 'willChange'
          );

          if (hasTransform && !hasWillChange) {
            context.report({
              node,
              message: 'Add will-change property for elements with transform animations to optimize GPU usage'
            });
          }
        }
      }
    };
  }
};

export = rule; 