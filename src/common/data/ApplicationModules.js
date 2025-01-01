export const ApplicationModules = {
    CONTROL_TOWER: "CONTROL_TOWER",
    INSTANT_RATE: "INSTANT_RATE",
    SALES: "SALES",
    CARRIER_RATES: "CARRIER_RATES",
    CUSTOMERS: "CUSTOMERS",
    SETTINGS: "SETTINGS",
    DASHBOARD: "DASHBOARD",
    VENDOR_DASHBOARD: "VENDOR_DASHBOARD",
    INQUIRY: "INQUIRY",
    QUOTATION: "QUOTATION",
    AIR_FRIGHT: "AIR_FRIGHT",
    OCEAN_FRIGHT: "OCEAN_FRIGHT",
    CUSTOMER_RATES: "CUSTOMER_RATES",
    CUSTOMER_LIST: "CUSTOMER_LIST",
    CARRIER_MASTER: "CARRIER_MASTER",
    VENDOR: "VENDOR",
    SURCHARGE_MASTER: "SURCHARGE_MASTER",
    COMPANY_SETTINGS: "COMPANY_SETTINGS",
    UPLOAD_STATUS: "UPLOAD_STATUS",
    USER: "USER"
};


export function hasControlTowerPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.DASHBOARD,
        ApplicationModules.VENDOR_DASHBOARD
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasVendorDashboardPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.VENDOR_DASHBOARD,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasDashboardPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.DASHBOARD,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasInstantPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.INSTANT_RATE,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasSalesPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.QUOTATION,
        ApplicationModules.INQUIRY
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasInquiryPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.INQUIRY
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasQuotationPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.QUOTATION,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}


export function hasCarrierRatesPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.OCEAN_FRIGHT,
        ApplicationModules.AIR_FRIGHT
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasOceanFrightPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.OCEAN_FRIGHT
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasAirFrightPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.AIR_FRIGHT
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}

export function hasCustomerPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.CUSTOMER_LIST,
        ApplicationModules.CUSTOMER_RATES
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasCustomerListPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.CUSTOMER_LIST,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasCustomerRatesPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.CUSTOMER_RATES,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}

export function hasSettingPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.COMPANY_SETTINGS,
        ApplicationModules.USER,
        ApplicationModules.SURCHARGE_MASTER,
        ApplicationModules.VENDOR,
        ApplicationModules.CARRIER_MASTER,
        ApplicationModules.UPLOAD_STATUS
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}

export function hasCompanySettingPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.COMPANY_SETTINGS,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}

export function hasUsersPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.USER,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}

export function hasSurchargeMasterPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.SURCHARGE_MASTER,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}

export function hasVendorPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.VENDOR,
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasCarrierMasterPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.UPLOAD_STATUS
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}
export function hasUploadStatusPermission() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const requiredModules = new Set([
        ApplicationModules.UPLOAD_STATUS
    ]);
    return authUser?.modulePermissions?.some(obj => requiredModules.has(obj.moduleName)) || false;
}

