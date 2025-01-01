const WidgetsData = [
    {
        id: 1,
        title: "My Wallet",
        price: 865.2,
        rank: "+$20.9k",
        isDoller: true,
        postFix: "k",
        statusColor: "success",
        series: [2, 10, 18, 22, 36, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15],
    },
    {
        id: 2,
        title: "Number of Trades",
        price: 6258,
        rank: "-29 Trades",
        isDoller: false,
        statusColor: "danger",
        series: [15, 42, 47, 2, 14, 19, 65, 75, 47, 15, 42, 47, 2, 14, 12,]
    },
    {
        id: 3,
        title: "Invested Amount",
        price: 432,
        rank: "+$2.8k",
        isDoller: true,
        postFix: "M",
        statusColor: "success",
        series: [47, 15, 2, 67, 22, 20, 36, 60, 60, 30, 50, 11, 12, 3, 8,]
    },
    {
        id: 5,
        title: "Profit Ration",
        price: 1257,
        rank: "+$2.75%",
        isDoller: true,
        postFix: "%",
        statusColor: "success",
        series: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 2, 47, 42, 15,]
    },
];

const MarketOverViewAllData = [

    {
        name: "Profit",
        data: [
            12.45, 16.2, 8.9, 11.42, 12.6, 18.1, 18.2, 14.16, 11.1, 8.09, 16.34,
            12.88,
        ],
    },
    {
        name: "Loss",
        data: [
            -11.45, -15.42, -7.9, -12.42, -12.6, -18.1, -18.2, -14.16, -11.1, -7.09,
            -15.34, -11.88,
        ],
    },
]

const MarketOver1MData = [

    {
        name: "Profit",
        data: [
            14.45, 10.2, 8.9, 154.42, 6.6, 18.1, 18.2, 18.16, 11.1, 8.09, 16.34,
            12.88,
        ],
    },
    {
        name: "Loss",
        data: [
            -1.45, -15.42, -7.9, -12.42, -12.6, -8.1, -18.2, -14.16, -11.1, -7.09,
            -15.34, -17.88,
        ],
    },
];
const MarketOver6MData = [

    {
        name: "Profit",
        data: [
            12.45, 14.2, 8.9, 11.42, 12.6, 18.1, 12.2, 14.16, 11.1, 8.09, 16.34,
            8.88,
        ],
    },
    {
        name: "Loss",
        data: [
            -11.45, -15.42, -17.9, -12.42, -12.6, -8.1, -18.2, -14.16, -1.1, -7.09,
            -5.34, -11.88,
        ],
    },
];
const MarketOver1YData = [

    {
        name: "Profit",
        data: [
            2.45, 16.2, 18.9, 11.42, 12.6, 18.1, 8.2, 14.16, 11.1, 18.09, 16.34,
            12.88,
        ],
    },
    {
        name: "Loss",
        data: [
            -11.45, -5.42, -7.9, -12.42, -2.6, -18.1, -18.2, -4.16, -11.1, -7.09,
            -15.34, -1.88,
        ],
    },
];

const PieChart1YData = [15, 70, 45];

const PieChart6MData = [55, 35, 10];

const PieChart1MData = [75, 10, 65];

const PieChartAllData = [55, 35, 25];

const InvestedOverviewMay = [80];

const InvestedOverviewApril = [20];

const InvestedOverviewMarch = [40];

const InvestedOverviewFeb = [90];

const InvestedOverviewJan = [65];

const InvestedOverviewDec = [45];

// --------------- shipment dashboard data ------------------------
const salesEnquiryData = [
    {
        id: 1,
        title: 'Total Inquires',
        rate: '0',
        compare_rate: '0',
        rate_type: 'up'
    },
    {
        id: 2,
        title: 'Pending Inquires',
        rate: '0',
        compare_rate: '0',
        rate_type: 'up'
    },
    {
        id: 3,
        title: 'Inquires Actioned',
        rate: '0',
        compare_rate: '0',
        rate_type: 'up'
    },
    {
        id: 4,
        title: 'SLA breached',
        rate: '0',
        compare_rate: '0',
        rate_type: 'down'
    },
]

const quotSumData = [
    {
        id: 1,
        title: 'Quotation Sent',
        rate: '8',
        compare_rate: '50',
        rate_type: 'up'
    },
    {
        id: 2,
        title: 'Quotation Won',
        rate: '3',
        compare_rate: '33',
        rate_type: 'up'
    },
    {
        id: 3,
        title: 'Quotation Lost',
        rate: '2',
        compare_rate: '25',
        rate_type: 'down'
    },
    {
        id: 4,
        title: 'Quotation In progress',
        rate: '3',
        compare_rate: '',
        rate_type: ''
    },
]

// -------------------------- Table Data --------------------------------------------------
const impExColumnData = [
    { label: "Port",accessor: "portCode" },
    { label: "Total Inquires",accessor: "totalInquiries" },
    { label: "Conversion Ratio", accessor: "ratio" },
    { label: "Trend", accessor: "trend" },
]

const impColumnData = [
    { label: "Port",accessor: "portCode" },
    { label: "Total Inquires",accessor: "totalInquiries" },
    { label: "Conversion Ratio", accessor: "ratio" },
    { label: "Trend", accessor: "trend" },
]
const inquiryColumnData = [
    { label: "Customer",accessor: "customerName" },
    { label: "Total Inquires", accessor: "totalInquiries" },
    { label: "Conversion Ratio", accessor: "ratio" },
    { label: "Trend",accessor: "trend" },
]
const salesColumnData = [
    { label: "Employee",accessor: "customerName" },
    { label: "Total Inquires",accessor: "totalInquiries" },
    { label: "Conversion Ratio", accessor: "ratio" },
    { label: "Trend", accessor: "trend" },
]

const exportSumData = [
    {
        id: 1,
        port: 'BDDAC',
        total_equiry: '8',
        ratio: '25',
        trend: '12'
    },
    {
        id: 2,
        port: 'IDSUB',
        total_equiry: '7',
        ratio: '50',
        trend: '12'
    }
]
const importSumData = [
    {
        id: 1,
        port: 'INMAA',
        total_equiry: '10',
        ratio: '0',
        trend: '12'
    },
    {
        id: 2,
        port: 'INKTP',
        total_equiry: '5',
        ratio: '0',
        trend: '12'
    }
]
const inquirySumData = [
    {
        id: 1,
        customer: 'Apex Exports Pvt Ltd',
        total_equiry: '8',
        ratio: '30',
        trend: '42'
    },
    {
        id: 2,
        customer: 'Raj Fruits Exports',
        total_equiry: '7',
        ratio: '50',
        trend: '42'
    },
    {
        id: 3,
        customer: 'Balaji Enterprise',
        total_equiry: '10',
        ratio: '50',
        trend: '42'
    },
    {
        id: 4,
        customer: 'House of Tea Exports',
        total_equiry: '0',
        ratio: '0',
        trend: '42'
    }
]
const salesPerformData = [
    {
        id: 1,
        employee: 'Vijay',
        total_equiry: '9',
        ratio: '0.3',
        trend: '12'
    },
    {
        id: 2,
        employee: 'Sumit',
        total_equiry: '11',
        ratio: '0.25',
        trend: '12'
    },
    {
        id: 3,
        employee: 'Darshita',
        total_equiry: '8',
        ratio: '0.35',
        trend: '12'
    }
]

// ---------------------------- map charts --------------------
const chartCountryCode = {
    AE: 239.65,
    AF: 16.63,
    AG: 1.1,
    AL: 11.58,
    AM: 8.83,
    AO: 85.81,
    AR: 351.02,
    AT: 366.26,
    AU: 1219.72,
    AZ: 52.17,
    BA: 16.2,
    BB: 3.96,
    BD: 105.4,
    BE: 461.33,
    BF: 8.67,
    BG: 44.84,
    BH: 21.73,
    BI: 1.47,
    BJ: 6.49,
    BN: 11.96,
    BO: 19.18,
    BR: 2023.53,
    BS: 7.54,
    BT: 1.4,
    BW: 12.5,
    BY: 52.89,
    BZ: 1.43,
    CA: 1563.66,
    CD: 12.6,
    CF: 2.11,
    CG: 11.88,
    CH: 522.44,
    CI: 22.38,
    CL: 199.18,
    CM: 21.88,
    CN: 5745.13,
    CO: 283.11,
    CR: 35.02,
    CV: 1.57,
    CY: 22.75,
    CZ: 195.23,
    DE: 3305.9,
    DJ: 1.14,
    DK: 304.56,
    DM: 0.38,
    DO: 50.87,
    DZ: 158.97,
    EC: 61.49,
    EE: 19.22,
    EG: 216.83,
    ER: 2.25,
    ES: 1374.78,
    ET: 30.94,
    FI: 231.98,
    FJ: 3.15,
    FR: 2555.44,
    GA: 12.56,
    GB: 2258.57,
    GD: 0.65,
    GE: 11.23,
    GH: 18.06,
    GM: 1.04,
    GN: 4.34,
    GQ: 14.55,
    GR: 305.01,
    GT: 40.77,
    GW: 0.83,
    GY: 2.2,
    HK: 226.49,
    HN: 15.34,
    HR: 59.92,
    HT: 6.5,
    HU: 132.28,
    ID: 695.06,
    IE: 204.14,
    IL: 201.25,
    IN: 1430.02,
    IQ: 84.14,
    IR: 337.9,
    IS: 12.77,
    IT: 2036.69,
    JM: 13.74,
    JO: 27.13,
    JP: 5390.9,
    KE: 32.42,
    KG: 4.44,
    KH: 11.36,
    KI: 0.15,
    KM: 0.56,
    KN: 0.56,
    KR: 986.26,
    KW: 117.32,
    KZ: 129.76,
    LA: 6.34,
    LB: 39.15,
    LC: 1,
    LK: 48.24,
    LR: 0.98,
    LS: 1.8,
    LT: 35.73,
    LU: 52.43,
    LV: 23.39,
    LY: 77.91,
    MA: 91.7,
    MD: 5.36,
    ME: 3.88,
    MG: 8.33,
    MK: 9.58,
    ML: 9.08,
    MM: 35.65,
    MN: 5.81,
    MR: 3.49,
    MT: 7.8,
    MU: 9.43,
    MV: 1.43,
    MW: 5.04,
    MX: 1004.04,
    MY: 218.95,
    MZ: 10.21,
    NA: 11.45,
    NE: 5.6,
    NG: 206.66,
    NI: 6.38,
    NL: 770.31,
    NO: 413.51,
    NP: 15.11,
    NZ: 138,
    OM: 53.78,
    PA: 27.2,
    PE: 153.55,
    PG: 8.81,
    PH: 189.06,
    PK: 174.79,
    PL: 438.88,
    PT: 223.7,
    PY: 17.17,
    QA: 126.52,
    RO: 158.39,
    RS: 38.92,
    RU: 1476.91,
    RW: 5.69,
    SA: 434.44,
    SB: 0.67,
    SC: 0.92,
    SD: 65.93,
    SE: 444.59,
    SG: 217.38,
    SI: 46.44,
    SK: 86.26,
    SL: 1.9,
    SN: 12.66,
    SR: 3.3,
    ST: 0.19,
    SV: 21.8,
    SY: 59.63,
    SZ: 3.17,
    TD: 7.59,
    TG: 3.07,
    TH: 312.61,
    TJ: 5.58,
    TL: 0.62,
    TM: 0,
    TN: 43.86,
    TO: 0.3,
    TR: 729.05,
    TT: 21.2,
    TW: 426.98,
    TZ: 22.43,
    UA: 136.56,
    UG: 17.12,
    UNDEFINED: 5.73,
    US: 14624.18,
    UY: 40.71,
    UZ: 37.72,
    VC: 0.58,
    VE: 285.21,
    VN: 101.99,
    VU: 0.72,
    WS: 0.55,
    YE: 30.02,
    ZA: 354.41,
    ZM: 15.69,
    ZW: 5.57
}

// ----------------------- Vendor Dashboard -----------------------
export const lansbyWeightTableData = [
    { lane: "BOM - BLR", weight:  "104.2", rate: 10 },
    { lane: "BOM - DEL", weight:  "75.0", rate: 10 },
    { lane: "BLR - DEL", weight:  "62.5", rate: 0 },
    { lane: "BLR - CCU", weight:  "50.0", rate: 10 },
    { lane: "CCU - GAU", weight:  "45.8", rate: 10 },
    { lane: "DEL - BLR", weight:  "33.3", rate: 10 },
    { lane: "DEL - MAA", weight:  "14.6", rate: 10 },
    { lane: "DEL - CCU", weight:  "12.5", rate: 10 },
    { lane: "DEL - PNQ", weight:  "10.4", rate: 10 },
    { lane: "BOM - MAA", weight:  "8.3", rate: 10 },
]
export const lansbySpendTableData = [
    { lane: "BOM - BLR", spend:  "5000000", rate: 10 },
    { lane: "BOM - DEL", spend:  "3600000", rate: 10 },
    { lane: "BLR - DEL", spend:  "3000000", rate: 10 },
    { lane: "BLR - CCU", spend:  "2400000", rate: 10 },
    { lane: "CCU - GAU", spend:  "2200000", rate: 10 },
    { lane: "DEL - BLR", spend:  "1600000", rate: 10 },
    { lane: "DEL - MAA", spend:  "700000", rate: 10 },
    { lane: "DEL - CCU", spend:  "600000", rate: 10 },
    { lane: "DEL - PNQ", spend:  "500000", rate: 10 },
    { lane: "BOM - MAA", spend:  "400000", rate: 10 },
]


export {
    WidgetsData, MarketOver1YData, MarketOver6MData, MarketOver1MData, MarketOverViewAllData, PieChart1YData, PieChart6MData,
    PieChart1MData, PieChartAllData, InvestedOverviewMay, InvestedOverviewApril, InvestedOverviewMarch, InvestedOverviewFeb,
    InvestedOverviewJan, InvestedOverviewDec,salesEnquiryData,quotSumData,impExColumnData,impColumnData,inquiryColumnData,salesColumnData,exportSumData,inquirySumData,importSumData,
    salesPerformData,chartCountryCode
};