import React from 'react';
import { Modal, Progress } from 'reactstrap';

const FileFailedModal = ({ open, faileddata, closehandler, proccedWithErrorHandler }) => {
    return (
        <>
            <Modal isOpen={open} className='data_failed_popup test'>
                <div className="modal-body pb-4">
                    <div className='modal_icon text-center'>
                        <i className="bx bx-error"></i>
                        <h2 className='text-center'>File Was Not Uploaded.</h2>
                    </div>
                    <div id="bar" className="mt-4">
                        <Progress color="success" striped animated value={Number(faileddata?.data?.success || 0) * 100 / Number(faileddata?.data?.totalUploaded || 0)} />
                    </div>
                    <div className='mt-4 d-flex justify-content-between align-items-center'>
                        <p className='m-0'><b>Failed:</b> {faileddata?.data?.failed || 0}</p>
                        <p className='my-1'><b>Success:</b> {faileddata?.data?.success || 0}</p>
                        <p className='m-0'><b>Total Data Uploaded:</b> {faileddata?.data?.totalUploaded || 0}</p>
                    </div>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        onClick={closehandler}
                        className="btn btn-secondary "
                        data-dismiss="modal"
                    >
                        Close
                    </button>

                    <a href={faileddata?.url} download={faileddata?.filename} className='btn btn-primary'>Download</a>

                    {(faileddata?.data?.success > 0 && faileddata?.data?.totalUploaded !== faileddata?.data?.failed) && (
                        <span className='text-decoration-underline text-primary cursor_pointer' onClick={proccedWithErrorHandler}>Proceed with error</span>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default FileFailedModal;
