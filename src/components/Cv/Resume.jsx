import React, { useRef } from "react";
import ErrorPage from "./ErrorPage";
import { useReactToPrint } from "react-to-print";
import './styles.css';
const Resume = ({ result }) => {
	const componentRef = useRef();
console.log(result);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `${result.fullname} Resume`,
		onAfterPrint: () => alert("Print Successful!"),
	});

	if (JSON.stringify(result) === "{}") {
		return <ErrorPage />;
	}



	return (
		<div>
		  <button onClick={handlePrint}>Print Resume</button>
		  <div ref={componentRef}>
			{/* Contenu du CV à afficher */}
			{result && (
			  <div>
				<h1>{result.fullname}</h1>
				<p>Date of Birth: {result.dateOfBirth}</p>
	
				<h3>Work Experience</h3>
				{result.workExperience.map((experience, index) => (
				  <div key={index}>
					<p>Company: {experience.companyName}</p>
					<p>Position: {experience.position}</p>
				  </div>
				))}
	
				<h3>Education</h3>
				{result.education.map((education, index) => (
				  <div key={index}>
					<p>Institution: {education.institution}</p>
					<p>Study: {education.study}</p>
					<p>Period: {education.period}</p>
				  </div>
				))}
	
				<h3>Skills</h3>
				<ul>
				  {result.skills.map((skill, index) => (
					<li key={index}>{skill}</li>
				  ))}
				</ul>
	
				<h3>Languages</h3>
				<ul>
				  {result.languages.map((language, index) => (
					<li key={index}>{language}</li>
				  ))}
				</ul>
	
				<h3>Other Sections</h3>
				
	<img src={result.headshotImage} alt=""/>
	<h2>{result.jobResponsibilities
}</h2>
				<h3>Contact Information</h3>
				<h2>{result.jobResponsibilities}</h2>
				<p>Address: {result.address}</p>
				<p>Phone Number: {result.phoneNumber}</p>
				<p>Email: {result.email}</p>
			  </div>
			)}
		  </div>
		</div>
	  );
	};
	export default Resume;