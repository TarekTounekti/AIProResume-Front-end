import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCv } from '../../JS/actions/actions';
import Loading from './Loading';

const UpdateResume = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  // Fetch the resume data using the id from the URL parameters
  const listResumes = useSelector((state) => state.cvReducer.cvList)
  const { id } = useParams();
  const resume = listResumes.find((resume) => resume._id === id);

const [isLoading, setIsLoading] = useState(false);
  // Set the initial form state with the resume data
  const [fullName, setFullName] = useState(resume.fullName || '');
  const [email, setEmail] = useState(resume.email || '');
  const [address, setAddress] = useState(resume.address || '');
  const [phoneNumber, setPhoneNumber] = useState(resume.phoneNumber || '');
  const [currentPosition, setCurrentPosition] = useState(
    resume.currentPosition || ''
  );
  const [currentLength, setCurrentLength] = useState(resume.currentLength || 1);
  const [currentTechnologies, setCurrentTechnologies] = useState(
    resume.currentTechnologies || ''
  );
  const [headshot, setHeadshot] = useState(resume.image_url||'');
  const [companyInfo, setCompanyInfo] = useState(
    resume.workHistory || [{ name: '', position: '', startDate: '', endDate: '' }]
  );
  const [educationInfo, setEducationInfo] = useState(
    resume.education || [{ university: '', specialization: '', startDate: '', endDate: '' }]
  );
   const [objective , setObjective]=useState(resume.objective||'');
   const [keypoints , setKeypoints]=useState(resume.keypoints||'');
   const [jobResponsibilities , setJobResponsibilities]=useState(resume.jobResponsibilities||'');
  const handleAddCompany = () => {
    setCompanyInfo([...companyInfo, { name: '', position: '', startDate: '', endDate: '' }]);
  };

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };

  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleAddEducation = () => {
    setEducationInfo([...educationInfo, { university: '', specialization: '', startDate: '', endDate: '' }]);
  };

  const handleRemoveEducation = (index) => {
    const list = [...educationInfo];
    list.splice(index, 1);
    setEducationInfo(list);
  };

  const handleUpdateEducation = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationInfo];
    list[index][name] = value;
    setEducationInfo(list);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Update the resume data with the form values
    const formData =  new FormData();
    if(headshot.name){
		formData.append("headshotImage", headshot, headshot.name);
    }
		formData.append("fullName", fullName);
		formData.append("email", email);
		formData.append("address", address);
		formData.append("phoneNumber", phoneNumber);
		formData.append("currentPosition", currentPosition);
		formData.append("currentLength", currentLength);
		formData.append("currentTechnologies", currentTechnologies);
		formData.append("workHistory", JSON.stringify(companyInfo));
		formData.append("education", JSON.stringify(educationInfo));
		
    formData.append("objective",objective);
    formData.append("keypoints",keypoints);
    formData.append("jobResponsibilities",jobResponsibilities);
  
  
    try {
       // Dispatch the updateCv action with the updated resume data
       await dispatch(updateCv(id, formData));
       // Set loading to false when the update is complete
       setTimeout(() => {
        navigate('/home/resumes');
     }, 5000);
      } catch (error) {
       console.error(error);
       setIsLoading(false); // Set loading to false in case of an error
     }
   };
  return (
    <div className="app">
      <h1>Update Resume</h1>
      {isLoading ? 
        <Loading /> 
       : 
       <form onSubmit={handleFormSubmit}
       className="form-style-9"
       encType='multipart/form-data'
     >
   <ul>
   <li >
   <input type="text" name="fullName" className="field-style field-split align-left" required   placeholder="Full Name"
       value={fullName} 
 
   onChange={(e) => setFullName(e.target.value)} />
   <input type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
 name="email" className="field-style field-split align-right" placeholder="Email"  required />

</li>
<li>
   <input  
 type="tel"
 name="phoneNumber"
 required
 value={phoneNumber}
 onChange={(e) => setPhoneNumber(e.target.value)}
  className="field-style field-split align-left"    placeholder="Phone Number"
   />
   <input type="text"
     name="address"
     required
     value={address}
     onChange={(e) => setAddress(e.target.value)}   className="field-style field-split align-right" placeholder="Address" />
</li>
<li>
   <input
   type='text'
   required
   name='currentPosition'
   value={currentPosition}
   onChange={(e) => setCurrentPosition(e.target.value)}
   className="field-style field-split align-left"    placeholder="Current Position"
   />
   <input 
   type='number'
   required
   name='currentLength'
   value={currentLength}
   onChange={(e) => setCurrentLength(e.target.value)}
   className="field-style field-split align-right" placeholder="Current Length" />
</li>

<li>
<textarea 
 type='text'
 required
 name='currentTechnologies'
 value={currentTechnologies}
 onChange={(e) => setCurrentTechnologies(e.target.value)}
className="field-style field-full align-none"   placeholder="Skills"
       />
</li>

<li>
<input className="field-style field-full align-none" 
type='file'
name='photo'
required
id='photo'
accept='image/x-png,image/jpeg'
onChange={(e) => setHeadshot(e.target.files[0])}
         />
</li>
     </ul>	
{companyInfo.map((company, index) => (
   <div className='nestedContainer' key={index}>
         <ul>
         <li>
   <input 
     type="text"
     name={`companyName${index}`}
     value={company.name}
     onChange={(e) => handleUpdateCompany(e, index, 'name')}
   required
 
  className="field-style field-split align-left"    placeholder="Company Name"
    />
   <input
    type="text"
    name={`position${index}`}
    value={company.position}
    onChange={(e) => handleUpdateCompany(e, index, 'position')}
 
  className="field-style field-split align-right" placeholder="Position Name" />
</li>
<li>
   <input 
           type="date"
           name={`startDate${index}`}
           value={company.startDate}
           onChange={(e) => handleUpdateCompany(e, index, 'startDate')}
  className="field-style field-split align-left"    placeholder="Start Date"
    />
   <input 	type="date"
                 name={`endDate${index}`}
                 value={company.endDate}
                 onChange={(e) => handleUpdateCompany(e, index, 'endDate')}
 
  className="field-style field-split align-right" placeholder="End Date" />
</li>

<li>
{companyInfo.length - 1 === index && companyInfo.length < 4 && (
             <input className="field-style field-split align-left" type="button" value="Add" onClick={handleAddCompany}  />
             
             )}

{companyInfo.length > 1 && (
     <input type="button" value="DELLET" 	id='deleteBtn' className="field-style field-split align-right"
     onClick={() => handleRemoveCompany(index)}/>
             )}

</li>

</ul>
           
         </div>
     ))}	


{educationInfo.map((education, index) => (
 <div className="nestedContainer education" key={index}>
   <ul>
   <li>
   <input 
 
 type="text"
 name={`university${index}`}
 value={education.university}
 onChange={(e) => handleUpdateEducation(e, index, 'university')}

  className="field-style field-split align-left"    placeholder="University"
    />
   <input
 type="text"
 name={`specialization${index}`}
 value={education.specialization}
 onChange={(e) => handleUpdateEducation(e, index, 'specialization')}

 
  className="field-style field-split align-right" placeholder="pecialization" />
</li>
<li>
   <input 
      type="date"
      name={`startDate${index}`}
      value={education.startDate}
      onChange={(e) => handleUpdateEducation(e, index, 'startDate')}
  className="field-style field-split align-left"    placeholder="Start Date"
    />
   <input 	      type="date"
                 name={`endDate${index}`}
                 value={education.endDate}
                 onChange={(e) => handleUpdateEducation(e, index, 'endDate')}
  className="field-style field-split align-right" placeholder="End Date" />
</li>
<li>
{educationInfo.length - 1 === index && educationInfo.length < 4 && (
             <input
             
             className="field-style field-split align-left" type="button" value="Add"  id="addBtn" onClick={handleAddEducation} />
             
             )}

{educationInfo.length > 1 && (
     <input type="button" value="DELLET" 	id='deleteBtn' className="field-style field-split align-right"
 
     onClick={() => handleRemoveEducation(index)}/>
             )}

</li>
     
         </ul>
   
  
  
   
 </div>
))}
<ul>
 
<li>
<textarea 
 

 name="objective"
 required
 value={objective}
 onChange={(e) => setObjective(e.target.value)}
 
className="field-style field-full align-none"   placeholder="Objective"
       />
</li>
<li>
<textarea 
         
           name="keypoints"
           required
           value={keypoints}
           onChange={(e) => setKeypoints(e.target.value)}
className="field-style field-full align-none"   placeholder="keypoints"
       />
</li>
<li>
<textarea 
      
       name="jobResponsibilities"
       required
       value={jobResponsibilities}
       onChange={(e) => setJobResponsibilities(e.target.value)}
className="field-style field-full align-none"   placeholder="Job Responsibilities"
       />
</li>
 
 <li><input type="submit" value="Update"  className="field-style field-full align-none"/></li></ul>
     </form>
      }
    </div>
  );
          }
export default UpdateResume ;