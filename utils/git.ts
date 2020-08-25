import child_process from "child_process";

const exec = (command: string, options?: child_process.CommonOptions) =>
  new Promise((resolve, reject) => child_process.exec(command, options, (err, stdout, stdin) =>
    err
      ? reject(err)
      : resolve([stdout, stdin])
  ));

// eslint-disable-next-line no-useless-escape
const pathRegex = /^[^\/\\\.~]*$/;

type Repo = {
  dir: string;
  from: string;
};

export const selectRepo = (dir: string, from: string): Repo | null =>
  pathRegex.test(dir) ? { dir, from } : null;

export const commitAll = (repo: Repo, msg: string) =>
  exec("git add .", { cwd: repo.dir }).then(() => exec(`git commit -a -m "${msg}"`, { cwd: repo.dir }));

export const push = (repo: Repo) =>
  sexec("git push", { cwd: repo.dir });
