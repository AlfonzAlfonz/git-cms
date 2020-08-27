import _fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { get } from "utils/api";
import { selectRepo } from "utils/git";
import path from "path";

const fs = _fs.promises;

export type Directory = {
  [K in string]: string | Directory;
};

export default get(async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = selectRepo(req.query.repo as string, "");
  repo
    ? scanDir(path.join(process.cwd(), "repos", repo.dir, "content"))
      .then(res.json)
    : res.status(400).end();
});

const scanDir = async (dir: string, root: string = ""): Promise<Directory> => {
  const contents = await fs.readdir(dir, { withFileTypes: true });
  return Object.fromEntries(
    await Promise.all(contents.filter(f => !f.name.startsWith(".")).map<Promise<[string, string | Directory]>>(async f =>
      f.isDirectory()
        ? [f.name, await scanDir(path.join(dir, f.name), path.join(root + f.name))]
        : [f.name, path.join(root, f.name)]
    ))
  );
};
