import { DELETE_PERMISSIONS_TYPE, POST_SURCHARGE_ALISE_DATA, POST_SURCHARGE_CATEGORY_DATA, POST_SURCHARGE_CODE_DATA, SAVE_PERMISSIONS_TYPE, SAVE_ROLE_TYPE, SET_NEW_PERMISSION } from "./actiontype"
export const postSurchargeCodeAction = (data) => {
    return {
        type: POST_SURCHARGE_CODE_DATA,
        payload: { data }
    }
}

export const postSurchargeCateAction = (data) => ({
    type: POST_SURCHARGE_CATEGORY_DATA,
    payload: { data }
})
export const postSurchargeAliseAction = (data) => ({
    type: POST_SURCHARGE_ALISE_DATA,
    payload: { data }
})
export const savePermissions = (data, roleId) => ({
    type: SAVE_PERMISSIONS_TYPE,
    payload: { data , roleId }
});
export const saveRole = (data) => ({
    type: SAVE_ROLE_TYPE,
    payload: { data  }
});
export const deletePermissions = (roleId, moduleId, actionName) => ({
    type: DELETE_PERMISSIONS_TYPE,
    payload: { roleId, moduleId, actionName }
});

export const setNewPermission = (permissions) => ({
    type: SET_NEW_PERMISSION,
    payload: permissions
});
