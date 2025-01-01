import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import AnalyticsComp from "../pages/Analytics/index";
import Dashboard from "../pages/Dashboard/index";

// Sales
import QueriesComp from "../pages/Sales/Queries/index";
import QuotationComp from "../pages/Sales/Quotations/index";

//Procurement
import ExpressComp from "../pages/Procurement/Express/index";

// Calendar
import Calendar from "../pages/Calendar/index";

//Chat
import Chat from "../pages/Chat/Chat";

//Email
import EmailInbox from "../pages/Email/email-inbox";
import EmailRead from "../pages/Email/email-read";

//Invoice
import InvoiceDetail from "../pages/Invoices/invoices-detail";
import InvoicesList from "../pages/Invoices/invoices-list";

//Contact
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/contacts-profile";
import ContactsGrid from "../pages/Contacts/contacts-grid";

//blog
import BlogDetails from "../pages/Blog/blogDetails";
import BlogGrid from "../pages/Blog/blogGrid";
import BlogList from "../pages/Blog/blogList";

//Utility
import Error404 from "../pages/Utility/Error404";
import Error500 from "../pages/Utility/Error500";
import PagesComingsoon from "../pages/Utility/PageComingsoon";
import PageFaqs from "../pages/Utility/PageFaqs";
import PageMaintenance from "../pages/Utility/PageMaintenance";
import PagePricing from "../pages/Utility/PagePricing/index";
import PageTimeline from "../pages/Utility/PageTimeline";
import PagesStarter from "../pages/Utility/StarterPage";

// Ui Components
import UiAlert from "../pages/UiElements/UiAlert";
import UiButton from "../pages/UiElements/UiButton";
import UiCard from "../pages/UiElements/UiCard";
import UiCarousel from "../pages/UiElements/UiCarousel";
import UiColors from "../pages/UiElements/UiColors";
import UiDropdowns from "../pages/UiElements/UiDropdowns";
import UiGeneral from "../pages/UiElements/UiGeneral";
import UiGrid from "../pages/UiElements/UiGrid";
import UiImages from "../pages/UiElements/UiImages";
import UiModal from "../pages/UiElements/UiModals";
import UiOffCanvas from "../pages/UiElements/UiOffCanvas";
import UiPlaceholders from "../pages/UiElements/UiPlaceholders";
import UiProgressbar from "../pages/UiElements/UiProgressbar";
import UiTabsAccordions from "../pages/UiElements/UiTabsAccordions";
import UiToasts from "../pages/UiElements/UiToast";
import UiTypography from "../pages/UiElements/UiTypography";
import UiUtilities from "../pages/UiElements/UiUtilities";
import UiVideo from "../pages/UiElements/UiVideo";

//Extended pages
import Lightbox from "../pages/Extended/Lightbox";
import Notifications from "../pages/Extended/Notifications";
import Rangeslider from "../pages/Extended/Rangeslider";
import SessionTimeout from "../pages/Extended/SessionTimeout";
import UiRating from "../pages/Extended/UiRating";

//Forms
import AdvancedPlugins from "../pages/Forms/AdvancedPlugins";
import FormEditors from "../pages/Forms/FormEditors";
import FormElements from "../pages/Forms/FormElements/index";
import FormMask from "../pages/Forms/FormMask";
import FormUpload from "../pages/Forms/FormUpload";
import FormValidation from "../pages/Forms/FormValidation/";
import FormWizard from "../pages/Forms/FormWizard";

//Tables
import BasicTable from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import EditableTables from "../pages/Tables/EditableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";

//Charts
import Apexchart from "../pages/Charts/Apexcharts";
import ChartjsChart from "../pages/Charts/ChartjsChart";
import EChart from "../pages/Charts/EChart";
import KnobCharts from "../pages/Charts/KnobCharts";
import SparklineChart from "../pages/Charts/SparklineChart";

//Icons
import IconFontawesomes from "../pages/Icons/Fontawesomes";
import IconBoxicons from "../pages/Icons/IconBoxicons";
import IconDripicons from "../pages/Icons/IconDripicons";
import IconMaterialdesign from "../pages/Icons/IconMaterialdesign";

// Maps
import MapsGoogle from "../pages/Maps/MapsGoogle";
import MapsLeaflet from "../pages/Maps/MapsLeaflet";
import MapsVector from "../pages/Maps/MapsVector";

// Authentication related pages
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";

//AuthenticationInner related pages
import UserProfile from "../pages/Authentication/user-profile";
import ConfirmMail from "../pages/AuthenticationInner/ConfirmMail";
import EmailVerification from "../pages/AuthenticationInner/EmailVerification";
import LockScreen from "../pages/AuthenticationInner/LockScreen";
import AuthLogout from "../pages/AuthenticationInner/Logout";
import PageLogin from "../pages/AuthenticationInner/PageLogin";
import PageRegister from "../pages/AuthenticationInner/PageRegister";
import RecoverPassword from "../pages/AuthenticationInner/RecoverPassword";
import TwoStepVerfication from "../pages/AuthenticationInner/TwoStepVerfication";

import InstantRate from "../pages/InstantRate/InstantRate";
import CustomerRates from "../pages/Parties/CustomerRates/CustomerRates";
import Customers from "../pages/Parties/Customers";
import UploadCustomerData from "../pages/Parties/UploadCustomerData";
import UploadVendorData from "../pages/Parties/UploadVendorData";
import Vendors from "../pages/Parties/Vendors";
import AirConsoleComp from "../pages/Procurement/FreightForwarding/Air/AirConsoleComp";
import AirMasterBill from "../pages/Procurement/FreightForwarding/Air/AirMasterBill";
import AirPortLocal from "../pages/Procurement/FreightForwarding/Air/AirPortLocal/AirPortLocal";
import UploadAirPortLocalChargesData from "../pages/Procurement/FreightForwarding/Air/AirPortLocal/partials/UploadAirPortLocalChargesData";
import CompareRate from "../pages/Procurement/FreightForwarding/Air/CompareRate";
import UploadAirConsoleData from "../pages/Procurement/FreightForwarding/Air/UploadAirConsoleData";
import UploadAirwayBillData from "../pages/Procurement/FreightForwarding/Air/UploadAirwayBillData";
import FclOceanFreight from "../pages/Procurement/FreightForwarding/FCL/FclOceanFreight";
import OceanFCLSurchargeNameAddNew from "../pages/Procurement/FreightForwarding/FCL/OceanFCLSurchargeNameAddNew";
import FclInlandCharge from "../pages/Procurement/FreightForwarding/FCLInland/FclInlandCharge";
import FclInlandUpload from "../pages/Procurement/FreightForwarding/FCLInland/FclInlandUpload";
import LclOceanFreight from "../pages/Procurement/FreightForwarding/LCL/LclOceanFreight";
import PortLocalFreight from "../pages/Procurement/FreightForwarding/PortLocal/PortLocalFreight";
import UploadPortLocalChargesData from "../pages/Procurement/FreightForwarding/PortLocal/UploadPortLocalChargesData";
import UploadFreightData from "../pages/Procurement/FreightForwarding/partials/UploadFreightData";
import AddTanentLocation from "../pages/Settings/AddTanentLocation";
import AddUserData from "../pages/Settings/AddUserData";
import EditUserData from "../pages/Settings/EditUserData";
import AddRole from "../pages/Settings/Roles/AddRole";
import Roles from "../pages/Settings/Roles/Roles";
import Settings from "../pages/Settings/Settings";
import FclSurcharge from "../pages/Settings/Surcharge/FclSurcharge";
import UploadFile from "../pages/Settings/Surcharge/UploadFile";
import UploadRateData from "../pages/Settings/Surcharge/UploadRateData";
import UploadUser from "../pages/Settings/UploadUser";
import Users from "../pages/Settings/Users";
import VendorDashboard from "../pages/VendorDashboard";
import UploadStatus from "../pages/uploadstatus/uploadstatus";
import AirLineCharges from "../pages/Procurement/FreightForwarding/Air/AirLineCharges/AirLineCharges";
import UploadAirLineCharges from "../pages/Procurement/FreightForwarding/Air/AirLineCharges/UploadAirLineCharges";
import AirMawbDetails from "../pages/Procurement/FreightForwarding/Air/AirMawbViewTable";
import AirConsoleDetails from "../pages/Procurement/FreightForwarding/Air/AirConsoleViewTable";
import FclOceanFreightUpload from "../pages/Procurement/FreightForwarding/FCLFright/FclOceanFreight";
import UploadFreightFrom from "../pages/Procurement/FreightForwarding/FCLFright/FrightUpload";
import FclOceanDetails from "../pages/Procurement/FreightForwarding/FCLFright/FclOceanDetails";
import FclOceanSurchargeDetails from "../pages/Procurement/FreightForwarding/FCLFright/FclOceanSurchargeDetails";
import CarrierMaster from "../pages/Parties/CarrierMaster";
import UpdatePortLocalChargesData from "../pages/Procurement/FreightForwarding/PortLocal/UpdatePortLocalChargesData";

const userRoutes = [
  //dashboard
  { path: "/upload-status", component: <UploadStatus/> },
  { path: "/dashboard", component: <Dashboard/> },
  { path: "/dashboard-vendor", component: <VendorDashboard/> },
  { path: "/analytics", component: <AnalyticsComp/> },

  // Sales
  { path: "/sales/inquiry", component: <QueriesComp /> },
  { path: "/sales/quotation", component: <QuotationComp /> },
  
  // Instant Rate
  { path: "/instant-rate/search-rate", component: <InstantRate /> },

  // Procurement
  // Freight Forwarding
  { path: "/freight/inland", component: <FclInlandCharge /> },
  { path: "/freight/ocean/fcl", component: <FclOceanFreight /> },
  { path: "/freight/ocean/fcl/upload", component: <FclOceanFreightUpload /> },
  { path: "/freight/ocean/fcl/Details", component: <FclOceanDetails /> },
  { path: "/freight/ocean/fcl/surcharge/Details", component: <FclOceanSurchargeDetails /> },
  { path: "/freight/ocean/fcl/upload/form", component: <UploadFreightFrom /> },
  { path: "/freight/ocean/lcl", component: <LclOceanFreight /> },
  { path: "/freight/ocean/portlocal", component: <PortLocalFreight /> },
  { path: "/freight/air/masterbill", component: <AirMasterBill /> },
  { path: "/freight/air/masterbill/details", component: <AirMawbDetails /> },
  { path: "/freight/air/masterConsole/details", component: <AirConsoleDetails /> },
  { path: "/freight/air/console", component: <AirConsoleComp /> },
  { path: "/freight/air/local", component: <AirPortLocal /> },
  {path : "/freight/air/line", component: <AirLineCharges /> },
  { path: "/freight/air/compare-rate", component: <CompareRate /> },
  { path: "/freight/air/upload/air-waybill", component: <UploadAirwayBillData /> },
  { path: "/freight/air/upload/console", component: <UploadAirConsoleData /> },
  { path: "/freight/upload/inland", component: <FclInlandUpload /> },
  { path: "/freight/upload/:tabName", component: <UploadFreightData /> },
  { path: "/fcl/port-local/upload", component: <UploadPortLocalChargesData /> },
  { path: "/fcl/port-local/update", component: <UpdatePortLocalChargesData /> },

  { path: "/air/port-local/upload", component: <UploadAirPortLocalChargesData /> },
  { path: "/air/line-charges/upload", component: <UploadAirLineCharges /> },
  { path: "/freight/upload/fcl/add-new", component: <OceanFCLSurchargeNameAddNew /> },
  { path: "/freight/upload/inland/add-new", component: <OceanFCLSurchargeNameAddNew /> },
  { path: "/freight/ocean/upload/fcl-pl/add-new", component: <OceanFCLSurchargeNameAddNew /> },
  
  // Settings
  { path: "/settings/company-settings", component: <Settings /> },
  { path: "/settings/users", component: <Users /> },
  { path: "/settings/roles", component: <Roles /> },
  { path: "/settings/addRole", component: <AddRole /> },
  { path: "/settings/surcharge", component: <FclSurcharge /> },
  { path: "/settings/users/uploadFile", component: <UploadUser /> },
  { path: "/settings/users/addUser", component: <AddUserData /> }, 
  { path: "/settings/users/editUser", component: <EditUserData /> }, 
  { path: "/settings/surcharge/add", component: <UploadRateData /> },
  { path: "/settings/upload/uploadFile", component: <UploadFile /> },
  { path: "/Settings/AddTanentLocation", component: <AddTanentLocation /> },
  // Parties
  { path: "/customers", component: <Customers /> },
  { path: "/carrierMaster", component: <CarrierMaster /> },  
  { path: "/customerRates", component: <CustomerRates /> },
  { path: "/customers/add-customer", component: <UploadCustomerData /> }, 
  { path: "/vendors", component: <Vendors /> }, 
  { path: "/vendor/add-vendor", component: <UploadVendorData /> }, 

  // Express
  { path: "/express", component: <ExpressComp /> },

  //profile
  { path: "/profile", component: <UserProfile/> },

  //Calendar
  { path: "/apps-calendar", component: <Calendar/> },

  //Chat
  { path: "/apps-chat", component: <Chat/> },

  //Email
  { path: "/email-inbox", component: <EmailInbox/> },
  { path: "/email-read", component: <EmailRead/> },

  //Invoice
  { path: "/invoices-list", component: <InvoicesList/> },
  { path: "/invoices-detail", component: <InvoiceDetail/> },

  //Contact
  { path: "/contacts-grid", component: <ContactsGrid/> },
  { path: "/contacts-list", component: <ContactsList/> },
  { path: "/contacts-profile", component: <ContactsProfile/> },

  //blog
  {path: "/blog-grid", component: <BlogGrid/> },
  {path: "/blog-list", component: <BlogList/> },
  {path: "/blog-details", component: <BlogDetails/> },

  //Utility
  { path: "/pages-starter", component: <PagesStarter/> },
  { path: "/pages-timeline", component: <PageTimeline/> },
  { path: "/pages-faqs", component: <PageFaqs/> },
  { path: "/pages-pricing", component: <PagePricing/> },

  //Components
  { path: "/ui-alerts", component: <UiAlert/> },
  { path: "/ui-buttons", component: <UiButton/> },
  { path: "/ui-cards", component: <UiCard/> },
  { path: "/ui-carousel", component: <UiCarousel/> },
  { path: "/ui-dropdowns", component: <UiDropdowns/> },
  { path: "/ui-grid", component: <UiGrid/> },
  { path: "/ui-images", component: <UiImages/> },
  { path: "/ui-modals", component: <UiModal/> },
  { path: "/ui-offcanvas", component: <UiOffCanvas/> },
  { path: "/ui-progressbars", component: <UiProgressbar/> },
  { path: "/ui-placeholders", component: <UiPlaceholders/> },
  { path: "/ui-tabs-accordions", component: <UiTabsAccordions/> },
  { path: "/ui-typography", component: <UiTypography/> },
  { path: "/ui-toasts", component: <UiToasts/> },
  { path: "/ui-video", component: <UiVideo/> },
  { path: "/ui-general", component: <UiGeneral/> },
  { path: "/ui-colors", component: <UiColors/> },
  { path: "/ui-utilities", component: <UiUtilities/> },

  //Extended pages
  { path: "/extended-lightbox", component: <Lightbox/> },
  { path: "/extended-rangeslider", component: <Rangeslider/> },
  { path: "/extended-session-timeout", component: <SessionTimeout/> },
  { path: "/extended-rating", component: <UiRating/> },
  { path: "/extended-notifications", component: <Notifications/> },

  //Forms
  { path: "/form-elements", component: <FormElements/> },
  { path: "/form-validation", component: <FormValidation/> },
  { path: "/form-advanced", component: <AdvancedPlugins/> },
  { path: "/form-editors", component: <FormEditors/> },
  { path: "/form-uploads", component: <FormUpload/> },
  { path: "/form-wizard", component: <FormWizard/> },
  { path: "/form-mask", component: <FormMask/> },

  //tables
  { path: "/tables-basic", component: <BasicTable/> },
  { path: "/tables-datatable", component: <DatatableTables/> },
  { path: "/tables-responsive", component: <ResponsiveTables/> },
  { path: "/tables-editable", component: <EditableTables/> },

  //Charts
  { path: "/charts-apex", component: <Apexchart/> },
  { path: "/charts-echart", component: <EChart/> },
  { path: "/charts-chartjs", component: <ChartjsChart/> },
  { path: "/charts-knob", component: <KnobCharts/> },
  { path: "/charts-sparkline", component: <SparklineChart/> },

  //Icons
  { path: "/icons-boxicons", component: <IconBoxicons/> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign/> },
  { path: "/icons-dripicons", component: <IconDripicons/> },
  { path: "/icons-fontawesome", component: <IconFontawesomes/> },

  // Maps
  { path: "/maps-google", component: <MapsGoogle/> },
  { path: "/maps-vector", component: <MapsVector/> },
  { path: "/maps-leaflet", component: <MapsLeaflet/> },
  
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const authRoutes = [
  //authencation page
  { path: "/logout", component: <Logout/> },
  { path: "/login", component: <Login/> },
  { path: "/forgot-password", component: <ForgetPwd/> },
  { path: "/register", component: <Register/> },

  //AuthenticationInner pages
  { path: "/page-login", component: <PageLogin/> },
  { path: "/page-register", component: <PageRegister/> },
  { path: "/page-recoverpw", component: <RecoverPassword/> },
  { path: "/page-lock-screen", component: <LockScreen/> },
  { path: "/page-confirm-mail", component: <ConfirmMail/> },
  { path: "/page-email-verification", component: <EmailVerification/> },
  { path: "/page-two-step-verification", component: <TwoStepVerfication/> },
  { path: "/page-logout", component: <AuthLogout/>  },

  //Utility page
  { path: "/pages-maintenance", component: <PageMaintenance/> },
  { path: "/pages-comingsoon", component: <PagesComingsoon/> },
  { path: "/pages-404", component: <Error404/> },
  { path: "/pages-500", component: <Error500/> },
];

export { authRoutes, userRoutes };

