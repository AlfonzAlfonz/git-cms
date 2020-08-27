import React, { FC } from "react";
import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import path from "path";
import _fs from "fs";
import dynamic from "next/dynamic";
import { loadConfig, EditorConfig } from "utils/dotconfig";

const fs = _fs.promises;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const filename = path.join("content", ...(query.path as string[]));
  const fullPath = path.join(process.cwd(), "repos/test", filename);
  const { ext } = path.parse(fullPath);
  const config = await loadConfig(fullPath);

  return {
    props: {
      filename,
      file: (await fs.readFile(path.join(process.cwd(), "repos/test", filename))).toString(),
      config: config[`[${ext.slice(1)}]`] ?? { type: "text" }
    }
  };
};

const Page: FC<{file: string; filename: string; config: EditorConfig}> = ({ filename, file, config }) => {
  return (
    <Layout>
      <ImportedDynamicForm key={file} file={file} filename={filename} config={config} />
    </Layout>
  );
};

export default Page;

const ImportedDynamicForm = dynamic(() => import("components/DynamicForm"), { ssr: false });
