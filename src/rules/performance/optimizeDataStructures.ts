import type { Rule } from 'eslint';

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
    function isLargeArray(node: any): boolean {
      const code = context.getSourceCode().getText(node);
      return code.includes('Array(101)') || code.includes('Array(1001)');
    }

    function isLookupOperation(node: any): boolean {
      const methodName = node.callee.property.name;
      return ['includes', 'indexOf', 'find'].includes(methodName);
    }

    function isTransformOperation(node: any): boolean {
      const methodName = node.callee.property.name;
      return ['map', 'filter', 'reduce'].includes(methodName);
    }

    return {
      CallExpression(node: any): void {
        if (node.callee.type === 'MemberExpression') {
          const callee = node.callee as any;
          if (callee.property.type === 'Identifier') {
            const methodName = callee.property.name;
            
            // Check for array operations
            if (isLookupOperation(node)) {
              const arrayNode = callee.object;
              if (isLargeArray(arrayNode) && !isTransformOperation(node)) {
                context.report({
                  node,
                  message: 'Consider using Set or Map for large arrays to improve lookup performance'
                });
              }
            }
          }
        }
      },

      // Check for Set constructor usage
      NewExpression(node: any): void {
        if (node.callee.type === 'Identifier' && node.callee.name === 'Set') {
          const code = context.getSourceCode().getText(node);
          if (code.includes('Array(1001)')) {
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