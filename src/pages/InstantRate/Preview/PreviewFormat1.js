import React from 'react';
import PreviewCommonTable from './PreviewCommonTable';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../components/Common/CommonLogic';
import { sitelogo } from '../../../assets/images';

const PreviewFormat1 = ({ customerInfo }) => {
    const quoteData = useSelector((state) => state.instantRate.quote_selected_data);
    const mainChargeObj = useSelector((state) => state?.quotation?.mainChargeObj);
    const {searchForm, $instantActiveTab} = useSelector((state) => state?.instantRate);
    const {tenant_info} = useSelector((state) => state?.settings);
    return (
        <>
            <div className="common_bg_wrap preview_top_details ">
                <p className='mb-2 text-center'><b className='me-1'>Preview Format:</b> 1</p>
                <div className="preview_top_details d-flex justify-content-between align-items-center mb-3 mt-4">
                    <div className="left_details">
                        <p className='mb-2'><b className='me-1'>Issue Date:</b> {formatDate(new Date())}</p>
                        <p><b className='me-1'>Quotation:</b> #Q12345678</p>
                    </div>
                    <div className="right_logo">
                        <img src={tenant_info?.logo || sitelogo} alt="logo" onError={e => { e.target.src = sitelogo }} />
                    </div>
                </div>
                <div className="preview_creation_details">
                    <div className="full_wrap white_box">
                        <div className="top_creation_details">
                            <p className="title">Customer Details:</p>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="details">
                                        <p className='mb-1'>{customerInfo?.name || '-'}</p>
                                        <p>{customerInfo?.address || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="half_wrap mt-1">
                        <div className="half_box white_box">
                            <p className="title">Origin:</p>
                            {/* <div className="details">
                                        <span>Pickup</span>
                                        <p>-</p>
                                    </div> */}
                            <div className="details">
                                <span>Port</span>
                                {/* <p>{searchForm?.location_from?.label || '-'}</p> */}
                                <p>{quoteData?.[0]?.tariffDetails?.[0]?.to || '-'}</p>
                            </div>
                        </div>
                        <div className="half_box white_box">
                            <p className="title">Destination:</p>
                            <div className="details">
                                <span>Port</span>
                                <p>{quoteData?.[0]?.tariffDetails?.[quoteData?.[0]?.tariffDetails?.length - 1]?.from || '-'}</p>
                            </div>
                            {/* <div className="details">
                                        <span>Drop</span>
                                        <p>-</p>
                                    </div> */}
                        </div>
                    </div>
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

                <PreviewCommonTable />
                {quoteData?.length !== 0 ? quoteData?.map((data) => (<PreviewCommonTable data={data} key={data.quote_id} newData={mainChargeObj.find(obj => obj.id === data.quote_id) || []} tab={$instantActiveTab} />)) : null}
            </div>
        </>
    );
}

export default PreviewFormat1;
