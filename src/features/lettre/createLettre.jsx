// src/Lettre.js
import  { useState } from 'react';

import {  useDispatch } from 'react-redux';
import { createLettre } from '../../JS/actions/actions'
import { useNavigate } from 'react-router-dom';
import './style.css';
import Loading from '../Cv/Loading';

const CreateLettre = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const userEmail =localStorage.getItem("userEmail");
    const [formData, setFormData] = useState({
      fullname: '',
      company: '',
      skills: '',
      description: '',
      recruiterName:'',
      companyAddress:'', 
      languageLetter:'',
      recipientName:'',
      emailLettre:'',

      email:userEmail
    });
  
    const [message, setMessage] = useState('');
    // Get isLoading from the Redux store
    const [isLoading, setIsLoading] = useState(false);
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  const handleCreateLetter = async () => {
    setIsLoading(true);
    try {
      // Dispatch the createLettre action with formData
      await dispatch(createLettre(formData));
      setMessage('Lettre created successfully!');
     
      // Reset form data
      setFormData({ fullname: '',
      company: '',
      skills: '',
      description: '',
      recruiterName:'',
      companyAddress:'', 
      languageLetter:'',
      recipientName:'',
      emailLettre:'',
});
setIsLoading(false);
      // Redirect to /lettres after a delay (you can use setTimeout)
      setTimeout(() => {
        navigate('/home/lettres');
      }, 2000); // Redirect after 2 seconds, adjust as needed
    } catch (error) {
      setMessage('Error creating lettre. Please try again.');
    }
  };


 


  return  (

    <div className="motivation-container">
      <h1>AIPro Resume</h1>
			
			<p>Generate a cover letter with AI in few seconds</p>
 {isLoading ? 
        <Loading /> 
       : 
    <form className="form-style-9">
<ul>
<li>
   <input type="text"
    name="fullname"
     className="field-style field-split align-left" 
     required 
       placeholder="Full Name"
         value={formData.fullname}
         onChange={handleInputChange} />
   <input type="email" name="emailLettre" 
   className="field-style field-split align-right" 
   placeholder="Email" required 
 value={formData.emailLettre}
         onChange={handleInputChange} />
</li>
<li>
   <input type="text"
    name="phone" 
    className="field-style field-split align-left"
     placeholder="Phone"
     value={formData.phone}
     onChange={handleInputChange} /> 
   <input type="text" 
   name="company" 
   className="field-style field-split align-right" 
    placeholder="Company" required 
         value={formData.company}
         onChange={handleInputChange} />
</li>
<li>
<textarea name="skills" 
className="field-style field-full align-none" 
  placeholder="Skills"
         value={formData.skills}
         onChange={handleInputChange} />
</li>



<li>
   <input type="text"
    name="recruiterName"
     className="field-style field-split align-left" 
        placeholder="Recruiter Name"
         value={formData.recruiterName}
         onChange={handleInputChange} />
   <input type="text" 
   name="companyAddress" 
   className="field-style field-split align-right" 
   placeholder="Company Address" 
   value={formData.companyAddress}
         onChange={handleInputChange} />
</li>
<li>
 
   <select id="job" 
      value ={formData.languageLetter}
      onChange={handleInputChange}
   name="languageLetter" className="field-style field-split align-left" >
   
 <option >Language-Letter</option>
 <option selected value="français">Français</option>
 <option  value="english">English</option>
 <option value="arabe">Arabe</option>

</select> 
   <input type="text" name="recipientName" className="field-style field-split align-right"  placeholder="Recipient's Name"
         value={formData.recipientName}
         onChange={handleInputChange} />
</li>




<li>
<textarea name="description" className="field-style"    placeholder="Description"
         value={formData.description}
         onChange={handleInputChange}></textarea>
</li>
<li>
<input type="button" value="Create Lettre" onClick={handleCreateLetter} />
</li>
</ul>
{message && <p>{message}</p>}
</form>}



   </div>
  );

  }
export default CreateLettre;
