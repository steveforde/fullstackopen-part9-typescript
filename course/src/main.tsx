import { createRoot } from "react-dom/client";
import App from "./App";

/**
 * Single Module Application Bootstrapper
 * Targets the static HTML injection container and mounts the isolated TypeScript exercises interface.
 */
createRoot(document.getElementById("root")!).render(
  /* The exclamation mark (!) acts as the non-null assertion operator, confirming 
     to TypeScript that the "root" DOM node exists and skipping mandatory null validation checks. */
  <App />,
);
