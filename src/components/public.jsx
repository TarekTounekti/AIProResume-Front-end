import { useNavigate } from 'react-router-dom';
import ailogo from '../assets/ailogo.jpg';
import pub from '../assets/pub.jpg'
import Job from './job';
const Public = () => {
    const navigate = useNavigate();

const handleclic = ()=>
{
    navigate('/home/resumes/create')
}
const handleclicex = ()=>
{
    navigate('/home/lettres/create')
}


    return (
      <>
        <div className="public-container">
      <div className="content-section">
      <div className="image-with-button" >
     
        <h1>Welcome to AIProResume</h1>
        <p>Introducing AIProResume:<br/>
         Your gateway to effortless, AI-enhanced resume creation.<br/>
          Input your details and watch your professional CV come to life in moments.<br/>
           Maximize your chances of securing that dream job with precision and ease.</p>
        <button onClick={handleclic}>Get Started CV</button>
         </div>
         {/* Deuxième image */}
         <div className="image-with-button">
        <img
          src={pub}
          alt="AIProResume Image 2"
          className="secondary-image"
        />
        <p>Welcome to AIProResume:<br/>
         where crafting compelling cover letters is effortless.<br/>
          With our AI-driven platform, input your details and select from a range of templates tailored to your needs.<br/>
           Let AIProResume enhance your motivations and skills for each job application.<br/>
            Simplify your application process, impress recruiters, and elevate your professional journey.<br/>
             Get started today and let AIProResume pave the way to your career aspirations</p>
        <button onClick={handleclicex}>letter</button>
       </div>
      </div>
      {/* Ajoutez d'autres éléments créatifs ici */}
    </div>
    <Job />
    </>
    )

}
export default Public;