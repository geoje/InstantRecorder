import "./App.css";
import { Stack } from "@mantine/core";
import { ActionIcon } from "@mantine/core/lib/ActionIcon";
import { IconMicrophone } from "@tabler/icons";

function App() {
  return (
    <Stack>
      <ActionIcon>
        <IconMicrophone />
      </ActionIcon>
    </Stack>
  );
}

export default App;
