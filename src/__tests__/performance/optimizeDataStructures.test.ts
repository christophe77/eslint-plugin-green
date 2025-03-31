import { createLinter, verifyCode, expectRuleError, expectNoRuleErrors } from '../utils/testUtils';

describe('optimize-data-structures', () => {
  let linter: any;

  beforeEach(() => {
    linter = createLinter();
    linter.defineRule('green/optimize-data-structures', require('../../rules/performance/optimizeDataStructures').default);
  });

  describe('array operations', () => {
    it('should report when using includes on large array', () => {
      const code = `
        const largeArray = Array(101).fill(0);
        if (largeArray.includes(value)) {
          // do something
        }
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectRuleError(messages, 'optimize-data-structures');
    });

    it('should report when using indexOf on large array', () => {
      const code = `
        const largeArray = Array(101).fill(0);
        const index = largeArray.indexOf(value);
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectRuleError(messages, 'optimize-data-structures');
    });

    it('should report when using find on large array', () => {
      const code = `
        const largeArray = Array(101).fill(0);
        const found = largeArray.find(item => item === value);
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectRuleError(messages, 'optimize-data-structures');
    });

    it('should not report when using includes on small array', () => {
      const code = `
        const smallArray = Array(10).fill(0);
        if (smallArray.includes(value)) {
          // do something
        }
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectNoRuleErrors(messages);
    });

    it('should not report when using array methods for transformation', () => {
      const code = `
        const largeArray = Array(101).fill(0);
        const mapped = largeArray.map(x => x * 2);
        const filtered = largeArray.filter(x => x > 0);
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectNoRuleErrors(messages);
    });
  });

  describe('Set usage', () => {
    it('should report when creating large Set', () => {
      const code = `
        const largeSet = new Set(Array(1001).fill(0));
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectRuleError(messages, 'optimize-data-structures');
    });

    it('should report when creating large Set with spread operator', () => {
      const code = `
        const largeArray = Array(1001).fill(0);
        const largeSet = new Set([...largeArray]);
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectRuleError(messages, 'optimize-data-structures');
    });

    it('should not report when creating small Set', () => {
      const code = `
        const smallSet = new Set([1, 2, 3]);
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectNoRuleErrors(messages);
    });

    it('should not report when using Set for small unique collections', () => {
      const code = `
        const uniqueValues = new Set(['a', 'b', 'c']);
        if (uniqueValues.has(value)) {
          // do something
        }
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectNoRuleErrors(messages);
    });
  });

  describe('Map usage', () => {
    it('should not report when using Map for lookups', () => {
      const code = `
        const map = new Map();
        if (map.has(value)) {
          // do something
        }
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectNoRuleErrors(messages);
    });

    it('should not report when using Map with object keys', () => {
      const code = `
        const map = new Map();
        map.set({ id: 1 }, 'value');
        const value = map.get({ id: 1 });
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectNoRuleErrors(messages);
    });

    it('should not report when using Map for caching', () => {
      const code = `
        const cache = new Map();
        function getCachedValue(key) {
          if (cache.has(key)) {
            return cache.get(key);
          }
          const value = computeValue(key);
          cache.set(key, value);
          return value;
        }
      `;
      const messages = verifyCode(linter, code, 'optimize-data-structures');
      expectNoRuleErrors(messages);
    });
  });
}); 