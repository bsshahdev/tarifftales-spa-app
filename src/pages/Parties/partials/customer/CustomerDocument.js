import { FieldArray, FormikProvider, useFormik } from 'formik';
import React from 'react';
import Select from 'react-select';
import { Card, CardBody, FormFeedback, Input } from 'reactstrap';
import { optionCustomerDocumentType } from '../../../../common/data/parties';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postCustomerDocumentAction } from '../../../../store/Parties/Customer/action';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from "yup";

const CustomerDocument = () => {
    const { customer_id } = useSelector((state) => state?.customer);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const navigateState = useLocation();
    const documentsFormik = useFormik({
        initialValues: {
            ...(!!(navigateState?.state?.data?.documents && navigateState?.state?.data?.documents.length > 0) && {
                document:
                    navigateState?.state?.data?.documents.map((document, index, array) => ({
                        documentType: document?.documentType || "",
                        uploadDocument: index === array.length - 1 ? "" : document?.documentPath || "",
                        documentPath: document?.documentPath || "",
                        id: document?.id || "",
                        version: document?.version || 0,
                    }))
            }) || {
                document: [{
                    documentType: document?.documentType || "",
                    uploadDocument: document?.documentPath || "",
                }
                ]
            }
        },
        validationSchema: Yup.object({
            document: Yup.array().of(
                Yup.object({
                    documentType: Yup.string().required("Please select document type"),
                    uploadDocument: Yup.string().required("Please select upload document"),
                })
            ),
        }),
        onSubmit: (values) => {
            console.log(values, "values Document---------------");
            let data = values?.document?.map((val) => {
                return {
                    docfile: val?.uploadDocument || null,
                    docdata: {
                        ...Object.fromEntries(Object.entries({
                            "id": (navigateState?.state?.data?.id) ? navigateState?.state?.data?.id : customer_id.id || null,
                            "version": (navigateState?.state?.data?.version) ? navigateState?.state?.data?.version : customer_id.version || 0,
                            "documents": [
                                {
                                    ...Object.fromEntries(Object.entries({
                                        "documentType": val?.documentType || null,
                                        "document": null,
                                        "documentPath": val?.documentPath || '',
                                        "id": val?.id || null,
                                        "version": val?.version || 0
                                    }).filter(([_, value]) => value !== null)),
                                }
                            ]
                        }).filter(([_, value]) => value !== null)),
                    }
                }
            })
            const allDocData = data.reduce((accumulator, currentValue) => {
                return accumulator.concat(currentValue.docdata.documents);
            }, []);
            let newDocData = {
                "id": (navigateState?.state?.data?.id) ? navigateState?.state?.data?.id : vendor_id.id || null,
                "version": (navigateState?.state?.data?.version) ? navigateState?.state?.data?.version : vendor_id.version || 0,
                "documents": allDocData
            };
            const formDataArray = data?.map((document) => {
                const formData = new FormData();
                formData.append('file', document.docfile);
                formData.append('tenantCustomer', new Blob([JSON.stringify(newDocData)], { type: "application/json" }));
                return formData;
            });

            console.log(formDataArray, "data Document---------------");
            dispatch(postCustomerDocumentAction({ documents: formDataArray }));
            documentsFormik.resetForm();
        },
    });

    const documentUploadHandler = (e, name) => {
        documentsFormik.setFieldValue(name, e.target.files[0]);
    }
    const onClickSkip = () => {
        navigate('/customers')
    }
    return (
        <>
            <div className="text-center mb-4">
                <h5>Customer Documents</h5>
            </div>
            <div>
                <FormikProvider value={documentsFormik}>
                    <FieldArray name="document" validateOnChange={false}>
                        {(arrayHelpers) => (
                            <>
                                {documentsFormik?.values?.document?.map((document, index) => (
                                    <Card key={index}>
                                        <CardBody>
                                            <div className='row'>
                                                <div className="col-12 col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Document Type<span className='required_star'>*</span></label>
                                                        <Select
                                                            name={`document[${index}].documentType`}
                                                            value={
                                                                optionCustomerDocumentType
                                                                    ? optionCustomerDocumentType.find(
                                                                        (option) =>
                                                                            option.value ===
                                                                            documentsFormik?.values?.document[index]?.documentType
                                                                    )
                                                                    : ""
                                                            }
                                                            onChange={(e) => {
                                                                documentsFormik.setFieldValue(`document[${index}].documentType`, e.value);
                                                            }}
                                                            placeholder="Select Document Type"
                                                            options={optionCustomerDocumentType}
                                                            classNamePrefix="select2-selection form-select"
                                                            onBlur={documentsFormik.handleBlur}
                                                            invalid={
                                                                documentsFormik.touched.document &&
                                                                    documentsFormik.touched.document[index] &&
                                                                    documentsFormik.errors.document &&
                                                                    documentsFormik.errors.document[index]?.documentType
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {documentsFormik.touched.document &&
                                                            documentsFormik.touched.document[index] &&
                                                            documentsFormik.errors.document &&
                                                            documentsFormik.errors.document[index]?.documentType ? (
                                                            <FormFeedback>{documentsFormik.errors.document[index]?.documentType}</FormFeedback>
                                                        ) : null}
                                                        {/* <Input
                                                            type="text"
                                                            name={`document[${index}].documentType`}
                                                            value={documentsFormik.values.document[index].documentType}
                                                            onChange={documentsFormik.handleChange}
                                                            className="form-control"
                                                            placeholder=""
                                                        /> */}
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-5">
                                                    <div className="mb-3">
                                                        <label className="form-label">Upload Documents<span className='required_star'>*</span></label>
                                                        <Input
                                                            type="file"
                                                            name={`document[${index}].uploadDocument`}
                                                            // value={}
                                                            onChange={(e) => { documentUploadHandler(e, `document[${index}].uploadDocument`) }}
                                                            className="form-control"
                                                            placeholder=""
                                                            onBlur={documentsFormik.handleBlur}
                                                            invalid={
                                                                documentsFormik.touched.document &&
                                                                    documentsFormik.touched.document[index] &&
                                                                    documentsFormik.errors.document &&
                                                                    documentsFormik.errors.document[index]?.uploadDocument
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {documentsFormik.touched.document &&
                                                            documentsFormik.touched.document[index] &&
                                                            documentsFormik.errors.document &&
                                                            documentsFormik.errors.document[index]?.uploadDocument ? (
                                                            <FormFeedback>{documentsFormik.errors.document[index]?.uploadDocument}</FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className='col-12 col-md-1 text-end'>
                                                    {documentsFormik.values.document.length >
                                                        1 && (
                                                            <button
                                                                className="btn m-1 border"
                                                                onClick={() => { arrayHelpers.remove(index); }}
                                                            >
                                                                <i className="bx bx-trash fs-5 align-middle text-danger"></i>
                                                            </button>
                                                        )}
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                                <button type="button" className='btn btn-primary'
                                    onClick={() => arrayHelpers.push({
                                        documentType: "",
                                        uploadDocument: '',
                                    })}>
                                    Add
                                </button>
                            </>
                        )}

                    </FieldArray>
                </FormikProvider>
            </div>
            <div className="d-flex justify-content-end mt-3" style={{ margin: "0 0 -62px" }}>
                <div className="d-flex align-items-center">
                    <a
                        className="me-3"
                        onClick={onClickSkip}
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                    >
                        Skip
                    </a>
                    <button
                        type="button"
                        className="btn btn-primary d-flex align-items-center"
                        onClick={documentsFormik.handleSubmit}
                    >
                        Save
                        <i className="bx bx-chevron-right ms-1"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default CustomerDocument;
