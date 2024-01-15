import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteLettre } from '../../JS/actions/actions';
import './style.css';
import jsPDF from 'jspdf';
const Lettre = ({ lettre }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate for navigation instead of useHistory

    const handleEditLetter = () => {
      const { _id } = lettre;
      navigate(`/home/lettres/update/${_id}` , { state: { lettreData: lettre } }); // Use navigate instead of push
    };
    const handleDeleteLetter = () => {
        // Use window.confirm to display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this lettre?');
    
        // Check if the user confirmed the deletion
        if (isConfirmed) {
          const { _id } = lettre;
          dispatch(deleteLettre(_id));
          // Reload the page after deletion
          window.location.reload();
        } else {
          // Handle cancellation or other logic if the user didn't confirm
          console.log('Deletion canceled or other logic');
        }
      };


      const downloadPDF = () => {
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          putOnlyUsedFonts: true,
          floatPrecision: 16,
        });
      
        // En-tête
        doc.setFont('Arial', 'bold');
        doc.setFontSize(18);
        const headerText = 'Lettre de Motivation';
        const headerTextWidth = doc.getTextWidth(headerText);
        const headerX = (doc.internal.pageSize.getWidth() - headerTextWidth) / 2;
        const headerY = 30;
        doc.text(headerText, headerX, headerY);
      
        // Description
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
      
        doc.setFont('Arial', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100); // Couleur de texte gris
      
        // Signature
        doc.setFont('Arial', 'normal');
        doc.setFontSize(12);
      
        // Contenu généré dynamiquement
        const text = `${lettre.generatedLettre}`;
        const splitText = doc.splitTextToSize(text, 180); // Largeur du bloc de texte
      
        const contentHeight = doc.getTextDimensions(splitText).h; // Hauteur du contenu
        const contentWidth = 180; // Largeur du contenu
        const margin = 10; // Marge en mm
      
        const frameWidth = contentWidth + 2 * margin; // Largeur du cadre (contenu + marges)
        const frameHeight = contentHeight + 2 * margin; // Hauteur du cadre (contenu + marges)
      
        const frameX = (doc.internal.pageSize.getWidth() - frameWidth) / 2; // Position X du cadre
        const frameY = headerY + doc.getTextDimensions(headerText).h + 10; // Position Y du cadre (juste en dessous de l'en-tête)
      
        let cursorY = frameY + margin; // Position Y du curseur pour le texte
      
        // Parcours du contenu généré dynamiquement
        for (let i = 0; i < splitText.length; i++) {
          if (cursorY + doc.getTextDimensions(splitText[i]).h > doc.internal.pageSize.getHeight() - margin) {
            // Si le curseur dépasse la hauteur de la page, passer à une nouvelle page
            doc.addPage();
            cursorY = margin; // Réinitialiser la position Y du curseur pour le texte
          }
      
          doc.setTextColor(0, 0, 0); // Couleur de texte noir
          doc.setFontSize(12);
          doc.text(splitText[i], frameX + margin, cursorY); // Positionnement du texte à l'intérieur du cadre
      
          cursorY += doc.getTextDimensions(splitText[i]).h + 5; // Ajouter la hauteur du texte et un espace supplémentaire
        }
      
        // Enregistrement du fichier PDF
        doc.save('lettre.pdf');
      };
    return (

    
        <div className="lettre-container">
          <h2>{lettre.fullname}</h2>
          <p>Company: {lettre.company}</p>
          <p>Skills: {lettre.skills}</p>
         <p>Recruiter Name:{lettre.recruiterName}</p>
   <p>Company Address : { lettre.companyAddress}</p>
    <p>LanguageLetter : {lettre.languageLetter}</p>
   <p> RecipientName: {lettre.recipientName}</p>
   <p>Email: {lettre.emailLettre}</p>
        
          <p>Description: {lettre.description}</p>
          <div className="generated-lettre">
            <h3>Generated Lettre:</h3>
            <pre>{lettre.generatedLettre}</pre>
        
   
    
  
                <div className="button-group">
              <button className="create" onClick={handleEditLetter}>Edit</button>
              <button className="delete"  onClick={handleDeleteLetter}>
                           Delete
              </button>
              <button className='create' onClick={downloadPDF}>Download PDF</button>
              </div>
        </div>
       










        </div>
        
    )
}
export default Lettre;