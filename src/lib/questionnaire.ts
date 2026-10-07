export interface Option<T extends string = string> { label: string; value: T }

export const walkOptions = [
  { label: 'Less than 15 mins', value: 'lt15' },
  { label: '15–30 mins', value: '15-30' },
  { label: '30–45 mins', value: '30-45' },
  { label: '45–60 mins', value: '45-60' },
  { label: 'More than 60 mins', value: 'gt60' },
] as const satisfies readonly Option[];

export const experienceOptions = [
  { label: 'Beginner: just starting out', value: 'beginner' },
  { label: 'Intermediate: I run a few times a week and can run an hour without stopping', value: 'intermediate' },
  { label: 'Advanced: I run 5+ times a week and can run 2 hours without stopping', value: 'advanced' },
] as const satisfies readonly Option[];

export const goalOptions = [
  { label: '5 km comfortably', value: '5k' },
  { label: '10 km comfortably', value: '10k' },
  { label: 'A half marathon (21 km)', value: '21k' },
  { label: 'A marathon (42 km)', value: '42k' },
  { label: 'None of these, I just want to be healthy and run 3 times a week', value: 'healthy' },
] as const satisfies readonly Option[];

export const exerciseOptions = [
  { label: 'Less than 1 day', value: '0' },
  { label: '1 day', value: '1' },
  { label: '2 days', value: '2' },
  { label: '3 days', value: '3' },
  { label: '4 days or more', value: '4' },
] as const satisfies readonly Option[];

export const sleepOptions = [
  { label: '7 hours or more', value: 'good' },
  { label: '6 to under 7 hours', value: 'ok' },
  { label: '4 to under 6 hours', value: 'short' },
  { label: 'Under 4 hours', value: 'veryshort' },
] as const satisfies readonly Option[];

export const conditionOptions = [
  { label: 'Heart disease', value: 'heart' },
  { label: 'High blood pressure', value: 'bp' },
  { label: 'Stroke or transient ischemic attack', value: 'stroke' },
  { label: 'Depression', value: 'depression' },
] as const satisfies readonly Option[];

type Value<T extends readonly Option[]> = T[number]['value'];

export interface Answers {
  height: number; // cm
  weight: number; // kg
  age: number;
  walk: Value<typeof walkOptions>;
  experience: Value<typeof experienceOptions>;
  goal: Value<typeof goalOptions>;
  exercise: Value<typeof exerciseOptions>;
  sleep: Value<typeof sleepOptions>;
  conditions: Value<typeof conditionOptions>[];
}
