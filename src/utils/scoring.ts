import { Linter } from 'eslint';

interface ScoreCategory {
  name: string;
  weight: number;
  rules: string[];
}

const SCORE_CATEGORIES: ScoreCategory[] = [
  {
    name: 'Performance',
    weight: 0.3,
    rules: [
      'no-inefficient-loops',
      'prefer-array-methods',
      'optimize-animations',
      'optimize-data-structures'
    ]
  },
  {
    name: 'DOM',
    weight: 0.2,
    rules: [
      'optimize-dom-operations',
      'optimize-css-selectors'
    ]
  },
  {
    name: 'Memory',
    weight: 0.2,
    rules: [
      'avoid-memory-leaks'
    ]
  },
  {
    name: 'Media',
    weight: 0.15,
    rules: [
      'optimize-image-loading'
    ]
  },
  {
    name: 'Network',
    weight: 0.15,
    rules: [
      'optimize-network-requests'
    ]
  }
];

interface ScoreResult {
  total: number;
  categories: {
    [key: string]: {
      score: number;
      weight: number;
      issues: number;
    };
  };
  issues: any[];
}

export const calculateScore = (messages: any[]): ScoreResult => {
  const result: ScoreResult = {
    total: 0,
    categories: {},
    issues: messages
  };

  // Initialize categories
  SCORE_CATEGORIES.forEach(category => {
    result.categories[category.name] = {
      score: 0,
      weight: category.weight,
      issues: 0
    };
  });

  // Count issues per category
  messages.forEach(message => {
    const ruleName = message.ruleId.replace('green/', '');
    SCORE_CATEGORIES.forEach(category => {
      if (category.rules.includes(ruleName)) {
        result.categories[category.name].issues++;
      }
    });
  });

  // Calculate scores per category
  Object.keys(result.categories).forEach(categoryName => {
    const category = result.categories[categoryName];
    const maxIssues = 10; // Maximum issues before score reaches 0
    const issues = Math.min(category.issues, maxIssues);
    category.score = Math.max(0, 100 - (issues * 10)) * category.weight;
    result.total += category.score;
  });

  return result;
};

export const formatScore = (score: ScoreResult): string => {
  const lines = [
    'Green Code Score Report',
    '=====================',
    `Total Score: ${score.total.toFixed(1)}/100`,
    '',
    'Category Breakdown:'
  ];

  Object.entries(score.categories).forEach(([category, data]) => {
    lines.push(
      `${category}:`,
      `  Score: ${data.score.toFixed(1)}`,
      `  Weight: ${(data.weight * 100).toFixed(0)}%`,
      `  Issues: ${data.issues}`
    );
  });

  if (score.issues.length > 0) {
    lines.push('', 'Issues Found:');
    score.issues.forEach(issue => {
      lines.push(`  - ${issue.message} (${issue.ruleId})`);
    });
  }

  return lines.join('\n');
}; 