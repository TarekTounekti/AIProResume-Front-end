import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import './styles.css';

const Home = ({ setResult }) => {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  const [educationInfo, setEducationInfo] = useState([{ institution: "", study: "", period: "" }]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

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

  const handleAddEducation = () =>
    setEducationInfo([...educationInfo, { institution: "", study: "", period: "" }]);

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

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleUpdateSkill = (e, index) => {
    const { value } = e.target;
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const handleAddLanguage = () => {
    setLanguages([...languages, ""]);
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const handleUpdateLanguage = (e, index) => {
    const { value } = e.target;
    const updatedLanguages = [...languages];
    updatedLanguages[index] = value;
    setLanguages(updatedLanguages);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Créez un objet contenant les champs nécessaires pour un CV Europass
    const cvData = {
      // Informations personnelles
      fullname: fullName,
      dateOfBirth: dateOfBirth,

      // Expérience professionnelle
      workExperience: companyInfo.map((company) => ({
        companyName: company.name,
        position: company.position,
      })),

      // Formation
      education: educationInfo.map((education) => ({
        institution: education.institution,
        study: education.study,
        period: education.period,
      })),

      // Compétences
      skills: skills,

      // Langues
      languages: languages,

     

      // Adresse
      address: address,

      // Numéro de téléphone
      phoneNumber: phoneNumber,

      // Email
      email: email
    };

    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("cvData", JSON.stringify(cvData));

    axios
      .post("http://localhost:8080/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          setResult(res.data.data);
          navigate("/home/resume");
        }
      })
      .catch((err) => console.error(err));

    setLoading(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='app'>
      <h1>Resume Builder</h1>
      <p>Generate a resume with AI in few seconds</p>
      <form onSubmit={handleFormSubmit} method='POST' encType='multipart/form-data'>
        <label htmlFor='fullName'>Enter your full name</label>
        <input
          type='text'
          required
          name='fullName'
          id='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor='dateOfBirth'>Date of Birth</label>
        <input
          type='date'
          required
          name='dateOfBirth'
          id='dateOfBirth'
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        {/* Expérience professionnelle */}
        <h3>Work Experience</h3>
        {companyInfo.map((company, index) => (
          <div className='nestedContainer' key={index}>
            <div className='companies'>
              <label htmlFor='name'>Company Name</label>
              <input
                type='text'
                name='name'
                required
                onChange={(e) => handleUpdateCompany(e, index)}
                value={company.name}
              />

              <label htmlFor='position'>Position</label>
              <input
                type='text'
                name='position'
                required
                onChange={(e) => handleUpdateCompany(e, index)}
                value={company.position}
              />
            </div>

            {index !== 0 && (
              <button type='button' onClick={() => handleRemoveCompany(index)}>
                Remove Company
              </button>
            )}
          </div>
        ))}
        <button type='button' onClick={handleAddCompany}>
          Add Company
        </button>

        {/* Formation */}
        <h3>Education</h3>
        {educationInfo.map((education, index) => (
          <div className='nestedContainer' key={index}>
            <div className='education'>
              <label htmlFor='institution'>Institution</label>
              <input
                type='text'
                name='institution'
                required
                onChange={(e) => handleUpdateEducation(e, index)}
                value={education.institution}
              />

              <label htmlFor='study'>Study</label>
              <input
                type='text'
                name='study'
                required
                onChange={(e) => handleUpdateEducation(e, index)}
                value={education.study}
              />

              <label htmlFor='period'>Period</label>
              <input
                type='text'
                name='period'
                required
                onChange={(e) => handleUpdateEducation(e, index)}
                value={education.period}
              />
            </div>

            {index !== 0 && (
              <button type='button' onClick={() => handleRemoveEducation(index)}>
                Remove Education
              </button>
            )}
          </div>
        ))}
        <button type='button' onClick={handleAddEducation}>
          Add Education
        </button>

       {/* Compétences */}
<h3>Skills</h3>
{skills.map((skill, index) => (
  <div className="nestedContainer" key={index}>
    <div className="skills">
      <label htmlFor={`skill-${index}`}>Skill {index + 1}</label>
      <input
        type="text"
        name={`skill-${index}`}
        required
        onChange={(e) => handleUpdateSkill(e, index)}
        value={skill}
      />
    </div>
    {index !== 0 && (
      <button type="button" onClick={() => handleRemoveSkill(index)}>
        Remove Skill
      </button>
    )}
  </div>
))}
<button type="button" onClick={handleAddSkill}>
  Add Skill
</button>

{/* Langues */}
<h3>Languages</h3>
{languages.map((language, index) => (
  <div className="nestedContainer" key={index}>
    <div className="languages">
      <label htmlFor={`language-${index}`}>Language {index + 1}</label>
      <input
        type="text"
        name={`language-${index}`}
        required
        onChange={(e) => handleUpdateLanguage(e, index)}
        value={language}
      />
    </div>
    {index !== 0 && (
      <button type="button" onClick={() => handleRemoveLanguage(index)}>
        Remove Language
      </button>
    )}
  </div>
))}
<button type="button" onClick={handleAddLanguage}>
  Add Language
</button>

{/* Adresse */}
<label htmlFor="address">Address</label>
<textarea
  name="address"
  id="address"
  required
  value={address}
  onChange={(e) => setAddress(e.target.value)}
></textarea>

{/* Numéro de téléphone */}
<label htmlFor="phoneNumber">Phone Number</label>
<input
  type="tel"
  name="phoneNumber"
  id="phoneNumber"
  required
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
/>

{/* Email */}
<label htmlFor="email">Email</label>
<input
  type="email"
  name="email"
  id="email"
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
        <label htmlFor='headshot'>Upload your headshot</label>
        <input
          type='file'
          accept='image/*'
          required
          name='headshot'
          id='headshot'
          onChange={(e) => setHeadshot(e.target.files[0])}
        />

        <button type='submit'>Generate Resume</button>
      </form>
    </div>
  );
};

export default Home;