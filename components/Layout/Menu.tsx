import { Flex, List, ListItem, Spinner, Typography, Link } from "@xcorejs/ui";
import React, { FC, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";
import { Directory } from "../../pages/api/[repo]/contents";
import NextLink from "next/link";

const Menu: FC = () => {
  const { data } = useSWR<Directory>("/api/test/contents", fetcher);

  const contents = useMemo(() => data && dirToList(data), [data]);

  return contents ? (
    <Typography as="div">
      <List _bullet={{ content: "" }}>
        {contents.map(name => (
          <ListItem key={name}>
            <NextLink href="/page/[...path]" as={`/page/${name}`} passHref>
              <Link>{name}</Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Typography>
  ) : (
    <Flex justifyContent="center">
      <Spinner />
    </Flex>
  );
};

export default Menu;

const dirToList = (d: Directory): string[] =>
  Object.entries(d).map(([k, val]) => typeof val === "string" ? val : dirToList(val)).flat();
