# 🌱 eslint-plugin-green

<div align="center">

[![npm version](https://img.shields.io/npm/v/eslint-plugin-green.svg?color=4CAF50)](https://www.npmjs.com/package/eslint-plugin-green)
[![License](https://img.shields.io/npm/l/eslint-plugin-green.svg?color=4CAF50)](https://github.com/yourusername/eslint-plugin-green/blob/main/LICENSE)
[![ESLint](https://img.shields.io/badge/ESLint-8.0.0+-4CAF50.svg)](https://eslint.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.3.5+-4CAF50.svg)](https://www.typescriptlang.org/)

</div>

An ESLint plugin that helps you write more sustainable and energy-efficient code by enforcing green coding practices. 🌍

## 🌟 Features

- 🔄 Identifies inefficient loops and suggests optimized alternatives
- 🌳 Optimizes DOM operations to reduce energy consumption
- 🧹 Prevents memory leaks in event listeners and timers
- 🎨 Enforces efficient CSS selector usage
- 🌐 Optimizes network requests for better performance
- 🖼️ Promotes efficient image loading practices
- ✨ Optimizes animations for better performance
- 📊 Suggests efficient data structures for large datasets
- 📈 Provides a green code score to measure code sustainability

## 📦 Installation

```bash
# Using npm
npm install --save-dev eslint-plugin-green

# Using yarn
yarn add -D eslint-plugin-green

# Using pnpm
pnpm add -D eslint-plugin-green
```

## ⚙️ Requirements

- ESLint >= 8.0.0
- TypeScript >= 4.3.5 (if using TypeScript)

## 🛠️ Setup

1. Install the required dependencies:

```bash
# Using npm
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Using yarn
yarn add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Using pnpm
pnpm add -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

2. Create or update your `.eslintrc.json` file:

```json
{
	"parser": "@typescript-eslint/parser",
	"plugins": ["@typescript-eslint", "green"],
	"extends": ["plugin:green/recommended"],
	"rules": {
		// Customize rules as needed
		"green/no-inefficient-loops": "warn",
		"green/prefer-array-methods": "warn",
		"green/optimize-dom-operations": "warn"
	}
}
```

3. Add a lint script to your `package.json`:

```json
{
	"scripts": {
		"lint": "eslint . --ext .ts,.js,.jsx,.tsx"
	}
}
```

## 🚀 Usage

### Basic Usage

Run ESLint with the plugin:

```bash
# Using npm
npm run lint

# Using yarn
yarn lint

# Using pnpm
pnpm lint
```

### Configuration Options

The plugin provides two preset configurations:

1. **Recommended** (default):

```json
{
	"extends": ["plugin:green/recommended"]
}
```

This enables all rules with "warn" severity.

2. **Strict**:

```json
{
	"extends": ["plugin:green/strict"]
}
```

This enables all rules with "error" severity.

### Available Rules

#### Performance Rules ⚡

- `green/no-inefficient-loops`: Enforces using Array methods instead of inefficient loops
- `green/prefer-array-methods`: Encourages use of array methods for better performance
- `green/optimize-animations`: Enforces efficient animation practices
- `green/optimize-data-structures`: Suggests efficient data structures for large datasets

#### DOM Rules 🌳

- `green/optimize-dom-operations`: Enforces efficient DOM manipulation practices
- `green/optimize-css-selectors`: Enforces efficient CSS selector usage

#### Memory Rules 🧹

- `green/avoid-memory-leaks`: Prevents memory leaks in event listeners and timers

#### Media Rules 🖼️

- `green/optimize-image-loading`: Enforces efficient image loading practices

#### Network Rules 🌐

- `green/optimize-network-requests`: Enforces efficient network request patterns

### Rule Examples

#### no-inefficient-loops 🔄

```javascript
// Bad
for (let i = 0; i < array.length; i++) {
	if (array[i].someProperty) {
		// do something
	}
}

// Good
array
	.filter((item) => item.someProperty)
	.forEach((item) => {
		// do something
	});
```

#### optimize-dom-operations 🌳

```javascript
// Bad
for (let i = 0; i < elements.length; i++) {
	elements[i].style.display = 'none';
}

// Good
elements.forEach((element) => {
	element.style.display = 'none';
});
```

#### optimize-image-loading 🖼️

```javascript
// Bad
<img src="large-image.jpg" alt="Large image" />

// Good
<img
	src="large-image.jpg"
	alt="Large image"
	loading="lazy"
	sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## 📊 Green Code Score

The plugin includes a scoring system that evaluates your code's sustainability across different categories:

### Category Weights

- ⚡ Performance (30%): Efficient algorithms, data structures, and animations
- 🌳 DOM (20%): Optimized DOM operations and CSS selectors
- 🧹 Memory (20%): Memory leak prevention and efficient resource usage
- 🖼️ Media (15%): Optimized image loading and media handling
- 🌐 Network (15%): Efficient network requests and data transfer

### Score Calculation

- Each category starts with 100 points
- Points are deducted based on the number of issues (10 points per issue)
- Final score is weighted according to category importance
- Maximum score is 100 points

### Example Score Report

```
🌱 Green Code Score Report 🌱
=====================
Total Score: 85.5/100

Category Breakdown:
⚡ Performance:
	Score: 27.0
	Weight: 30%
	Issues: 2
🌳 DOM:
	Score: 18.0
	Weight: 20%
	Issues: 1
🧹 Memory:
	Score: 20.0
	Weight: 20%
	Issues: 0
🖼️ Media:
	Score: 13.5
	Weight: 15%
	Issues: 1
🌐 Network:
	Score: 7.0
	Weight: 15%
	Issues: 3

Issues Found:
	- Use Array.map() instead of forEach (green/prefer-array-methods)
	- Add loading="lazy" to img tag (green/optimize-image-loading)
	- Use requestAnimationFrame instead of setInterval (green/optimize-animations)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT
