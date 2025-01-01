import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../assets/scss/customstyle/skeleton_comon.scss';

const ResultCardSkeleton = () => {
    return (
        <>
            {/* <div className="text-center py-5">
                <div className='py-5'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div> */}
            <div className="search_result_wrap skeleton_wrap">
                <div className="result_tab_content_wrap">
                    {Array(3).fill(0).map((item, index) => (                        
                        <div className="search_result_card_check_wrap d-flex align-items-center" key={`${index}`}>
                            <div className={`checkbox_skeleton me-2`}>
                                <Skeleton height={20} />
                            </div>
                            <div className="search_result_card">
                                <div className="search_result_card_header d-flex align-items-center">
                                    <div className="card_img">
                                        <span className='d-block img mx-auto border-0'>
                                            <Skeleton height={46} circle={true} />
                                        </span>
                                        <span className="title d-block text-center mt-2"><Skeleton /></span>
                                    </div>
                                    <div className="middle_content">
                                        <Skeleton count={3} />
                                    </div>
                                    <div className="total_wrap">
                                        <Skeleton />
                                        <div className="btn_wrap d-flex justify-content-between">
                                            <Skeleton width={90} height={30} />
                                            <Skeleton width={90} height={30} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ResultCardSkeleton;
