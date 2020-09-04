import Layout from "components/Layout";
import { promises as fs } from "fs";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import path from "path";
import R from "ramda";
import React, { FC } from "react";
import { capitalize } from "utils/capitalize";
import { EditorConfig, fileConfig, loadConfig } from "utils/dotconfig";
import { selectRepo } from "utils/git";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const repo = selectRepo("test")!;

  const filename = path.join("content", ...[query.path!].flat());
  const config = await loadConfig(path.join(repo.dir, filename));

  return {
    props: {
      filename,
      file: await R.pipe(fs.readFile, R.andThen(R.toString))(path.join(repo.dir, filename), undefined),
      config: fileConfig(config, filename)
    }
  };
};

const Page: FC<{ file: string; filename: string; config: EditorConfig }> = ({ filename, file, config }) => {
  return (
    <Layout title={capitalize(path.parse(filename).name)}>
      <ImportedDynamicForm key={file} file={file} filename={filename} config={config} />
    </Layout>
  );
};

export default Page;

const ImportedDynamicForm = dynamic(() => import("components/DynamicForm"), { ssr: false });
