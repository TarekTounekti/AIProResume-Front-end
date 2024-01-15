import axios from 'axios';
import {
    GET_LETTRES,
    GET_LETTRES_SUCCESS,
    GET_LETTRES_FAIL,
    CREATE_LETTRE,
    CREATE_LETTRE_FAIL,
    UPDATE_LETTRE,
    UPDATE_LETTRE_FAIL,
    DELETE_LETTRE,
    DELETE_LETTRE_FAIL,
    CREATE_CV ,
    CREATE_CV_FAIL ,
    DELETE_CV ,
    DELETE_CV_FAIL ,
    GET_CVS ,
    GET_CVS_FAIL,
    GET_CVS_SUCCESS,
    UPDATE_CV,
    UPDATE_CV_FAIL,
     
    base_url

} from '../constants/actions-types'

//action lettre
export const createLettre=(lettredata) => async dispatch=>{


    try {
        await  axios.post(`${base_url}api/lettre/`,lettredata)
            .then(response => {
                const lettre = response.data
                dispatch({
                    type: CREATE_LETTRE,
                    payload: lettre
                });
            })
} catch (error) {
        dispatch({
            type: CREATE_LETTRE_FAIL,
            payload: error.response.data
        })
    }

}

export const getLettres = (email) => async dispatch => {
    dispatch({
        type: GET_LETTRES,
    });
    try {
        await  axios.get(`${base_url}api/lettre/`, {
          params: { email: email }, // Pass email as a query parameter
        })
            .then(response => {
                const lettres = response.data
                dispatch({
                    type: GET_LETTRES_SUCCESS,
                    payload: lettres
                });
            })
} catch (error) {
        dispatch({
            type: GET_LETTRES_FAIL,
            payload: error.response.data
        })
    }

}

export const updateLettre = (lettreId, updatedData) => async (dispatch) => {
    try {
      const response = await axios.put(`${base_url}api/lettre/${lettreId}`, updatedData);
      const updatedLettre = response.data;
  
      dispatch({
        type: UPDATE_LETTRE,
        payload: updatedLettre,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_LETTRE_FAIL,
        payload: error.response.data,
      });
    }
  };
  export const deleteLettre = (lettreId) => async (dispatch) => {
    try {
      await axios.delete(`${base_url}api/lettre/${lettreId}`);
  
      dispatch({
        type: DELETE_LETTRE,
      });
    } catch (error) {
      dispatch({
        type: DELETE_LETTRE_FAIL,
        payload: error.response.data,
      });
    }
  };

  //actions Resume
  export const createCv=(data) => async dispatch=>{


    try {
        await  axios.post(`${base_url}api/resume/`,data)
            .then(response => {
                const cv = response.data
                dispatch({
                    type: CREATE_CV,
                    payload: cv
                });
            })
} catch (error) {
        dispatch({
            type: CREATE_CV_FAIL,
            payload: error.response.data
        })
    }

}

export const getCvs = (email) => async dispatch => {
    dispatch({
        type: GET_CVS,
    });
    try {
        await  axios.get(`${base_url}api/resume/`, {
          params: { userEmail: email }, // Pass email as a query parameter
        })
            .then(response => {
                const cvs = response.data
                dispatch({
                    type: GET_CVS_SUCCESS,
                    payload: cvs
                });
            })
} catch (error) {
        dispatch({
            type: GET_CVS_FAIL,
            payload: error.response.data
        })
    }

}

export const updateCv = (cvId, updatedData) => async (dispatch) => {
    try {
      const response = await axios.put(`${base_url}api/resume/${cvId}`, updatedData);
      const updatedCv = response.data;
  
      dispatch({
        type: UPDATE_CV,
        payload: updatedCv,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CV_FAIL,
        payload: error.response.data,
      });
    }
  };
  export const deleteCv = (cvId) => async (dispatch) => {
    try {
      await axios.delete(`${base_url}api/resume/${cvId}`);
  
      dispatch({
        type: DELETE_CV,
      });
    } catch (error) {
      dispatch({
        type: DELETE_CV_FAIL,
        payload: error.response.data,
      });
    }
  };