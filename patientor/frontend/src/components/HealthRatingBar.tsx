import { Rating } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Type definitions for the component's incoming props
type BarProps = {
  rating: number; // Numerical health risk value (0 to 3)
  showText: boolean; // Boolean flag to toggle conditional rendering of descriptive text
};

/**
 * Material UI Customized Component
 * Leverages the styled utility to apply custom aesthetic overrides to the default Rating UI.
 */
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75", // Warm pink-red hue for filled active health heart icons
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47", // Slightly deeper red shade applied dynamically on interactive mouse hovers
  },
});

/**
 * Global constant array mapping numeric backend evaluation ratings
 * directly to intuitive, human-readable patient health diagnostics strings.
 */
const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
];

/**
 * UI Component rendering a descriptive health index row using visual heart shapes
 */
const HealthRatingBar = ({ rating, showText }: BarProps) => {
  return (
    <div className="health-bar">
      {/* MUI Rating component display layer.
        Inverting logic calculation (4 - rating) ensures that lower numeric backend risk 
        values map to a higher count of visual heart icons displayed UI side.
      */}
      <StyledRating
        readOnly
        value={4 - rating}
        max={4}
        icon={<Favorite fontSize="inherit" />}
      />

      {/* Inline ternary expression executing conditional description text generation */}
      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
