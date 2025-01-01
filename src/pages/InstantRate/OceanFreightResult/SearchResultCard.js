import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Tooltip, UncontrolledTooltip } from 'reactstrap';
import { cube_filled, oocl_logo, ship_filled, truck_outline, zim_logo } from '../../../assets/images';
import { convertToINR } from '../../../components/Common/CommonLogic';
import { QUOTATION_RESULT_SELECTED, UPDATE_QUOTATION_RESULT_DETAILS } from '../../../store/InstantRate/actionType';
import ResultCardSkeleton from '../../Skeleton/ResultCardSkeleton';
const SearchResultCard = ({ data, QuoteModalHandler }) => {
    const [showDetails, setShowDetails] = useState([]);
    const dispatch = useDispatch();
    const [open, setOpen] = useState('');
    const [resultRoute, setResultRoute] = useState([]);
    const quote_Selected = useSelector((state) => state.instantRate.quote_selected_data);
    const { instantRateLocation, result_loader } = useSelector((state) => state.instantRate);

    const toggle = (id) => {
        if (open === id) {
            setOpen('');
        } else {
            setOpen(id);
        }
    };

    const showDetailsHandler = (index, id) => {
        let newArr = [...showDetails];
        if (newArr?.length !== 0) {
            if (newArr.some(obj => obj.index === index)) {
                newArr.find(obj => obj.index === index).details = !newArr.find(obj => obj.index === index).details
            } else {
                let newObj = { details: true, index }
                newArr.push(newObj);
            }
        } else {
            let newObj = { details: true, index }
            newArr.push(newObj);
        }
        setShowDetails(newArr);
    }

    const handleChange = (val, name, index, id) => {
        dispatch({ type: UPDATE_QUOTATION_RESULT_DETAILS, payload: { name, value: val, id, index } })
        let newArry = [];
        dispatch({ type: QUOTATION_RESULT_SELECTED, payload: newArry })
    }

    const quotationCheckHandler = (item) => {
        const maxSelection = 3;

        if (quote_Selected.length < maxSelection) {
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.quote_id === item.quote_id);

            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.quote_id !== item.quote_id);
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            } else {
                const updatedSelection = [...quote_Selected, item];
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            }
        } else {
            const isItemSelected = quote_Selected.some(selectedItem => selectedItem.quote_id === item.quote_id);
            if (isItemSelected) {
                const updatedSelection = quote_Selected.filter(selectedItem => selectedItem.quote_id !== item.quote_id);
                dispatch({ type: QUOTATION_RESULT_SELECTED, payload: updatedSelection });
            }
            console.log("You can select a maximum of 3 items.");
        }
    }
    const singleQuoteModal = (item) => {
        let newArry = [item]
        dispatch({ type: QUOTATION_RESULT_SELECTED, payload: newArry })
    }

    // Total & SubTotal ----------------------------------     
    const innerTotalHandler = (array) => {
        return array !== undefined ? array?.reduce((total, charge) => total + convertToINR(Number(charge.amount), charge.currencyCode), 0) : 0;
    }
    const TotalQuotationCount = (item) => {
        const totalSum = item?.tariffDetails?.reduce((accOuter, currentOuter) => {
            let innerSum = 0;
            if (currentOuter?.selected) {
                innerSum = currentOuter?.fclTariffBreakDowns?.reduce((accInner, currentInner) => {
                    return accInner + convertToINR(Number(currentInner.amount), currentInner.currencyCode);
                }, 0);
            }
            return accOuter + innerSum;
        }, 0);
        return totalSum;
    }

    useEffect(() => {
        let routeArray = data?.map((item, index) => {
            let newArray = [];
            item.tariffDetails?.map((charge) => {
                if (charge?.selected) {
                    if (charge.from !== undefined) {
                        newArray = [...newArray, charge.from, charge.to];
                    }
                }
            })
            return newArray
        })

        let uniqueArray = routeArray?.map((item) => {
            let newitem = item.filter((value, index, self) => self.indexOf(value) === index);
            return newitem
        })

        setResultRoute(uniqueArray);
    }, [data]);

    return (
        <div>
            {result_loader ? <ResultCardSkeleton /> : (
                <div className="result_tab_content_wrap">
                    {data?.length !== 0 ? data?.map((item, index) => (
                        <div className="search_result_card_check_wrap d-flex align-items-center" key={`main_${index}`}>
                            <div className={`form-check me-2`} onClick={(e) => quotationCheckHandler(item)}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`result_card_${index}`}
                                    name={`result_card_${index}`}
                                    checked={quote_Selected.some(obj => obj.quote_id === item.quote_id)}
                                    readOnly
                                />
                            </div>
                            <div className={`search_result_card ${quote_Selected.some(obj => obj.quote_id === item.quote_id) ? 'card_active' : ''}`}>
                                <div className="search_result_card_header d-flex align-items-center">
                                    <div className="card_img">
                                        <span className='d-flex align-items-center justify-content-center img mx-auto'>
                                            <img src={item?.carrierLogo ? item?.carrierLogo : cube_filled} alt="Logo" onError={e => { e.target.src = item?.carrierName?.toLowerCase() === 'oocl' ? oocl_logo : item?.carrierName?.toLowerCase() === 'zim' ? zim_logo : cube_filled }} />
                                            {/* <img src={item?.carrierName?.toLowerCase() === 'oocl' ? oocl_logo : item?.carrierName?.toLowerCase() === 'zim' ? zim_logo : cube_filled} alt="Logo" /> */}
                                        </span>
                                        <span className="title d-block text-center mt-2">{item?.carrierName || '-'}</span>
                                    </div>
                                    <div className="middle_content">
                                        {/* {console.log(instantRateLocation,"instantRateLocation")} */}
                                        <span className="duration text-center d-block">Duration <b>{item.oceanTransitTime || 0} days</b></span>
                                        {item?.viaPorts?.length > 0 && (
                                            <div className="text-center">
                                                <button className="btn btn-link p-0 via_port_btn" id={`viaTooltip_${item.quote_id}`}>Via Ports</button>
                                                <UncontrolledTooltip
                                                    placement="top"
                                                    target={`viaTooltip_${item.quote_id}`}
                                                    trigger="click"
                                                    className='viaTooltip'
                                                    autohide={true}
                                                >
                                                    {item?.viaPorts?.map(t => t.code).join(', ')}
                                                </UncontrolledTooltip>
                                            </div>
                                        )}
                                        <div className="from_to_wrap multi_route mt-2 mb-3 d-flex justify-content-between">
                                            <span className="icon d-flex align-items-center justify-content-center"><img src={ship_filled} alt="Shipping" /></span>
                                            {resultRoute?.length > 0 && resultRoute?.[index] ? resultRoute?.[index]?.map((item, index) => {
                                                return (<span className="from_loc" key={index}>{item}</span>)
                                            }) : null}
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6 text-left"><span>Valid: <b>{item?.validTo || '-'}</b></span></div>
                                            {/* <div className="col-lg-4 text-center"><span>Id: <b>{item.id || '-'}</b></span></div> */}
                                            {/* <div className="col-lg-6 text-end"><span>CO2: <b>{item.co_two || '-'}</b></span></div> */}
                                        </div>
                                    </div>
                                    <div className="total_wrap">
                                        <p className="total_price text-center"><b>₹ {TotalQuotationCount(item)}</b></p>
                                        <div className="btn_wrap d-flex">
                                            <button type='button' className='btn text-primary view_detail_btn' onClick={() => { showDetailsHandler(index, item.quote_id); }}>
                                                View{showDetails?.find(obj => obj.index === index)?.details ? 'Less' : 'Detail'}</button>
                                            <button type='button' className='btn btn-primary quote_now_btn' onClick={() => { QuoteModalHandler(); singleQuoteModal(item) }} disabled={quote_Selected.some(obj => obj.id === item.quote_id) || quote_Selected?.length >= 2}>Quote Now</button>
                                        </div>
                                    </div>
                                </div>
                                {showDetails?.find(obj => obj.index === index)?.details && (
                                    <div className="search_result_accordion_details">
                                        {item?.tariffDetails?.length !== 0 && (
                                            <Accordion flush open={open} toggle={toggle}>
                                                {item?.tariffDetails?.map((data, i) => (
                                                    <AccordionItem key={i}>
                                                        <AccordionHeader targetId={`${data?.header}_${index}${i}`}>
                                                            <div className="left_lable d-flex align-items-center">
                                                                <div className={`form-check me-2`} onClick={(e) => { e.stopPropagation(); handleChange(!data?.selected, data?.header, i, item?.quote_id); }}>
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id={`${data?.header}${item.quote_id}`}
                                                                        name={`${data?.header}`}
                                                                        checked={data?.selected || false}
                                                                        readOnly
                                                                    />
                                                                    <label className="form-check-label" htmlFor={`${data?.header}`}></label>
                                                                </div>
                                                                <img src={truck_outline} alt="Truck" className='me-2' />
                                                                {data?.header?.split('_').join(' ') || '-'}
                                                            </div>
                                                            <div className="right_con d-flex ms-auto">
                                                                {/* {item.pickup_co !== '' && <span>CO2: <b>{item.pickup_co}</b></span>} */}
                                                                <span className='text-primary'>{'₹'} {innerTotalHandler(data?.fclTariffBreakDowns || [])}</span>
                                                            </div>
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId={`${data?.header}_${index}${i}`}>
                                                            <div className="price_details_wrap ps-5">
                                                                {data?.fclTariffBreakDowns?.length !== 0 && (
                                                                    <table className="table table-striped">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Charge name</th>
                                                                                <th>Equipment Type</th>
                                                                                <th>Charge basis</th>
                                                                                <th>Units</th>
                                                                                <th>Currency</th>
                                                                                <th>Amount</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {data?.fclTariffBreakDowns?.map((val, ind) => (
                                                                                <tr key={`key_${ind}`}>
                                                                                    <td>{`${val?.component || ''} `}</td>
                                                                                    <td>{`${val?.containerDetail}`}</td>
                                                                                    <td>{val?.uomDescription ? val?.uomDescription : ''}</td>
                                                                                    <td>{`${val?.unit ? val?.unit : ''}`}</td>
                                                                                    <td className='text-primary'>{val?.currencyCode || '₹'} </td>
                                                                                    <td className='text-primary'>{val?.amount || '0'}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                )}
                                                            </div>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                ))}
                                            </Accordion>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className='no_data_found p-5 border rounded mt-4'>
                            <p className='text-center'>
                                <b>No Data Found</b>
                                <button type='button' className='btn btn-primary d-table mx-auto mt-3'>Request For Quote</button>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchResultCard
