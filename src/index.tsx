import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MantineProvider withNormalizeCSS withGlobalStyles>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </MantineProvider>
);

reportWebVitals();
