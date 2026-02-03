/*The main file for all your examples for each lesson */
import { CarPromptExample } from "./CarPromptExample";

/*Creating a const object, where you put different lesson examples*/
export const exampleRegistry = {
  carPrompt: CarPromptExample,

} as const;

export type ExampleType = keyof typeof exampleRegistry;
