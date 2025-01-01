const revenuesum = [
    { id: "first1", content: "First task",title: 'MTD Revenue',revenue: '373638',rate: '11',rate_type:'up', tooltip_content: '' },
    { id: "sec2", content: "Second task",title: 'Revenue from sales',revenue: '373638',rate: '7',rate_type:'up', tooltip_content: '' },
    { id: "third3", content: "Third task",title: 'Revenue from commission',revenue: '0',rate: '6',rate_type:'up', tooltip_content: '' },
];
const shipment = [
    { id: "deliver", content: "First task",title: 'Delivered',revenue: '135',rate: '11',rate_type:'up',tooltip_content: '' },
    { id: "transit", content: "Second task",title: 'In Transit',revenue: '100',rate: '7',rate_type:'up',tooltip_content: '' },
    { id: "stuck", content: "Third task",title: 'Stuck',revenue: '54',rate: '6',rate_type:'up',tooltip_content: 'stuck' },
];

const ratecoverage = [
    { id: "activePorts", content: "First task",title: 'Active Port Pair',revenue: '72',rate: '4',rate_type:'up', tooltip_content: '' },
    { id: "rate", content: "Second task",title: 'Carrier per Port Pair',revenue: '3',rate: '10',rate_type:'up', tooltip_content: 'Carrier per Port Pair' },
    { id: "coverratio", content: "Third task",title: 'Conversion Ratio',revenue: '60',rate: '6',rate_type:'up', tooltip_content: '' },
];

const test = [
  {
    id: 'revenue_sum',
    name: `Revenue Summary`,
    items: revenuesum
  },
  {
    id: 'shipment',
    name: `Shipments <b>(289)</b>`,
    items: shipment
  },
  {
    id: 'rate_coverage',
    name: `Rate Coverage`,
    items: ratecoverage
  }
]

export const taskStatus = {
    revenueSum: test
};