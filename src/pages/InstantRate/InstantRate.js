import classnames from "classnames";
import moment from "moment";
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { airSearchData } from "../../common/data/sales";
import { GET_CARGO_TYPE_DATA, GET_CONTAINER_DATA, GET_UOM_WEIGHT_DATA } from "../../store/Global/actiontype";
import { ADD_OBJECT_INSTANT_SEARCH, BLANK_INSTANT_SEARCH, GET_INSTANT_AIR_SEARCH_RESULT_DETAILS, INSTANT_RATE_ACTIVE_TAB_TYPE, QUOTATION_RESULT_SELECTED_BLANK, REMOVE_OBJECT_INSTANT_SEARCH } from "../../store/InstantRate/actionType";
import { postAirFrightInstantSearch, postInstantSearchAction } from "../../store/InstantRate/actions";
import { BLANK_MODAL_CHARGE } from "../../store/Sales/Quotation/actiontype";
import AirBookQuoteModal from "./AirFreightResult/AirBookQuoteModal";
import AirFreightResultComp from "./AirFreightResult/AirFreightResultComp";
import SearchResultComp from "./OceanFreightResult/SearchResultComp";
import SearchForm from './SearchForm';
import PreviewQuotationModal from "./Preview/PreviewQuotationModal";
import QuotationModalComp from "./partials/QuotationModalComp";

const InstantRate = () => {
    const [searchResult, setSearchResult] = useState(false);
    const { $instantActiveTab, searchForm } = useSelector((state) => state?.instantRate);
    const [quoteModal, setQuoteModal] = useState(false);
    const [bookModal, setBookModal] = useState(false);
    const [previewModal, setPreviewModal] = useState(false);
    const dispatch = useDispatch();

    const bookModalHandler = useCallback(() => {
        setBookModal(!bookModal);
    }, [bookModal]);

    function QuoteModalHandler() {
        setQuoteModal(!quoteModal);
    }

    const showSearchResultHandler = () => {
        console.log(searchForm, "searchForm------------------------------------")
        console.log($instantActiveTab, "activeTab------------------------------------")
        let dateFrom = moment(searchForm?.cargo_date?.[0]).format("YYYY-MM-DD");
        let dateTo = moment(searchForm?.cargo_date?.[1]).format("YYYY-MM-DD");
        if ($instantActiveTab?.sub === 'FCL') {
            let data = {
                inquiryField: {
                    customerId: searchForm?.customerName?.value || null,
                    findAlternativeRoute: searchForm?.alternate_route,
                    originLocationTypeId: searchForm?.location_from?.locationType || null,
                    destinationLocationTypeId: searchForm?.location_to?.locationType || null,

                    ...(searchForm?.location_from?.locationType === "PORT" ? {
                        "originPortId": searchForm?.location_from?.value || null,
                    } : searchForm?.location_from?.locationType === "CITY" ? {
                        "originCityId": searchForm?.location_from?.value || null,
                    } : searchForm?.location_from?.locationType === "ICD" ? {
                        "originIcdId": searchForm?.location_from?.value || null,
                    } : ''),

                    ...(searchForm?.location_to?.locationType === "PORT" ? {
                        "destinationPortId": searchForm?.location_to?.value || null,
                    } : searchForm?.location_to?.locationType === "CITY" ? {
                        "destinationCityId": searchForm?.location_to?.value || null,
                    } : searchForm?.location_to?.locationType === "ICD" ? {
                        "destinationIcdId": searchForm?.location_to?.value || null,
                    } : ''),

                    cargoDateFrom: dateFrom || null,
                    cargoDateTo: dateTo || null,
                    cargoTypeId: searchForm?.cargo_type?.id || null,
                    cargoValue: searchForm?.cargo_value?.value || 0,
                    cargoWeight: searchForm?.container_type?.cargo_weight?.value || 0,
                    ...(searchForm?.container_type?.cargo_weight?.weight && { cargoWeightUOMId: searchForm?.container_type?.cargo_weight?.weight?.id || null }),
                    intercomId: searchForm?.incoterm?.value || null,
                    containerDetails: (searchForm?.container_type?.containerArray || [])
                        .map((data) => (
                            data?.unitNew !== 0
                                ? {
                                    id: data?.id,
                                    size: data?.size,
                                    noOfUnits: data?.unitNew
                                }
                                : null
                        ))
                        .filter(Boolean)
                }
            }
            dispatch(postInstantSearchAction(data));
        }
        if ($instantActiveTab?.sub === 'dom_air') {
            let data = {
                ...(searchForm?.customerName && { customerId: searchForm?.customerName?.value }),
                originType: "PORT",
                destinationType: "PORT",
                originId: searchForm?.location_from.id,
                destinationId: searchForm?.location_to.id,
                cargoDate: dateFrom,
                ...(searchForm?.cargo_type && { cargoTypeId: searchForm?.cargo_type?.id }),
                // commodityTypeId: null,
                ...(searchForm?.cargo_value && { cargoValue: searchForm?.cargo_value?.value }),
                cargoWeight: searchForm?.shipment_details?.v_weight > searchForm?.shipment_details?.weight ?  searchForm?.shipment_details?.v_weight : searchForm?.shipment_details?.weight   || 0,
                // cargoWeightUOMId: null,
                // incoterm: null,
                // // inquiryDate: "2023-06-28",
                actualWeight: searchForm?.shipment_details?.weight || 0,
                // volumetricWeight: 1,
                bookingMode: searchForm?.bookingMode?.value || "MAWB",
                shipmentDetails: (searchForm?.shipment_details?.array || [])
                    .map((data) => (
                        data?.unitNew !== 0
                            ? {
                                noOfUnits: data?.no_unit,
                                length: data?.dimensions_l,
                                width: data?.dimensions_w,
                                height: data?.dimensions_h,
                                uom: data?.dimensions_unit
                            }
                            : null
                    ))
                    .filter(Boolean)
            }
            dispatch(postAirFrightInstantSearch(data))
            dispatch({ type: GET_INSTANT_AIR_SEARCH_RESULT_DETAILS, payload: airSearchData });
        }
        setSearchResult(true);
    }

    // Preview Modal
    const previewModalHand = () => {
        setPreviewModal(!previewModal);
    }

    const blankValueHandler = () => {
        dispatch({ type: BLANK_MODAL_CHARGE, payload: {} });
        dispatch({ type: QUOTATION_RESULT_SELECTED_BLANK, payload: {} });
        dispatch({ type: BLANK_INSTANT_SEARCH });
    }

    useEffect(() => {
        dispatch({ type: GET_CARGO_TYPE_DATA });
        dispatch({ type: GET_CONTAINER_DATA });
        dispatch({ type: GET_UOM_WEIGHT_DATA });
        blankValueHandler();
    }, []);

    return (
        <>
            <div className="page-content">
                <Container fluid>
                    <div className="create_sales_wrapper instant_rate_wrapper">
                        <div className="create_sales_wrapper_inner">
                            <div className="d-flex justify-content-end main_tab_wrap">
                                <button type="button" className={`btn d-flex align-items-center ${$instantActiveTab?.main === "ocean_freight" ? "active" : ""}`}
                                    onClick={() => { setSearchResult(false); blankValueHandler(); dispatch({ type: INSTANT_RATE_ACTIVE_TAB_TYPE, payload: { main: "ocean_freight", sub: "FCL" } }); dispatch({ type: REMOVE_OBJECT_INSTANT_SEARCH, payload: 'shipment_details' }) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7 2.53906C7 2.26292 7.22386 2.03906 7.5 2.03906H12.5C12.7761 2.03906 13 2.26292 13 2.53906V5.00061H15.5C15.7761 5.00061 16 5.22447 16 5.50061V9.5636L17.6341 10.0187C17.7768 10.0584 17.8944 10.1593 17.9555 10.2942C18.0165 10.429 18.0147 10.584 17.9505 10.7174L16.1261 14.5052C15.8672 14.2133 15.4978 14.0262 15.0893 14.0029C14.437 13.9657 13.8363 14.3549 13.6031 14.9642C13.6018 14.9673 13.5985 14.9753 13.5932 14.9875C13.5812 15.0149 13.5597 15.0621 13.5285 15.1222C13.4644 15.2459 13.3694 15.4047 13.2468 15.556C12.9881 15.8752 12.7491 16.0005 12.5078 16.0005C12.2674 16.0005 12.025 15.8743 11.7614 15.5502C11.637 15.3971 11.5405 15.2365 11.4751 15.1115C11.4434 15.0508 11.4214 15.0031 11.4091 14.9752C11.4036 14.9626 11.4003 14.9548 11.399 14.9516C11.1752 14.3734 10.6182 13.9916 9.99743 13.9927C9.37665 13.9937 8.82115 14.377 8.59934 14.9559C8.59805 14.9591 8.5947 14.9672 8.58926 14.9797C8.57715 15.0075 8.55542 15.055 8.52399 15.1156C8.45929 15.2403 8.36369 15.4004 8.24028 15.5529C7.97926 15.8754 7.73929 16.0005 7.49996 16.0005C7.25876 16.0005 7.01974 15.8752 6.76099 15.556C6.63838 15.4047 6.54346 15.2459 6.47926 15.1221C6.44809 15.0621 6.42657 15.0149 6.4146 14.9875C6.4093 14.9753 6.40602 14.9673 6.40473 14.9641C6.17189 14.3559 5.57257 13.9668 4.92127 14.0028C4.49467 14.0263 4.11031 14.2286 3.84963 14.5425L2.04759 10.7133C1.98491 10.5801 1.98411 10.426 2.04542 10.2922C2.10673 10.1583 2.22391 10.0583 2.36572 10.0188L4 9.56313V5.50061C4 5.22447 4.22386 5.00061 4.5 5.00061H7V2.53906ZM12 3.03906H8V5.00061H12V3.03906ZM15 9.28509V6.00061H5V9.28433L9.19077 8.11595C9.71757 7.96907 10.2745 7.969 10.8013 8.11573L15 9.28509ZM11.399 14.9516C11.3982 14.9495 11.3985 14.9504 11.3985 14.9504L11.399 14.9516ZM11.399 14.9516L11.4007 14.956L11.4019 14.9591L11.399 14.9516ZM15.4878 15.3897L15.4854 15.3805C15.4327 15.1684 15.2481 15.0144 15.0298 15.0014C14.8109 14.9883 14.6089 15.1197 14.5318 15.3249L14.5275 15.3356C14.5233 15.3461 14.5162 15.3633 14.5062 15.386C14.4863 15.4317 14.455 15.4995 14.412 15.582C14.3254 15.7483 14.1946 15.968 14.0182 16.1852C13.6607 16.6252 13.1639 17.0005 12.5 17.0005C11.8358 17.0005 11.3375 16.6249 10.9784 16.1845C10.8012 15.9672 10.6698 15.7474 10.5826 15.581C10.5394 15.4984 10.5079 15.4306 10.4878 15.3849C10.4777 15.3621 10.4706 15.345 10.4663 15.3345L10.4615 15.3225C10.3875 15.1282 10.201 15 9.99302 15.0005C9.78472 15.001 9.59845 15.1309 9.52567 15.3261L9.52146 15.3367C9.51724 15.3473 9.51021 15.3644 9.50032 15.3871C9.48049 15.4327 9.4494 15.5005 9.40666 15.583C9.32057 15.7492 9.19051 15.9688 9.01478 16.1859C8.65885 16.6255 8.16364 17.0005 7.49996 17.0005C6.83605 17.0005 6.33929 16.6252 5.98178 16.1852C5.80532 15.968 5.67456 15.7483 5.58795 15.582C5.54495 15.4995 5.51365 15.4317 5.49368 15.386C5.48372 15.3632 5.47663 15.3461 5.47238 15.3356L5.46812 15.3249L5.46764 15.3236C5.39042 15.1194 5.18958 14.9889 4.97152 15.0013C4.75314 15.0137 4.56821 15.1667 4.51499 15.3788L4.51528 15.3777L4.51279 15.3867C4.51013 15.396 4.50546 15.4119 4.49855 15.4334C4.48471 15.4765 4.4621 15.5414 4.42905 15.6207C4.3624 15.7807 4.25642 15.9919 4.09998 16.2005C3.79323 16.6095 3.30357 17.0005 2.5 17.0005C2.22386 17.0005 2 17.2244 2 17.5005C2 17.7766 2.22386 18.0005 2.5 18.0005C3.69643 18.0005 4.45675 17.3915 4.89998 16.8005C4.95076 16.7328 4.99751 16.6652 5.0405 16.5987C5.09139 16.6701 5.14641 16.7429 5.20567 16.8158C5.66067 17.3758 6.41391 18.0005 7.49996 18.0005C8.58632 18.0005 9.33827 17.3755 9.79198 16.8151C9.86686 16.7226 9.93494 16.6304 9.99644 16.5409C10.0587 16.6308 10.1276 16.7235 10.2034 16.8165C10.6596 17.3761 11.4142 18.0005 12.5 18.0005C13.5861 18.0005 14.3393 17.3758 14.7943 16.8158C14.8521 16.7446 14.9059 16.6736 14.9558 16.6039C14.9988 16.6712 15.0456 16.7395 15.0966 16.8079C15.5397 17.4036 16.3028 18.0148 17.506 18.0005C17.7821 17.9972 18.0033 17.7707 18 17.4945C17.9967 17.2184 17.7702 16.9972 17.494 17.0005C16.6911 17.0101 16.2042 16.6213 15.8988 16.211C15.7429 16.0015 15.6374 15.7884 15.5711 15.6267C15.5382 15.5465 15.5157 15.4808 15.502 15.4371C15.4951 15.4154 15.4905 15.3992 15.4878 15.3897Z" fill="#6264A0" />
                                    </svg>
                                    Ocean Freight
                                </button>
                                <button type="button" className={`btn d-flex align-items-center ms-3 ${$instantActiveTab?.main === "air_freight" ? "active" : ""}`}
                                    onClick={() => { setSearchResult(false); blankValueHandler(); dispatch({ type: INSTANT_RATE_ACTIVE_TAB_TYPE, payload: { main: "air_freight", sub: "dom_air" } }); dispatch({ type: ADD_OBJECT_INSTANT_SEARCH, payload: 'shipment_details' }); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                                        <path d="M18.1759 8.02297C18.1697 7.12967 16.9554 6.42834 15.4618 6.42834H12.3524C11.9267 6.42834 11.7704 6.35469 11.5162 6.0695L6.37672 0.516913C6.21351 0.335065 6.01651 0.244141 5.7892 0.244141H4.82435C4.62598 0.244141 4.51096 0.419776 4.61083 0.631932L7.26384 6.42289L3.38062 6.86102L1.99555 4.37952C1.89432 4.18873 1.7249 4.10538 1.47895 4.10538H1.14086C0.93704 4.10538 0.800049 4.24101 0.800049 4.44483V11.6012C0.800049 11.8036 0.93704 11.9344 1.14086 11.9344H1.47895C1.7249 11.9344 1.89432 11.8497 1.99555 11.6665L3.38062 9.18499L7.26384 9.62175L4.61083 15.4127C4.51096 15.6186 4.62598 15.8019 4.82435 15.8019H5.7892C6.01651 15.8019 6.21351 15.7047 6.37672 15.5291L11.5162 9.9689C11.7704 9.68997 11.9267 9.61768 12.3524 9.61768H15.4618C16.9554 9.61768 18.1697 8.91014 18.1759 8.02297Z" fill="#6264A0" />
                                    </svg>
                                    Air Freight
                                </button>
                            </div>
                            {/* --------------------------tabs------------------------------- */}
                            <Nav className="nav-tabs-custom card-header-tabs border-bottom mb-3">
                                {$instantActiveTab?.main === "ocean_freight" ? (
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: $instantActiveTab?.sub === "FCL", }, "px-3 py-2")}
                                                onClick={() => { dispatch({ type: INSTANT_RATE_ACTIVE_TAB_TYPE, payload: { main: "ocean_freight", sub: "FCL" } }); dispatch({ type: REMOVE_OBJECT_INSTANT_SEARCH, payload: 'shipment_details' }) }}>
                                                <i className='bx bx-cube mx-1'></i>
                                                FCL</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: $instantActiveTab?.sub === "LCL", }, "px-3 py-2")}
                                                onClick={() => { dispatch({ type: INSTANT_RATE_ACTIVE_TAB_TYPE, payload: { main: "ocean_freight", sub: "LCL" } }); dispatch({ type: ADD_OBJECT_INSTANT_SEARCH, payload: 'shipment_details' }) }}
                                                disabled={true}
                                            ><i className='bx bx-package mx-1'></i>LCL</NavLink>
                                        </NavItem>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: $instantActiveTab?.sub === "dom_air", }, "px-3 py-2")}
                                                onClick={() => { dispatch({ type: INSTANT_RATE_ACTIVE_TAB_TYPE, payload: { main: "air_freight", sub: "dom_air" } }); }}
                                            ><i className='bx bx-rocket mx-1'></i>DOM Air</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#"
                                                className={classnames({ active: $instantActiveTab?.sub === "intl_Air", }, "px-3 py-2")}
                                                onClick={() => { dispatch({ type: INSTANT_RATE_ACTIVE_TAB_TYPE, payload: { main: "air_freight", sub: "intl_Air" } }); }}
                                            ><i className='bx bx-rocket mx-1'></i>ITNL Air</NavLink>
                                        </NavItem>
                                    </React.Fragment>
                                )}
                            </Nav>
                            <TabContent activeTab={$instantActiveTab?.sub}>
                                <TabPane tabId={$instantActiveTab?.sub}>
                                    <SearchForm activeTab={$instantActiveTab?.sub} searchQuoteHandler={showSearchResultHandler} mainactiveTab={$instantActiveTab?.main} />
                                </TabPane>
                            </TabContent>
                            {/* --------------------------tabs------------------------------- */}

                            {/* Search Result */}
                            {searchResult && (
                                <>
                                    {$instantActiveTab?.main === "air_freight" ? (
                                        <AirFreightResultComp QuoteModalHandler={QuoteModalHandler} bookModalHandler={bookModalHandler} searchResult={searchResult} mainTab={$instantActiveTab?.sub} />
                                    ) : (
                                        <SearchResultComp QuoteModalHandler={QuoteModalHandler} searchResult={searchResult} />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            {/* Quotation Modal */}
            {quoteModal && <QuotationModalComp quoteModal={quoteModal} setQuoteModal={setQuoteModal} QuoteModalHandler={QuoteModalHandler} setPreviewModal={setPreviewModal} />}

            {bookModal && <AirBookQuoteModal bookModal={bookModal} setBookModal={setBookModal} QuoteModalHandler={bookModalHandler} />}

            {/* Preview Quotation Modal */}
            {previewModal && <PreviewQuotationModal previewModal={previewModal} previewModalHand={previewModalHand} setPreviewModal={setPreviewModal} QuoteModalHandler={QuoteModalHandler} />}
            {/* <PreviewQuotationModal previewModal={true} previewModalHand={previewModalHand} setPreviewModal={setPreviewModal} QuoteModalHandler={QuoteModalHandler} /> */}
        </>
    )
}

export default InstantRate
