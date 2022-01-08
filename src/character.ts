import chalk from "chalk";
import inquirer from "inquirer";
import { getJSONFromFile } from "./file";
import { getProgressBar, getRandomInRange, isFieldMatched } from "./util";
import { CHARACTERS_FILE_PATH } from "./constant";
import type { Character, Color } from "./types";

export const getFormattedEnergyBarText = (players: Character[]) =>
  `${players[0].name} ${chalk.magenta(
    getProgressBar({
      total: 20,
      value: players[0].energy,
      from: "right",
    })
  )}[KO]${chalk.blue(
    getProgressBar({
      total: 20,
      value: players[1].energy,
      from: "left",
    })
  )} ${players[1].name} `;

export const promptInputCharacters = async () =>
  shufflePlayersOrder<Character>([
    setCharacterName({
      character: getCharacterBy({ key: "type", value: "검투사" }) as Character,
      name: await promptInputCharacterName("검투사"),
    }),
    setCharacterName({
      character: getCharacterBy({ key: "type", value: "마법사" }) as Character,
      name: await promptInputCharacterName("마법사"),
    }),
  ]);

export const getPlayerWhoHasMoreEnergy = ([p1, p2]: Character[]) =>
  p1.energy > p2.energy ? p1.name : p2.name;

export const getCharacterMessageText = ({
  name,
  sound,
  info,
  textColors: { nameColor, messageColor, infoColor },
}: {
  name: string;
  sound: string;
  info: string;
  textColors: { nameColor: Color; messageColor: Color; infoColor: Color };
}) =>
  `${chalk[nameColor](name)}: "${chalk[messageColor](sound)}" ${chalk[
    infoColor
  ](info)}`;
const shufflePlayersOrder = <T>(arr: T[]): T[] =>
  getRandomInRange({ min: 0, max: 1 }) > 0 ? arr.reverse() : arr;

const setCharacterName = ({
  character,
  name,
}: {
  character: Character;
  name: string;
}) => ({ ...JSON.parse(JSON.stringify(character)), name });

const getCharacterBy = ({ key, value }: { key: string; value: string }) =>
  Object.values(
    getJSONFromFile(CHARACTERS_FILE_PATH).filter(
      (character: { [key: string]: Character }) =>
        isFieldMatched({ object: character, key, value })
    )[0]
  )[0];

const promptInputCharacterName = async (targetName: string) =>
  (
    await inquirer.prompt({
      type: "input",
      name: "characterName",
      default: `${targetName}`,
      message: `${targetName}의 이름을 입력하세요.`,
    })
  ).characterName;
