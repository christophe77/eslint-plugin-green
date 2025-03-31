import { Linter } from 'eslint';
import plugin from '../index';

const linter = new Linter();

describe('eslint-plugin-green', () => {
  const parserOptions: Linter.ParserOptions = {
    ecmaVersion: 2018 as const,
    sourceType: 'module' as const,
  };

  beforeEach(() => {
    linter.defineRule('green/no-inefficient-loops', plugin.rules['no-inefficient-loops']);
    linter.defineRule('green/prefer-array-methods', plugin.rules['prefer-array-methods']);
    linter.defineRule('green/optimize-dom-operations', plugin.rules['optimize-dom-operations']);
  });

  describe('no-inefficient-loops', () => {
    it('should report inefficient loops', () => {
      const code = `
        const result = [];
        for (let i = 0; i < array.length; i++) {
          result[i] = array[i] * 2;
        }
      `;
      const messages = linter.verify(code, {
        rules: {
          'green/no-inefficient-loops': 'error'
        },
        parserOptions
      });
      expect(messages.length).toBeGreaterThan(0);
      expect(messages[0].ruleId).toBe('green/no-inefficient-loops');
    });
  });

  describe('prefer-array-methods', () => {
    it('should report inefficient array operations', () => {
      const code = `
        const newArray = [];
        newArray.push(...items);
      `;
      const messages = linter.verify(code, {
        rules: {
          'green/prefer-array-methods': 'error'
        },
        parserOptions
      });
      expect(messages.length).toBeGreaterThan(0);
      expect(messages[0].ruleId).toBe('green/prefer-array-methods');
    });
  });

  describe('optimize-dom-operations', () => {
    it('should report inefficient DOM operations', () => {
      const code = `
        function updateElement() {
          document.getElementById('myElement').style.display = 'none';
          document.getElementById('myElement').style.color = 'red';
        }
      `;
      const messages = linter.verify(code, {
        rules: {
          'green/optimize-dom-operations': 'error'
        },
        parserOptions
      });
      expect(messages.length).toBeGreaterThan(0);
      expect(messages[0].ruleId).toBe('green/optimize-dom-operations');
    });
  });
}); 