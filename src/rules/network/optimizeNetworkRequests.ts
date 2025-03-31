import type { Rule } from 'eslint';
import type { CallExpression, MemberExpression, Identifier } from 'estree';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce efficient network request patterns',
      category: 'Network',
      recommended: true,
    },
    schema: [], // no options
  },
  create(context: Rule.RuleContext): Rule.RuleListener {
    const fetchCalls = new Map<string, number>();

    return {
      CallExpression(node: CallExpression): void {
        if (node.callee.type === 'Identifier' && node.callee.name === 'fetch') {
          // Track duplicate fetch calls
          if (node.arguments[0]?.type === 'Literal') {
            const url = node.arguments[0].value as string;
            fetchCalls.set(url, (fetchCalls.get(url) || 0) + 1);

            if (fetchCalls.get(url)! > 1) {
              context.report({
                node,
                message: 'Consider caching the fetch response or using a request deduplication mechanism'
              });
            }
          }

          // Check for missing error handling
          const parent = context.getAncestors().pop();
          if (parent?.type !== 'CatchClause' && !parent?.type.includes('Catch')) {
            context.report({
              node,
              message: 'Add error handling to fetch calls to handle network failures gracefully'
            });
          }
        }

        // Check for XMLHttpRequest usage
        if (node.callee.type === 'MemberExpression') {
          const callee = node.callee as MemberExpression;
          if (callee.property.type === 'Identifier') {
            const methodName = (callee.property as Identifier).name;
            
            if (methodName === 'open' && callee.object.type === 'Identifier' && 
                callee.object.name === 'XMLHttpRequest') {
              context.report({
                node,
                message: 'Consider using fetch instead of XMLHttpRequest for better performance and energy efficiency'
              });
            }
          }
        }
      },
      'Program:exit'(): void {
        // Report on excessive API calls to the same endpoint
        fetchCalls.forEach((count, url) => {
          if (count > 3) {
            context.report({
              loc: { line: 1, column: 0 },
              message: `Multiple calls (${count}) to ${url} detected. Consider implementing request batching or caching`
            });
          }
        });
      }
    };
  }
};

export = rule; 