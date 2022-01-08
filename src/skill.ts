import { getJSONFromFile } from "./file";
import { SKILLS_FILE_PATH } from "./constant";

export const getSkills = () => getJSONFromFile(SKILLS_FILE_PATH);
