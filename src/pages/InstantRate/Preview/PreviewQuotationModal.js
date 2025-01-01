import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'reactstrap';
import { edit_icon, preview1, preview2, sitelogo } from '../../../assets/images';
import { formatDate } from '../../../components/Common/CommonLogic';
import PreviewCommonTable from './PreviewCommonTable';
import PreviewFormat1 from './PreviewFormat1';
import PreviewFormat2 from './PreviewFormat2';

export default function PreviewQuotationModal({ previewModal, previewModalHand, setPreviewModal, QuoteModalHandler }) {
    const [previewFormat, setPreviewFormat] = useState('1');
    const [customerInfo, setCustomerInfo] = useState();
    const {searchForm, $instantActiveTab} = useSelector((state) => state?.instantRate);
    const { customer_data } = useSelector((state) => state?.customer);

    useEffect(() => {
        let data = customer_data && customer_data?.content?.find(obj => obj.id === searchForm?.customerName?.value);
        setCustomerInfo(data);
    },[customer_data]);
    const confirmHandler = () => {
        // const mergedArray = [...quoteData];
        // let newArry = [...mainChargeObj];
        // newArry.forEach(newItem => {
        //     const existingIndex = mergedArray.findIndex(oldItem => oldItem.id === newItem.id);
        //     if (existingIndex !== -1) {

        //         let updateCharge1 = [...mergedArray[existingIndex].pickup_quote_charge, ...newItem?.pickup_quote_charge || '']
        //         let updateCharge2 = [...mergedArray[existingIndex].originport_quote_charge, ...newItem?.originport_quote_charge || '']
        //         let updateCharge3 = [...mergedArray[existingIndex].ocean_quote_charge, ...newItem?.ocean_quote_charge || '']

        //         mergedArray[existingIndex] = {
        //             ...mergedArray[existingIndex],
        //             pickup_quote_charge: updateCharge1,
        //             originport_quote_charge: updateCharge2,
        //             ocean_quote_charge: updateCharge3,
        //         };
        //     }
        // });

        // dispatch({ type: CONFIRM_PREVIEW_DATA, payload: mergedArray });
        // dispatch({ type: BLANK_MODAL_CHARGE, payload: {} });
        // dispatch({ type: QUOTATION_RESULT_SELECTED_BLANK, payload: {} });

        setPreviewModal(false);
        // console.log(mergedArray, "mergedArray");
    }

    const handleDownloadPDF = () => {        
        const componentToCapture = document.getElementById('component-to-capture');
    
        // Use html2canvas to capture the element as an image
        html2canvas(componentToCapture).then((canvas) => {
          // Create a new jsPDF instance
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Add the captured image as a page in the PDF
            // pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 25, 0, 160, 297);
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

            // Save or open the PDF
            pdf.save('component.pdf');
        });
        confirmHandler();
    };
    return (
        <>
            <Modal size="md" isOpen={previewModal} toggle={() => { previewModalHand(); }} className='preview_modal_wrap'>
                <div className="modal-header modal-left-button">                    
                    <button type="button">Change Format</button>
                    <div className="format_image_wrap">
                        <div className={`img ${previewFormat === '1' ? 'active' : ''}`} onClick={() => {setPreviewFormat('1')}}><img src={preview1} alt="Preview" /></div>
                        <div className={`img ${previewFormat === '2' ? 'active' : ''}`} onClick={() => {setPreviewFormat('2')}}><img src={preview2} alt="Preview" /></div>
                    </div>
                </div>
                <div className="modal-header">
                    <button type="button" onClick={() => { setPreviewModal(false); }}><i className='bx bx-plus me-2'></i> Close</button>
                    <button type="button" onClick={() => { setPreviewModal(false); QuoteModalHandler(); }}><img src={edit_icon} alt="Edit" className='me-2' /> Edit</button>
                    <button type="button" onClick={() => { handleDownloadPDF();}}><i className='bx bx-check-circle me-2'></i> Confirm</button>
                </div>
                <div id="component-to-capture" className="modal-body">
                    {previewFormat ===  '2' ? <PreviewFormat2 customerInfo={customerInfo} /> : <PreviewFormat1 customerInfo={customerInfo} />}
                </div>
            </Modal>
        </>
    )
}
