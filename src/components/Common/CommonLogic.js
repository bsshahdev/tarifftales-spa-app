import moment from "moment/moment";
import { useEffect } from "react";

export function removeNullProperties(obj) {
    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (obj[key] === null || obj[key] === undefined) {
                delete obj[key];
            } else if (typeof obj[key] === 'object') {
                removeNullProperties(obj[key]);
            }
        }
    }
}


// -------------- Currency wise total
export const convertToINR = (amount, currency) => {
    // Define your conversion rate from USD to INR here
    const usdToINRConversionRate = 83; // Replace with the actual conversion rate      
    const BDTToINRConversionRate = 1.33;
    const IDRToINRConversionRate = 0.0053;
    if (currency === '$' || currency?.toLowerCase() === 'usd') {
        return amount * usdToINRConversionRate;
    }
    if (currency === 'BDT') {
        let newAmt = amount / BDTToINRConversionRate;
        return Math.round(newAmt);
    }
    if (currency === 'IDR') {
        let newAmt = amount * IDRToINRConversionRate;
        return Math.round(newAmt);
    }
    return amount;
};

// ------------ Formats the Date
export const formatDate = (date) => {
    const d = new Date(date);
    return moment(d).format('ll');
}

export const calculateTimeDifference = (lastLoggedIn) => {
    const currentTime = moment();
    const targetTime = moment(lastLoggedIn);
    const diffInDays = currentTime?.diff(targetTime, 'days');
    const diffInHours = currentTime?.diff(targetTime, 'hours');
    const diffInMinutes = currentTime?.diff(targetTime, 'minutes');

    if (diffInDays === 1) {
        return 'Yesterday';
    } else if (diffInDays === 0) {
        if (diffInHours === 0 && diffInMinutes > 0) {
            return `${diffInMinutes} minutes ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} hours ago`;
        } else {
            return 'Just now';
        }
    } else {
        return targetTime.format('MMM DD, YYYY');
    }
};

/** * Formats the size */
export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}


/** * Checks if any value is empty */
export const isAnyValueEmpty = (obj, removeKey) => {
    let updatedObj = { ...obj };
    if(removeKey !== undefined && removeKey?.length > 0){
        for (const key of removeKey) {
            delete updatedObj?.[key];            
        }
    }
    for (const key in updatedObj) {
        if (Object.prototype.hasOwnProperty.call(updatedObj, key)) {
            const value = updatedObj[key];
            if (value === '' || value === null || value === undefined) {
                return true;
            }
        }
    }
    return false;
};

export const isAnyValueEmptyInArray = (arr, removeKey) => {    
    for (const obj of arr) {
        let updatedObj = { ...obj };

        if(removeKey !== undefined && removeKey?.length > 0){
            for (const key of removeKey) {
                delete updatedObj?.[key];            
            }
        }

        for (const key in updatedObj) {
            if (Object.prototype.hasOwnProperty.call(updatedObj, key)) {
                const value = updatedObj[key];
                if (value === '' || value === null || value === undefined) {
                    return true;
                }
            }
        }
    }
    return false;
};

/* Custom sort function */
export function customSort(array, sortField, sortOrder) {
    return [...array].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
            a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
        );
    });
}

export const isExcelFile = (fileName) => {
    return fileName.endsWith(".xls") || fileName.endsWith(".xlsx");
};

/* --------------------- common logic -------------------------------------------*/
export const commonFunc = (array, index, params,seArray) => {
    if (array?.length !== 0) {
        if (array.some(obj => obj.index === index)) {
            array.find(obj => obj.index === index)[params] = !array.find(obj => obj.index === index)[params]
        } else {
            let newObj = { [params]: true, index }
            array.push(newObj);
        }
    } else {
        let newObj = { [params]: true, index }
        array.push(newObj);
    }
    seArray(array);
}



// -------------------- outside click
export const handleClickOutside = (event, wrapperRef, setOpenPop) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        if (event.target.id !== 'more_menu') {
            setOpenPop(false);
        }
    }
};

export const useOutsideClick = (wrapperRef, setOpenPop) => {
    useEffect(() => {
        const handleOutsideClick = (event) =>
            handleClickOutside(event, wrapperRef, setOpenPop);

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [wrapperRef, setOpenPop]);
};