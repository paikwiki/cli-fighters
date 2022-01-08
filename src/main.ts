import chalk from "chalk";
import inquirer from "inquirer";
import {
  getCharacterMessageText,
  getFormattedEnergyBarText,
  getPlayerWhoHasMoreEnergy,
  promptInputCharacters,
} from "./character";
import { getSkills } from "./skill";
import {
  getBannerText,
  getDamageSound,
  getRandomInRange,
  getRandomItemOneFrom,
  getToggleValueZeroOne,
  log,
} from "./util";
import type { Character, Color, Skill } from "./types";

const main = async () => {
  console.clear();
  putBanner();
  const skills = getSkills();
  const players = await promptInputCharacters();

  console.clear();
  putBanner();
  putEnergyBar(players);
  putPlayerGreetings(players);

  let index = 0;
  while (players.filter((p) => p.energy > 0).length === players.length) {
    const p1 = players[index];
    const p2 = players[getToggleValueZeroOne(index)];
    const skill = await promptInputSkill({ player: p1, skills });
    console.clear();

    const damage = getRandomInRange(skill.damageRange);
    p2.energy = p2.energy - damage;

    putBanner();
    putEnergyBar(players);
    log(
      getCharacterMessageText({
        name: p1.name,
        sound: getRandomItemOneFrom(skill.sounds),
        info: `[데미지: ${damage}]`,
        textColors: {
          nameColor: ["greenBright", "blueBright"].reverse()[index] as Color,
          messageColor: "white",
          infoColor: "grey",
        },
      })
    );
    log(
      getCharacterMessageText({
        name: p2.name,
        sound: getDamageSound(),
        info: `체력: [${p2.energy > -1 ? p2.energy : 0}]`,
        textColors: {
          nameColor: ["greenBright", "blueBright"][index] as Color,
          messageColor: "redBright",
          infoColor: ["greenBright", "blueBright"][index] as Color,
        },
      }),
      "\n"
    );
    index = getToggleValueZeroOne(index);
  }

  putWinner(players);
};

const promptInputSkill = async ({
  player,
  skills,
}: {
  player: Character;
  skills: Skill[];
}) =>
  skills[
    (
      await inquirer.prompt({
        type: "list",
        name: "skill",
        message: `${player.name}의 공격`,
        default: getRandomItemOneFrom(player.skills),
        choices: player.skills,
      })
    ).skill
  ] as Skill;

const putBanner = () => log(chalk["greenBright"](getBannerText()));

const putWinner = (players: Character[]) =>
  log(
    chalk["yellowBright"](
      `${getPlayerWhoHasMoreEnergy(players)} Wins!`.padStart(30)
    )
  );

const putEnergyBar = (players: Character[]) =>
  log(getFormattedEnergyBarText(players), "\n");

const putPlayerGreetings = (players: Character[]) => {
  log(
    getCharacterMessageText({
      name: players[0].name,
      sound: getRandomItemOneFrom(players[0].greetings),
      info: `[체력: ${players[0].energy}]`,
      textColors: {
        nameColor: ["greenBright", "blueBright"][0] as Color,
        messageColor: "white",
        infoColor: "grey",
      },
    })
  );
  log(
    getCharacterMessageText({
      name: players[1].name,
      sound: getRandomItemOneFrom(players[1].greetings),
      info: `[체력: ${players[1].energy}]`,
      textColors: {
        nameColor: ["greenBright", "blueBright"][1] as Color,
        messageColor: "white",
        infoColor: "grey",
      },
    })
  );
};

main();
