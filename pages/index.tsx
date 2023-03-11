import { ActionIcon, Box, useMantineTheme } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconMicrophone,
  IconPlayerPlay,
  IconPlayerStop,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const GAP = 16;
const ICON_SIZE = 192;
const STATS = {
  NONE: 0,
  RECORD: 1,
  DONE: 2,
  PLAY: 3,
};
let mediaRecorder: MediaRecorder | undefined;
let audioElement: HTMLAudioElement;

export default function Home() {
  const theme = useMantineTheme();
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
  const [stat, setStat] = useState(STATS.NONE);

  let audios: Blob[] = [];

  useEffect(() => {
    audioElement = document.createElement("audio");
  }, []);

  async function StartRecord() {
    // Request permission
    if (mediaRecorder) {
      setStat(STATS.RECORD);
      if (mediaRecorder) mediaRecorder.start();
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setStat(STATS.RECORD);

          // Init microphone
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (event) => audios.push(event.data);
          mediaRecorder.onstop = () =>
            (audioElement.src = window.URL.createObjectURL(
              audios[audios.length - 1]
            ));
          audioElement.addEventListener("ended", () => setStat(STATS.DONE));

          // Start recording
          if (mediaRecorder) mediaRecorder.start();
        })
        .catch((reason) => {
          setStat(STATS.NONE);
          showNotification({
            title: reason.message,
            message: "Please give microphone permission on the browser!",
            color: "red",
          });
        });
    }
  }
  async function StopRecord() {
    setStat(STATS.DONE);
    if (mediaRecorder) mediaRecorder.stop();
  }
  async function PlayAudio() {
    setStat(STATS.PLAY);
    audioElement.play();
  }
  async function StopAudio() {
    setStat(STATS.DONE);
    audioElement.pause();
    audioElement.currentTime = 0;
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
        switch (stat) {
          case STATS.NONE:
            StartRecord();
            break;
          case STATS.RECORD:
            StopRecord();
            break;
          case STATS.DONE:
            PlayAudio();
            break;
          case STATS.PLAY:
            StopAudio();
            StartRecord();
            break;
        }
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
        onClick={(event) => {
          event.stopPropagation();
          StartRecord();
        }}
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
        onClick={(event) => {
          if (stat !== STATS.DONE) return;
          event.stopPropagation();
          PlayAudio();
        }}
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
        onClick={(event) => {
          if (stat !== STATS.PLAY) return;
          event.stopPropagation();
          StopAudio();
        }}
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
