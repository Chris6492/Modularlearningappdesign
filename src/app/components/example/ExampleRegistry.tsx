import { CarPromptExample } from "./CarPromptExample";


export const exampleRegistry = {
  carPrompt: CarPromptExample,
} as const;

export type ExampleType = keyof typeof exampleRegistry;
