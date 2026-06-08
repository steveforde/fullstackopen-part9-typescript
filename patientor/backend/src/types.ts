export interface Diagnosis {
  code: string;
  name: string;
  latin?: string; // <-- Optional property because it might be missing
}
