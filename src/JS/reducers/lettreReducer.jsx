import {
    GET_LETTRES,
    GET_LETTRES_SUCCESS,
    GET_LETTRES_FAIL,
    CREATE_LETTRE,
    CREATE_LETTRE_FAIL,
    UPDATE_LETTRE,
    UPDATE_LETTRE_FAIL,
    DELETE_LETTRE,
    DELETE_LETTRE_FAIL
  
}
    from "../constants/actions-types";

const initialState = {
    lettreList: [],
    lettre: {},
    isLoading: false,
    error: []
};
const lettreReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_LETTRES:
            return {
                ...state,
                isLoading: true,
            }
        case GET_LETTRES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lettreList: payload
            }
        case GET_LETTRES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case CREATE_LETTRE:
            return{
                ...state,
                isLoading: false,
                lettre: payload
            }
        case CREATE_LETTRE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
            case UPDATE_LETTRE:
                return {
                  ...state,
                  isLoading: false,
                  lettre: payload,
                };
              case UPDATE_LETTRE_FAIL:
                return {
                  ...state,
                  isLoading: false,
                  error: payload,
                };
                case DELETE_LETTRE:  // Add DELETE_LETTRE case
                return {
                  ...state,
                  isLoading: false,
                  lettre: {},  // Reset lettre after deletion
                };
              case DELETE_LETTRE_FAIL:  // Add DELETE_LETTRE_FAIL case
                return {
                  ...state,
                  isLoading: false,
                  error: payload,
                };
              default:
                return state;
            }

}
export default lettreReducer;