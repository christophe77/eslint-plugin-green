import type { Rule } from 'eslint';

// Performance rules
import noInefficientLoops = require('./rules/performance/noInefficientLoops');
import preferArrayMethods = require('./rules/performance/preferArrayMethods');

// DOM rules
import optimizeDomOperations = require('./rules/dom/optimizeDomOperations');

// Memory rules
import avoidMemoryLeaks = require('./rules/memory/avoidMemoryLeaks');

// CSS rules
import optimizeCssSelectors = require('./rules/css/optimizeCssSelectors');

// Network rules
import optimizeNetworkRequests = require('./rules/network/optimizeNetworkRequests');

// Media rules
import optimizeImageLoading = require('./rules/media/optimizeImageLoading');

// Performance rules
import optimizeAnimations = require('./rules/performance/optimizeAnimations');
import optimizeDataStructures = require('./rules/performance/optimizeDataStructures');

// Green score reporter
import { greenScoreReporter } from './reporters/green-score';

const plugin = {
  rules: {
    // Performance
    'no-inefficient-loops': noInefficientLoops,
    'prefer-array-methods': preferArrayMethods,
    
    // DOM
    'optimize-dom-operations': optimizeDomOperations,
    
    // Memory
    'avoid-memory-leaks': avoidMemoryLeaks,
    
    // CSS
    'optimize-css-selectors': optimizeCssSelectors,
    
    // Network
    'optimize-network-requests': optimizeNetworkRequests,
    
    // Media
    'optimize-image-loading': optimizeImageLoading,
    
    // Performance
    'optimize-animations': optimizeAnimations,
    'optimize-data-structures': optimizeDataStructures
  },
  configs: {
    recommended: {
      plugins: ['green'],
      rules: {
        'green/no-inefficient-loops': 'warn',
        'green/prefer-array-methods': 'warn',
        'green/optimize-dom-operations': 'warn',
        'green/avoid-memory-leaks': 'warn',
        'green/optimize-css-selectors': 'warn',
        'green/optimize-network-requests': 'warn',
        'green/optimize-image-loading': 'warn',
        'green/optimize-animations': 'warn',
        'green/optimize-data-structures': 'warn'
      }
    },
    strict: {
      plugins: ['green'],
      rules: {
        'green/no-inefficient-loops': 'error',
        'green/prefer-array-methods': 'error',
        'green/optimize-dom-operations': 'error',
        'green/avoid-memory-leaks': 'error',
        'green/optimize-css-selectors': 'error',
        'green/optimize-network-requests': 'error',
        'green/optimize-image-loading': 'error',
        'green/optimize-animations': 'error',
        'green/optimize-data-structures': 'error'
      }
    }
  },
  reporters: {
    'green-score': greenScoreReporter
  }
} as const;

export = plugin; 