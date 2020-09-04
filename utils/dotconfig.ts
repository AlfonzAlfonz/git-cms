import _fs from "fs";
import path from "path";

const fs = _fs.promises;

export type DotConfig = Record<string, EditorConfig>;
export type EditorConfig = { type: string };

const defaultConfig = {};

export const loadConfig = async (p: string): Promise<DotConfig> => {
  const { dir } = path.parse(p);

  const config = await fs.access(dotconfig(dir))
    .then(() => fs.readFile(dotconfig(dir))
      .then<DotConfig>(b => JSON.parse(b.toString())))
    .catch(() => dir === "content" ? undefined : loadConfig(dir));

  return config ?? defaultConfig;
};

const dotconfig = (dir: string) => path.join(dir, ".config.json");

export const fileConfig = (config: DotConfig, filename: string) =>
  config[`[${path.parse(filename).ext.slice(1)}]`] ?? { type: "text" };
