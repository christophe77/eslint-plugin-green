import { Linter } from 'eslint';
import plugin from '../index';

const linter = new Linter();

describe('eslint-plugin-green', () => {
  beforeEach(() => {
    linter.defineRule('green/no-inefficient-loops', plugin.rules['no-inefficient-loops']);
    linter.defineRule('green/prefer-array-methods', plugin.rules['prefer-array-methods']);
    linter.defineRule('green/optimize-dom-operations', plugin.rules['optimize-dom-operations']);
  });

  it('should be a valid ESLint plugin', () => {
    expect(plugin).toBeDefined();
    expect(plugin.rules).toBeDefined();
    expect(typeof plugin.rules).toBe('object');
  });
});
