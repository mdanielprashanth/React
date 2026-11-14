const heading = React.createElement(
  "h1",
  { id: "heading", ac: "dc" },
  "Hello from react!",
);

const nested = React.createElement(
  "div",
  { id: "nestedParent", ac: "dc" },
  [
    React.createElement("h1", {id:"h1"}, "I am an H1"), 
    React.createElement("h2", {id:"h2"}, "I am an H2") 
  ]
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(nested);
console.log(document.getElementById("nestedParent"));

console.log(nested);

console.log(typeof heading);
console.log(heading.type);
console.log(heading.props);
console.log(heading.props.children);
