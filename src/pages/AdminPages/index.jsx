import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AdminRoutes } from "../../routes";
import NotFound from "../NotFound";
import AdminSignIn from "../AdminSignin";
import PrivateRoute from "../../components/PrivateRoute";
import EditPackageDetails from "../Packages/components/EditPackageDetails";
import CreatePackages from "../Packages/components/CreatePackages";
import Packages from "../Packages";
import PlayerDetails from "../PlayerDetails";
import Players from "../Players";
import Dashboard from "../Dashboard";
import CMSListing from "../CMS";
import CMSDetail from "../CMS/components/CmsDetail";
import EditCms from "../CMS/components/EditCms";
import CreateCms from "../CMS/components/CreateCms";
import ImageGallery from "../ImageGallery";
import Staff from "../Staff";
import Countries from "../Countries";
import CreateStaffAdmin from "../Staff/components/CreateStaffAdmin";
import EditStaffAdmin from "../Staff/components/EditStaffAdmin";
import AdminDetails from "../AdminDetails";
import EmailTemplate from "../EmailTemplate";
import EditEmailTemplate from "../EmailTemplate/editEmailTemplate";
import ProfilePage from "../ProfilePage";
import CasinoProviders from "../CasinoProviders";
import BannerManagement from "../BannerManagement";
import CasinoCategory from "../CasinoCategory";
import ReorderCategory from "../CasinoCategory/components/ReorderCategory";
import CasinoSubCategory from "../CasinoSubCategory";
import CasinoGames from "../CasinoGames";
import ReorderSubCategory from "../CasinoSubCategory/components/ReorderSubCategory";
import AddSubCategoryGames from "../AddSubCategoryGames";
import RestrictProviderCountries from "../RestrictProviderCountries";
import GameReorder from "../GameReorder";
import RestrictedProviders from "../RestrictedProviders";
import RestrictedGames from "../RestrictedGames";
import CreateEmailTemplate from "../EmailTemplate/createEmailTemplate";
import EditManualTemplate from "../EmailTemplate/EditManualTemplate";
import BonusListing from "../Bonus";
import CreateBonus from "../Bonus/components/CreateBonus";
import EditBonus from "../Bonus/components/EditBonus";
import BonusDetail from "../Bonus/components/BonusDetail";
import CasinoTransaction from "../CasinoTransaction";
import BankingTransaction from "../BankingTransaction";
import WithdrawRequests from "../WithdrawRequest";
import ReorderPackages from "../Packages/components/ReorderPackages";
import ContentPagesListing from "../ContentPages";
import ContentPageDetails from "../ContentPages/components/PageDetails/ContentPageDetails";
import RewardSystem from "../RewardSystem";
import CreateRewardSystem from "../RewardSystem/components/CreateRewardSystem";
import EditRewardSystem from "../RewardSystem/components/EditRewardSystem";
import PopupManagement from "../PopupManagement";
import SpinWheel from "../SpinWheel";
import PaymentProviders from "../PaymentProviders";
import CasinoAggregator from "../CasinoManagement/Aggregators";

import KYCSettings from "../KYCSettings";
import CashierManagement from "../CashierManagement";
import GeoBlocking from "../GeoBlocking";
import Stocks from "./Stocks";
import Products from "../Products";

const AdminPages = () => (
  <Routes>
    {/* Public Routes without sidebar */}
    <Route path={AdminRoutes.AdminSignin} element={<AdminSignIn />} />
    <Route path={AdminRoutes.DefaultRoute} element={<AdminSignIn />} />

    <Route path={AdminRoutes.AdminRoute} element={<AdminSignIn />} />

    <Route
      path={AdminRoutes.Dashboard}
      element={
        <PrivateRoute module={{ Report: "DR" }}>
          <Dashboard />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.Profile}
      element={
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.Players}
      element={
        <PrivateRoute module={{ Users: "R" }}>
          <Players />
        </PrivateRoute>
      }
    />

    {/* <Route
      path={AdminRoutes.KYCSettings}
      element={
        <PrivateRoute module={{ Users: "R" }}>
          <KYCSettings />
        </PrivateRoute>
      }
    /> */}

    <Route
      path={AdminRoutes.PlayerDetails}
      element={
        <PrivateRoute module={{ Users: "R" }}>
          <PlayerDetails />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.PaymentProviders}
      element={
        <PrivateRoute module={{ Transactions: "R" }}>
          <PaymentProviders />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.Packages}
      element={
        <PrivateRoute module={{ Package: "R" }}>
          <Packages />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CreatePackage}
      element={
        <PrivateRoute module={{ Package: "C" }}>
          <CreatePackages />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.ReorderPackage}
      element={
        <PrivateRoute module={{ Package: "U" }}>
          <ReorderPackages />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.EditPackageDetails}
      element={
        <PrivateRoute module={{ Package: "U" }}>
          <EditPackageDetails />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CasinoProviders}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <CasinoProviders />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.Aggregators}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <CasinoAggregator />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.RestrictedProviderCountries}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <RestrictProviderCountries />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CasinoCategories}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <CasinoCategory />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CasinoGames}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <CasinoGames />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.ReorderCasinoCategories}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <ReorderCategory />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CasinoSubCategories}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <CasinoSubCategory />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.ReorderCasinoSubCategories}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <ReorderSubCategory />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.AddSubCategoryGames}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <AddSubCategoryGames />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.ReorderGames}
      element={
        <PrivateRoute module={{ CasinoManagement: "R" }}>
          <GameReorder />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.BannerManagement}
      element={
        <PrivateRoute module={{ Banner: "R" }}>
          <BannerManagement />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.PopupManagement}
      element={
        <PrivateRoute module={{ Banner: "R" }}>
          <PopupManagement />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CmsListing}
      element={
        <PrivateRoute module={{ CMS: "R" }}>
          <CMSListing />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.ContentPagesListing}
      element={
        <PrivateRoute>
          <ContentPagesListing />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.ContentPageDetails}
      element={
        <PrivateRoute>
          <ContentPageDetails />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CmsDetails}
      element={
        <PrivateRoute module={{ CMS: "R" }}>
          <CMSDetail />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CmsEdit}
      element={
        <PrivateRoute module={{ CMS: "U" }}>
          <EditCms />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CmsCreate}
      element={
        <PrivateRoute module={{ CMS: "C" }}>
          <CreateCms />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.BonusListing}
      element={
        <PrivateRoute module={{ Bonus: "R" }}>
          <BonusListing />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.RewardSystem}
      element={
        <PrivateRoute module={{ Package: "U" }}>
          <RewardSystem />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.BonusCreate}
      element={
        <PrivateRoute module={{ Bonus: "C" }}>
          <CreateBonus />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.BonusEdit}
      element={
        <PrivateRoute module={{ Bonus: "U" }}>
          <EditBonus />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.BonusDetails}
      element={
        <PrivateRoute module={{ Bonus: "R" }}>
          <BonusDetail />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.ImageGallery}
      element={
        <PrivateRoute>
          <ImageGallery module={{ ImageGallery: "R" }} />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.Staff}
      element={
        <PrivateRoute module={{ Admins: "R" }}>
          <Staff />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.Countries}
      element={
        <PrivateRoute module={{ Admins: "R" }}>
          <Countries />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.SpinWheel}
      element={
        <PrivateRoute module={{ Users: "R" }}>
          <SpinWheel />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CountriesRestrictedProviders}
      element={
        <PrivateRoute module={{ Admins: "R" }}>
          <RestrictedProviders />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CountriesRestrictedGames}
      element={
        <PrivateRoute module={{ Admins: "R" }}>
          <RestrictedGames />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CreateAdmin}
      element={
        <PrivateRoute module={{ Admins: "C" }}>
          <CreateStaffAdmin />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.EditAdmin}
      element={
        <PrivateRoute module={{ Admins: "U" }}>
          <EditStaffAdmin />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.AdminDetails}
      element={
        <PrivateRoute module={{ Admins: "R" }}>
          <AdminDetails />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.EmailTemplates}
      element={
        <PrivateRoute module={{ EmailTemplate: "R" }}>
          <EmailTemplate />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CreateEmailTemplate}
      element={
        <PrivateRoute module={{ EmailTemplate: "C" }}>
          <CreateEmailTemplate />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.EditManualTemplate}
      element={
        <PrivateRoute module={{ EmailTemplate: "U" }}>
          <EditManualTemplate />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.EditEmailTemplates}
      element={
        <PrivateRoute module={{ EmailTemplate: "U" }}>
          <EditEmailTemplate />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.CasinoTransactions}
      element={
        <PrivateRoute module={{ Transactions: "R" }}>
          <CasinoTransaction />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.BankingTransactions}
      element={
        <PrivateRoute module={{ Transactions: "R" }}>
          <BankingTransaction />
        </PrivateRoute>
      }
    />

    <Route
      path={AdminRoutes.WithdrawRequest}
      element={
        <PrivateRoute module={{ Transactions: "R" }}>
          <WithdrawRequests />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CreateRewardSystem}
      element={
        <PrivateRoute module={{ Package: "C" }}>
          <CreateRewardSystem />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.EditRewardSystem}
      element={
        <PrivateRoute module={{ Package: "U" }}>
          <EditRewardSystem />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.CashierManagement}
      element={
        <PrivateRoute module={{ CashierManagement: "R" }}>
          <CashierManagement />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.Stocks}
      element={
        <PrivateRoute module={{ Stocks: "R" }}>
          <Stocks />
        </PrivateRoute>
      }
    />
    <Route
      path={AdminRoutes.Products}
      element={
        <PrivateRoute module={{ Products: "R" }}>
          <Products />
        </PrivateRoute>
      }
    />
    <Route path={AdminRoutes.NotFound} element={<NotFound />} />
    <Route path="*" element={<Navigate replace to={AdminRoutes.NotFound} />} />
  </Routes>
);
export default AdminPages;
