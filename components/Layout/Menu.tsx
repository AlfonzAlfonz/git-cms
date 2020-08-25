import { Flex, List, ListItem, Spinner, Typography, Link } from "@xcorejs/ui";
import React, { FC } from "react";
import useSWR from "swr";
import { fetcher } from "utils/fetcher";
import { ContentEntry } from "../../pages/api/[repo]/contents";

const Menu: FC = () => {
  const { data, error } = useSWR<ContentEntry[]>("/api/test/contents", fetcher);

  return data ? (
    <Typography as="div">
      <List _bullet={{ content: "" }}>
        {data.map(([name, type]) => <ListItem key={name}><Link href={`/page/${name}`}><a>{name} ({type})</a></Link></ListItem>)}
      </List>
    </Typography>
  ) : (
    <Flex justifyContent="center">
      <Spinner />
    </Flex>
  );
};

export default Menu;
