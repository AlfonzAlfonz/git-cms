import { Flex, List, ListItem, Spinner, Typography, Link, Box, ExtendedLinkProps } from "@xcorejs/ui";
import React, { FC, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";
import { Directory } from "../../pages/api/[repo]/contents";
import NextLink from "next/link";
import * as R from "ramda";
import { capitalize } from "utils/capitalize";
import pathUtil from "path";
import { FiFolder, FiFileText } from "react-icons/fi";

const Menu: FC = () => {
  const { data } = useSWR<Directory>("/api/test/contents", fetcher);

  return data
    ? (
      <Box ml="-1rem">
        <Folder dir={data} path="" />
      </Box>
    )
    : (
      <Flex justifyContent="center">
        <Spinner />
      </Flex>
    );
};

export default Menu;

const Folder: FC<{ dir: Directory; path: string; name?: string }> = ({ dir, path, name }) => {
  const [state, set] = useState(!name);
  const sorted = useMemo(
    () => R.sortBy(([,v]) => typeof v !== "object",
      R.sortBy(([v]) => v, Object.entries(dir))
    ),
    [dir]
  );

  return (
    <Typography as="div">
      {name && <FolderItem filename={name} as="span" folder onClick={() => set(s => !s)} />}
      {state && (
        <List _bullet={{ content: null }} pl="1rem" mt=".5rem">
          {sorted.map(([filename, content]) => (
            <ListItem key={filename}>
              {typeof content === "string"
                ? (
                  <NextLink href="/page/[...path]" as={`/page${path}/${filename}`} passHref>
                    <FolderItem filename={filename} />
                  </NextLink>
                ) : (
                  <>
                    <Folder dir={content} path={path + "/" + filename} name={filename} />
                  </>
                )}
            </ListItem>
          ))}
        </List>
      )}
    </Typography>
  );
};

const FolderItem: FC<{ filename: string; folder?: boolean } & ExtendedLinkProps> = (props) => {
  const { name, ext } = useMemo(() => pathUtil.parse(props.filename), [props.filename]);

  return (
    <Flex alignItems="center">
      {props.folder ? <FiFolder /> : <FiFileText />}
      <Link pl=".5rem" lineHeight="1.5" {...props}>{capitalize(name)}</Link>
    </Flex>
  );
};
