import { FieldArray, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { Card, CardBody, Input } from 'reactstrap';

const ShipmentForm = ({ data }) => {
    const { searchForm, $instantActiveTab } = useSelector((state) => state?.instantRate);
    const shipmentDetailsFormik = useFormik({
        enableReinitialize: true,
        initialValues: {
            origin_city: searchForm?.location_from?.locationType === "CITY" && searchForm?.location_from?.label || '-',
            destination_city: searchForm?.location_to?.locationType === "CITY" && searchForm?.location_to?.label || '-',
            origin_port: $instantActiveTab?.sub === 'dom_air' ? searchForm?.location_from?.label : searchForm?.location_from?.locationType === "PORT" ? searchForm?.location_from?.label : data?.[0]?.tariffDetails?.[0]?.to || '-',
            destination_port: $instantActiveTab?.sub === 'dom_air' ? searchForm?.location_to?.label : searchForm?.location_to?.locationType === "PORT" ? searchForm?.location_to?.label : data?.[0]?.tariffDetails?.[data?.[0]?.tariffDetails?.length - 1 || 0]?.from || '-',
            cargo_type: searchForm?.cargo_type?.value || '-',
            commodity: "",
            cargo_value: searchForm?.cargo_value?.value || '-',
            incoterms: searchForm?.incoterm?.label || '-',

            container_type: searchForm?.container_type?.containerArray?.length !== 0 ? searchForm?.container_type?.containerArray?.map((item) => ({
                quantity: item?.unitNew,
                type: item?.label
            })) : '',
            gross_weight: $instantActiveTab?.sub === 'dom_air' ? searchForm?.shipment_details?.weight || 0 + " " + (searchForm?.shipment_details?.cargo_weight?.weight_unit || '') : (searchForm?.container_type?.cargo_weight?.value || 0) + " " + (searchForm?.container_type?.cargo_weight?.weight?.value || ''),

            shipment_details: searchForm?.shipment_details?.array?.length !== 0 ? searchForm?.shipment_details?.array?.map((item) => ({
                type: item?.label,
                length: item?.dimensions_l,
                width: item?.dimensions_w,
                height: item?.dimensions_h,
                unit: item?.no_unit,
                volumentric_wt: item?.amount || '',
            })) : '',

        },
        onSubmit: (values) => {
            console.log(values);
        },
    })

    return (
        <>
            <div className="customer_form_details">
                <Card>
                    <CardBody>
                        <form>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Origin City</label>
                                        <Input
                                            type="text"
                                            name="origin_city"
                                            value={shipmentDetailsFormik.values.origin_city}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Destination City</label>
                                        <Input
                                            type="text"
                                            name="destination_city"
                                            value={shipmentDetailsFormik.values.destination_city}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Origin Port</label>
                                        <Input
                                            type="text"
                                            name="origin_port"
                                            value={shipmentDetailsFormik.values.origin_port}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Destination Port</label>
                                        <Input
                                            type="text"
                                            name="destination_port"
                                            value={shipmentDetailsFormik.values.destination_port}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Cargo Type</label>
                                        <Input
                                            type="text"
                                            name="cargo_type"
                                            value={shipmentDetailsFormik.values.cargo_type}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Commodity</label>
                                        <Select
                                            name='commodity'
                                            onChange={shipmentDetailsFormik.handleChange}
                                            options={[]}
                                            classNamePrefix="select2-selection form-select"
                                            menuPlacement="auto"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-3">
                                    <div className="mb-3">
                                        <label className="form-label">Cargo Value</label>
                                        <Input
                                            type="text"
                                            name="cargo_value"
                                            value={shipmentDetailsFormik.values.cargo_value}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div>
                                {$instantActiveTab?.sub === 'FCL' && (
                                    <div className="col-12 col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label">Incoterms</label>
                                            <Input
                                                type="text"
                                                name="incoterms"
                                                value={shipmentDetailsFormik.values.incoterms}
                                                onChange={shipmentDetailsFormik.handleChange}
                                                className="form-control"
                                                placeholder=""
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                )}
                                {$instantActiveTab?.sub === 'FCL' && (
                                    <div className='row'>
                                        <div className="col-12 col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Weight ({searchForm?.container_type?.cargo_weight?.weight?.value || 'MT'})</label>
                                                <Input
                                                    type="text"
                                                    name="gross_weight"
                                                    value={shipmentDetailsFormik.values.gross_weight}
                                                    onChange={shipmentDetailsFormik.handleChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-8">
                                            <Card>
                                                <CardBody>
                                                    <FormikProvider value={shipmentDetailsFormik}>
                                                        <FieldArray name="container_type">
                                                            {(arrayHelpers, i) => {
                                                                return (
                                                                    <React.Fragment key={i}>
                                                                        {shipmentDetailsFormik.values.container_type?.length > 0 &&
                                                                            shipmentDetailsFormik.values.container_type.map((item, index) => (
                                                                                <div className="row mb-2" key={index}>
                                                                                    <div className="col-12 col-md-6">
                                                                                        <label className="form-label">Quantity</label>
                                                                                        <Input
                                                                                            type="text"
                                                                                            name="quantity"
                                                                                            value={item.quantity || 0}
                                                                                            className="form-control"
                                                                                            placeholder=""
                                                                                            readOnly
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-12 col-md-6">
                                                                                        <label className="form-label">Container Type</label>
                                                                                        <Input
                                                                                            type="text"
                                                                                            name="type"
                                                                                            value={item.type || 0}
                                                                                            className="form-control"
                                                                                            placeholder=""
                                                                                            readOnly
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                    </React.Fragment>
                                                                )
                                                            }}
                                                        </FieldArray>
                                                    </FormikProvider>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                )}
                                {$instantActiveTab?.sub !== 'FCL' && (
                                    <div className='row'>
                                        <div className="col-12 col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Weight ({searchForm?.shipment_details?.weight_unit || 'KG'})</label>
                                                <Input
                                                    type="text"
                                                    name="gross_weight"
                                                    value={shipmentDetailsFormik.values.gross_weight}
                                                    onChange={shipmentDetailsFormik.handleChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-8">
                                            <Card>
                                                <CardBody>
                                                    <FormikProvider value={shipmentDetailsFormik}>
                                                        <FieldArray name="shipment_details">
                                                            {(arrayHelpers, i) => {
                                                                return (
                                                                    <React.Fragment key={i}>
                                                                        {shipmentDetailsFormik.values.shipment_details?.length > 0 &&
                                                                            shipmentDetailsFormik.values.shipment_details.map((item, index) => (
                                                                                <div className="row mb-2" key={index}>
                                                                                    <div className="col-12 col-md-2">
                                                                                        <label className="form-label">Unit</label>
                                                                                        <Input
                                                                                            type="text"
                                                                                            name="unit"
                                                                                            value={item.unit || 0}
                                                                                            className="form-control"
                                                                                            placeholder=""
                                                                                            readOnly
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-12 col-md-2">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label">Length</label>
                                                                                            <Input
                                                                                                type="text"
                                                                                                name="length"
                                                                                                value={item?.length}
                                                                                                onChange={shipmentDetailsFormik.handleChange}
                                                                                                className="form-control"
                                                                                                placeholder=""
                                                                                                readOnly
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-2">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label">Width</label>
                                                                                            <Input
                                                                                                type="text"
                                                                                                name="width"
                                                                                                value={item.width}
                                                                                                onChange={shipmentDetailsFormik.handleChange}
                                                                                                className="form-control"
                                                                                                placeholder=""
                                                                                                readOnly
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-2">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label">Height</label>
                                                                                            <Input
                                                                                                type="text"
                                                                                                name="height"
                                                                                                value={item.height}
                                                                                                onChange={shipmentDetailsFormik.handleChange}
                                                                                                className="form-control"
                                                                                                placeholder=""
                                                                                                readOnly
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-12 col-md-3">
                                                                                        <div className="mb-3">
                                                                                            <label className="form-label">Volumentric Wt</label>
                                                                                            <Input
                                                                                                type="text"
                                                                                                name="volumentric_wt"
                                                                                                value={item.volumentric_wt}
                                                                                                onChange={shipmentDetailsFormik.handleChange}
                                                                                                className="form-control"
                                                                                                placeholder=""
                                                                                                readOnly
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                    </React.Fragment>
                                                                )
                                                            }}
                                                        </FieldArray>
                                                    </FormikProvider>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                )}


                                {/* {$instantActiveTab?.sub !== 'FCL' && (
                                    <React.Fragment>
                                        <div className="col-12 col-md-1">
                                            <div className="mb-3">
                                                <label className="form-label">Length</label>
                                                <Input
                                                    type="text"
                                                    name="length"
                                                    value={shipmentDetailsFormik.values.length}
                                                    onChange={shipmentDetailsFormik.handleChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-1">
                                            <div className="mb-3">
                                                <label className="form-label">Width</label>
                                                <Input
                                                    type="text"
                                                    name="width"
                                                    value={shipmentDetailsFormik.values.width}
                                                    onChange={shipmentDetailsFormik.handleChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-1">
                                            <div className="mb-3">
                                                <label className="form-label">Height</label>
                                                <Input
                                                    type="text"
                                                    name="height"
                                                    value={shipmentDetailsFormik.values.height}
                                                    onChange={shipmentDetailsFormik.handleChange}
                                                    className="form-control"
                                                    placeholder=""
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )} */}
                                {/* <div className="col-12 col-md-2">
                                    <div className="mb-3">
                                        <label className="form-label">Weight ({searchForm?.container_type?.cargo_weight?.weight?.value || 'MT'})</label>
                                        <Input
                                            type="text"
                                            name="gross_weight"
                                            value={shipmentDetailsFormik.values.gross_weight}
                                            onChange={shipmentDetailsFormik.handleChange}
                                            className="form-control"
                                            placeholder=""
                                            readOnly
                                        />
                                    </div>
                                </div> */}
                                {/* {$instantActiveTab?.sub !== 'FCL' && (
                                    <div className="col-12 col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label">Volumentric Wt</label>
                                            <Input
                                                type="text"
                                                name="volumentric_wt"
                                                value={shipmentDetailsFormik.values.volumentric_wt}
                                                onChange={shipmentDetailsFormik.handleChange}
                                                className="form-control"
                                                placeholder=""
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default ShipmentForm
