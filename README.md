# eslint-plugin-green

An ESLint plugin that helps you write more sustainable and energy-efficient code by enforcing green coding practices.

## Features

- Identifies inefficient loops and suggests optimized alternatives
- Optimizes DOM operations to reduce energy consumption
- Prevents memory leaks in event listeners and timers
- Enforces efficient CSS selector usage
- Optimizes network requests for better performance
- Promotes efficient image loading practices
- Optimizes animations for better performance
- Suggests efficient data structures for large datasets
- Provides a green code score to measure code sustainability

## Installation

```bash
pnpm add -D eslint-plugin-green
```

## Usage

Add the plugin to your ESLint configuration:

```json
{
	"plugins": ["green"],
	"extends": ["plugin:green/recommended"],
	"reporters": ["green-score"]
}
```

## Green Code Score

The plugin includes a scoring system that evaluates your code's sustainability across different categories:

### Category Weights

- Performance (30%): Efficient algorithms, data structures, and animations
- DOM (20%): Optimized DOM operations and CSS selectors
- Memory (20%): Memory leak prevention and efficient resource usage
- Media (15%): Optimized image loading and media handling
- Network (15%): Efficient network requests and data transfer

### Score Calculation

- Each category starts with 100 points
- Points are deducted based on the number of issues (10 points per issue)
- Final score is weighted according to category importance
- Maximum score is 100 points

### Example Score Report

```
Green Code Score Report
=====================
Total Score: 85.5/100

Category Breakdown:
Performance:
	Score: 27.0
	Weight: 30%
	Issues: 2
DOM:
	Score: 18.0
	Weight: 20%
	Issues: 1
Memory:
	Score: 20.0
	Weight: 20%
	Issues: 0
Media:
	Score: 13.5
	Weight: 15%
	Issues: 1
Network:
	Score: 7.0
	Weight: 15%
	Issues: 3

Issues Found:
	- Use Array.map() instead of forEach (green/prefer-array-methods)
	- Add loading="lazy" to img tag (green/optimize-image-loading)
	- Use requestAnimationFrame instead of setInterval (green/optimize-animations)
```

## Rules

### Performance Rules

#### no-inefficient-loops

Detects inefficient loop patterns that can impact performance.

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

#### prefer-array-methods

Encourages use of array methods instead of loops for better performance.

```javascript
// Bad
const result = [];
for (const item of array) {
	if (item.active) {
		result.push(item);
	}
}

// Good
const result = array.filter((item) => item.active);
```

#### optimize-animations

Enforces efficient animation practices.

```javascript
// Bad
setInterval(() => {
	element.style.transform = 'translateX(' + position + 'px)';
}, 16);

// Good
function animate() {
	element.style.transform = 'translateX(' + position + 'px)';
	requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

#### optimize-data-structures

Suggests efficient data structures for large datasets.

```javascript
// Bad
const largeArray = Array(1000).fill(0);
if (largeArray.includes(value)) {
	// do something
}

// Good
const set = new Set(largeArray);
if (set.has(value)) {
	// do something
}
```

### DOM Rules

#### optimize-dom-operations

Enforces efficient DOM manipulation practices.

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

#### optimize-css-selectors

Enforces efficient CSS selector usage.

```javascript
// Bad
document.querySelector('div.container div.row div.col');

// Good
document.querySelector('.container .col');
```

### Memory Rules

#### avoid-memory-leaks

Prevents memory leaks in event listeners and timers.

```javascript
// Bad
element.addEventListener('click', handler);

// Good
element.addEventListener('click', handler);
element.removeEventListener('click', handler);
```

### Media Rules

#### optimize-image-loading

Enforces efficient image loading practices.

```javascript
// Bad
<img src="large-image.jpg" alt="Large image" />

// Good
<img
	src="large-image.jpg"
	alt="Large image"
	loading="lazy"
	sizes="(max-width: 600px) 100vw, 600px"
/>
```

### Network Rules

#### optimize-network-requests

Enforces efficient network request patterns.

```javascript
// Bad
fetch('/api/data').then((response) => response.json());

// Good
fetch('/api/data')
	.then((response) => response.json())
	.catch((error) => console.error('Error:', error));
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
