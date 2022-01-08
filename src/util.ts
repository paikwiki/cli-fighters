import { DAMAGED_SOUNDS } from "./constant";

export const log = (...message: any) => console.log(...message);

export const getFieldValueByKey = ({
  obj,
  key,
}: {
  obj: { [key: string]: any };
  key: string;
}) => obj[Object.keys(obj)[0]][key];

export const getRandomInRange = ({ min, max }: { min: number; max: number }) =>
  Math.floor(Math.random() * (max - (min - 1)) + min);

export const isFieldMatched = ({
  key,
  value,
  object,
}: {
  key: string;
  value: any;
  object: { [key: string]: { name: string } };
}) => value === getFieldValueByKey({ obj: object, key });

export const getProgressBar = ({
  total,
  value,
  from,
}: {
  total: number;
  value: number;
  from: "left" | "right";
}) =>
  [""]
    .map((filledValue) =>
      filledValue[from === "left" ? "padEnd" : "padStart"](value, "#")
    )
    .map((emptyValue) =>
      emptyValue[from === "left" ? "padEnd" : "padStart"](total, ".")
    )
    .join();

export const getRandomItemOneFrom = (arr: any[]) =>
  arr[getRandomInRange({ min: 0, max: arr.length - 1 })];

export const getToggleValueZeroOne = (index: number) => (index === 1 ? 0 : 1);

export const getDamageSound = () =>
  DAMAGED_SOUNDS[getRandomInRange({ min: 0, max: DAMAGED_SOUNDS.length - 1 })];

export const getBannerText = () =>
  [
    "==========================================================",
    "==           sword master  VS.  magician                ==",
    "==========================================================",
    "",
  ].join("\n");
