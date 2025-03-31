import type { Rule } from 'eslint';

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
    function isAnimationInterval(node: any): boolean {
      // Check if the interval is short (likely for animation)
      const args = node.arguments;
      if (args.length >= 2 && args[1].type === 'Literal') {
        const interval = args[1].value;
        return interval <= 100; // Animation intervals are typically <= 100ms
      }
      return false;
    }

    function hasAnimationCode(node: any): boolean {
      const callback = node.arguments[0];
      if (!callback) return false;

      const code = context.getSourceCode().getText(callback);
      return code.includes('style') && (
        code.includes('transform') ||
        code.includes('opacity') ||
        code.includes('left') ||
        code.includes('top')
      );
    }

    function hasRequestAnimationFrame(node: any): boolean {
      const code = context.getSourceCode().getText(node);
      return code.includes('requestAnimationFrame');
    }

    return {
      CallExpression(node: any): void {
        if (node.callee.type === 'Identifier' && node.callee.name === 'setInterval') {
          if (isAnimationInterval(node) && hasAnimationCode(node) && !hasRequestAnimationFrame(node)) {
            context.report({
              node,
              message: 'Use requestAnimationFrame instead of setInterval for animations to reduce CPU usage'
            });
          }
        }
      },
      JSXOpeningElement(node: any): void {
        if (node.name.name === 'div') {
          const style = node.attributes.find((attr: any) => 
            attr.type === 'JSXAttribute' && 
            attr.name.name === 'style'
          );

          if (style && style.value?.expression?.properties) {
            const hasTransform = style.value.expression.properties.some((prop: any) => 
              prop.key.name === 'transform'
            );
            
            const hasWillChange = style.value.expression.properties.some((prop: any) => 
              prop.key.name === 'willChange' &&
              (prop.value.value === 'transform' || prop.value.value?.includes('transform'))
            );

            if (hasTransform && !hasWillChange) {
              context.report({
                node,
                message: 'Add will-change: transform property for elements with transform animations to optimize GPU usage'
              });
            }
          }
        }
      }
    };
  }
};

export = rule; 