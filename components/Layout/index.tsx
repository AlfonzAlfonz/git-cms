import React, { FC } from "react";
import { Box, Heading1, Container, Typography, Heading2, Flex, Button } from "@xcorejs/ui";
import Menu from "./Menu";

const Layout: FC = ({ children }) => {
  return (
    <Box>
      <Flex borderBottom="1px solid lightgrey" alignItems="center" px="2rem">
        <Heading1 width="100%">Git CMS</Heading1>
        <Button>Commit&nbsp;&amp;&nbsp;Save</Button>
      </Flex>
      <Container mt="1rem">
        <Box minWidth={[null, null, "200px"]}>
          <Menu />
        </Box>
        <Typography as="div">{children}</Typography>
      </Container>

    </Box>
  );
};

export default Layout;
