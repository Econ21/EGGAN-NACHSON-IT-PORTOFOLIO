import { RouterProvider } from "react-router";
import { createRouter } from "./routes";
import { LanguageProvider } from "./contexts/LanguageContext";
import { UserProfileProvider } from "./contexts/UserProfileContext";

const router = createRouter();

export default function App() {
  return (
    <LanguageProvider>
      <UserProfileProvider>
        <RouterProvider router={router} />
      </UserProfileProvider>
    </LanguageProvider>
  );
}