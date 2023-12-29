import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  // Exemple de données d'offres d'emploi
  const jobOffers = [
    {
      id: 1,
      title: "Développeur Front-end",
      company: "ABC Company",
      location: "Paris, France",
    },
    {
      id: 2,
      title: "Ingénieur Logiciel",
      company: "XYZ Corporation",
      location: "New York, USA",
    },
    // Ajoutez d'autres offres d'emploi ici
  ];

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>AIProResume</h1>
        <Link to="/home">
          <h1>CV</h1>
        </Link>
        <Link to="/lettre">
          <h1>Lettre</h1>
        </Link>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <div className={styles.job_container}>
        <h2>Offres d'emploi disponibles</h2>
        <div>
          {/* Affichage des offres d'emploi */}
          {jobOffers.map((offer) => (
            <div key={offer.id} className={styles.job_card}>
              <h3>{offer.title}</h3>
              <p>{offer.company}</p>
              <p>{offer.location}</p>
              {/* Ajoutez d'autres détails de l'offre ici */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;