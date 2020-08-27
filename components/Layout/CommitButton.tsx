import React, { FC } from "react";
import { Button } from "@xcorejs/ui";

const CommitButton: FC = () => {
  return (
    <Button onClick={commitChanges}>Commit&nbsp;&amp;&nbsp;Save</Button>
  );
};

export default CommitButton;

const commitChanges = () => {
  const files = Object.fromEntries(Object.entries(window.localStorage)
    .filter(e => e[0].startsWith("file://"))
    .map(e => [e[0].replace("file://", ""), JSON.parse(e[1])]));

  fetch("/api/test/commit", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      from: "",
      msg: prompt("msg"),
      files
    })
  }).then(() => alert("success"));
};
