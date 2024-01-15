//import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CVComponent.css';

const CVComponent = () => {
  const listResumes = useSelector((state) => state.cvReducer.cvList)
  const { id } = useParams();
  const result = listResumes.find((resume) => resume._id === id);
// Charger le résultat à partir du stockage local lors du montage du composant


if (!result) {
  return <div>No resume found</div>;
  }
  
  return (
 
    <div className="cv-container">
      <div className="header">
        <h1>{result.fullName}</h1>
        <p>{result.currentPosition}</p>
      </div>

      <div className="contact-info">
        <div className="section">
          <h2>Contact Information</h2>
          <p>Email: {result.email}</p>
          <p>Address: {result.address}</p>
          <p>Phone Number: {result.phoneNumber}</p>
        </div>

        <div className="section">
          <h2>Objective</h2>
          <p>{result.objective}</p>
        </div>
      </div>

      <div className="work-history">
        <h2>Work History</h2>
        {result.workHistory.map((job, index) => (
          <div key={index} className="job">
            <h3>{job.name}</h3>
            <p>{job.position}</p>
            <p>{job.startDate} - {job.endDate}</p>
          </div>
        ))}
      </div>

      <div className="education">
        <h2>Education</h2>
        {result.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.university}</h3>
            <p>{edu.specialization}</p>
            <p>{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </div>

      <div className="keypoints">
        <h2>Key Points</h2>
        <ul>
          {result.keypoints.split('\n').map((point, index) => (
            <li key={index} dangerouslySetInnerHTML={{__html: point}}></li>
          ))}
        </ul>
      </div>

      <div className="responsibilities">
        <h2>Job Responsibilities</h2>
        <div dangerouslySetInnerHTML={{__html: result.jobResponsibilities}}></div>
      </div>
    </div>
  );
};

export default CVComponent;