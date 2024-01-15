import React, { useRef } from "react";

import { useReactToPrint } from "react-to-print";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './styleee.css';

const ContactInfo = ({ email, phoneNumber, address }) => (
  <ul className="contact-info">
    <li><a href={email}>{email}</a></li>
    <li>{phoneNumber}</li>
    <li>{address}</li>
  </ul>
);

const JobItem = ({ position, name, startDate, endDate }) => (
  <div className="job-item">
    <h4>{position} at {name}</h4>
    <p>{startDate} - {endDate}</p>
  </div>
);

const EducationItem = ({ specialization, university, startDate, endDate }) => (
  <div className="education-item">
    <h4>{specialization}</h4>
    <p>{university}</p>
    <p>{startDate} - {endDate}</p>
  </div>
);

const CVComp = () => {
  const { id } = useParams();
  const listResumes = useSelector((state) => state.cvReducer.cvList);
  const result = listResumes.find((resume) => resume._id === id);
  const componentRef1 = useRef();
  const handlePrint = useReactToPrint({
		content: () => componentRef1.current,
		documentTitle: `${result.fullName} Resume`,
		onAfterPrint: () => alert("Print Successful!"),
	});
  if (!result) {
    return <div>No resume found</div>;
  }

  const { fullName, currentPosition, email, phoneNumber, address, objective, workHistory, education, keypoints ,jobResponsibilities} = result;


	
  const replaceWithBr = (string) => {
		return string.replace(/\*/g, "")
	};
  const replaceNumberedList = (string) => {
    return string.replace(/^\d+\./gm, "- ");
  };
  const replaceNumberedList2 = (string) => {
    return string.replace(/-\s/g, "-\n");
  };
  
  return (<>
  <button onClick={handlePrint}>Print Page</button>
    <div className="resume-container" ref={componentRef1}>
      <header className="resume-header">
        <h1>{fullName}</h1>
        <h2>{currentPosition}</h2>
        <ContactInfo email={email} phoneNumber={phoneNumber} address={address} />
      </header>

      <section className="resume-section">
        <h3>Summary</h3>
        <p>{replaceWithBr(objective)}</p>
      </section>

      <section className="resume-section">
        <h3>Experience</h3>
        {workHistory.map((job) => (
          <JobItem key={job.name} {...job} />
        ))}
        <p>{replaceWithBr(jobResponsibilities)}</p>
      </section>

      <section className="resume-section">
        <h3>Education</h3>
        {education.map((educationItem) => (
          <EducationItem key={educationItem.university} {...educationItem} />
        ))}
      </section>

      <section className="resume-section">
        <h3>Skills</h3>
        <p>{replaceNumberedList2(replaceWithBr(replaceNumberedList(keypoints)))}</p>
        
      </section>
    </div></>
  );
};

export default CVComp;