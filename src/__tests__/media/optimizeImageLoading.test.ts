import { createLinter, verifyCode, expectRuleError, expectNoRuleErrors } from '../utils/testUtils';

describe('optimize-image-loading', () => {
  let linter: any;

  beforeEach(() => {
    linter = createLinter();
    linter.defineRule('green/optimize-image-loading', require('../../rules/media/optimizeImageLoading').default);
  });

  describe('Image constructor usage', () => {
    it('should report when using window.Image constructor', () => {
      const code = `
        const img = new window.Image();
      `;
      const messages = verifyCode(linter, code, 'optimize-image-loading');
      expectRuleError(messages, 'optimize-image-loading');
    });

    it('should report when using Image constructor without window', () => {
      const code = `
        const img = new Image();
      `;
      const messages = verifyCode(linter, code, 'optimize-image-loading');
      expectRuleError(messages, 'optimize-image-loading');
    });
  });

  describe('img tag attributes', () => {
    it('should report when img tag is missing lazy loading', () => {
      const code = `
        <img src="image.jpg" alt="test" />
      `;
      const messages = verifyCode(linter, code, 'optimize-image-loading');
      expectRuleError(messages, 'optimize-image-loading');
    });

    it('should report when img tag is missing sizes attribute', () => {
      const code = `
        <img src="image.jpg" alt="test" loading="lazy" />
      `;
      const messages = verifyCode(linter, code, 'optimize-image-loading');
      expectRuleError(messages, 'optimize-image-loading');
    });

    it('should report when img tag has incorrect loading value', () => {
      const code = `
        <img src="image.jpg" alt="test" loading="eager" />
      `;
      const messages = verifyCode(linter, code, 'optimize-image-loading');
      expectRuleError(messages, 'optimize-image-loading');
    });

    it('should not report when img tag has all required attributes', () => {
      const code = `
        <img 
          src="image.jpg" 
          alt="test" 
          loading="lazy" 
          sizes="(max-width: 600px) 100vw, 600px" 
        />
      `;
      const messages = verifyCode(linter, code, 'optimize-image-loading');
      expectNoRuleErrors(messages);
    });

    it('should not report when img tag has all required attributes with different order', () => {
      const code = `
        <img 
          sizes="(max-width: 600px) 100vw, 600px"
          loading="lazy"
          alt="test"
          src="image.jpg"
        />
      `;
      const messages = verifyCode(linter, code, 'optimize-image-loading');
      expectNoRuleErrors(messages);
    });
  });
}); 