import React, { FC, useState } from "react";
import Layout from "components/Layout";
import { GetServerSideProps } from "next";
import path from "path";
import _fs from "fs";
import { useLocalStorage } from "../../utils/useLocalStorage";
import dynamic from "next/dynamic";

const fs = _fs.promises;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const filename = path.join("content", ...(query.path as string[]));
  return {
    props: {
      filename,
      file: (await fs.readFile(path.join(process.cwd(), "repos/test", filename))).toString()
    }
  };
};

const Page: FC<{file: string; filename: string}> = ({ filename, file }) => {
  return (
    <Layout>
      <ImportedDynamicForm file={file} filename={filename} />
    </Layout>
  );
};

export default Page;

const ImportedDynamicForm = dynamic(() => import("components/DynamicForm"), { ssr: false });
