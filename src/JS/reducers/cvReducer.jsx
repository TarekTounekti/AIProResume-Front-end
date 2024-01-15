import {
 
    CREATE_CV ,
    CREATE_CV_FAIL ,
    DELETE_CV ,
    DELETE_CV_FAIL ,
    GET_CVS ,
    GET_CVS_FAIL,
    GET_CVS_SUCCESS,
    UPDATE_CV,
    UPDATE_CV_FAIL,
  
}
    from "../constants/actions-types";

const initialState = {
    cvList: [],
    cv: {},
    isLoading: false,
    error: []
};
const cvReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_CVS:
            return {
                ...state,
                isLoading: true,
            }
        case GET_CVS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cvList: payload
            }
        case GET_CVS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case CREATE_CV:
            return{
                ...state,
                isLoading: false,
                cv: payload
            }
        case CREATE_CV_FAIL:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
            case UPDATE_CV:
                return {
                  ...state,
                  isLoading: false,
                  cv: payload,
                };
              case UPDATE_CV_FAIL:
                return {
                  ...state,
                  isLoading: false,
                  error: payload,
                };
                case DELETE_CV: 
                return {
                  ...state,
                  isLoading: false,
                  cv: {},  
                };
              case DELETE_CV_FAIL:  
                return {
                  ...state,
                  isLoading: false,
                  error: payload,
                };
              default:
                return state;
            }

}
export default cvReducer;