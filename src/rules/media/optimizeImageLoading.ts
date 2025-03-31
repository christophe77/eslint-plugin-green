import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier, Literal } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce efficient image loading practices',
      category: 'Media',
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
            
            // Check for Image constructor usage
            if (methodName === 'Image' && callee.object.type === 'Identifier' && 
                callee.object.name === 'window') {
              context.report({
                node,
                message: 'Consider using the native <img> element with loading="lazy" for better energy efficiency'
              });
            }
          }
        }
      },
      JSXOpeningElement(node: any): void {
        if (node.name.name === 'img') {
          const hasLazyLoading = node.attributes.some((attr: any) => 
            attr.name.name === 'loading' && attr.value.value === 'lazy'
          );
          
          const hasSizes = node.attributes.some((attr: any) => 
            attr.name.name === 'sizes'
          );

          if (!hasLazyLoading) {
            context.report({
              node,
              message: 'Add loading="lazy" to images below the fold for better energy efficiency'
            });
          }

          if (!hasSizes) {
            context.report({
              node,
              message: 'Add sizes attribute to help browser select the right image size'
            });
          }
        }
      }
    };
  }
};

export = rule; 