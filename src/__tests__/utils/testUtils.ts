import { Linter } from 'eslint';
import plugin from '../../index';

export const createLinter = () => {
  const linter = new Linter();
  return linter;
};

export const getBaseParserOptions = () => ({
  ecmaVersion: 2018 as const,
  sourceType: 'module' as const,
  ecmaFeatures: {
    jsx: true
  }
});

export const verifyCode = (
  linter: Linter,
  code: string,
  ruleName: string,
  options: any = {}
) => {
  const messages = linter.verify(code, {
    rules: {
      [`green/${ruleName}`]: 'error'
    },
    parserOptions: {
      ...getBaseParserOptions(),
      ...options
    }
  });
  return messages;
};

export const expectRuleError = (messages: any[], ruleId: string) => {
  expect(messages.length).toBeGreaterThan(0);
  expect(messages[0].ruleId).toBe(`green/${ruleId}`);
};

export const expectNoRuleErrors = (messages: any[]) => {
  expect(messages.length).toBe(0);
}; 