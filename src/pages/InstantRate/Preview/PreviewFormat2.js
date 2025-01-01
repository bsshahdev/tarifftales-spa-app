import React from 'react';
import PreviewCommonTable from './PreviewCommonTable';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../components/Common/CommonLogic';
import { sitelogo } from '../../../assets/images';
import { Link } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

const PreviewFormat2 = ({ customerInfo }) => {
    const mainChargeObj = useSelector((state) => state?.quotation?.mainChargeObj);
    const { searchForm, $instantActiveTab,instantInquiryId,quote_selected_data } = useSelector((state) => state?.instantRate);
    const { tenant_info } = useSelector((state) => state?.settings);

    const getHTML = (data) => {
        // const contentStateVar = contentState.getCurrentContent();
        // const rawContentState = convertToRaw(contentStateVar);
        const html = draftToHtml(data);
        return { __html: html };
    };

    return (
        <>
            <div className="common_bg_wrap preview_top_details preview_format2">
                <p className='mb-2 text-center'><b className='me-1'>Preview Format:</b> 2</p>

                <div className="row">
                    <div className="col-8">
                        <div className="preview_top_details d-flex justify-content-between mb-3 mt-4">
                            <div className="left_details">
                                <h2>Quotation Document</h2>
                                <div className='address'>
                                    {customerInfo?.address || '-'}
                                    {/* <p>SWENLOG SUPPLY CHAIN SOLUTION PVT LTD</p>
                                    <p>205, 1ST FLOOR, D CROSS EAST OF NGEF, KASTURI NAGARQ.. </p>
                                    <p>560043 BANGALORE</p>
                                    <p>INDIA</p> */}
                                </div>
                                {/* <p><b className='me-1'>Quotation:</b> #Q12345678</p> */}
                            </div>
                            <div className="right_logo">
                                <img src={tenant_info?.logo || sitelogo} alt="logo" onError={e => { e.target.src = sitelogo }} />
                                <p className='text-end mt-2'>{formatDate(new Date())}</p>
                            </div>
                        </div>
                        <div className="preview_customer_details my-4">
                            <p>Dear {customerInfo?.name || '-'},</p>
                            <p>Thank you for your recent enquiry. Hapag-Lloyd is pleased to make you the following offer, for which please find our rates and further details below.</p>
                            <p>Offer expires on: <b>July 9th 2024</b></p>
                            <p>Our quotation is valid until the above mentioned offer expiry date. We reserve the right to review and re-quote, if we do not receive any booking prior to above mentioned offer expiry date.</p>
                        </div>

                        <div className="preview_table_wrap">
                            <table>
                                <caption><p className='d-flex justify-content-between align-items-center'>Commodities</p></caption>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Package Type</th>
                                        <th>Gross Weight</th>
                                        <th>Volume(CBM)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Commodities</td>
                                        <td>-</td>
                                        <td>{$instantActiveTab?.sub === "dom_air" ? searchForm?.shipment_details?.weight || 0 : searchForm?.container_type?.cargo_weight?.value || 0} {$instantActiveTab?.sub === "dom_air" ? searchForm?.shipment_details?.weight_unit : searchForm?.container_type?.cargo_weight?.weight?.value || ''}</td>
                                        <td>{$instantActiveTab?.sub === "dom_air" ? searchForm?.shipment_details?.v_weight || 0 : 0}</td>
                                        {/* <td>100xBox(s)(40x40x40 CM)</td>
                                                <td>12,000 KG</td>
                                                <td>6.4</td> */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* {quote_selected_data?.length !== 0 ? quote_selected_data?.map((data) => (<PreviewCommonTable data={data} key={data.quote_id} newData={mainChargeObj.find(obj => obj.id === data.quote_id) || []} tab={$instantActiveTab} />)) : null} */}
                        {quote_selected_data?.length !== 0 ? quote_selected_data?.slice(0,1)?.map((data) => (<PreviewCommonTable data={data} key={data.quote_id} newData={mainChargeObj.find(obj => obj.id === data.quote_id) || []} tab={$instantActiveTab} />)) : null}

                        <div className='my-4 editor_details'>
                            <div dangerouslySetInnerHTML={getHTML(quote_selected_data?.[0]?.remarks || '')}></div>
                        </div>

                        {/* <div className="preview_notes my-4">
                            <h5 className='fs-6'><b>Notes</b></h5>
                            <p><b>Subject to Security Manifest Document Fee:</b> INR 3750 per Bill of Lading</p>
                            <p><b>Subject to Document Charge:</b> INR 4800 per Bill of Lading</p>
                        </div>

                        <div className="preview_additional_info">
                            <h2>Additional Information</h2>
                            <div className="add_info_content">
                            Future Marine Fuel Recovery (MFR) surcharge adjustments may not be considered in above offer. You can find all global MFR values and validity at <Link to={"/#"}>Marine Fuel Recovery Surcharge (MFR)</Link>.
                            </div>
                            <div className="add_info_content mt-2">
                            The Terms and Conditions under which Hapag-Lloyd accepted your business are available at: <Link to={"/#"}>Hapag-Lloyd Homepage</Link>.
                            </div>
                        </div> */}

                    </div>
                    <div className="col-4">
                        <div className="preview_sidebar">
                            <div className="top_data">
                                <div className="side_data mb-3">
                                    <p className="label">Quotation number</p>
                                    <p className='value blue_text'>{instantInquiryId}</p>
                                </div>
                                <div className="side_data mb-3">
                                    <p className="label">Service</p>
                                    <p className='value'>1 of 1</p>
                                </div>
                                <div className="side_data mb-3">
                                    <p className="label">Commodity</p>
                                    <p className='value'>-</p>
                                </div>
                                <div className="wrap_data d-flex justify-content-between">
                                    <div className="side_data">
                                        <p className="label">Valid from</p>
                                        <p className='value'>{formatDate(quote_selected_data?.[0]?.validFrom || new Date())}</p>
                                    </div>
                                    <div className="side_data">
                                        <p className="label">Valid to</p>
                                        <p className='value'>{formatDate(quote_selected_data?.[0]?.validTo || new Date())}</p>
                                    </div>
                                </div>
                                <hr className='divider' />

                                <div className="side_data mb-3">
                                    <p className="label">From</p>
                                    {/* <p className='value blue_text mb-1'>MUNDRA, IN</p> */}
                                    <p className='value blue_text mb-1'>{quote_selected_data?.[0]?.originName || '-'}</p>
                                    <p className="sub_text">PORT</p>
                                </div>
                                <div className="side_data mb-3">
                                    <p className="label">To</p>
                                    <p className='value blue_text mb-1'>{quote_selected_data?.[0]?.destinationName || '-'}</p>
                                    <p className="sub_text">PORT</p>
                                </div>
                                <div className="side_data mb-3">
                                    <p className="label">Estimated Transportation Days</p>
                                    <p className='value'>{quote_selected_data?.[0]?.oceanTransitTime || '-'}</p>
                                </div>
                                <div className="side_data">
                                    <p className="pera blue_pera">
                                        The expected transit time for above mentioned service is subject to possible changes and given as an indication only.
                                    </p>
                                </div>

                                <hr className='divider' />

                                <div className="side_data">
                                    <p className="label">For next sailings please check our Web Schedule</p>
                                    <Link to={"#"}>Link To Web Schedule</Link>
                                </div>

                                <hr className='divider' />

                                <div className="side_data">
                                    <p className="label">Quick links</p>
                                    <Link to={"#"}>FAK Definition</Link>
                                    <Link to={"#"}>Local Charges</Link>
                                    <Link to={"#"}>Detention & Demurrage</Link>
                                    <Link to={"#"}>Country Remarks</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PreviewFormat2;
