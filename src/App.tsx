import { Route, BrowserRouter as Router, Routes } from "react-router";

import { ScrollToTop } from "./components/common/ScrollToTop";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Home from "./pages/Dashboard/Home";
import { GoldActions, GoldHistory } from "./pages/GoldActions";
import NotFound from "./pages/OtherPage/NotFound";
import { ProductsPage } from "./pages/Products";
import { TransactionsPage } from "./pages/Transactioons";
import UserProfiles from "./pages/UserProfiles";
import { UsersPage } from "./pages/Users";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} path="/" />
            <Route index element={<UsersPage />} path="/users" />
            <Route index element={<TransactionsPage />} path="/transactions" />
            <Route index element={<GoldActions />} path="/gold-actions" />
            <Route index element={<GoldHistory />} path="/gold-history" />
            <Route index element={<ProductsPage />} path="/products" />
            <Route element={<UserProfiles />} path="/profile" />

            <Route element={<Blank />} path="/blank" />
          </Route>
        </Route>

        <Route element={<SignIn />} path="/signin" />
        <Route element={<SignUp />} path="/signup" />

        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  );
}
