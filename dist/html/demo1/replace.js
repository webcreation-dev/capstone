const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'public-profile', 'profiles', 'plain.html');
const destPath = path.join(__dirname, 'bad-review-detail.html');

let content = fs.readFileSync(sourcePath, 'utf8');

// Fix base href
content = content.replace(/<base href="\.\.\/\.\.\/\.\.\/">/g, '<base href="../../">');

const replacements = [
    // ----------------------------------------------------
    // PAGE TITLE & BREADCRUMBS
    // ----------------------------------------------------
    { target: /<title>.*?<\/title>/g, replacement: '<title>SIGSC - Examen de Requête ANO</title>' },
    { target: />\s*Public Profile\s*</g, replacement: '>Espace BAD<' },
    { target: />\s*Profiles\s*</g, replacement: '>Supervision<' },
    { target: />\s*Plain\s*</g, replacement: '>Statuer sur un rapport<' },
    
    // ----------------------------------------------------
    // GLOBAL SIDEBAR & HEADER
    // ----------------------------------------------------
    { target: />\s*Search\.\.\.\s*</g, replacement: '>Rechercher une requête...<' },
    { target: /placeholder="Search\.\.\."/g, replacement: 'placeholder="Rechercher une requête..."' },
    { target: />\s*Dashboards\s*</g, replacement: '>Supervision Générale<' },
    { target: />\s*Light Sidebar\s*</g, replacement: '>Suivi des ANO<' },
    { target: />\s*Dark Sidebar\s*</g, replacement: '>Rapports d\'Évaluation<' },
    { target: />\s*Apps\s*</g, replacement: '>Projets Financés<' },
    
    // ----------------------------------------------------
    // HEADER TEXT (Profile Header)
    // ----------------------------------------------------
    { target: />\s*Jenny Kally\s*</g, replacement: '>Rapport d\'Évaluation Technique (RET)<' },
    { target: />\s*Web Developer\s*</g, replacement: '>Projet P-CI-K00-014 - Audit Financier<' },
    
    // Header Stats
    { target: />\s*39\s*</g, replacement: '>15<' },
    { target: />\s*Tasks\s*</g, replacement: '>Octobre 2026<' },
    { target: />\s*86\s*</g, replacement: '>J-3<' },
    { target: />\s*Projects\s*</g, replacement: '>Délai Restant<' },
    
    // Header Buttons
    { target: />\s*Hire Jenny\s*</g, replacement: '>Télécharger Rapport Complet (PDF)<' },
    { target: />\s*Follow\s*</g, replacement: '>Consulter Historique<' },

    // ----------------------------------------------------
    // MAIN CONTENT
    // ----------------------------------------------------
    { target: />\s*About\s*</g, replacement: '>Résumé du Rapport Soumis<' },
    { target: />\s*I am a Web Developer.*\.\s*</g, replacement: '>L\'Unité de Gestion du Projet (UGP) soumet ce rapport d\'évaluation technique pour validation. Le comité a évalué 5 cabinets et recommande le Cabinet Deloitte CI avec une note technique de 88.5/100.<br><br><strong>Points clés :</strong><br>- Méthodologie jugée très satisfaisante.<br>- Personnel clé conforme aux exigences des TdR.<br>- Aucune anomalie majeure détectée lors du dépouillement.<br><br>Veuillez consulter le PDF joint pour le détail des grilles de notation avant d\'émettre votre avis.<' },
    
    // ----------------------------------------------------
    // WORK EXPERIENCE -> DECISION FORM
    // ----------------------------------------------------
    { target: />\s*Work Experience\s*</g, replacement: '>Décision et Observations (Avis de la Banque)<' },
    { target: />\s*I have over 10 years of experience.*\.\s*</g, replacement: '>Saisissez vos remarques éventuelles ci-dessous avant de cliquer sur un bouton de décision. Ces commentaires seront transmis directement à l\'UGP.<br><br><textarea style="width: 100%; border: 1px solid #ccc; border-radius: 5px; padding: 10px; margin-top: 10px; font-family: inherit;" rows="5" placeholder="Vos observations, réserves ou motifs de rejet..."></textarea><br><br><div style="display: flex; gap: 10px; margin-top: 15px;"><button class="btn btn-success" style="background-color: #10b981; color: white;">Valider (Avis de Non-Objection)</button><button class="btn btn-warning" style="background-color: #f59e0b; color: white;">Accorder avec Réserves</button><button class="btn btn-danger" style="background-color: #ef4444; color: white;">Rejeter (Objection)</button></div><' },

];

replacements.forEach(r => {
    content = content.replace(r.target, r.replacement);
});

// Remove the remaining "Education" block and "Skills" block to keep it strictly focused on the report and the decision.
// I will just use regex to remove "Education" section entirely to make the page cleaner.
// "Education" section starts with <div class="mb-8"> or similar. I'll just change the titles to empty or remove them.
content = content.replace(/>\s*Education\s*</g, ' style="display:none;">Education<');
content = content.replace(/>\s*Skills\s*</g, ' style="display:none;">Skills<');


fs.writeFileSync(destPath, content, 'utf8');
console.log('bad-review-detail.html created successfully.');
