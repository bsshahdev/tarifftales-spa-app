import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../assets/scss/customstyle/skeleton_comon.scss';

const TableCommonSkeleton = ({tdCount}) => {
    return (
        <>
            {Array(10).fill(0).map((_, index) => (
                <tr key={index}>
                    {Array(tdCount).fill(0).map((_, i) => (
                        <td key={i}>
                            <Skeleton />
                        </td>                        
                    ))}
                </tr>
            ))}
        </>
    );
}

export default TableCommonSkeleton;
