import React from 'react'
import TfBreadcrumbs from '../../../components/Common/TfBreadcrumbs'

export default function TopBreadcrumbs({ breadcrumbs, data }) {

    return (
        <>
            <div className="tf_top_breadcrumb_rate_wrap">
                <TfBreadcrumbs breadcrumb={breadcrumbs} />
            </div>
        </>
    )
}
