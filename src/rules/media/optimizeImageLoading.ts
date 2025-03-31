import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce efficient image loading practices',
      category: 'Performance',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      CallExpression(node: any): void {
        if (node.callee.type === 'MemberExpression') {
          const callee = node.callee as any;
          if (callee.property.type === 'Identifier') {
            const methodName = callee.property.name;
            
            // Check for Image constructor usage
            if (methodName === 'Image' && 
                ((callee.object.type === 'Identifier' && callee.object.name === 'window') || 
                 callee.object.type === 'Identifier')) {
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
          const loadingAttr = node.attributes.find((attr: any) => 
            attr.type === 'JSXAttribute' && 
            attr.name.name === 'loading'
          );
          
          const sizesAttr = node.attributes.find((attr: any) => 
            attr.type === 'JSXAttribute' && 
            attr.name.name === 'sizes'
          );

          // Check if loading attribute exists and has the correct value
          const hasCorrectLoading = loadingAttr && loadingAttr.value?.value === 'lazy';

          // Only report if loading is missing or incorrect
          if (!hasCorrectLoading) {
            context.report({
              node,
              message: 'Add loading="lazy" to images for better energy efficiency'
            });
          }

          // Only report if sizes is missing
          if (!sizesAttr) {
            context.report({
              node,
              message: 'Add sizes attribute to images for better energy efficiency'
            });
          }
        }
      }
    };
  }
};

export = rule; 