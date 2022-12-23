import "./App.css";
import { ActionIcon, Box, useMantineTheme } from "@mantine/core";
import { IconMicrophone, IconPlayerPlay, IconPlayerStop } from "@tabler/icons";
import { useState, MouseEvent } from "react";

const ICON_SIZE = 192,
  GAP = 16;
const STATS = {
  NONE: 0,
  RECORD: 1,
  DONE: 2,
  PLAY: 3,
};

function App() {
  const theme = useMantineTheme();
  const [stat, setStat] = useState(STATS.NONE);

  const COLORS = {
    BACK: [
      theme.colors.gray[0],
      theme.colors.red[1],
      theme.colors.green[1],
      theme.colors.blue[1],
    ],
    FRONT: [
      theme.colors.gray[7],
      theme.colors.red[8],
      theme.colors.green[8],
      theme.colors.blue[8],
    ],
  };

  function onRecord(event: MouseEvent) {
    event.stopPropagation();
    setStat(STATS.RECORD);
  }
  function onPlay(event: MouseEvent) {
    if (stat !== STATS.DONE) return;
    event.stopPropagation();
    setStat(STATS.PLAY);
  }
  function onStop(event: MouseEvent) {
    if (stat !== STATS.PLAY) return;
    event.stopPropagation();
    setStat(STATS.DONE);
  }

  return (
    <Box
      sx={{
        backgroundColor: COLORS.BACK[stat],
        height: "100%",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
      onClick={() => {
        setStat(stat === STATS.PLAY ? STATS.RECORD : stat + 1);
      }}
    >
      <ActionIcon
        style={{
          position: "absolute",
          top: `calc(50% - ${ICON_SIZE / 2}px)`,
          left: `calc(50% - ${ICON_SIZE / 2}px - ${
            stat <= STATS.RECORD ? 0 : (ICON_SIZE + GAP) / 2
          }px)`,
          transition: "top 0.2s, left 0.2s",
        }}
        variant="transparent"
        size={ICON_SIZE}
        onClick={onRecord}
      >
        <IconMicrophone
          style={{ transition: "stroke 0.2s" }}
          color={COLORS.FRONT[stat]}
          size={ICON_SIZE}
        />
      </ActionIcon>
      <ActionIcon
        style={{
          position: "absolute",
          top: `calc(50% - ${ICON_SIZE / 2}px - ${
            stat === STATS.DONE ? 0 : ICON_SIZE
          }px)`,
          left: `calc(50% + ${GAP / 2}px)`,
          opacity: stat === STATS.DONE ? 1 : 0,
          transition: "top 0.2s, left 0.2s, opacity 0.2s",
        }}
        variant="transparent"
        size={ICON_SIZE}
        onClick={onPlay}
      >
        <IconPlayerPlay
          style={{ transition: "stroke 0.2s" }}
          color={COLORS.FRONT[stat]}
          size={ICON_SIZE}
        />
      </ActionIcon>
      <ActionIcon
        style={{
          position: "absolute",
          top: `calc(50% - ${ICON_SIZE / 2}px + ${
            stat === STATS.PLAY ? 0 : ICON_SIZE
          }px)`,
          left: `calc(50% + ${GAP / 2}px)`,
          opacity: stat === STATS.PLAY ? 1 : 0,
          transition: "top 0.2s, left 0.2s, opacity 0.2s",
        }}
        variant="transparent"
        size={ICON_SIZE}
        onClick={onStop}
      >
        <IconPlayerStop
          style={{ transition: "stroke 0.2s" }}
          color={COLORS.FRONT[stat]}
          size={ICON_SIZE}
        />
      </ActionIcon>
    </Box>
  );
}

export default App;
