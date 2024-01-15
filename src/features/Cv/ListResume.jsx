import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCvs ,deleteCv} from '../../JS/actions/actions'
import Loading from './Loading';



const ListResume = () => {
  const userEmail=localStorage.getItem("userEmail");
    const isLoading = useSelector((state) => state.cvReducer.isLoading)
    const listResumes = useSelector((state) => state.cvReducer.cvList)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleDelete = (_id) => {
      // Use window.confirm to display a confirmation dialog
      const isConfirmed = window.confirm('Are you sure you want to delete this Resume?');
  
      // Check if the user confirmed the deletion
      if (isConfirmed) {
       
        dispatch(deleteCv(_id));
        // Reload the page after deletion
        window.location.reload();
      } else {
        // Handle cancellation or other logic if the user didn't confirm
        console.log('Deletion canceled ');
      }
    };
   
    const handleShow=(resume)=>{
    
      navigate(`/home/resumes/show/${resume._id}` ,{resume }); // Use navigate instead of push
 
    }
    const handleShow2=(resume)=>{
    
      navigate(`/home/resumes/showw/${resume._id}` ,{resume }); // Use navigate instead of push
 
    }
    const handleEdit=(resume)=>{
    
      navigate(`/home/resumes/update/${resume._id}` ,{resume }); // Use navigate instead of push
 
    }
    useEffect(() => {
        dispatch(getCvs(userEmail))
        return () => { }
    }, [dispatch,userEmail])
  
  return isLoading ? (       
   <Loading />

) : (

   
 
<div >

{listResumes.slice().reverse().map((resume, index) => (
          <div key={index}>
          <div className="resume-details-0">
          <h2 className="resume-name-0">{resume.fullName}</h2>
          <h2 className="resume-dt-0">{resume.currentPosition}</h2>
  <h2 className="resume-dt-0">{resume.phoneNumbre}</h2>
  <h2 className="resume-dt-0">{resume.email}</h2>
  <h2 className="resume-dt-0">{resume.address}</h2>
  <img className="resume-image-0" src={resume.image_url} alt="Resume Image" />
    </div>
            
            <button className ="create" onClick={() => handleEdit(resume)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(resume._id)}>Delete</button>
            <button className="create" onClick={() => handleShow(resume)}>Show with photo</button>
            <button className="create" onClick={() => handleShow2(resume)}>Show without photo</button>
            
          </div>
           
          
         
        ))}
   
</div>
);
};
export default ListResume;