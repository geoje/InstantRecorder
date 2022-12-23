import "./App.css";
import { Group } from "@mantine/core";
import { IconMicrophone } from "@tabler/icons";
import { useState } from "react";

const ICON_SIZE = 192;
const STATS = {
  NONE: 0,
  RECORD: 1,
  DONE: 2,
  PLAY: 3,
};

function App() {
  const [stat, setStat] = useState(STATS.NONE);

  return (
    <Group
      sx={(theme) => ({
        backgroundColor:
          stat === STATS.NONE
            ? theme.colors.gray[0]
            : stat === STATS.RECORD
            ? theme.colors.red[1]
            : stat === STATS.DONE
            ? theme.colors.green[1]
            : theme.colors.blue[1],
        height: "100%",
        cursor: "pointer",
        transition: "backgroundColor 0.2s",
      })}
      position="center"
      align="center"
      onClick={() => {
        setStat(stat === STATS.PLAY ? STATS.NONE : stat + 1);
      }}
    >
      <IconMicrophone size={ICON_SIZE}></IconMicrophone>
    </Group>
  );
}

export default App;
