import { NextApiRequest, NextApiResponse } from "next";
import { post } from "utils/api";
import { commitAll, push, selectRepo } from "utils/git";
import { object, string } from "yup";

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

export default post(schema, (req: NextApiRequest, res: NextApiResponse) => {
  const body: CommitRequest = req.body;

  try {
    const repo = selectRepo(req.query.repo as string, body.from);

    if (repo) {
      commitAll(repo, body.msg);
      push(repo);
    } else {
      res.status(400);
    }

    res.end();
  } catch (e) {
    res.status(500).end((e as Error).message);
  }
});
