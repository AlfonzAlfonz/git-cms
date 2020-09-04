import { Box, Button, Modal, Stack, Typography, useModal, Heading2, Heading3, Heading4, Flex, Em } from "@xcorejs/ui";
import React, { FC, useState, useMemo, useRef } from "react";
import styled from "styled-components";

const CommitButton: FC = () => {
  const [open] = useModal(CommitModal);
  return (
    <Button onClick={open}>
      Commit&nbsp;&amp;&nbsp;Save
    </Button>
  );
};

export default CommitButton;

const CommitModal: FC = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const commitChanges = () => {
    setLoading(true);
    const files = Object.fromEntries(
      getFiles()
        .map(f => [f.replace("file://", ""), JSON.parse(localStorage[f])])
    );

    fetch("/api/test/commit", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        from: "",
        msg: msg,
        files
      })
    }).then(() => {
      setLoading(false);
      removeFiles();
    });
  };

  const files = useMemo(() => getFiles().map(f => f.replace("file://", "")), []);

  return (
    <Modal minWidth="50vw" s="lg" px="5rem" header="Commit & save" _close={{ }}>
      <Stack gap="3rem" direction="column">
        <Box>
          <Typography as={"label" as any} mb="1rem">Message</Typography>
          <InputStyle value={msg} onChange={e => setMsg(e.target.value)} />
        </Box>

        <Box>
          <Heading3 as="h2" fontWeight="400" mb="1rem" fontSize="1.8rem">Changed files</Heading3>

          <Stack direction="column" gap="1rem">
            {files.length ? files.map(f =>
              <Typography key={f}>{f}</Typography>
            ) : <Em>No files edited</Em>}
          </Stack>
        </Box>

        <Flex>
          <Box width="100%" />
          <Button onClick={commitChanges} loading={loading} disabled={!files.length || !msg}>
            Commit&nbsp;&amp;&nbsp;Save
          </Button>
        </Flex>
      </Stack>

    </Modal>
  );
};

const getFiles = () => Object.keys(window.localStorage).filter(e => e.startsWith("file://"));

const removeFiles = () => getFiles().map(localStorage.removeItem);

const InputStyle = styled.input`
  padding: 1rem;
  font-size: 1.6rem;
  width: 100%;
`;
