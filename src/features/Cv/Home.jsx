import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { createCv } from '../../JS/actions/actions'

import Loading from "./Loading";

import './styles.css';


const Home = () => {
	const dispatch = useDispatch();
    const navigate = useNavigate();

	const userEmail =localStorage.getItem("userEmail");
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState('');
const [address, setAddress] = useState('');
const [phoneNumber, setPhoneNumber] = useState('');
	const [currentPosition, setCurrentPosition] = useState("");
	const [currentLength, setCurrentLength] = useState(1);
	const [currentTechnologies, setCurrentTechnologies] = useState("");
	const [headshot, setHeadshot] = useState(null);
	const [companyInfo, setCompanyInfo] = useState([{ name: '', position: '', startDate: '', endDate: '' }]);
const [educationInfo, setEducationInfo] = useState([{ university: '', specialization: '', startDate: '', endDate: '' }]);
	
	    // Get isLoading from the Redux store
		const [isLoading, setIsLoading] = useState(false);
		const [message, setMessage] = useState('');

	const handleAddCompany = () =>
		setCompanyInfo([...companyInfo, { name: "", position: "", startDate: "", endDate: "" }]);

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

	const handleFormSubmit =async (e) => {

		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData();
		formData.append("headshotImage", headshot, headshot.name);
		formData.append("userEmail", userEmail)
		formData.append("fullName", fullName);
		formData.append("email", email);
		formData.append("address", address);
		formData.append("phoneNumber", phoneNumber);
		formData.append("currentPosition", currentPosition);
		formData.append("currentLength", currentLength);
		formData.append("currentTechnologies", currentTechnologies);
		formData.append("workHistory", JSON.stringify(companyInfo));
		formData.append("education", JSON.stringify(educationInfo));
		try {
      // Dispatch the createLettre action with formData
     await dispatch(createCv(formData));
      setMessage('resume created successfully!');
    
	   setIsLoading(false);
	  
	
      // Redirect to /lettres after a delay (you can use setTimeout)
     setTimeout(() => {
       navigate('/home/resumes');
    }, 5000); // Redirect after 2 seconds, adjust as needed
    } catch (error) {
		setIsLoading(false);
      setMessage('Error creating resume. Please try again.');
    }
  };

	return (
		<div className='app'>
			<h1>AIPro Resume</h1>
			
			<p>Generate a resume with AI in few seconds</p>
			{isLoading ? 
        <Loading /> 
       : 	<form onSubmit={handleFormSubmit}
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
name='name'

onChange={(e) => handleUpdateCompany(e, index, 'name')}
required

className="field-style field-split align-left"    placeholder="Company Name"
/>
<input
type="text"
name="position"

onChange={(e) => handleUpdateCompany(e, index, 'position')}

className="field-style field-split align-right" placeholder="Position Name" />
</li>
<li>
<input 
		 type="date"
   name="startDate"

   onChange={(e) => handleUpdateCompany(e, index, 'startDate')}
className="field-style field-split align-left"    placeholder="Start Date"
/>
<input 	type="date"
		 name="endDate"
	   
		 onChange={(e) => handleUpdateCompany(e, index, 'endDate')}

className="field-style field-split align-right" placeholder="End Date" />
</li>

<li>
{companyInfo.length - 1 === index && companyInfo.length < 4 && (
				   <input className="field-style field-split align-left" 
				   type="button" value="Add" onClick={handleAddCompany}  />
				   
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
name="university"

onChange={(e) => handleUpdateEducation(e, index, 'university')}

className="field-style field-split align-left"    placeholder="University"
/>
<input
type="text"
name="specialization"

onChange={(e) => handleUpdateEducation(e, index, 'specialization')}


className="field-style field-split align-right" placeholder="Specialization" />
</li>
<li>
<input 
	type="date"
name="startDate"

onChange={(e) => handleUpdateEducation(e, index, 'startDate')}
className="field-style field-split align-left"    placeholder="Start Date"
/>
<input 	      type="date"
		 name="endDate"
	   
		 onChange={(e) => handleUpdateEducation(e, index, 'endDate')}
className="field-style field-split align-right" placeholder="End Date" />
</li>
<li>
{educationInfo.length - 1 === index && educationInfo.length < 4 && (
				   <input
	 
	 className="field-style field-split align-left" type="button" value="Add"  onClick={handleAddEducation} />
				   
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


<li><input type="submit" value="CREATE RESUME"  className="field-style field-full align-none"/></li>

<li>{message && <p>{message}</p>}</li>

</ul>
   </form>}
   
</div>
);
 }

export default Home;
			
	