import  { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { updateLettre } from '../../JS/actions/actions';
import Loading from '../Cv/Loading';
import './style.css';
const UpdateLettre = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullname: '',
    company: '',
    skills: '',
    description: '',
    email: '',
    phone: '', 
    recruiterName: '',
    companyAddress: '', 
    languageLetter: '',
    recipientName: '', 
    
  });

  useEffect(() => {
    // Update the form data when location state changes
    if (location.state && location.state.lettreData) {
      setFormData(location.state.lettreData);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleUpdateLettre = async () => {
    setIsLoading(true);
   
    try {
      // Dispatch the updateLettre  action with the updated data
      await dispatch(updateLettre(id, formData));
     // setIsLoading(false);  // Set loading to false when the update is complete
      setTimeout(() => {
       navigate('/home/lettres');
    }, 2000);
     } catch (error) {
      console.error(error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <> {isLoading ? 
      <Loading /> 
     : 
    <div>
 <form className="form-style-9">
<ul>
<li>
    <input type="text" name="fullname" className="field-style field-split align-left" required   placeholder="Full Name"
          value={formData.fullname}
          onChange={handleInputChange} />
    <input type="email" name="emailLettre" className="field-style field-split align-right" placeholder="Email" required 
     value={formData.emailLettre}
     onChange={handleInputChange}
    
    />

</li>
<li>
    <input 
     value={formData.phone}
     onChange={handleInputChange}
    type="tel" name="phone" className="field-style field-split align-left" placeholder="Phone" />
    <input type="text" name="company" className="field-style field-split align-right"  placeholder="Company" required 
          value={formData.company}
          onChange={handleInputChange} />
</li>
<li>
<textarea name="skills" className="field-style field-full align-none"   placeholder="Skills"
          value={formData.skills}
          onChange={handleInputChange} />
</li>



<li>
    <input type="text" 
        value={formData.recruiterName}
        onChange={handleInputChange}
    
    name="recruiterName" className="field-style field-split align-left"    placeholder="Recruiter Name"
          /> 
    <input type="text" name="companyAddress" className="field-style field-split align-right" placeholder="Company Address" 
     value={formData.companyAddress}
     onChange={handleInputChange} />
</li>
<li> 
    <select id="languageLetter" 
         value={formData.languageLetter}
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
<textarea  className="field-style field-full align-none"   placeholder="Skills"
         
          onChange={handleInputChange} 
          name="generatedLettre" value={formData.generatedLettre}  
          />

</li>
<li>
<input type="button" value="Update Lettre" onClick={handleUpdateLettre} />
</li>
</ul>

</form>

      </div>}
    </>
  );
};

export default UpdateLettre;
