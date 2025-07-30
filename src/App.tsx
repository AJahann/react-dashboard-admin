import { Route, BrowserRouter as Router, Routes } from "react-router";

import { ScrollToTop } from "./components/common/ScrollToTop";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import BarChart from "./pages/Charts/BarChart";
import LineChart from "./pages/Charts/LineChart";
import Home from "./pages/Dashboard/Home";
import FormElements from "./pages/Forms/FormElements";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";
import { UsersPage } from "./pages/Users";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} path="/" />
            <Route index element={<UsersPage />} path="/users" />

            {/* Others Page */}
            <Route element={<UserProfiles />} path="/profile" />
            <Route element={<Calendar />} path="/calendar" />
            <Route element={<Blank />} path="/blank" />

            {/* Forms */}
            <Route element={<FormElements />} path="/form-elements" />

            {/* Tables */}
            <Route element={<BasicTables />} path="/basic-tables" />

            {/* Ui Elements */}
            <Route element={<Alerts />} path="/alerts" />
            <Route element={<Avatars />} path="/avatars" />
            <Route element={<Badges />} path="/badge" />
            <Route element={<Buttons />} path="/buttons" />
            <Route element={<Images />} path="/images" />
            <Route element={<Videos />} path="/videos" />

            {/* Charts */}
            <Route element={<LineChart />} path="/line-chart" />
            <Route element={<BarChart />} path="/bar-chart" />
          </Route>
        </Route>

        {/* Auth Layout */}
        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignUp />} path="/signup" />

        {/* Fallback Route */}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
}
