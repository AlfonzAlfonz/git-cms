import _fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { get } from "utils/api";
import { selectRepo } from "utils/git";
import path from "path";

const fs = _fs.promises;

export type ContentEntry = [string, "dir" | "file"];

export default get(async (req: NextApiRequest, res: NextApiResponse) => {
  const repo = selectRepo(req.query.repo as string, "");
  repo
    ? fs.readdir(path.join(process.cwd(), "repos", repo.dir, "content"), { withFileTypes: true })
      .then(files => files.map(f => f.isDirectory() ? [f.name, "dir"] : [f.name, "file"]))
      .then(files => res.json(files))
    : res.status(400).end();
});
