import { useState } from "react";
//import "./public.css";

const Job = () => {
  const sites = [
    {
      title: "Tanit jobs",
      iframeUrl: "https://www.tanitjobs.com/",
    },
    {
      title: "Linkedin",
      iframeUrl: "https://www.linkedin.com/",
    },
    {
      title: "monster",
      iframeUrl: "https://www.monster.com/",
    },
    {
      title: "indeed",
      iframeUrl: "https://www.indeed.com/",
    },
  ];

  const [expandedCards, setExpandedCards] = useState([]);

  return (
    <div className="form-style-public">
      <div className="row justify-content-center">
        {sites.map((site, index) => (
          <div
            className={`col-lg-6 col-md-6 ${
              expandedCards.includes(index) ? "col-sm-12 expanded" : ""
            }`}
            key={index}
            style={{ margin: "10px" }} // Add margin to create space between cards
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{site.title}</h5>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    title={`iframe-${index}`}
                    className="embed-responsive-item"
                    src={site.iframeUrl}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="navigation-buttons">
                  <a
                    href={site.iframeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Aller sur le site
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Job;