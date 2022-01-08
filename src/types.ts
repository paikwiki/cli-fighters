export interface Character {
  type: string;
  name: string;
  ability: {
    power: number;
    speed: number;
    fortune: number;
  };
  greetings: string[];
  skills: string[];
  energy: number;
}

export interface Skill {
  sounds: string[];
  damageRange: {
    min: number;
    max: number;
  };
}

export type Color =
  | "white"
  | "greenBright"
  | "redBright"
  | "grey"
  | "red"
  | "blue"
  | "blueBright";
