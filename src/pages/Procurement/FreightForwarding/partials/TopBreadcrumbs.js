import React from 'react'
import TfBreadcrumbs from '../../../../components/Common/TfBreadcrumbs'

export default function TopBreadcrumbs({ breadcrumbs, data }) {

    return (
        <>
            <div className="tf_top_breadcrumb_rate_wrap">
                <TfBreadcrumbs breadcrumb={breadcrumbs} />
                {/* {data !== undefined ? (
                    <div className="tf_box_wrap d-flex">
                    {(data || []).map((item) => (
                        <div className="sh_box flex-grow-1" key={item?.id}>
                            <p className="box_title">{item?.title}</p>
                            <div className="sh_inquiry_rate">{item?.rate}
                                <span className={`${item?.rate_type === 'down' ? 'red_text' : 'green_text'}`}>{item?.compare_rate}%</span>
                            </div>
                        </div>
                    ))}
                </div>
                ) : null} */}
            </div>
        </>
    )
}
