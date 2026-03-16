import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import LandingPage from "./pages/LandingPage";
import MyProfile from "./pages/MyProfile";
import VillageDashboard from "./pages/VillageDashboard";
import CommunityDataEngine from "./pages/CommunityDataEngine";
import AIEconomicTranslator from "./pages/AIEconomicTranslatorNew";
import AIProductGenerator from "./pages/AIProductGenerator";
import MarketSimulation from "./pages/MarketSimulation";
import RuralMarketLink from "./pages/RuralMarketLink";
import YouthAgentDashboard from "./pages/YouthAgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ThankYouPage from "./pages/ThankYouPage";

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: RootLayout,
      children: [
        {
          index: true,
          Component: LandingPage,
        },
        {
          path: "dashboard",
          Component: VillageDashboard,
        },
        {
          path: "data-engine",
          Component: CommunityDataEngine,
        },
        {
          path: "ai-translator",
          Component: AIEconomicTranslator,
        },
        {
          path: "product-generator",
          Component: AIProductGenerator,
        },
        {
          path: "market-simulation",
          Component: MarketSimulation,
        },
        {
          path: "marketplace",
          Component: RuralMarketLink,
        },
        {
          path: "youth-agent",
          Component: YouthAgentDashboard,
        },
        {
          path: "admin",
          Component: AdminDashboard,
        },
        {
          path: "my-profile",
          Component: MyProfile,
        },
        {
          path: "thank-you",
          Component: ThankYouPage,
        },
      ],
    },
  ]);
}