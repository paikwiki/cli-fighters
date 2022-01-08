import fs from "fs-extra";

export const getJSONFromFile = (fileName: string) => fs.readJSONSync(fileName);
