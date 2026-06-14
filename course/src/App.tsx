// ==========================================
// 1. INTERFACES & DISCRIMINATED UNION TYPE LAYOUT
// ==========================================

/**
 * Base layout configuration shared by every course module variant
 */
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

/**
 * Extended base layout that adds a description string attribute
 */
interface CoursePartDescription extends CoursePartBase {
  description: string;
}

/**
 * Variant interface for a basic plain-text module layout
 */
interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"; // Discriminating literal string type attribute
}

/**
 * Variant interface tracking team assignment groups and asset metrics
 */
interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"; // Discriminating literal string type attribute
}

/**
 * Variant interface referencing submission portals and reading materials
 */
interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"; // Discriminating literal string type attribute
}

/**
 * Variant interface tracking special required prerequisite engineering skills
 */
interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"; // Discriminating literal string type attribute
}

/**
 * Master Discriminated Union type aggregating all individual structural variations
 */
type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

// Component configurations prop layout validation signatures
interface HeaderProps {
  name: string;
}

interface ContentProps {
  parts: CoursePart[];
}

interface TotalProps {
  parts: CoursePart[];
}

// ==========================================
// 2. EXHAUSTIVE TYPE CHECKING UTILITY HELPER
// ==========================================

/**
 * Compile-time exhaustiveness tracker ensuring switch conditions verify all union paths.
 * If a new variant is added to CoursePart but skipped in a switch, TypeScript flags an error.
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

// ==========================================
// 3. MODULAR UI COMPONENTS
// ==========================================

/**
 * Main application layout string title row header
 */
const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

/**
 * Structural Router Component evaluating current shape attributes
 * and isolating specific UI layout trees per discriminated type.
 */
const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
        </p>
      );
    case "group":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          submit to {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          <em>{part.description}</em>
          <br />
          required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      // Fallback hook verifying type-narrowing safety patterns strictly at compile-time
      return assertNever(part);
  }
};

/**
 * Loop collection component iterating down full array arrays
 */
const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

/**
 * Numeric calculation foot row summarizing completed track elements total counts
 */
const Total = (props: TotalProps) => {
  const totalExercises = props.parts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );
  return (
    <p>
      <strong>Number of exercises {totalExercises}</strong>
    </p>
  );
};

// ==========================================
// 4. MAIN APP CONFIGURATION CONTROLLER
// ==========================================
const App = () => {
  const courseName = "Half Stack application development";

  // Strongly-typed static core collection matching our strict union attributes rules
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
