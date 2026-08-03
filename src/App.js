const Pizza = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pizza Name"),
    React.createElement("h1", {}, "Pizza Description, blah, blah, blah"),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Padre Gino's"),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
    React.createElement(Pizza),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
