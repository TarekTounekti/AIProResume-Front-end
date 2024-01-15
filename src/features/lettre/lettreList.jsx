import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getLettres } from '../../JS/actions/actions'
import Lettre from './lettre';
import './style.css';
import Loading from '../Cv/Loading';



const Lettres = () => {
  const userEmail=localStorage.getItem("userEmail");
    const isLoading = useSelector((state) => state.lettreReducer.isLoading)
    const lettres = useSelector((state) => state.lettreReducer.lettreList)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLettres(userEmail))
        return () => { }
    }, [dispatch,userEmail])
    return isLoading ? (       
     <Loading />
  
) : (
<div >
<ul>
        {lettres.slice().reverse().map((lettre, index) => (
          <li key={index}>
            
            <Lettre lettre={lettre} />
           
          
          </li>
        ))}
      </ul>
</div>
);
};


export default Lettres;
