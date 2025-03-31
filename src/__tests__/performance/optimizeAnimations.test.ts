import { createLinter, verifyCode, expectRuleError, expectNoRuleErrors } from '../utils/testUtils';

describe('optimize-animations', () => {
  let linter: any;

  beforeEach(() => {
    linter = createLinter();
    linter.defineRule('green/optimize-animations', require('../../rules/performance/optimizeAnimations').default);
  });

  describe('setInterval usage', () => {
    it('should report when using setInterval for style animations', () => {
      const code = `
        setInterval(() => {
          element.style.transform = 'translateX(' + position + 'px)';
        }, 16);
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectRuleError(messages, 'optimize-animations');
    });

    it('should report when using setInterval for opacity animations', () => {
      const code = `
        setInterval(() => {
          element.style.opacity = opacity;
        }, 16);
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectRuleError(messages, 'optimize-animations');
    });

    it('should not report when using setInterval for non-animation purposes', () => {
      const code = `
        setInterval(() => {
          checkStatus();
        }, 5000);
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectNoRuleErrors(messages);
    });
  });

  describe('requestAnimationFrame usage', () => {
    it('should not report when using requestAnimationFrame for animations', () => {
      const code = `
        function animate() {
          element.style.transform = 'translateX(' + position + 'px)';
          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectNoRuleErrors(messages);
    });

    it('should not report when using requestAnimationFrame with cleanup', () => {
      const code = `
        let animationFrameId;
        function animate() {
          element.style.transform = 'translateX(' + position + 'px)';
          animationFrameId = requestAnimationFrame(animate);
        }
        animationFrameId = requestAnimationFrame(animate);
        
        // Cleanup
        cancelAnimationFrame(animationFrameId);
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectNoRuleErrors(messages);
    });
  });

  describe('will-change property', () => {
    it('should report when transform element is missing will-change', () => {
      const code = `
        <div style={{ transform: 'translateX(0)' }}>
          Content
        </div>
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectRuleError(messages, 'optimize-animations');
    });

    it('should report when multiple transform elements are missing will-change', () => {
      const code = `
        <div style={{ transform: 'translateX(0)' }}>
          <div style={{ transform: 'scale(1)' }}>
            Content
          </div>
        </div>
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expect(messages.length).toBe(2);
      messages.forEach(msg => {
        expect(msg.ruleId).toBe('green/optimize-animations');
      });
    });

    it('should not report when transform element has will-change', () => {
      const code = `
        <div style={{ transform: 'translateX(0)', willChange: 'transform' }}>
          Content
        </div>
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectNoRuleErrors(messages);
    });

    it('should not report when non-transform element has will-change', () => {
      const code = `
        <div style={{ willChange: 'opacity' }}>
          Content
        </div>
      `;
      const messages = verifyCode(linter, code, 'optimize-animations');
      expectNoRuleErrors(messages);
    });
  });
}); 