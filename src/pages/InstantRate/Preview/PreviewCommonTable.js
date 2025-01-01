import React from 'react'
import { convertToINR } from '../../../components/Common/CommonLogic';
import { cube_filled, oocl_logo, zim_logo } from '../../../assets/images';

export const CurrencyWiseTotal = ({ data, newData }) => {
    const processTariffDetails = (tariffDetails, type) => {
        const headerMapping = {
            "ORIGIN_INLAND_CHARGES": "origin",
            "ORIGIN_LOCAL_PORT_CHARGES": "origin",
            "FREIGHT_CHARGES": "origin",
            "DESTINATION_INLAND_CHARGES": "destination",
            "DESTINATION_LOCAL_PORT_CHARGES": "destination",
        };
        return tariffDetails?.reduce((result, currentOuter) => {
            if (type === 'new') {
                const newArray = currentOuter?.fclTariffBreakDowns?.reduce((accInner, currentInner) => {
                    const currentCurrency = currentInner?.currencyCode;
                    const existingObj = accInner?.find((item) => item.currency === currentCurrency);
                    if (existingObj) {
                        existingObj.amount += Number(currentInner?.total_sale_cost || currentInner?.amount);
                    } else {
                        accInner.push({ currency: currentCurrency, amount: Number(currentInner?.total_sale_cost || currentInner?.amount) });
                    }
                    return accInner;
                }, []);
                const header = headerMapping[currentOuter?.header];
                const exObj = result?.find(obj => obj.header === header);
                if (exObj) {
                    exObj.data = exObj?.data.concat(newArray);
                } else {
                    result.push({ header, data: newArray });
                }
            } else {
                if (currentOuter?.selected) {
                    const newArray = currentOuter?.fclTariffBreakDowns?.reduce((accInner, currentInner) => {
                        const currentCurrency = currentInner?.currencyCode;
                        const existingObj = accInner?.find((item) => item.currency === currentCurrency);
                        if (existingObj) {
                            existingObj.amount += Number(currentInner?.total_sale_cost || currentInner?.amount);
                        } else {
                            accInner.push({ currency: currentCurrency, amount: Number(currentInner?.total_sale_cost || currentInner?.amount) });
                        }
                        return accInner;
                    }, []);
                    const header = headerMapping[currentOuter?.header];
                    const exObj = result?.find(obj => obj.header === header);
                    if (exObj) {
                        exObj.data = exObj?.data.concat(newArray);
                    } else {
                        result.push({ header, data: newArray });
                    }
                }
            }
            return result;
        }, []).map((item) => ({
            ...item,
            data: item?.data?.reduce((acc, current) => {
                const exObj = acc?.find(obj => obj.currency === current?.currency);
                if (exObj) {
                    exObj.amount += Number(current?.amount);
                } else {
                    acc.push({ currency: current?.currency, amount: current?.amount });
                }
                return acc;
            }, [])
        })).reduce((finalResult, item) => {
            item.data.forEach((dataItem) => {
                const existingCurrency = finalResult?.find((resultItem) => resultItem.currency === dataItem.currency);
                if (existingCurrency) {
                    existingCurrency[item.header] = dataItem.amount;
                } else {
                    finalResult.push({ currency: dataItem.currency, [item.header]: dataItem.amount });
                }
            });
            return finalResult;
        }, []);
    };

    const filteredArray = processTariffDetails(data?.tariffDetails);
    const filteredArrayNew = processTariffDetails(newData?.tariffDetails, 'new');

    // console.log(filteredArray, "filteredArray");
    // console.log(filteredArrayNew, "filteredArrayNew");

    const mergedMap = new Map();
    const updateMap = (currency, origin, destination) => {
        if (mergedMap.has(currency)) {
            const existingEntry = mergedMap.get(currency);
            existingEntry.origin += origin;
            existingEntry.destination += destination;
        } else {
            mergedMap.set(currency, { currency, origin, destination });
        }
    };

    filteredArray?.forEach(({ currency, origin, destination }) => {
        updateMap(currency, origin || 0, destination || 0);
    });

    filteredArrayNew?.forEach(({ currency, origin, destination }) => {
        updateMap(currency, origin || 0, destination || 0);
    });
    // console.log(mergedMap,"mergedMap");

    // Convert the merged map values back to an array
    const mergedArray = [...mergedMap.values()];

    // console.log(mergedArray);

    return (
        <>
            <tr>
                <td className='title_row'><b>Total</b></td>
                <td className='title_row'><b>Origin</b></td>
                <td className='title_row'><b>Destination</b></td>
            </tr>
            {mergedArray?.map(item => (
                <tr key={item?.currency}>
                    <td>Total <b>{item?.currency}</b>:</td>
                    <td>{item?.origin || 0}</td>
                    <td>{item?.destination || 0}</td>
                </tr>
            ))}
        </>
    );
}
export default function PreviewCommonTable({ data, newData, tab }) {
    const subtotalCount = () => {
        let buyValue = (data?.tariffDetails?.reduce((outeracc, outerCurrent) => {
            let sum = 0;
            if (outerCurrent?.selected) {
                sum = outerCurrent?.fclTariffBreakDowns?.reduce((inneracc, innerCurrent) => {
                    return inneracc + convertToINR(Number(innerCurrent?.amount || 0), innerCurrent?.currencyCode);
                }, 0);
            }
            return outeracc + sum;
        }, 0))
        let marginValue = (data?.tariffDetails?.reduce((outeracc, outerCurrent) => {
            let sum = 0;
            if (outerCurrent?.selected) {
                sum = outerCurrent?.fclTariffBreakDowns?.reduce((inneracc, innerCurrent) => {
                    return inneracc + convertToINR(innerCurrent?.margin_value ? Number(innerCurrent.margin_value) : 0, innerCurrent?.currencyCode);
                }, 0);
            }
            return outeracc + sum;
        }, 0))

        let newSubTotal = newData?.tariffDetails !== undefined ? newData?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.fclTariffBreakDowns?.reduce((accInner, currentInner) => {
                let totalAmt = Number(currentInner.unitPerPrice || 0) * Number(currentInner.unit || 1);
                return accInner + convertToINR(Number(totalAmt), currentInner.currencyCode);
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;
        let totalNewMarginSum = newData?.tariffDetails !== undefined ? newData?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.fclTariffBreakDowns?.reduce((accInner, currentInner) => {
                return accInner + (convertToINR(currentInner?.margin_value ? Number(currentInner.margin_value) : 0, currentInner.currencyCode) || 0);
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;

        // console.log(buyValue, marginValue, newSubTotal, totalNewMarginSum, "buyValue");
        let mainTotal = buyValue + marginValue + newSubTotal + totalNewMarginSum
        return mainTotal.toFixed(2);
    }

    const totalCount = (subTotal) => {
        let totalTax = data?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = 0;
            if (currentOuter?.selected) {
                innerSum = currentOuter?.fclTariffBreakDowns?.reduce((accInner, currentInner) => {
                    return accInner + (currentInner?.taxDetail !== undefined && (convertToINR(Number(currentInner?.taxDetail?.value || 0), currentInner.currencyCode || 'INR') || 0));
                }, 0);
            }
            return accOuter + innerSum;
        }, 0);

        let totalNewTax = newData?.tariffDetails !== undefined ? newData?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = currentOuter?.fclTariffBreakDowns?.reduce((accInner, currentInner) => {
                return accInner + (currentInner?.taxDetail !== undefined && (convertToINR(Number(currentInner?.taxDetail?.value || 0), currentInner.currencyCode) || 0));
            }, 0);
            return accOuter + innerSum;
        }, 0) : 0;

        // console.log(totalTax, totalNewTax, subTotal, "Total preview");

        return subTotal + totalTax + totalNewTax;
    }

    return (
        <>
            {data !== undefined &&
                <div className="preview_table_wrap">
                    <div className='preview_carrier_data d-flex align-items-center'>
                        {/* <img src={data?.carrierLogo ? data?.carrierLogo : cube_filled} alt="Logo" 
                            onError={(e) => { e.target.src = data?.carrierName?.toLowerCase() === 'oocl' ? oocl_logo : data?.carrierName?.toLowerCase() === 'zim' ? zim_logo : cube_filled }} /> */}
                        <p>carrier: <b>{data?.carrierName}</b></p>
                    </div>
                    <table>
                        <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges </p></caption>
                        {/* <caption><p className='d-flex justify-content-between align-items-center'>Freight Charges <span className={`tag preffered ${data.quote_type.toLowerCase() === 'preffered' ? 'preffered' : data.quote_type.toLowerCase() === 'cheaper' ? 'cheaper' : data.quote_type.toLowerCase() === 'faster' ? 'faster' : ''}`}>{data.quote_type}</span></p></caption> */}
                        <thead>
                            <tr>
                                <th>Charge Name</th>
                                <th>Charge Basis</th>
                                <th>Curreny</th>
                                <th>Quantity</th>
                                {/* <th>Tax</th> */}
                                <th>Total Sale Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.tariffDetails?.map((inner, index) => {
                                if (inner?.selected) {
                                    return (
                                        <>

                                            <tr key={`header_${data.id}_${index}`}>
                                                <td colSpan={6} className='title_row'>{inner?.header?.split("_").join(" ") || '-'}</td>
                                            </tr>
                                            {inner?.fclTariffBreakDowns?.length !== 0 && inner?.fclTariffBreakDowns?.map((sub, index) => (
                                                <tr key={`tariff_${data.id}_${index}`}>
                                                    <td>{sub?.component || '-'}</td>
                                                    <td>{sub?.uomCode?.split('_').join(" ") || '-'}</td>
                                                    <td>{sub?.currencyCode || 'INR'}</td>
                                                    <td>{sub?.unit || 0}</td>
                                                    {/* <td>{sub?.taxDetail?.taxPercentage || 0}</td> */}
                                                    <td>{sub?.total_sale_cost || Number(sub?.amount || 0)}</td>
                                                    {/* <td>{sub?.total_sale_cost || (Number(sub?.amount || 0) + Number(sub?.taxDetail?.value || 0))}</td> */}
                                                </tr>
                                            ))}
                                            {newData?.tariffDetails !== undefined && newData?.tariffDetails?.find(obj => obj?.header === inner?.header)?.fclTariffBreakDowns?.map((newSub, newindex) => (
                                                <tr key={`${newData?.id}_${inner?.header}${newindex}`}>
                                                    <td>{newSub?.component?.value || '-'}</td>
                                                    <td>{newSub?.uomCode?.label || '-'}</td>
                                                    <td>{newSub?.currencyCode || 'INR'}</td>
                                                    <td>{newSub?.unit || 0}</td>
                                                    {/* <td>{newSub?.taxDetail?.taxPercentage || 0}</td> */}
                                                    <td>{newSub?.total_sale_cost || 0}</td>
                                                </tr>
                                            ))}

                                            {(inner?.fclTariffBreakDowns?.length === 0 && newData?.tariffDetails?.find(obj => obj?.header === inner?.header) === undefined) && <tr><td colSpan={6}>No data found</td></tr>}
                                        </>
                                    )
                                }
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3}>
                                    <table>
                                        <CurrencyWiseTotal data={data} newData={newData} />
                                    </table>
                                </td>
                                <td colSpan={3}>
                                    <p>Sub Total: <span>₹{subtotalCount()}</span></p>
                                    <p><b>Total:</b> <span className='text-primary'><b>₹{subtotalCount()}</b></span></p>
                                </td>
                            </tr>

                            {/* <td colSpan={6}><p>Total: <span className='text-primary'><b>₹{totalCount(subtotalCount())}</b></span></p></td> */}
                        </tfoot>
                    </table>
                </div>
            }
        </>
    )
}
