import { Box, Container, Flex, Heading1, Typography } from "@xcorejs/ui";
import React, { FC } from "react";

import Menu from "./Menu";
import CommitButton from "./CommitButton";

const Layout: FC = ({ children }) => {
  return (
    <Box>
      <Flex borderBottom="1px solid lightgrey" alignItems="center" px="2rem">
        <Heading1 width="100%">Git CMS</Heading1>
        <CommitButton />
      </Flex>
      <Container mt="1rem">
        <Box minWidth={[null, null, "200px"]}>
          <Menu />
        </Box>
        <Typography as="div" width="100%">{children}</Typography>
      </Container>

    </Box>
  );
};

export default Layout;
