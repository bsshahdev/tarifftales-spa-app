import React, { useEffect, useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, UncontrolledDropdown } from 'reactstrap';

import { calendar_filled, cube_filled, delete_icon, filter_img, location_filled, pickup_icon, pickup_icon5, swap_arrow } from '../../assets/images';
import { optionFlightMode, weightUnitOption } from "../../common/data/sales";
import { useOutsideClick } from "../../components/Common/CommonLogic";
import { ToastWrapper, showErrorToast } from "../../components/Common/CustomToast";
import { GET_AIR_LOCATION_TYPE, UPDATE_INSTANT_RATE_SWAP, UPDATE_SEARCH_INSTANT_RATE_DATA, UPDATE_SEARCH_INSTANT_RATE_DATE, UPDATE_VALUE_BLANK } from "../../store/InstantRate/actionType";
import { getAllIncoTerms, getInstantRateLocation } from "../../store/InstantRate/actions";
import { getAllPartiesCustomerData } from "../../store/Parties/Customer/action";
import { instantAirFormValidate, instantFromValidate } from "./partials/ValidationForm";
import { optionBookingType } from "../../common/data/procurement";
import { GET_ALL_TENANT_CARGO_MODE } from "../../store/Procurement/actiontype";
const SearchForm = ({ activeTab, searchQuoteHandler, mainactiveTab }) => {
  let unitobj = {
    _standard1: 0,
    _standard2: 0,
    _high_cube1: 0,
    _high_cube2: 0,
    _refrigerated1: 0,
    _refrigerated2: 0,
  }
  let shipmentObj = {
    weight: '',
    v_weight: '',
    weight_unit: 'KG',
    array: [
      {
        no_unit: '',
        dimensions_l: '',
        dimensions_w: '',
        dimensions_h: '',
        dimensions_unit: 'CM',
        amount: '',
        mesure: ''
      }
    ]
  }
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [dropId, setDropId] = useState(false);
  const [subDropId, setSubDropId] = useState(false);
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const [containerData, setContainerData] = useState({
    containerArray: [], cargo_weight: {
      weight: { value: "MT", label: "MT", id: 7, version: 2 }
    }
  });
  const [classHazardous, setClassHazardous] = useState(0);
  const [unitValue, setUnitValue] = useState(unitobj);
  const [open, setOpen] = useState('1');
  const [shipmentDetails, setShipmentDetails] = useState(shipmentObj);
  const [formError, setFormError] = useState({});
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const { customer_data } = useSelector((state) => state?.customer)
  const { cargoType_data, container_data, UOM_weight_data, currency_data } = useSelector((state) => state?.globalReducer)
  const { searchForm, instantRateLocation, incoterm, airLocation } = useSelector((state) => state.instantRate);
  const { tenantCargoModeData } = useSelector((state) => state?.procurement);


  useEffect(() => {
    dispatch({ type: GET_ALL_TENANT_CARGO_MODE })
    if (activeTab === "FCL") {
      dispatch(getInstantRateLocation());
      dispatch(getAllIncoTerms());
    }
    if (["dom_air", "intl_Air"].includes(activeTab)) {
      dispatch({ type: GET_AIR_LOCATION_TYPE });
    }
    setFormError({});
    dispatch(getAllPartiesCustomerData());
  }, [dispatch, activeTab]);

  const locationOptions = instantRateLocation.map(location => ({
    value: location.id,
    label: `${location.code !== 'NA' ? location.code + '-' : ''}${location.name}`,
    locationType: location.locationType,
    code: location.code
  }));
  mainactiveTab === "ocean_freight" ? searchForm.cargo_type= cargoType_data.find(data=>data.transportMode=="OCEAN" && data.value=="GENERAL"):searchForm.cargo_type= cargoType_data.find(data=>data.transportMode=="AIR" && data.value=="GENERAL")
  const customerName = customer_data?.content?.map(customer => ({
    value: customer.id,
    label: customer.name,
    version: customer.version
  })) || [];

  const toggle = (id) => {
    if (open === id) {
      setOpen('');
    } else {
      setOpen(id);
    }
  };

  const handleChangeHandler = (item, name, blank, blank_name) => {
    if (blank) {
      dispatch({ type: UPDATE_VALUE_BLANK, payload: blank_name })
    }
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { item, name } });
  }

  // swap ---------------
  const swapHandler = () => {
    dispatch({ type: UPDATE_INSTANT_RATE_SWAP })
  }

  const handleDateChnage = (arr) => {
    let arrItem = "";
    if (arr?.length > 1) {
      arrItem = arr
      dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATE, payload: { arrItem } })
    } else {
      dispatch({ type: UPDATE_VALUE_BLANK, payload: 'cargo_date' })
    }
  }
  const handleSingleDateChange = (arr) => {
    let arrItem = arr;
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATE, payload: { arrItem } });
  }

  // container handle 
  const handleContainerChangeHandler = (item) => {
    let newArray = [...containerData?.containerArray];
    if (containerData?.containerArray?.some((obj) => obj?.id === item.id)) {
      let index = newArray.findIndex((obj) => obj.id === item.id);
      newArray[index] = item
    } else {
      newArray.push(item);
    }
    let updatedArray = [...newArray];
    setContainerData(prev => ({ ...prev, containerArray: updatedArray }));
  }
  const countPlusHandler = (e, rateId, item, name) => {
    e.stopPropagation();
    let count = Number(unitValue[rateId]);
    let newObj;
    let newReduxObj;
    if (count >= 0) {
      newObj = {
        ...unitValue,
        [rateId]: count + 1
      }
      setUnitValue(newObj);
      newReduxObj = {
        ...item,
        unitNew: newObj[rateId]
      }
      handleContainerChangeHandler(newReduxObj, name);
    }
  }
  const countMinusHandler = (e, rateId, item, name) => {
    e.stopPropagation();
    let count = Number(unitValue[rateId]);
    let newcount = count - 1;
    let newObj;
    let newReduxObj;
    if (count >= 1) {
      newObj = {
        ...unitValue,
        [rateId]: count - 1
      }
      setUnitValue(newObj);
      newReduxObj = {
        ...item,
        unitNew: newObj[rateId]
      }
      handleContainerChangeHandler(newReduxObj, name);
    }

    if (newcount === 0) {
      let newArray = [...containerData?.containerArray];
      let updatedArray = newArray.filter((obj) => obj.id !== item.id);
      setContainerData(prev => ({ ...prev, containerArray: updatedArray }));
    }
  }

  const handleQuantity = (e, rateId, item, name) => {
    e.stopPropagation();
    let newObj = {
      ...unitValue,
      [rateId]: Math.abs(e.target.value)
    }
    setUnitValue(newObj);
    let newReduxObj = {
      ...item,
      unitNew: newObj[rateId]
    }
    handleContainerChangeHandler(newReduxObj, name);
  }

  const containerConfirmHandler = () => {
    console.log(containerData, "containerData");
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { name: "container_type", item: { ...containerData } } });
    setIsOpen(false);
  }

  // shipment handle 
  const AddLoadHandler = () => {
    let newList = [...shipmentDetails.array, {
      no_unit: '',
      dimensions_l: '',
      dimensions_w: '',
      dimensions_h: '',
      dimensions_unit: 'CM',
      amount: '',
      mesure: ''
    }];
    setShipmentDetails(s => {
      return {
        ...s,
        array: newList
      }
    })
  }
  const shipmentDetailsValHandler = (val, name, index, isarray) => {
    if (isarray) {
      const list = [...shipmentDetails.array];
      if (name === 'weight_unit') {
        if (val === 'KG') {
          list[index].dimensions_unit = 'CM'
        }
        if (val === 'Lbs') {
          list[index].dimensions_unit = 'IN'
        }
      }
      list[index][name] = val;

      setShipmentDetails({ ...shipmentDetails, array: list });
    } else {
      let obj = { ...shipmentDetails, [name]: val };
      setShipmentDetails(obj);
    }
  }

  const calculateCBM = () => {
    let arrayList = [...shipmentDetails?.array];
    if (arrayList.length === 0) return 0
    if (arrayList !== undefined) {
      for (let index = 0; index < arrayList.length; index++) {
        let lval = Number(arrayList[index]?.dimensions_l);
        let wval = Number(arrayList[index]?.dimensions_w);
        let hval = Number(arrayList[index]?.dimensions_h);

        if (shipmentDetails?.weight_unit === 'KG') {
          if (arrayList[index]?.dimensions_unit === 'MM') {
            let amount = (lval * wval * hval) / 100000
            let cbmAmount = (amount / 6000) * Number(arrayList[index]?.no_unit)
            arrayList[index].amount = cbmAmount.toFixed(2);

          } else {
            let amount = (lval * wval * hval)
            let cbmAmount = (amount / 6000) * Number(arrayList[index]?.no_unit)
            arrayList[index].amount = cbmAmount.toFixed(2);
          }
        } else {
          let lvalFeet = lval / 12  //convert inches into feet
          let wvalFeet = wval / 12  //convert inches into feet
          let hvalFeet = hval / 12  //convert inches into feet
          let cftAmount = (lvalFeet * wvalFeet * hvalFeet) * Number(arrayList[index]?.no_unit)
          arrayList[index].amount = cftAmount.toFixed(2);
        }
      }
    }
    let totalVw = arrayList?.reduce((a, b) => a + Number(b?.amount), 0)

    setShipmentDetails({ ...shipmentDetails, v_weight: totalVw, array: arrayList });
  }
  const confirmHandler = () => {
    calculateCBM();
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { name: 'shipment_details', item: shipmentDetails } });
    setIsOpen(false);
  }
  const removeInputFields = (index) => {
    const rows = [...shipmentDetails.array];
    rows.splice(index, 1);
    setShipmentDetails({ ...shipmentDetails, array: rows });
    dispatch({ type: UPDATE_SEARCH_INSTANT_RATE_DATA, payload: { name: 'shipment_details', item: { ...shipmentDetails, array: rows } } });
  }

  const searchHandler = () => {
    let validateData = {};
    if (activeTab === 'FCL') {
      validateData = instantFromValidate(searchForm);
      setFormError(validateData?.error || {});
    } else {
      validateData = instantAirFormValidate(searchForm);
      setFormError(validateData?.error || {});
    }
    if (validateData?.isValid) {
      searchQuoteHandler();
    } else {
      showErrorToast("Please fill all required fields.");
    }
  }

  // ------------ custom dropdown -------------------
  const toggleDropdown = (id) => {
    setIsOpen(!isOpen);
    setDropId(id);
  };
  const toggleSubDropdown = (id) => {
    setIsSubOpen(!isSubOpen);
    setSubDropId(id);
  };
  useOutsideClick(dropdownRef, setIsOpen);
  // ------------ custom dropdown ------------------- 

  return (
    <>
      <div className="create_sales_search_forms">
        {/* Port From && To */}
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12 col-xl-8 col-xxl-6 mt-2">
            <div className="d-flex flex-column">
              <div className="d-flex position-relative w-100 quotation_select_port_wrap">
                <div className={`quotation_from_wrap focus_custom_div ${formError?.location_from ? 'error' : ''}`} tabIndex={0}>
                  <div className={`common_dropdwon_btn_wrap`}>
                    <div id="more_menu" className={`location_wrap d-flex justify-content-center align-items-center`} >
                      <div className="icon me-3 d-flex align-items-center justify-content-center">
                        <img className="location_img" src={location_filled} alt="Location" />
                      </div>
                      <div className="con">
                        <label className="form-label" htmlFor="location_from">From</label>
                        <Select
                          value={searchForm?.location_from}
                          name="address"
                          id="location_from"
                          onChange={(opt) => {
                            handleChangeHandler(opt, "location_from");
                          }}
                          options={activeTab === "FCL" ? locationOptions : ['dom_air', 'intl_Air'].includes(activeTab) ? airLocation : []}
                          formatOptionLabel={({ label, code, locationType }) => (
                            <div className="d-flex align-items-center">
                              <span className="me-1"><img src={locationType === "CITY" ? pickup_icon5 : pickup_icon} alt="Location" /></span>
                              <span>{label}</span>
                            </div>
                          )}
                          isOptionDisabled={(option) => option.value === searchForm?.location_to?.value}
                          placeholder="Select Location"
                          menuPlacement="auto"
                          classNamePrefix="select2-selection form-select"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* swap button */}
                <button type="button" className="swap_btn_wrap" onClick={swapHandler}>
                  <img src={swap_arrow} alt="Swap Arrow" />
                </button>

                {/* quotation_to_wrap */}
                <div className={`quotation_to_wrap focus_custom_div ${formError?.location_to ? 'error' : ''}`} tabIndex={0}>
                  <div className="common_dropdwon_btn_wrap">
                    <div id="more_menu" className={`location_wrap d-flex justify-content-center align-items-center`} >
                      <div className="icon me-3 d-flex align-items-center justify-content-center">
                        <img className="location_img" src={location_filled} alt="Location" />
                      </div>
                      <div className="con">
                        <label className="form-label">To</label>
                        <Select
                          value={searchForm?.location_to}
                          name="address"
                          onChange={(opt) => {
                            handleChangeHandler(opt, "location_to");
                          }}
                          options={activeTab === "FCL" ? locationOptions : ['dom_air', 'intl_Air'].includes(activeTab) ? airLocation : []}
                          formatOptionLabel={({ label, code, locationType }) => (
                            <div className="d-flex align-items-center">
                              <span className="me-1"><img src={locationType === "CITY" ? pickup_icon5 : pickup_icon} alt="Location" /></span>
                              <span>{label}</span>
                            </div>
                          )}
                          placeholder="Select Location"
                          isOptionDisabled={(option) => option.value === searchForm?.location_from?.value}
                          classNamePrefix="select2-selection form-select"
                          menuPlacement="auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* container details */}
          {activeTab === "FCL" &&
            <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
              <div className={`common_dropdwon_btn_wrap focus_custom_div`} tabIndex={0}>
                <div id="more_menu" className={`prof_wrap d-flex justify-content-between ${formError?.containerArray || formError?.cargo_weight ? 'error' : ''}`} onClick={() => { toggleDropdown(11); }} >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img src={cube_filled} alt="Avatar" />
                  </div>
                  <div className="con">
                    <label className="form-label">Container Type</label>
                    <span className={`value ${Object.keys(searchForm?.container_type)?.length !== 0 ? "value_focus" : ""}`} >
                      {Object.keys(searchForm?.container_type).length !== 0 ? (
                        <>
                          {searchForm?.container_type?.containerArray?.map((item, index) => (
                            <span key={item.id}>
                              {item?.unitNew !== 0 ? ` ${item?.label},` : null}
                              {/* {item?.unitNew !== 0 ? ` ${item?.label}, unit: "${item?.unitNew}",` : null} */}
                            </span>
                          ))
                          }
                          {searchForm?.container_type?.cargo_weight?.value !== undefined && searchForm?.container_type?.cargo_weight?.value !== '' ? ` weight: ${searchForm?.container_type?.cargo_weight?.value} ${searchForm?.container_type?.cargo_weight?.weight?.value || ''}` : ''
                          }
                        </>
                      ) : "Container Details"}
                    </span>
                  </div>
                  <i className="mdi mdi-chevron-down" />
                </div>
                {isOpen && dropId === 11 ? (
                  <div className={`searchform container_combine_drop_wrap common_dropdown_wrap container_drop_wrap focus_custom_div`} ref={dropdownRef} tabIndex={0}>
                    {/* select unit   */}
                    <label className="form-label">Container Type</label>
                    <div className="inner mb-2">
                      <UncontrolledDropdown>
                        <DropdownToggle className={`shadow-none prof_wrap1 w-100 d-flex justify-space-between ${formError?.containerArray ? 'error' : ''}`} tag="div">
                          <div className="con">
                            <span className={`value ${containerData?.containerArray?.length !== 0 ? "value_focus" : ""}`} >
                              {containerData?.containerArray?.length !== 0
                                ? containerData?.containerArray?.map((item) => (
                                  <span key={item.id}>
                                    {item?.unitNew !== 0 ? ` ${item?.label}, unit: "${item?.unitNew}",` : null}
                                  </span>
                                ))
                                : "Select Container Type"}
                            </span>
                          </div>
                          <i className="mdi mdi-chevron-down" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end quantity_drop_wrap">
                          {(container_data || []).slice(0).reverse().map(({ id, value, label, version, size, rateId }) => (
                            <DropdownItem key={id} className={`${searchForm?.container_type?.containerArray?.value === value ? "active" : ""}`} tag="div">
                              <div className="custom-option">
                                <p>{label}</p>
                                <div className="quantity_wrap">
                                  <button
                                    type="button"
                                    className="minus"
                                    onClick={(e) => {
                                      countMinusHandler(e, rateId, { id, value, label, version, size, rateId }, 'container_type');
                                    }}
                                  >
                                    <i className="fas fa-minus"></i>{" "}
                                  </button>
                                  <input
                                    type="number"
                                    name={`${rateId}_unit`}
                                    id={`${rateId}_unit`}
                                    value={containerData?.containerArray?.find((item) => item.label === label)?.unitNew || 0}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      handleQuantity(e, rateId, { id, value, label, version, size, rateId }, 'container_type');
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="plus"
                                    onClick={(e) => {
                                      countPlusHandler(e, rateId, { id, value, label, version, size, rateId }, 'container_type');
                                    }}
                                  >
                                    <i className=" fas fa-plus"></i>{" "}
                                  </button>
                                </div>
                              </div>
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                    {/* select unit   */}

                    {/* select weight  */}
                    <div className="inner_field_wrap">
                      <label className="form-label">Weight</label>
                      <div className={`prof_wrap number_field_wrap d-flex mb-2 ${formError?.cargo_weight ? 'error' : ''}`}>
                        <div className="con d-flex align-items-center w-100">
                          <div className="left_field">
                            <input
                              type="number"
                              value={containerData?.cargo_weight?.value || ''}
                              name="cargo_weight" id="cargo_weight"
                              placeholder='Enter weight'
                              onChange={(e) => { setContainerData({ ...containerData, cargo_weight: { ...containerData?.cargo_weight, value: e.target.value } }) }}
                            />
                          </div>
                          <div className="common_dropdwon_btn_wrap bottom_drop_field">
                            <div
                              id='more_menu'
                              className={`d-flex align-items-center ${isSubOpen && subDropId === 8 ? 'openmenu' : ''}`}
                              onClick={() => { toggleSubDropdown(8) }}
                            >
                              <span>{containerData?.cargo_weight?.weight?.value} </span>
                              <i className="mdi mdi-chevron-down" />
                            </div>
                            {isSubOpen && subDropId === 8 ?
                              <ul className="common_dropdown_wrap quantity_drop_wrap">
                                {(UOM_weight_data || '')?.map((item, index) => (
                                  <li key={index} className={`${searchForm?.container_type?.cargo_weight?.weight?.value === item?.value ? 'active' : ''}`} onClick={() => { setContainerData({ ...containerData, cargo_weight: { ...containerData?.cargo_weight, weight: item } }); setIsSubOpen(false); }}>
                                    {item?.label}
                                  </li>
                                ))}
                              </ul> : null
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* select weight  */}

                    <div className="d-flex justify-content-center mt-3">
                      <button type="button" className="btn btn-primary" onClick={containerConfirmHandler} > Confirm </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          }

          {/* Shipment Details */}
          {["LCL", "intl_Air", "Land", "dom_air"].includes(activeTab) &&
            <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
              <div className="common_dropdwon_btn_wrap container_combine_drop_wrap shipment_details_wrap focus_custom_div" tabIndex={0}>
                <div id="more_menu" className={`prof_wrap d-flex ${formError?.shipment_details || formError?.weight ? 'error' : ''}`} onClick={() => { toggleDropdown(11); }} >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img src={cube_filled} alt="Avatar" />
                  </div>
                  <div className="con">
                    <label className="form-label">Shipment Details</label>
                    <span className={`value ${Object.keys(searchForm?.shipment_details || {})?.length !== 0 ? "value_focus" : ""}`} >
                      {Object.keys(searchForm?.shipment_details || {})?.length !== 0 ? (
                        <>
                          {searchForm?.shipment_details.array[0]?.no_unit} Pieces |{" "}
                          {Number(searchForm?.shipment_details?.weight)}{" "}
                          {searchForm?.shipment_details?.weight_unit}
                          {` | ${shipmentDetails?.array?.reduce((a, b) => a + Number(b?.amount), 0)} cbm` || ""}
                          {/* {Number(searchForm?.shipment_details[0]?.no_unit) *
                            Number(searchForm?.shipment_details[0]?.weight)}{" "} */}
                        </>
                      ) : (
                        "Shipment Details"
                      )}
                    </span>
                  </div>
                  <i className="mdi mdi-chevron-down" />
                </div>
                {isOpen && dropId === 11 ? (
                  <div
                    className="searchform common_dropdown_wrap container_drop_wrap"
                    ref={dropdownRef}
                  >
                    <div className="field_wrap mb-2">
                      <div className="input_field field_dropdown">
                        <label htmlFor={`weight`} className="form-label" > Actual Weight </label>
                        <input
                          type="number"
                          value={shipmentDetails.weight || ""}
                          className="form-control"
                          id={`weight`}
                          onChange={(e) => {
                            shipmentDetailsValHandler(e.target.value, "weight");
                          }}
                        />
                        <UncontrolledDropdown>
                          <DropdownToggle className="btn btn-link" tag="a" >
                            {shipmentDetails.weight_unit}
                            <i className="mdi mdi-chevron-down" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            {(weightUnitOption || "").map((item) => (
                              <DropdownItem
                                key={item?.value}
                                onClick={() => {
                                  shipmentDetailsValHandler(item?.name, "weight_unit");
                                }}
                              >
                                {item?.name}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="input_field field_dropdown">
                        <label htmlFor={`v_weight`} className="form-label" >Vol. weight </label>
                        <input
                          type="number"
                          value={shipmentDetails?.array?.reduce((a, b) => a + Number(b?.amount), 0) || 0}
                          className="form-control"
                          id={`v_weight`}
                          disabled
                        />
                        <UncontrolledDropdown>
                          <DropdownToggle className="btn btn-link" tag="a" disabled>
                            {shipmentDetails.weight_unit}
                            <i className="mdi mdi-chevron-down" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            {(weightUnitOption || "").map((item) => (
                              <DropdownItem
                                key={item?.value}
                                onClick={() => {
                                  shipmentDetailsValHandler(item?.name, "weight_unit");
                                }}
                              >
                                {item?.name}
                              </DropdownItem>
                            ))}
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </div>
                    {shipmentDetails.array.length !== 0 && (
                      <Accordion flush open={open} toggle={toggle}>
                        {(shipmentDetails.array || [])?.map((item, index) => (
                          <AccordionItem key={index}>
                            <AccordionHeader targetId={`${index + 1}`}>
                              Load {index + 1}
                              <span className="p-0 ms-auto" onClick={() => { removeInputFields(index); }} >
                                <img src={delete_icon} alt="Delete" />
                              </span>
                            </AccordionHeader>
                            <AccordionBody accordionId={`${index + 1}`}>
                              <div className="field_wrap">
                                <div className="input_field">
                                  <label htmlFor={`no_unit_${index}`} className="form-label" > No. Of Pieces </label>
                                  <input
                                    type="number"
                                    value={item.no_unit || ""}
                                    className="form-control"
                                    id={`no_unit_${index}`}
                                    onChange={(e) => {
                                      shipmentDetailsValHandler(e.target.value, "no_unit", index, true);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="dimention_field mt-3">
                                <p className="form-label">
                                  Dimensions (L×W×H per unit)
                                </p>
                                <div className="input_field_wrap d-flex">
                                  <div className="input_field dimention_l">
                                    <input
                                      type="number"
                                      value={item.dimensions_l || ""}
                                      className="form-control"
                                      id={`dimensions_l_${index}`}
                                      onChange={(e) => {
                                        shipmentDetailsValHandler(e.target.value, "dimensions_l", index, true);
                                      }}
                                    />
                                  </div>
                                  <div className="input_field dimention_w">
                                    <input
                                      type="number"
                                      value={item.dimensions_w || ""}
                                      className="form-control"
                                      id={`dimensions_w_${index}`}
                                      onChange={(e) => {
                                        shipmentDetailsValHandler(e.target.value, "dimensions_w", index, true);
                                      }}
                                    />
                                  </div>
                                  <div className="input_field dimention_h">
                                    <input
                                      type="number"
                                      value={item.dimensions_h || ""}
                                      className="form-control"
                                      id={`dimensions_h_${index}`}
                                      onChange={(e) => {
                                        shipmentDetailsValHandler(e.target.value, "dimensions_h", index, true);
                                      }}
                                    />
                                  </div>
                                  <div className="input_field">
                                    <UncontrolledDropdown>
                                      <DropdownToggle className="btn btn-link dimention_drop d-flex justify-content-between" tag="a" >
                                        {item.dimensions_unit}
                                        <i className="mdi mdi-chevron-down" />
                                      </DropdownToggle>
                                      <DropdownMenu className="dropdown-menu-end">
                                        <DropdownItem
                                          className={`${shipmentDetails.weight_unit === "KG" ? "disabled" : ""}`}
                                          onClick={() => {
                                            shipmentDetailsValHandler("IN", "dimensions_unit", index, true);
                                          }}
                                        > IN </DropdownItem>
                                        <DropdownItem
                                          className={`${shipmentDetails.weight_unit === "Lbs" ? "disabled" : ""}`}
                                          onClick={() => {
                                            shipmentDetailsValHandler("CM", "dimensions_unit", index, true);
                                          }}
                                        > CM </DropdownItem>
                                        <DropdownItem
                                          className={`${shipmentDetails.weight_unit === "Lbs" ? "disabled" : ""}`}
                                          onClick={() => {
                                            shipmentDetailsValHandler("MM", "dimensions_unit", index, true);
                                          }}
                                        > MM </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </div>
                                </div>
                              </div>
                            </AccordionBody>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                    <div className="btn_wrap d-flex justify-content-end">
                      <button type="button" className="btn border_btn" onClick={() => { calculateCBM(); AddLoadHandler(); }} > Add Another Load </button>
                      <button type="button" className="btn btn-primary" onClick={confirmHandler} > Confirm </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>}

          {/* Cargo Ready Date */}
          <div className={`col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2 air_cargo_date ${mainactiveTab === "air_freight" ? "active" : ""}`}>
            <div className={`prof_wrap calendar_field_wrap d-flex ${formError?.cargo_date ? "error" : ""}`}>
              <div className="icon d-flex align-items-center justify-content-center">
                <img src={calendar_filled} alt="Avatar" />
              </div>
              <div className="con">
                <label className="form-label">Cargo Ready Date</label>
                <Flatpickr
                  value={searchForm?.cargo_date}
                  className="form-control d-block"
                  placeholder="Select Date"
                  options={{
                    altFormat: "F j, Y",
                    dateFormat: "Y-m-d",
                    minDate: "today"
                  }}
                  onChange={handleSingleDateChange}
                  tabIndex={0}
                />
              </div>
            </div>
          </div>
          <div className={`col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2 ocean_cargo_date ${mainactiveTab === "ocean_freight" ? "active" : ""}`}>
            <div className={`prof_wrap calendar_field_wrap d-flex focus_custom_div ${formError?.cargo_date ? "error" : ""}`}>
              <div className="icon d-flex align-items-center justify-content-center">
                <img src={calendar_filled} alt="Avatar" />
              </div>
              <div className="con">
                <label className="form-label">Cargo Ready Date</label>
                <Flatpickr
                  value={searchForm?.cargo_date}
                  className="form-control d-block"
                  placeholder="Select Date"
                  options={{
                    mode: "range",
                    dateFormat: "Y-m-d",
                    minDate: "today"
                  }}
                  onChange={handleDateChnage}
                  tabIndex={0}
                />
              </div>
            </div>
          </div>

          {/* booking mode */}
          {mainactiveTab === "air_freight" && (
            <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
              <div className="common_dropdwon_btn_wrap bottom_drop_field incoterm_field_wrap focus_custom_div" >
                <div
                  id="more_menu"
                  className={`prof_wrap d-flex justify-content-between ${isOpen && dropId === 6 ? "openmenu" : ""}`}
                  onClick={() => { toggleDropdown(6); }}
                >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img src={cube_filled} alt="Avatar" />
                  </div>
                  <div className="con">
                    <label className="form-label">Booking Mode</label>
                    {console.log(searchForm?.bookingMode)}
                    <Select
                      value={searchForm?.bookingMode || {value:"MAWB",label:"MAWB"}}
                      name="bookingMode"
                      onChange={(opt) => {
                        handleChangeHandler(opt, "bookingMode");
                      }}
                      options={optionBookingType || []}
                      placeholder="Select Booking Mode"
                      classNamePrefix="select2-selection form-select"
                      menuPlacement="auto"
                    />
                  </div>
                  <i className="mdi mdi-chevron-down" />
                </div>
              </div>
            </div>
          )}
          {/* Customer Name */}
          {mainactiveTab === "ocean_freight" && (
            <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
              <div className={`common_dropdwon_btn_wrap bottom_drop_field incoterm_field_wrap focus_custom_div`} tabIndex={0}>
                <div
                  id="more_menu"
                  className={`prof_wrap d-flex justify-content-between ${isOpen && dropId === 6 ? "openmenu" : ""}  ${formError?.customerName ? "error" : ""}`}
                  onClick={() => { toggleDropdown(6); }}
                >
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img src={cube_filled} alt="Avatar" />
                  </div>
                  <div className="con">
                    <label className="form-label">Customer Name</label>
                    <Select
                      value={searchForm?.customerName || ""}
                      name="customerName"
                      onChange={(opt) => {
                        handleChangeHandler(opt, "customerName");
                      }}
                      options={customerName?.length !== 0 ? customerName : []}
                      placeholder="Select Customer"
                      classNamePrefix="select2-selection form-select"
                      menuPlacement="auto"
                    />
                  </div>
                  <i className="mdi mdi-chevron-down" />
                </div>
              </div>
            </div>
          )}

          {/* Advanced Search */}
          {advanceSearch && (
            <>
              {mainactiveTab === "air_freight" && (
                <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                  <div className="common_dropdwon_btn_wrap bottom_drop_field incoterm_field_wrap focus_custom_div" tabIndex={0}>
                    <div
                      id="more_menu"
                      className={`prof_wrap d-flex justify-content-between ${isOpen && dropId === 6 ? "openmenu" : ""}`}
                      onClick={() => { toggleDropdown(6); }}
                    >
                      <div className="icon d-flex align-items-center justify-content-center">
                        <img src={cube_filled} alt="Avatar" />
                      </div>
                      <div className="con">
                        <label className="form-label">Customer Name</label>
                        <Select
                          value={searchForm?.customerName || ""}
                          name="customerName"
                          onChange={(opt) => {
                            handleChangeHandler(opt, "customerName");
                          }}
                          options={customerName?.length !== 0 ? customerName : []}
                          placeholder="Select Customer"
                          classNamePrefix="select2-selection form-select"
                          menuPlacement="auto"
                        />
                      </div>
                      <i className="mdi mdi-chevron-down" />
                    </div>
                  </div>
                </div>
              )}

              {/* cargo type */}
              <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                <div className="common_dropdwon_btn_wrap bottom_drop_field focus_custom_div" tabIndex={0}>
                  <div id='more_menu' className={`prof_wrap d-flex ${isOpen && dropId === 7 ? 'openmenu' : ''}`} onClick={() => { toggleDropdown(7) }} >
                    <div className="icon d-flex align-items-center justify-content-center">
                      <img src={cube_filled} alt="Avatar" />
                    </div>
                    <div className="con">
                      <label className="form-label">Cargo Type</label>
                      <span className={`value ${searchForm?.cargo_type?.label ? 'value_focus' : ''}`}>
                        {(searchForm?.cargo_type?.label || 'Select Cargo Type')}
                        {searchForm?.cargo_type?.value?.toLowerCase() === 'hazardous' && classHazardous !== 0 ? (
                          <>
                            , class: {classHazardous}
                          </>
                        ) : ''}
                      </span>
                    </div>
                    <i className="mdi mdi-chevron-down" />
                  </div>
                  {isOpen && dropId === 7 ?
                    <ul className="common_dropdown_wrap quantity_drop_wrap" ref={dropdownRef}>
                      {(mainactiveTab === "ocean_freight"?cargoType_data.filter(data=>data.transportMode=="OCEAN"):cargoType_data.filter(data=>data.transportMode=="AIR") || '').map(({ value, label, version, id }, index) => (
                        <li key={index}
                          className={`${searchForm?.cargo_type?.value === value ? 'active' : ''}`}
                          onClick={() => { handleChangeHandler({ value, label, id, version }, 'cargo_type', true, 'container_type'); if (value !== 'HAZARDOUS') { setIsOpen(false); setClassHazardous(0) } }}>
                          <div className="custom-option">
                            <p>{label}</p>
                            {value === 'HAZARDOUS' && (
                              <div className='d-flex ms-auto'>
                                <p className='me-2'>class:</p>
                                <div className="quantity_wrap">
                                  <button className="minus" onClick={() => { setClassHazardous(prev => prev >= 1 ? prev - 1 : 0) }}> <i className='fas fa-minus'></i> </button>
                                  <input type="number" name={`${value}_class`} id={`${value}_class`} value={classHazardous} onChange={(e) => { setClassHazardous(e.target.value) }} />
                                  <button className="plus" onClick={() => { setClassHazardous(prev => prev <= 8 ? prev + 1 : prev) }}> <i className=' fas fa-plus'></i> </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul> : null
                  }
                </div>
              </div>

              {/* Incoterm */}
              {mainactiveTab === "ocean_freight" && (
                <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                  <div className="common_dropdwon_btn_wrap bottom_drop_field incoterm_field_wrap focus_custom_div" tabIndex={0}>
                    <div
                      id="more_menu"
                      className={`prof_wrap d-flex justify-content-between ${isOpen && dropId === 6 ? "openmenu" : ""}`}
                      onClick={() => { toggleDropdown(6); }}
                    >
                      <div className="icon d-flex align-items-center justify-content-center">
                        <img src={cube_filled} alt="Avatar" />
                      </div>
                      <div className="con">
                        <label className="form-label">Incoterm</label>
                        {/* <Input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."
                          onChange={(e) => {handleChangeHandler(e.target.value, "incoterm");}}
                          />
                        <datalist id="datalistOptions">
                          {optionIncoterm ? optionIncoterm?.map((item,index) => (                          
                            <option value={item?.label} key={index} />
                          )) : <option value="No Option" />}                         
                        </datalist> */}
                        <Select
                          value={searchForm?.incoterm}
                          name="address"
                          onChange={(opt) => {
                            handleChangeHandler(opt, "incoterm");
                          }}
                          options={incoterm || []}
                          placeholder="Select Incoterm"
                          classNamePrefix="select2-selection form-select"
                          menuPlacement="auto"
                        />
                      </div>
                      <i className="mdi mdi-chevron-down" />
                    </div>
                  </div>
                </div>
              )}

              {/* Flight Mode */}
              {activeTab === 'dom_air' && (
                <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                  <div className="common_dropdwon_btn_wrap bottom_drop_field incoterm_field_wrap focus_custom_div" tabIndex={0}>
                    <div
                      id="more_menu"
                      className={`prof_wrap d-flex justify-content-between ${isOpen && dropId === 6 ? "openmenu" : ""}`}
                      onClick={() => { toggleDropdown(6); }}
                    >
                      <div className="icon d-flex align-items-center justify-content-center">
                        <img src={cube_filled} alt="Avatar" />
                      </div>
                      <div className="con">
                        <label className="form-label">Flight Type</label>
                        <Select
                          value={searchForm?.flight_mode || ''}
                          name="flight_mode"
                          onChange={(opt) => {
                            handleChangeHandler(opt, "flight_mode");
                          }}
                          options={tenantCargoModeData || []}
                          placeholder="Select Mode"
                          classNamePrefix="select2-selection form-select"
                          menuPlacement="auto"
                        />
                      </div>
                      <i className="mdi mdi-chevron-down" />
                    </div>
                  </div>
                </div>
              )}

              {/* Cargo Value */}
              <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mt-2">
                <div className="prof_wrap number_field_wrap d-flex focus_custom_div" tabIndex={0}>
                  <div className="icon d-flex align-items-center justify-content-center">
                    <img src={cube_filled} alt="Avatar" />
                  </div>
                  <div className="con d-flex align-items-center justify-content-between w-100">
                    <div className="left_field">
                      <label htmlFor="cargo_value" className="form-label"> Cargo Value </label>
                      <input
                        type="number"
                        value={searchForm?.cargo_value?.value || ""}
                        name="cargo_value"
                        id="cargo_value"
                        placeholder="Enter amount"
                        onChange={(e) => {
                          handleChangeHandler({ ...searchForm?.cargo_value, value: e.target.value }, "cargo_value");
                        }}
                      />
                    </div>
                    <div className="common_dropdwon_btn_wrap bottom_drop_field currency_field_wrap">
                      <Select
                        id="more_menu"
                        value={searchForm?.cargo_value?.currency}
                        options={currency_data ? currency_data?.map(({ value, currencyCode, id, version }) => ({ value, label: currencyCode, currencyCode, id, version })) : []}
                        // options={optionCurrency.map(({ value, name, code }) => ({ value, label: name, code }))}
                        onChange={(selectedOption) => {
                          handleChangeHandler({ ...searchForm?.cargo_value, currency: selectedOption }, "cargo_value");
                        }}
                        isSearchable
                        placeholder={searchForm?.cargo_value?.currency?.currencyCode || "Select Currency"}
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            maxWidth: '150px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }),
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternate */}
              {mainactiveTab === "ocean_freight" && (
                <div className="col-12 col-md-6 col-lg-6 col-xl-3 col-xxl-2 mt-2">
                  <div className="d-flex py-2">
                    <span className="me-2">Show Alternate Route</span>
                    <div className="switch_wrap">
                      <FormGroup switch>
                        <Input
                          type="switch"
                          checked={searchForm?.alternate_route || false}
                          onChange={(e) => {
                            handleChangeHandler(!searchForm?.alternate_route, "alternate_route");
                          }}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="col-12 col-md-6 col-lg-6 col-xl-3 col-xxl-3 mt-2 align-self-center">
            <button className="btn p-0 me-3 border-0" onClick={() => { setAdvanceSearch(!advanceSearch) }}><img src={filter_img} alt="filter" width={'20px'} height={'20px'} /></button>
            <button type="button" className='btn btn-primary mt-0' onClick={() => { searchHandler(); }}
            >Search</button>
          </div>
        </div>
      </div>
      <ToastWrapper />
    </>
  );
};

export default SearchForm;
