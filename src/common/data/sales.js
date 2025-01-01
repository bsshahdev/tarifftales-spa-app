import React from "react"
import { airasia_logo, australia, azerbaijan, cma_logo, india, indigo_img, memoji, pickup_icon, pickup_icon2, pickup_icon3, pickup_icon4, pickup_icon5, pickup_icon6, unitedkingdom, unitedstates, vistara_logo } from "../../assets/images"

// --------- breadcrumbs -----------------------------
const quotationBreadcrumb = [
    {
        label: 'Sales',
        link: '/#',
        active: false
    },
    {
        label: 'Quotations',
        link: '/#',
        active: true
    },
]
const inquiryBreadcrumb = [
    {
        label: 'Sales',
        link: '/#',
        active: false
    },
    {
        label: 'Inquiry',
        link: '/#',
        active: true
    },
]

const mawbBreadcrumb = [
    {
        label: 'Master Waybill',
        link: '/#',
        active: false
    },
    {
        label: 'Details',
        link: '/#',
        active: true
    },
]

const oceanBreadcrumb = [
    {
        label: 'Fcl Ocean',
        link: '/#',
        active: false
    },
    {
        label: 'Details',
        link: '/#',
        active: true
    },
]

const oceanBreadSurchage = [
    {
        label: 'Fcl Ocean',
        link: '/#',
        active: false
    },
    {
        label: 'Surchage Details',
        link: '/#',
        active: true
    },
]


// -------------------------------- table data -----------------------------------
const quotationTableData = [
    {
        id: 'quote_1',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'Online Network',
        quotation_date: '8th Nov 2023',
        quotation_id: 'BLRFC2923001',
        customer_name: 'Apex Exports Pvt Ltd',
        org_port: 'INMAA',
        dest_port: 'BDDAC',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '1,22,546',
        quote_status: 'In Progress',
        sales_person: 'Darshita',
        quote_type: 'preffered',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'BDT',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
    {
        id: 'quote_2',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'ZIM',
        quotation_date: '8th Nov 2023',
        quotation_id: 'BLRFC2923002',
        customer_name: 'Balaji Enterprise',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '1,38,546',
        quote_status: 'In Progress',
        sales_person: 'Darshita',
        quote_type: 'preffered',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'IDR',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
    {
        id: 'quote_3',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'Online Network',
        quotation_date: '7th Nov 2023',
        quotation_id: 'BLRFC2923003',
        customer_name: 'House of Tea Exports',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '1,38,546',
        quote_status: 'In Progress',
        sales_person: 'Vijay',
        quote_type: 'cheaper',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'IDR',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
    {
        id: 'quote_4',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'OOCL',
        quotation_date: '2nd Nov 2023',
        quotation_id: 'BLRFC2523001',
        customer_name: 'Raj Fruits Exports',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '95,000',
        quote_status: 'Lost',
        sales_person: 'Vijay',
        quote_type: 'cheaper',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'IDR',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
    {
        id: 'quote_5',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'Online Network',
        quotation_date: '2nd Nov 2023',
        quotation_id: 'BLRFC2923002',
        customer_name: 'Raj Fruits Exports',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '1,25,546',
        quote_status: 'Won',
        sales_person: 'Vijay',
        quote_type: 'cheaper',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        // ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'IDR',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
    {
        id: 'quote_6',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'ZIM',
        quotation_date: '3rd Nov 2023',
        quotation_id: 'BLRFC2523003',
        customer_name: 'Apex Exports Pvt Ltd',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '1,38,546',
        quote_status: 'Lost',
        sales_person: 'Sumit',
        quote_type: 'faster',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'IDR',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
    {
        id: 'quote_7',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'Online Network',
        quotation_date: '7th Nov 2023',
        quotation_id: 'BLRFC2923004',
        customer_name: 'Apex Exports Pvt Ltd',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '40 GP',
        quote_val: '1,22,546',
        quote_status: 'Won',
        sales_person: 'Sumit',
        quote_type: 'faster',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'IDR',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
    {
        id: 'quote_8',
        logo: cma_logo,
        name: 'CMA CGM',
        carrier_name: 'OOCL',
        quotation_date: '7th Nov 2023',
        quotation_id: 'BLRFC2923005',
        customer_name: 'Balaji Enterprise',
        org_port: 'INMAA',
        dest_port: 'BDDAC',
        quote_mode: "OCEAN",
        transport_by: "FCL",
        weight_type: '20 GP',
        quote_val: '1,25,546',
        quote_status: 'Won',
        sales_person: 'Darshita',
        quote_type: 'preffered',
        pickup: false,
        pickup_val: '',
        truck: false,
        rail: false,
        pickup: true,
        origin_port: true,
        ocean_freight: true,
        pickport_discharge: true,
        delivery: true,
        origin_port_currency: '₹',
        ocean_freight_charge: '3756',
        ocean_freight_charge_currency: '$',
        port_discharge_currency: 'BDT',
        delivery_charge: '0',
        pickup_quote_charge: [],
        originport_quote_charge: [
            {
                charges_name: 'OTHC',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 13600,
                tax: '18',
                total_sale_cost: '16048'
            },
            {
                charges_name: 'BL FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 5700,
                tax: '18',
                total_sale_cost: '6726'
            },
            {
                charges_name: 'CERTIFICATE FEE',
                uom: 'per BL',
                quantity: '2',
                currency: '₹',
                buy_cost: 650,
                tax: '18',
                total_sale_cost: '767'
            },
            {
                charges_name: 'EMPTY CONTAINER LIFT FEE',
                uom: 'per container',
                quantity: '2',
                currency: '₹',
                buy_cost: 680,
                tax: '18',
                total_sale_cost: '802.4'
            },
        ],
        ocean_quote_charge: [
            {
                charges_name: '',
                uom: 'per container',
                quantity: '',
                currency: '$',
                buy_cost: 3756,
                tax: '0',
                total_sale_cost: '3756'
            },
        ],
        port_discharge_charges: [
            {
                charges_name: 'DOC',
                uom: 'per BL',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 1500,
                tax: '0',
                total_sale_cost: '1500'
            },
            {
                charges_name: 'Cleaning Charges',
                uom: 'per container',
                quantity: '2',
                currency: 'BDT',
                buy_cost: 500,
                tax: '0',
                total_sale_cost: '500'
            },
        ],
        delivery_quote_charge: []
    },
]

export const airSearchData =[
    {
      chargeId: 9720,
      carrierId: 159,
      carrierName: "OOCL",
      originId: 2,
      originName: "PORT OF CHENNAI",
      destinationId: 5,
      destinationName: "PORT OF DHAKA",
      validFrom: "2024-08-10",
      validTo: "2024-09-20",
      oceanTransitTime: 28,
      alternateRoute: false,
      totalCost: 20080,
      tariffDetails: [
        {
          header: "ORIGIN_INLAND_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 0,
          chargeId: 9720,
          fclTariffBreakDowns: [
          ],
          selected: false,
        },
        {
          header: "ORIGIN_LOCAL_PORT_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 1,
          portName: "PORT OF CHENNAI",
          chargeId: 9720,
          fclTariffBreakDowns: [
          ],
          selected: true,
        },
        {
          header: "FREIGHT_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 2,
          portName: "PORT OF CHENNAI",
          chargeId: 9720,
          fclTariffBreakDowns: [
            {
              component: "Ocean Freight",
              componentDescription: "Ocean Freight Detail",
              uomCode: "PER_CONTAINER",
              uomDescription: "PER CONTAINER",
              currencyCode: "USD",
              unit: 1,
              unitPerPrice: 18100,
              amount: 18100,
              originId: 3,
              originName: "PORT OF CHENNAI",
              destinationId: 7,
              destinationName: "PORT OF DHAKA",
              transitTime: 28,
              containerDetail: "40GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
              remarks: "!#1234SDFS<>",
            },
            {
              component: "Ocean Freight",
              componentDescription: "Ocean Freight Detail",
              uomCode: "PER_CONTAINER",
              uomDescription: "PER CONTAINER",
              currencyCode: "USD",
              unit: 1,
              unitPerPrice: 1800,
              amount: 1800,
              originId: 3,
              originName: "PORT OF CHENNAI",
              destinationId: 7,
              destinationName: "PORT OF DHAKA",
              transitTime: 28,
              containerDetail: "20GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
              remarks: "!#1234SDFS<>",
            },
            {
              component: "CAF",
              componentDescription: "CURRENCY ADJUSTMENT FACTOR",
              uomCode: "PER_TEU",
              uomDescription: "PER TEU",
              currencyCode: "USD",
              unit: 3,
              unitPerPrice: 10,
              amount: 30,
              containerDetail: "20GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
            },
            {
              component: "CSS",
              componentDescription: "Carrier Security Surcharge",
              uomCode: "PER_TEU",
              uomDescription: "PER TEU",
              currencyCode: "USD",
              unit: 3,
              unitPerPrice: 20,
              amount: 60,
              containerDetail: "20GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
            },
            {
              component: "PSS",
              componentDescription: "Peak Season Surcharge",
              uomCode: "PER_TEU",
              uomDescription: "PER TEU",
              currencyCode: "USD",
              unit: 3,
              unitPerPrice: 30,
              amount: 90,
              containerDetail: "20GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
            },
          ],
          selected: true,
        },
        {
          header: "DESTINATION_LOCAL_PORT_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 3,
          portName: "PORT OF DHAKA",
          chargeId: 9720,
          fclTariffBreakDowns: [
          ],
          selected: true,
        },
        {
          header: "DESTINATION_INLAND_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 4,
          portName: "PORT OF DHAKA",
          chargeId: 9720,
          fclTariffBreakDowns: [
          ],
          selected: false,
        },
      ],
      viaPorts: [
        {
          id: 612,
          name: "PORT OF TORONTO",
          code: "CATOR",
        },
        {
          id: 617,
          name: "PORT OF CORONEL",
          code: "CLCNL",
        },
      ],
      quote_id: "quote_0",
      carrierLogo: "https://demo-api.tarifftales.com/api/v1/misc/download-file/",
    },
    {
      chargeId: 9716,
      carrierId: 159,
      carrierName: "OOCL",
      originId: 2,
      originName: "PORT OF CHENNAI",
      destinationId: 5,
      destinationName: "PORT OF DHAKA",
      validFrom: "2024-08-01",
      validTo: "2024-09-30",
      oceanTransitTime: 10,
      alternateRoute: false,
      totalCost: 220,
      tariffDetails: [
        {
          header: "ORIGIN_INLAND_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 0,
          chargeId: 9716,
          fclTariffBreakDowns: [
          ],
          selected: false,
        },
        {
          header: "ORIGIN_LOCAL_PORT_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 1,
          portName: "PORT OF CHENNAI",
          chargeId: 9716,
          fclTariffBreakDowns: [
          ],
          selected: true,
        },
        {
          header: "FREIGHT_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 2,
          portName: "PORT OF CHENNAI",
          chargeId: 9716,
          fclTariffBreakDowns: [
            {
              component: "Ocean Freight",
              componentDescription: "Ocean Freight Detail",
              uomCode: "PER_CONTAINER",
              uomDescription: "PER CONTAINER",
              currencyCode: "USD",
              unit: 1,
              unitPerPrice: 51,
              amount: 51,
              originId: 3,
              originName: "PORT OF CHENNAI",
              destinationId: 7,
              destinationName: "PORT OF DHAKA",
              transitTime: 10,
              containerDetail: "40GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
              remarks: "Test Remarks",
            },
            {
              component: "Ocean Freight",
              componentDescription: "Ocean Freight Detail",
              uomCode: "PER_CONTAINER",
              uomDescription: "PER CONTAINER",
              currencyCode: "USD",
              unit: 1,
              unitPerPrice: 34,
              amount: 34,
              originId: 3,
              originName: "PORT OF CHENNAI",
              destinationId: 7,
              destinationName: "PORT OF DHAKA",
              transitTime: 10,
              containerDetail: "20GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
              remarks: "Test Remarks",
            },
            {
              component: "BAF",
              componentDescription: "BUNKER ADJUSTMENT FACTOR",
              uomCode: "PER_TEU",
              uomDescription: "PER TEU",
              currencyCode: "USD",
              unit: 3,
              unitPerPrice: 20,
              amount: 60,
              containerDetail: "20GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
            },
            {
              component: "PSS",
              componentDescription: "Peak Season Surcharge",
              uomCode: "PER_TEU",
              uomDescription: "PER TEU",
              currencyCode: "USD",
              unit: 3,
              unitPerPrice: 25,
              amount: 75,
              containerDetail: "20GP",
              taxDetail: {
                taxPercentage: 0,
                value: 0,
              },
            },
          ],
          selected: true,
        },
        {
          header: "DESTINATION_LOCAL_PORT_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 3,
          portName: "PORT OF DHAKA",
          chargeId: 9716,
          fclTariffBreakDowns: [
          ],
          selected: true,
        },
        {
          header: "DESTINATION_INLAND_CHARGES",
          from: "PORT OF CHENNAI",
          to: "PORT OF DHAKA",
          order: 4,
          portName: "PORT OF DHAKA",
          chargeId: 9716,
          fclTariffBreakDowns: [
          ],
          selected: false,
        },
      ],
      viaPorts: [
      ],
      quote_id: "quote_1",
      carrierLogo: "https://demo-api.tarifftales.com/api/v1/misc/download-file/",
    },
  ]


// ------------ inquiry
const inquiryTableData = [
    {
        id: '1',
        inquiry_id: 'BLRFC2923001',
        inquiry_dt: '8th Nov 2023',
        customer_name: 'Apex Exports Pvt Ltd',
        customer_contact: '+918945612307',
        org_port: 'INMAA',
        dest_port: 'BDDAC',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '20 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'Actioned',
        sales_person: 'Darshita',
    },
    {
        id: '2',
        inquiry_id: 'BLRFC2923002',
        inquiry_dt: '8th Nov 2023',
        customer_name: 'Balaji Enterprise',
        customer_contact: '+918945612307',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '20 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'Actioned',
        sales_person: 'Darshita',
    },
    {
        id: '3',
        inquiry_id: 'BLRFC2923003',
        inquiry_dt: '7th Nov 2023',
        customer_name: 'House of Tea Exports',
        customer_contact: '+918945612307',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '40 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'Actioned',
        sales_person: 'Vijay',
    },
    {
        id: '4',
        inquiry_id: 'BLRFC2523004',
        inquiry_dt: '2nd Nov 2023',
        customer_name: 'Raj Fruits Exports',
        customer_contact: '+918945612307',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '20 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'Pending',
        sales_person: 'Vijay',
    },
    {
        id: '5',
        inquiry_id: 'BLRFC2923005',
        inquiry_dt: '2nd Nov 2023',
        customer_name: 'Raj Fruits Exports',
        customer_contact: '+918945612307',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '40 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'SLA',
        sales_person: 'Vijay',
    },
    {
        id: '6',
        inquiry_id: 'BLRFC2523006',
        inquiry_dt: '3rd Nov 2023',
        customer_name: 'Apex Exports Pvt Ltd',
        customer_contact: '+918945612307',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '40 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'Actioned',
        sales_person: 'Sumit',
    },
    {
        id: '7',
        inquiry_id: 'BLRFC2923007',
        inquiry_dt: '7th Nov 2023',
        customer_name: 'Apex Exports Pvt Ltd',
        customer_contact: '+918945612307',
        org_port: 'INKTP',
        dest_port: 'IDSUB',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '40 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'Actioned',
        sales_person: 'Sumit',
    },
    {
        id: '8',
        inquiry_id: 'BLRFC2923008',
        inquiry_dt: '7th Nov 2023',
        customer_name: 'Apex Exports Pvt Ltd',
        customer_contact: '+918945612307',
        org_port: 'INMAA',
        dest_port: 'BDDAC',
        cargo_ready_date: '',
        cargo_type: 'General',
        container_type: '',
        tot_container: '',
        weight: '20 GP',
        cargo_value: '',
        incoterms: 'CPT',
        sales_emp: '',
        status: 'Pending',
        sales_person: 'Darshita',
    },
]

// --------------- options ---------------
const optionCustomerName = [
    { value: "apex_export", name: 'Apex Export Pvt Ltd', img: memoji },
    { value: "balaji_enterprice", name: 'Balaji Enterprice', img: memoji },
    { value: "house_tea_exports", name: 'House of Tea Exports', img: memoji },
    { value: "raj_fruits", name: 'Raj Fruits Exports', img: memoji },
]
const optionServiceType = [
    { value: "door_to_door", name: 'Door to Door' },
    { value: "door_to_port", name: 'Door to Port' },
    { value: "port_to_port", name: 'Port to Port' },
    { value: "port_to_door", name: 'Port to Door' },
]
const optionTransportBy = [
    { value: "fcl", name: 'FCL' },
    { value: "lcl", name: 'LCL' },
]
const optionLandTransportBy = [
    { value: "ftl", name: 'FTL' },
    { value: "ltl", name: 'LTL' },
]
const optionIncoterm = [
    { value: "CPT", label: 'Carraige Paid To(CPT)' },
    { value: "CFR", label: 'Cost & Freight(CFR)' },
    { value: "CIF", label: 'Cost Insurance and Freight(CIF)' },
    { value: "CIP", label: 'Carraige and Insurance Paid To(CIP)' },
    { value: "DAP", label: 'Delivery at Place(DAP)' },
    { value: "DAT", label: 'Delivery At Terminal(DAT)' },
    { value: "DDU", label: 'Delivery Duty Unpaid(DDU)' },
    { value: "DPU", label: 'Delivered At Place Unploaded(DPU)' },
    { value: "EXW", label: 'EX Works(EXW)' },
]
const optionContainerType = [
    { id: '_standard1', value: "20_standard", name: "20' Standard" },
    { id: '_standard2', value: "40_standard", name: "40' Standard" },
    { id: '_high_cube1', value: "40_high_cube", name: "40' High Cube" },
    { id: '_refrigerated1', value: "40_refrigerated", name: "20' Refrigerated" },
    { id: '_refrigerated2', value: "40_refrigerated", name: "40' Refrigerated" },
    { id: '_high_cube2', value: "45_high_cube", name: "45' High Cube" },
]
const optionContainerTypeRefrigerated = [
    { id: '_refrigerated1', value: "40_refrigerated", name: "20' Refrigerated" },
    { id: '_refrigerated2', value: "40_refrigerated", name: "40' Refrigerated" },
]
const optionContainerTypeWithoutRefri = [
    { id: '_standard1', value: "20_standard", name: "20' Standard" },
    { id: '_standard2', value: "40_standard", name: "40' Standard" },
    { id: '_high_cube1', value: "40_high_cube", name: "40' High Cube" },
    { id: '_high_cube2', value: "45_high_cube", name: "45' High Cube" },
]
const optionCargoType = [
    { value: "hazardous", name: "Hazardous" },
    { value: "general", name: "General" },
    { value: "refrigerated", name: "Refrigerated" },
    { value: "spl_equipment", name: "SPL Equipment" },
]
const optionCurrency = [
    { value: "gbp", name: "Pound", code: '£' },
    { value: "usd", name: "USD", code: '$' },
    { value: "eur", name: "Euro", code: '€' },
    { value: "rupee", name: "Rupee", code: '₹' },
    { value: "jpy", name: "Yen", code: '¥' },
]
const optionlocationType = [
    { value: "port/air", name: "Port/Airport", icon: pickup_icon },
    { value: "ware_house", name: "Warehouse", icon: pickup_icon2 },
    { value: "fulfilment_center", name: "Fulfilment Center", icon: pickup_icon3 },
    { value: "business_address", name: "Business Address", icon: pickup_icon4 },
    { value: "residential_address", name: "Residential Address", icon: pickup_icon5 },
    { value: "last_mile", name: "Last mile delivery warehousing", icon: pickup_icon6 },
]

const countryList = [
    { value: 'AZ', label: 'Azerbaijan', phonecode: '994', flag: azerbaijan },
    { value: 'AU', label: 'Australia', phonecode: '61', flag: australia },
    { value: 'IN', label: 'India', phonecode: '91', flag: india },
    { value: 'US', label: 'United States', phonecode: '1', flag: unitedstates },
    { value: 'GB', label: 'United Kingdom', phonecode: '44', flag: unitedkingdom }
]
const optionPortList = [
    { value: 'INMAA', label: 'INMAA' },
    { value: 'INKTP', label: 'INKTP' },
    { value: 'BDDAC', label: 'BDDAC' },
    { value: 'IDSUB', label: 'IDSUB' },
    { value: 'BLRICD', label: 'BLR ICD' },
    { value: 'DHAKAICD', label: 'DHAKA ICD' },
    { value: 'JAKARTAICD', label: 'JAKARTA ICD' },
]

const weightUnitOption = [
    { value: 'kg', name: 'KG' },
    { value: 'lbs', name: 'Lbs' },
]
const cargoWeightUnitOption = [
    { value: 'KG', name: 'KG' },
    { value: 'MT', name: 'MT' },
]
const optionPickupCharge = [
    { label: "OTHC", value: "OTHC" },
    { label: "DTHC", value: "DTHC" },
    { label: "FSC", value: "FSC" },
    { label: "OBS", value: "OBS" },
    { label: "EIS", value: "EIS" },
    { label: "WRC", value: "WRC" },
    { label: "OCR", value: "OCR" },
    { label: "ADDON", value: "ADDON" },
    { label: "LSF", value: "LSF" },
    { label: "ARD", value: "ARD" },
    { label: "DOC", value: "DOC" },
    { label: "MPC", value: "MPC" },
    { label: "CIC", value: "CIC" },
    { label: "BL FEE", value: "bl_fee" },
    { label: "CERTIFICATE FEE", value: "certificate_fee" },
    { label: "EMPTY CONTAINER LIFT FEE", value: "empty_container_lift_fee" }
];
const optionOriginPortCharge = [
    { label: "OTHC", value: "OTHC" },
    { label: "DTHC", value: "DTHC" },
    { label: "BL FEE", value: "bl_fee" },
    { label: "CERTIFICATE FEE", value: "certificate_fee" },
    { label: "EMPTY CONTAINER LIFT FEE", value: "empty_container_lift_fee" },
];
const optionOceanCharge = [
    { label: "OBS", value: "OBS" },
    { label: "EIS", value: "EIS" },
    { label: "WRC", value: "WRC" },
    { label: "OCR", value: "OCR" },
    { label: "ADDON", value: "ADDON" },
    { label: "LSF", value: "LSF" },
    { label: "ARD", value: "ARD" },
];
const optionPortDischargeCharge = [
    { label: "DTHC", value: "DTHC" },
    { label: "DOC", value: "DOC" },
    { label: "MPC", value: "MPC" },
    { label: "CIC", value: "CIC" }
];

const optionCurrencyCharges = [
    { value: "gbp", label: "Pound", code: '£' },
    { value: "$", label: "USD", code: '$' },
    { value: "eur", label: "Euro", code: '€' },
    { value: "₹", label: "Rupee", code: '₹' },
    { value: "jpy", label: "Yen", code: '¥' },
    { value: "BDT", label: "BDT", code: 'BDT' },
    { value: "IDR", label: "IDR", code: 'IDR' },
]
const optionOriginQuote = [
    { label: 'INMAA', value: 'INMAA' },
    { label: 'INKTP', value: 'INKTP' },
]
const optionDestQuote = [
    { label: 'BDDAC', value: 'BDDAC' },
    { label: 'IDSUB', value: 'IDSUB' },
]
const optionModeQuote = [
    { label: 'OCEAN', value: 'OCEAN' },
]
const optionStatusQuote = [
    { label: 'In Progress', value: 'progress' },
    { label: 'Lost', value: 'lost' },
    { label: 'Won', value: 'won' },
]
const optionQuoteValueQuote = []

const optionQuoteContacttitle = [
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
]
const optionQuoteContactCode = [
    { label: "+91", value: "+91" },
]

const optionStatusInquiry = [
    { label: 'Pending', value: 'pending' },
    { label: 'Actioned', value: 'actioned' },
    { label: 'SLA', value: 'sla' },
]

const optionChargeBasis = [
    { label: "Per Container", value: "per_container" },
    { label: "Per BL", value: "per_bill" },
    { label: "Per Shipment", value: "per_shipment" },
    { label: "Per TEU", value: "per_teu" },
    { label: "Per Day/Per Container", value: "per_day_container" },
    { label: "Per House BL", value: "per_house" },
    { label: "Per Day", value: "per_day" },
    { label: "Per Ton", value: "per_ton" },
    { label: "Per Ton/Per Container", value: "per_ton_container" },
    { label: "Per CBM", value: "per_cbm" },
];

const optionFlightMode = [
    { label: "Prime", value: "prime" },
    { label: "General", value: "general" },
    { label: "Lean", value: "lean" },
]

const optionCommodity = [
    { label: "General", value: "general" },
    { label: "SCR", value: "SCR" },
    { label: "Hazardous", value: "hazardous" },
    { label: "Perishable", value: "perishable" },
]


export {
    quotationBreadcrumb, quotationTableData, optionCustomerName, optionServiceType, optionTransportBy, optionContainerType, optionIncoterm, optionCargoType, optionCurrency,
    optionlocationType, countryList, optionPortList, optionLandTransportBy, weightUnitOption, optionContainerTypeWithoutRefri, optionContainerTypeRefrigerated,
    optionPickupCharge, optionCurrencyCharges, optionOriginQuote, optionModeQuote, optionDestQuote, optionStatusQuote, optionQuoteValueQuote,
    cargoWeightUnitOption, optionOriginPortCharge, optionOceanCharge, optionPortDischargeCharge, optionQuoteContacttitle, optionQuoteContactCode, inquiryBreadcrumb,
    optionFlightMode, optionCommodity,

    inquiryTableData, optionStatusInquiry, optionChargeBasis, mawbBreadcrumb, oceanBreadcrumb, oceanBreadSurchage
}