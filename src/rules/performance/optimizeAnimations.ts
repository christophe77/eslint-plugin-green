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
              // Check if this is part of a style animation
              const ancestors = context.getAncestors();
              const parent = ancestors[ancestors.length - 1];
              const isStyleAnimation = parent?.type === 'CallExpression' && 
                (parent as CallExpression).callee.type === 'MemberExpression' &&
                ((parent as CallExpression).callee as MemberExpression).property.type === 'Identifier' &&
                (((parent as CallExpression).callee as MemberExpression).property as Identifier).name === 'style';

              // Only report if it's a style animation
              if (isStyleAnimation) {
                context.report({
                  node,
                  message: 'Use requestAnimationFrame instead of setInterval for animations to reduce CPU usage'
                });
              }
            }

            // Check for requestAnimationFrame usage
            if (methodName === 'requestAnimationFrame') {
              const ancestors = context.getAncestors();
              const parent = ancestors[ancestors.length - 1];
              const isAnimation = parent?.type === 'CallExpression' && 
                (parent as CallExpression).callee.type === 'MemberExpression' &&
                ((parent as CallExpression).callee as MemberExpression).property.type === 'Identifier' &&
                (((parent as CallExpression).callee as MemberExpression).property as Identifier).name === 'style';

              // Only report if it's a style animation
              if (isAnimation) {
                context.report({
                  node,
                  message: 'Consider using CSS animations or transitions for better performance'
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

          // Only report if transform is present without will-change
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