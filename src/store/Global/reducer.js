import { GET_ALL_FILES_DATA_LOADER, GET_ALL_FILES_DATA_SUCCESS, GET_ALL_MODULES_BY_ROLE_TYPE_SUCCEESS, GET_CARGO_TYPE_DATA_SUCCEESS, GET_COMMODITY_DATA_SUCCEESS, GET_CONTAINER_DATA_SUCCEESS, GET_CURRENCY_DETAIL_SUCCESS, GET_MODULE_LOADER_TYPE, GET_MODULE_TYPE_SUCCEESS, GET_OCEAEN_PORT_DATA_SUCCEESS, GET_OCEAN_PORT_TERMINAL_DETAILS_SUCCESS, GET_ROLE_BY_ID_TYPE_SUCCEESS, GET_ROLE_LOADER_TYPE, GET_ROLE_TYPE_SUCCEESS, GET_STATE_ALL_TYPE_SUCCEESS, GET_SURCHARGE_ALICE_DATA_SUCCEESS, GET_SURCHARGE_CATEGORY_DATA_SUCCESS, GET_SURCHARGE_CODE_DATA_SUCCESS, GET_UOM_DATA_SUCCESS, GET_UOM_WEIGHT_DATA_SUCCESS, GET_VENDOR_DETAILS_SUCCESS, SAVE_ROLE_TYPE_SUCCEESS, SET_NEW_PERMISSION } from "./actiontype";

const INIT_STATE = {
    vendor_data: [],
    currency_data: [],
    UOM_data: [],
    UOM_weight_data: [],
    surchargeCode_data: [],
    surchargeCategory_data: [],
    oceanPort_data: [],
    cargoType_data: [],
    container_data: [],
    surchargeAlice_data: [],
    surchargeAlice_descri: [],
    stateAllData: [],
    roleData: [],
    role_loader: [],
    moduleData: [],
    module_loader: [],
    module_data_by_role: [],
    role_data_By_id: [],
    commodity_data: [],
    files_data: [],
    files_data_loader: false,
    oceanPort_terminal: [],
    new_Permission:[]
}

const globalReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_VENDOR_DETAILS_SUCCESS:
            return {
                ...state,
                vendor_data: action.payload
            }
        case SET_NEW_PERMISSION:
            return {
                ...state,
                new_Permission: action.payload
            }
        case GET_CURRENCY_DETAIL_SUCCESS:
            const mappedCurrencyData = action.payload.content?.map((item) => {
                return {
                    label: `${item?.currencyCode} - ${item?.currencyName}`,
                    value: item?.currencyName,
                    currencyCode: item?.currencyCode,
                    id: item?.id,
                    version: item?.version
                };
            });
            const sortedCurrencyData = mappedCurrencyData.sort((a, b) => {
                if (a.currencyCode === 'INR' || a.currencyCode === 'USD') return -1;
                if (b.currencyCode === 'INR' || b.currencyCode === 'USD') return 1;
                return 0;
            });
            return {
                ...state,
                currency_data: sortedCurrencyData
            };
        case GET_UOM_DATA_SUCCESS:
            return {
                ...state,
                UOM_data: action.payload.content?.map((item) => {
                    return {
                        label: item?.description.split('_').join(' '),
                        value: item?.code,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version,
                        transportMode: item?.transportMode,
                    }
                })
            }

        case GET_UOM_WEIGHT_DATA_SUCCESS:
            return {
                ...state,
                UOM_weight_data: action.payload.content?.map((item) => {
                    return {
                        label: item?.code,
                        value: item?.code,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version
                    }
                })
            }
        case GET_SURCHARGE_CODE_DATA_SUCCESS:
            return {
                ...state,
                surchargeCode_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.code} - ${item?.description}`,
                        value: item?.code,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version,
                        surchargeCategory: item?.surchargeCategory?.name
                    }
                })
            }
        case GET_SURCHARGE_CATEGORY_DATA_SUCCESS:
            return {
                ...state,
                surchargeCategory_data: action.payload.content?.map((item) => {
                    return {
                        label: item?.name,
                        value: item?.name,
                        description: item?.description,
                        id: item?.id,
                        version: item?.version
                    }
                })
            }
        case GET_OCEAEN_PORT_DATA_SUCCEESS:
            return {
                ...state,
                oceanPort_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.code} - ${item?.address}`,
                        value: `${item?.code}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                    }
                })
            }
        case GET_CARGO_TYPE_DATA_SUCCEESS:
            return {
                ...state,
                cargoType_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.type}`,
                        value: `${item?.type}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                        transportMode: `${item?.transportMode}`,
                        cargoTypeCode: `${item?.cargoTypeCode}`,
                        cargoContainerMappings: item?.cargoContainerMappings
                    }
                })
            }
        case GET_COMMODITY_DATA_SUCCEESS:
            return {
                ...state,
                commodity_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.name}`,
                        value: `${item?.hsnCode}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                    }
                })
            }
        case GET_CONTAINER_DATA_SUCCEESS:
            return {
                ...state,
                container_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.name}`,
                        value: `${item?.name}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                        size: `${item?.size}`,
                        unit: `${item?.unit}`,
                        rateId: item?.name === '20GP' ? '_standard1' : item?.name === '40GP' ? '_standard2' :
                            item?.name === '40HQ' ? '_high_cube1' : item?.name === '45HQ' ? '_high_cube2' :
                                item?.name === '20RF' ? '_refrigerated1' : '_refrigerated2'
                    }
                })
            }
        case GET_SURCHARGE_ALICE_DATA_SUCCEESS:
            return {
                ...state,
                surchargeAlice_data: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.name}`,
                        value: `${item?.name}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`,
                        size: `${item?.size}`,
                        unit: `${item?.unit}`,
                    }
                }),
                surchargeAlice_descri: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.description}`,
                        value: `${item?.name}`,
                    }
                })
            }
        case GET_ALL_MODULES_BY_ROLE_TYPE_SUCCEESS:
            return {
                ...state,
                module_data_by_role: action.payload.content
            }
        case GET_ROLE_BY_ID_TYPE_SUCCEESS:
            return {
                ...state,
                role_data_By_id: action.payload
            }
        case SAVE_ROLE_TYPE_SUCCEESS:
            return {
                ...state,
                role_data_By_id: action.payload
            }
        case GET_STATE_ALL_TYPE_SUCCEESS:
            return {
                ...state,
                stateAllData: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.stateName}`,
                        value: `${item?.stateName}`,
                        id: `${item?.id}`,
                        version: `${item?.version}`
                    }
                })
            }
        case GET_ROLE_TYPE_SUCCEESS:
            return {
                ...state,
                roleData: action.payload.content?.map((item) => {
                    return {
                        label: item?.name?.split('_').join(' '),
                        value: item?.name,
                        id: item?.id,
                        status: item?.status,
                        totalUsers: item?.totalUsers,
                        version: item?.version
                    }
                })
            }
        case GET_ROLE_LOADER_TYPE:
            return {
                ...state,
                role_loader: action.payload
            }
        case GET_ALL_FILES_DATA_SUCCESS:
            return {
                ...state,
                files_data: action.payload
            }
        case GET_ALL_FILES_DATA_LOADER:
            return {
                ...state,
                files_data_loader: action.payload
            }
        case GET_MODULE_TYPE_SUCCEESS:
            return {
                ...state,
                moduleData: action.payload.content?.map((item) => {
                    return {
                        label: item?.name?.split('_').join(' '),
                        value: item?.name,
                        id: item?.id,
                        status: item?.status,
                        subModules: item?.modules
                    }
                })
            }
        case GET_OCEAN_PORT_TERMINAL_DETAILS_SUCCESS:
            return {
                ...state,
                oceanPort_terminal: action.payload.content?.map((item) => {
                    return {
                        label: `${item?.code} - ${item?.name}`,
                        value: item?.name,
                        id: item?.id,
                        version: `${item?.version}`,
                        oceanPort: item?.oceanPort
                    }
                })
            }
        case GET_MODULE_LOADER_TYPE:
            return {
                ...state,
                module_loader: action.payload
            }
        default:
            return state;
    }
}

export default globalReducer;