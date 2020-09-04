import { NextApiRequest, NextApiResponse } from "next";
import { post } from "utils/api";
import { commitAll, push, selectRepo, Repo } from "utils/git";
import { object, string } from "yup";
import { promises as fs } from "fs";
import path from "path";

interface CommitRequest {
  from: string;
  msg: string;
  files: Record<string, string>;
}

const schema = object({
  from: string(),
  msg: string(),
  files: object()
});

export default post(schema, async (req: NextApiRequest, res: NextApiResponse) => {
  const body: CommitRequest = req.body;

  try {
    const repo = selectRepo(req.query.repo as string);

    if (repo) {
      await writeFiles(repo, body.files);
      await commitAll(repo, body.msg);
      await push(repo);
    } else {
      res.status(400);
    }

    res.end();
  } catch (e) {
    res.status(500).end(`${(e as Error).message}\n\n${(e as Error).stack!}`);
  }
});

const writeFiles = (repo: Repo, files: Record<string, string>) =>
  Promise.all(Object.entries(files).map(([p, content]) =>
    fs.writeFile(path.join(repo.dir, p), content))
  );
