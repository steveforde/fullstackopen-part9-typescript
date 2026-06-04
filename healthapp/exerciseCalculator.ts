interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseHours: number[],
  target: number,
): Result => {
  // 1. Total number of days is just the length of the array
  const periodLength = exerciseHours.length;

  // 2. Filter out days with 0 hours to find active training days
  const trainingDays = exerciseHours.filter((hours) => hours > 0).length;

  // 3. Add up all the hours using reduce, starting from 0
  const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);

  // 4. Calculate the average daily exercise time
  const average = totalHours / periodLength;

  // 5. Check if the average meets or exceeds the target amount
  const success = average >= target;

  // 6. Logic to calculate a rating (1-3) and its description
  let rating: number;
  let ratingDescription: string;

  if (average < target * 0.8) {
    rating = 1;
    ratingDescription = "you need to try much harder!";
  } else if (average >= target * 0.8 && average < target) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "excellent work, target achieved!";
  }

  // 7. Return the completed object matching our Result interface
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// Hardcoded test case from the instructions to see if it works
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
