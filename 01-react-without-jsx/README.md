# Lab 01: Understanding React Without JSX

## Objective

Understand how React works behind the scenes by creating UI elements without JSX, using plain JavaScript, HTML, React and ReactDOM CDN libraries.

## 1. Vanilla JavaScript DOM Manipulation

Before React, we created and injected HTML elements using native JavaScript DOM APIs.

```javascript
const heading = document.createElement("h1");

heading.textContent = "Hello from Vanilla JavaScript!";

const root = document.getElementById("root");

root.appendChild(heading);
```

**What happens?**

1. `document.createElement()` creates an HTML element.
2. `textContent` sets its text.
3. `getElementById()` retrieves the root container.
4. `appendChild()` inserts the element into the DOM.

The `<h1>` is created and inserted into the DOM at runtime.

## 2. Introducing React Through CDN

We loaded React and ReactDOM directly into our HTML without installing npm packages or using a build tool.

```html
<div id="root"></div>

<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>

<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

<script src="./index.js"></script>
```

- **React:** Provides the core React functionality, including `React.createElement()`.
- **ReactDOM:** Provides browser DOM integration, including `ReactDOM.createRoot()`.

We used React 18 UMD builds because React 19 no longer provides these UMD builds.

## 3. React.createElement()

React can be written without JSX using `React.createElement()`.

### Syntax

```javascript
React.createElement(type, props, ...children);
```

Arguments:

- `type`: HTML element type or React component.
- `props`: Properties passed to the element.
- `children`: Child elements or content.

### Example

```javascript
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello from React!"
);
```

This creates a React element object describing an `h1` element.

### Inspecting the React Element

```javascript
console.log(heading);
console.log(typeof heading);
console.log(heading.type);
console.log(heading.props);
console.log(heading.props.children);
```

A React element is a JavaScript object describing what should appear in the UI.

Its commonly observable properties include:

- `type`
- `key`
- `ref`
- `props`

React's internal fields such as `_owner` and `_store` are implementation details and should not be relied upon.

## 4. React Element vs DOM Element

Before rendering:

```javascript
console.log(document.getElementById("heading"));
```

Output:

```javascript
null
```

Why?

`React.createElement()` creates a React element object. It does not directly create or insert an HTML DOM element.

To render it:

```javascript
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(heading);
```

After React commits the render, the actual DOM element can be inspected:

```javascript
console.log(document.getElementById("heading"));
```

The browser now contains:

```html
<div id="root">
  <h1 id="heading">Hello from React!</h1>
</div>
```

**Key distinction:**

- `React.createElement()` describes the UI.
- `ReactDOM.createRoot()` creates a React root for a DOM container.
- `root.render()` tells React to render the element tree.

## 5. Creating Nested React Elements

React elements can contain other React elements as children.

```javascript
const nested = React.createElement(
  "div",
  { id: "nestedParent" },
  [
    React.createElement(
      "h1",
      { id: "h1", key: "heading-1" },
      "I am an H1"
    ),

    React.createElement(
      "h2",
      { id: "h2", key: "heading-2" },
      "I am an H2"
    )
  ]
);

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(nested);
```

The resulting DOM structure:

```html
<div id="nestedParent">
  <h1 id="h1">I am an H1</h1>
  <h2 id="h2">I am an H2</h2>
</div>
```

We can inspect the React element tree:

```javascript
console.log(nested);
console.log(nested.props);
console.log(nested.props.children);
```

We can also inspect the rendered DOM:

```javascript
console.log(document.getElementById("nestedParent"));
```

**Important:** When rendering arrays of elements, provide a unique `key` prop to each sibling so React can identify them across updates.

## 6. JSX vs React.createElement()

The same React element can be described in two ways.

### Using JSX

```jsx
const heading = <h1 id="heading">Hello React</h1>;
```

### Without JSX

```javascript
const heading = React.createElement(
  "h1",
  { id: "heading" },
  "Hello React"
);
```

JSX is syntax that is transformed by a compiler into React element creation calls (or the newer JSX runtime APIs).

React does not require JSX.

## Key Takeaways

1. JavaScript can create and inject DOM elements directly.
2. React provides an abstraction for describing UI using React elements.
3. `React.createElement()` creates a React element object, not a DOM node.
4. React elements can be nested to describe UI trees.
5. ReactDOM connects React's element descriptions to the browser DOM.
6. `createRoot()` establishes the rendering root.
7. `root.render()` renders the React element tree.
8. JSX is optional and makes complex React element trees easier to write.

---

**Experiment:** React without JSX using plain HTML, JavaScript, React CDN and ReactDOM CDN.

**Environment:** React 18 UMD development builds.