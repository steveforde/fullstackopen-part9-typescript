import ReactDOM from "react-dom/client";
import App from "./App.tsx";

/**
 * Application Bootstrapping Entry Point
 * Finds the host HTML container element and mounts the root virtual React tree into the real DOM.
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  /* The non-null assertion operator (!) tells TypeScript that the 'root' div 
     definitely exists in index.html, preventing null reference type errors. */
  <App />,
);
