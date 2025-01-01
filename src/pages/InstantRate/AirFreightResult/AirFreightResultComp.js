import classnames from "classnames";
import { default as React, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavItem, NavLink } from 'reactstrap';
import { filter_icon } from '../../../assets/images';
import AirFilterSearch from "./AirFilterSearch";
import AirFreightCard from "./AirFreightCard";

const AirFreightResultComp = ({ QuoteModalHandler, searchResult,mainTab, bookModalHandler }) => {
    const [activeTab, setactiveTab] = useState("all");
    const [isRight, setIsRight] = useState(false);
    const [filterLoader, setFilterLoader] = useState(false);
    const [carriersList, setCarriersList] = useState([]);
    const inputArr = {
        carriers: [],
        agents: [],
        validity: '',
        commodity: '',
        charge_currency: "INR",
        charges: [],
        d_timeSlot: [],
        a_timeSlot: [],
        stops_from: [],
    }
    const [filterDetails, setfilterDetails] = useState(inputArr);
    const { quote_selected_data, instantSearchResultCopy, instantInquiryId, instantSearchResult,airSearchData } = useSelector((state) => state.instantRate);
    const airResult = [];
    const dispatch = useDispatch();

    const navToggle = (tab) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
        // if (instantInquiryId !== '') {
        //     let url = `?ordering=${tab === 'preferred' ? 'PREFERRED' : tab === 'cheaper' ? 'CHEAPEST' : tab === 'faster' ? 'FASTEST' : 'DEFAULT'}&fclInquiryDetailId=${instantInquiryId}`;
        //     console.log(url);
        //     // dispatch(filterInstantSearchAction(url));
        // }
    };

    // right filter sidebar 
    const toggleRightCanvas = () => {
        setIsRight(!isRight);
    };

    const applyFilterHandler = () => {
        // let carrierIds = airSearchData?.map((item) => {
        //     if (filterDetails?.carriers?.includes(item.carrierName)) {
        //         return item.carrierId
        //     }
        // }).filter(Boolean);
        // let uniqueCarrierId = carrierIds.filter((value, index, self) => self.indexOf(value) === index);

        // let startDate = filterDetails?.validity[0] !== undefined ? moment(filterDetails?.validity[0]).format('YYYY-MM-DD') : '';
        // let endDate = filterDetails?.validity[1] !== undefined ? moment(filterDetails?.validity[1]).format('YYYY-MM-DD') : '';

        // let url = '?'
        // if (uniqueCarrierId.length > 0 || startDate || endDate || activeTab) {
        //     if (uniqueCarrierId.length > 0) {
        //         url += `carriers=${uniqueCarrierId}&`;
        //     }
        //     if (startDate !== '') {
        //         url += `startDate=${startDate}&`;
        //     }
        //     if (endDate !== '') {
        //         url += `endDate=${endDate}&`;
        //     }
        //     if (activeTab !== '') {
        //         url += `ordering=${activeTab === 'preferred' ? 'PREFERRED' : activeTab === 'cheaper' ? 'CHEAPEST' : activeTab === 'faster' ? 'FASTEST' : 'DEFAULT'}&`;
        //     }

        //     url += `fclInquiryDetailId=${instantInquiryId}`;
        // }
        // dispatch(filterInstantSearchAction(url));

        setTimeout(() => {
            // dispatch({ type: SEARCH_RESULT_FILTER_UPDATE, payload: { obj: filterDetails?.charges } });
            setIsRight(false);
        }, 1000);
    }
    console.log(airSearchData);
    const clearValueHandler = () => {
        // setFilterLoader(true);
        setfilterDetails(inputArr);
        let url = '?'
        if (activeTab) {
            if (activeTab !== '') {
                url += `ordering=${activeTab === 'preferred' ? 'PREFERRED' : activeTab === 'cheaper' ? 'CHEAPEST' : activeTab === 'faster' ? 'FASTEST' : 'DEFAULT'}&`;
            }
            url += `fclInquiryDetailId=${instantInquiryId}`;
        }
        console.log(url, "clear url");
        // dispatch(filterInstantSearchAction(url));
        setTimeout(() => {
            // dispatch({ type: CLEAR_SEARCH_RESULT_FILTER });
            setIsRight(false);
        }, 1000);
    }

    console.log(filterDetails, "filterDetails");
    return (
        <>
            <div className="search_result_wrap">
                <div className="length_wrap">
                    <span>{airSearchData?.length || 0} Search Results</span>

                    {searchResult && <button type="button" className='btn btn-primary ms-auto quote_btn' onClick={QuoteModalHandler}
                        disabled={quote_selected_data?.length === 0}>Quote Now</button>}
                </div>
                <div className="result_tab_wrap">
                    <Nav pills className="navtab-bg nav-justified">
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === 'all', })} onClick={() => { navToggle("all"); }} >
                                All
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === 'preferred', })} onClick={() => { navToggle("preferred"); }} >
                                Preferred
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === "cheaper", })} onClick={() => { navToggle("cheaper"); }} >
                                Cheaper
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={classnames({ active: activeTab === "faster", })} onClick={() => { navToggle("faster"); }} >
                                Faster
                            </NavLink>
                        </NavItem>
                        <NavItem className="filter_wrap">
                            <NavLink onClick={() => { toggleRightCanvas(); }} >
                                <img src={filter_icon} alt="filter" />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>

                {activeTab === 'all' ? (
                    <AirFreightCard data={airSearchData} QuoteModalHandler={QuoteModalHandler} mainTab={mainTab} bookModalHandler={bookModalHandler} />
                ) : mainTab === 'preferred' ? (
                    <AirFreightCard data={airSearchData} QuoteModalHandler={QuoteModalHandler} mainTab={mainTab} bookModalHandler={bookModalHandler} />
                ) : mainTab === "cheaper" ? (
                    <AirFreightCard data={airSearchData} QuoteModalHandler={QuoteModalHandler} mainTab={mainTab} bookModalHandler={bookModalHandler} />
                ) : (
                    <AirFreightCard data={airSearchData} QuoteModalHandler={QuoteModalHandler} mainTab={mainTab} bookModalHandler={bookModalHandler} />
                )}
            </div>
            {/* Filter Modal */}
            <AirFilterSearch isRight={isRight} filterLoader={filterLoader} toggleRightCanvas={toggleRightCanvas} filterDetails={filterDetails} setfilterDetails={setfilterDetails} applyFilterHandler={applyFilterHandler} clearValueHandler={clearValueHandler} carriersList={carriersList} />
        </>
    );
}

export default AirFreightResultComp;
