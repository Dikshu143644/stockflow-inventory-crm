import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
// AuthGuard disabled during development — login bypassed
// import { AuthGuard } from '@/components/auth/AuthGuard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

// Lazy-loaded pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
// --- HIDDEN (ERP): Inventory pages ---
// The page files remain in the repo (src/pages/inventory/*) so they can be
// restored later. They are not routed in pure-CRM mode; the /inventory/* routes
// below redirect to the dashboard instead. Un-comment these imports and the
// matching routes to bring inventory back.
// const Products = lazy(() => import('@/pages/inventory/Products'));
// const ProductDetail = lazy(() => import('@/pages/inventory/ProductDetail'));
// const Warehouses = lazy(() => import('@/pages/inventory/Warehouses'));
// const StockMovements = lazy(() => import('@/pages/inventory/StockMovements'));
// const Categories = lazy(() => import('@/pages/inventory/Categories'));
// const Transfers = lazy(() => import('@/pages/inventory/Transfers'));
// const Receiving = lazy(() => import('@/pages/inventory/Receiving'));
// const Adjustments = lazy(() => import('@/pages/inventory/Adjustments'));
// const LowStock = lazy(() => import('@/pages/inventory/LowStock'));
const Customers = lazy(() => import('@/pages/crm/Customers'));
const Leads = lazy(() => import('@/pages/crm/Leads'));
const Deals = lazy(() => import('@/pages/crm/Deals'));
const Activities = lazy(() => import('@/pages/crm/Activities'));
const FollowUps = lazy(() => import('@/pages/crm/FollowUps'));
const ConversionFunnel = lazy(() => import('@/pages/crm/ConversionFunnel'));
// --- HIDDEN (ERP): Procurement & Sales pages ---
// Page files remain in the repo (src/pages/procurement/*, src/pages/sales/*).
// Their routes redirect to the dashboard in pure-CRM mode.
// const Suppliers = lazy(() => import('@/pages/procurement/Suppliers'));
// const PurchaseOrders = lazy(() => import('@/pages/procurement/PurchaseOrders'));
// const SalesOrders = lazy(() => import('@/pages/sales/SalesOrders'));
// const Invoices = lazy(() => import('@/pages/sales/Invoices'));
// const Returns = lazy(() => import('@/pages/sales/Returns'));
// const Payments = lazy(() => import('@/pages/sales/Payments'));
const Analytics = lazy(() => import('@/pages/reports/Analytics'));
const ExcelExport = lazy(() => import('@/pages/reports/ExcelExport'));
const AIAssistant = lazy(() => import('@/pages/ai/AIAssistant'));
const KnowledgeBase = lazy(() => import('@/pages/ai/KnowledgeBase'));
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'));
const UsersPage = lazy(() => import('@/pages/settings/UsersPage'));
const RolesPage = lazy(() => import('@/pages/settings/RolesPage'));
const AuditLog = lazy(() => import('@/pages/settings/AuditLog'));
// --- HIDDEN (ERP): Branches page (multi-warehouse). File kept at
// src/pages/settings/Branches.tsx; route redirects to dashboard. ---
// const Branches = lazy(() => import('@/pages/settings/Branches'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Landing = lazy(() => import('@/pages/Landing'));
const Register = lazy(() => import('@/pages/auth/Register'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const StaffLogin = lazy(() => import('@/pages/auth/StaffLogin'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        {/* Public routes */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/staff-login" element={<StaffLogin />} />

        {/* All routes accessible without auth during development */}
        <Route element={<AppShell />}>
          <Route index element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
          {/* --- HIDDEN (ERP): Inventory routes redirect to the dashboard so nobody
              lands on an inventory page by typing the URL. Restore the original
              element routes to bring inventory back. --- */}
          <Route path="inventory/*" element={<Navigate to="/" replace />} />
          <Route path="crm/customers" element={<ErrorBoundary><Customers /></ErrorBoundary>} />
          <Route path="crm/leads" element={<ErrorBoundary><Leads /></ErrorBoundary>} />
          <Route path="crm/deals" element={<ErrorBoundary><Deals /></ErrorBoundary>} />
          <Route path="crm/activities" element={<ErrorBoundary><Activities /></ErrorBoundary>} />
          <Route path="crm/follow-ups" element={<ErrorBoundary><FollowUps /></ErrorBoundary>} />
          <Route path="crm/funnel" element={<ErrorBoundary><ConversionFunnel /></ErrorBoundary>} />
          {/* --- HIDDEN (ERP): Procurement & Sales routes redirect to the dashboard. --- */}
          <Route path="procurement/*" element={<Navigate to="/" replace />} />
          <Route path="sales/*" element={<Navigate to="/" replace />} />
          <Route path="reports/analytics" element={<ErrorBoundary><Analytics /></ErrorBoundary>} />
          <Route path="reports/export" element={<ErrorBoundary><ExcelExport /></ErrorBoundary>} />
          <Route path="ai" element={<ErrorBoundary><AIAssistant /></ErrorBoundary>} />
          <Route path="ai/knowledge-base" element={<ErrorBoundary><KnowledgeBase /></ErrorBoundary>} />
          <Route path="settings" element={<ErrorBoundary><SettingsPage /></ErrorBoundary>} />
          <Route path="settings/users" element={<ErrorBoundary><UsersPage /></ErrorBoundary>} />
          <Route path="settings/roles" element={<ErrorBoundary><RolesPage /></ErrorBoundary>} />
          <Route path="settings/audit-log" element={<ErrorBoundary><AuditLog /></ErrorBoundary>} />
          {/* --- HIDDEN (ERP): Branches route redirects to the dashboard. --- */}
          <Route path="settings/branches" element={<Navigate to="/" replace />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
