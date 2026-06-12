import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import AdminLogin from "../pages/auth/adminLogin";
import ProtectedRoute from "../common/protectedRoute";
import Dashboard from "../pages/dashboard/dashboard";
// import GenerateReceipt from "../pages/receipt/generateReceipt";
// import ViewReceipts from "../pages/receipt/viewReceipt";
import Services from "../pages/services/services";
import CategoryList from "../pages/admin/categories/CategoryList";
import ServiceManagement from "../pages/admin/services/ServiceManagement";
import PricingManagement from "../pages/admin/pricing/pricingManagement";
import TermsManagement from "../pages/admin/terms/TermsManagement";
import ProposalTemplateManagement from "../pages/admin/proposalTemplate/ProposalTemplateManagement";
import SettingsManagement from "../pages/admin/settingsManagement/SettingsManagement";
import CreateProposal from "../pages/admin/proposal/CreateProposal";
import SavedProposals from "../pages/admin/proposal/SavedProposals";
import ViewProposal from "../pages/admin/proposal/ViewProposal";
import EditProposal from "../pages/admin/proposal/EditProposal";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <ServiceManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/pricing"
          element={
            <ProtectedRoute>
              <PricingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/terms"
          element={
            <ProtectedRoute>
              <TermsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/proposal-templates"
          element={
            <ProtectedRoute>
              <ProposalTemplateManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <SettingsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-proposal"
          element={
            <ProtectedRoute>
              <CreateProposal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/saved-proposals"
          element={
            <ProtectedRoute>
              <SavedProposals />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/proposal/view/:id"
          element={
            <ProtectedRoute>
              <ViewProposal />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/proposal/edit/:id"
          element={
            <ProtectedRoute>
              <EditProposal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
