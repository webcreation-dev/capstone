const fs = require('fs');
const path = require('path');

const files = [
    'spm-dashboard.html', 'ppm-list.html', 'ppm-form.html', 'ami-list.html', 'ami-submissions.html', 
    'shortlist-analysis.html', 'dp-list.html', 'tech-eval-monitoring.html', 'financial-opening.html', 'final-ranking.html',
    'consultant-opportunities.html', 'ami-details.html', 'candidature-wizard.html', 
    'consultant-applications.html', 'dp-submission.html', 'consultant-profile.html',
    'expert-dashboard.html', 'expert-dossiers.html', 'expert-evaluation.html', 'expert-summary.html',
    'bad-dashboard.html', 'bad-review-list.html', 'bad-review-detail.html'
];

const menuHtml = `
       <div class="kt-menu-item pt-2.25 pb-px">
        <span class="kt-menu-heading uppercase text-xs font-medium text-muted-foreground ps-[10px] pe-[10px]">
         Menu Global (SIGSC)
        </span>
       </div>

       <!-- SPM SECTION -->
       <div class="kt-menu-item" data-kt-menu-item-toggle="accordion" data-kt-menu-item-trigger="click">
        <div class="kt-menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] ps-[10px] pe-[10px] py-[6px]" tabindex="0">
         <span class="kt-menu-icon items-start text-muted-foreground w-[20px]"><i class="ki-filled ki-briefcase text-lg"></i></span>
         <span class="kt-menu-title text-sm font-medium text-foreground kt-menu-item-active:text-primary kt-menu-link-hover:!text-primary">1. Administration (SPM)</span>
         <span class="kt-menu-arrow text-muted-foreground w-[20px] shrink-0 justify-end ms-1 me-[-10px]">
          <span class="inline-flex kt-menu-item-show:hidden"><i class="ki-filled ki-plus text-[11px]"></i></span>
          <span class="hidden kt-menu-item-show:inline-flex"><i class="ki-filled ki-minus text-[11px]"></i></span>
         </span>
        </div>
        <div class="kt-menu-accordion gap-1 ps-[10px] relative before:absolute before:start-[20px] before:top-0 before:bottom-0 before:border-s before:border-border">
         ${generateMenuItem('Tableau de bord', 'spm-dashboard.html')}
         ${generateMenuItem('Plan de Passation (PPM)', 'ppm-list.html')}
         ${generateMenuItem('Grille des AMI', 'ami-list.html')}
         ${generateMenuItem('Soumissions reçues', 'ami-submissions.html')}
         ${generateMenuItem('Analyse Shortlist', 'shortlist-analysis.html')}
         ${generateMenuItem('Suivi des DP', 'dp-list.html')}
         ${generateMenuItem('Évaluations Techniques', 'tech-eval-monitoring.html')}
         ${generateMenuItem('Ouverture Financière', 'financial-opening.html')}
         ${generateMenuItem('Classement Final', 'final-ranking.html')}
        </div>
       </div>

       <!-- CONSULTANT SECTION -->
       <div class="kt-menu-item" data-kt-menu-item-toggle="accordion" data-kt-menu-item-trigger="click">
        <div class="kt-menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] ps-[10px] pe-[10px] py-[6px]" tabindex="0">
         <span class="kt-menu-icon items-start text-muted-foreground w-[20px]"><i class="ki-filled ki-profile-circle text-lg"></i></span>
         <span class="kt-menu-title text-sm font-medium text-foreground kt-menu-item-active:text-primary kt-menu-link-hover:!text-primary">2. Espace Consultant</span>
         <span class="kt-menu-arrow text-muted-foreground w-[20px] shrink-0 justify-end ms-1 me-[-10px]">
          <span class="inline-flex kt-menu-item-show:hidden"><i class="ki-filled ki-plus text-[11px]"></i></span>
          <span class="hidden kt-menu-item-show:inline-flex"><i class="ki-filled ki-minus text-[11px]"></i></span>
         </span>
        </div>
        <div class="kt-menu-accordion gap-1 ps-[10px] relative before:absolute before:start-[20px] before:top-0 before:bottom-0 before:border-s before:border-border">
         ${generateMenuItem('Profil du Cabinet', 'consultant-profile.html')}
         ${generateMenuItem('Opportunités (AMI)', 'consultant-opportunities.html')}
         ${generateMenuItem('Mes Candidatures', 'consultant-applications.html')}
        </div>
       </div>

       <!-- EXPERT SECTION -->
       <div class="kt-menu-item" data-kt-menu-item-toggle="accordion" data-kt-menu-item-trigger="click">
        <div class="kt-menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] ps-[10px] pe-[10px] py-[6px]" tabindex="0">
         <span class="kt-menu-icon items-start text-muted-foreground w-[20px]"><i class="ki-filled ki-star text-lg"></i></span>
         <span class="kt-menu-title text-sm font-medium text-foreground kt-menu-item-active:text-primary kt-menu-link-hover:!text-primary">3. Espace Expert</span>
         <span class="kt-menu-arrow text-muted-foreground w-[20px] shrink-0 justify-end ms-1 me-[-10px]">
          <span class="inline-flex kt-menu-item-show:hidden"><i class="ki-filled ki-plus text-[11px]"></i></span>
          <span class="hidden kt-menu-item-show:inline-flex"><i class="ki-filled ki-minus text-[11px]"></i></span>
         </span>
        </div>
        <div class="kt-menu-accordion gap-1 ps-[10px] relative before:absolute before:start-[20px] before:top-0 before:bottom-0 before:border-s before:border-border">
         ${generateMenuItem('Dashboard Expert', 'expert-dashboard.html')}
         ${generateMenuItem('Dossiers Assignés', 'expert-dossiers.html')}
         ${generateMenuItem('Récapitulatif Notes', 'expert-summary.html')}
        </div>
       </div>

       <!-- BAD SECTION -->
       <div class="kt-menu-item" data-kt-menu-item-toggle="accordion" data-kt-menu-item-trigger="click">
        <div class="kt-menu-link flex items-center grow cursor-pointer border border-transparent gap-[10px] ps-[10px] pe-[10px] py-[6px]" tabindex="0">
         <span class="kt-menu-icon items-start text-muted-foreground w-[20px]"><i class="ki-filled ki-bank text-lg"></i></span>
         <span class="kt-menu-title text-sm font-medium text-foreground kt-menu-item-active:text-primary kt-menu-link-hover:!text-primary">4. Supervision (BAD)</span>
         <span class="kt-menu-arrow text-muted-foreground w-[20px] shrink-0 justify-end ms-1 me-[-10px]">
          <span class="inline-flex kt-menu-item-show:hidden"><i class="ki-filled ki-plus text-[11px]"></i></span>
          <span class="hidden kt-menu-item-show:inline-flex"><i class="ki-filled ki-minus text-[11px]"></i></span>
         </span>
        </div>
        <div class="kt-menu-accordion gap-1 ps-[10px] relative before:absolute before:start-[20px] before:top-0 before:bottom-0 before:border-s before:border-border">
         ${generateMenuItem('Dashboard Supervision', 'bad-dashboard.html')}
         ${generateMenuItem('Requêtes ANO', 'bad-review-list.html')}
        </div>
       </div>
`;

function generateMenuItem(title, link) {
    return `
         <div class="kt-menu-item">
          <a class="kt-menu-link border border-transparent items-center grow kt-menu-item-active:bg-accent/60 dark:menu-item-active:border-border kt-menu-item-active:rounded-lg hover:bg-accent/60 hover:rounded-lg gap-[14px] ps-[10px] pe-[10px] py-[8px]" href="html/demo1/${link}" tabindex="0">
           <span class="kt-menu-bullet flex w-[6px] -start-[3px] rtl:start-0 relative before:absolute before:top-0 before:size-[6px] before:rounded-full rtl:before:translate-x-1/2 before:-translate-y-1/2 kt-menu-item-active:before:bg-primary kt-menu-item-hover:before:bg-primary"></span>
           <span class="kt-menu-title text-2sm font-normal text-foreground kt-menu-item-active:text-primary kt-menu-item-active:font-semibold kt-menu-link-hover:!text-primary">${title}</span>
          </a>
         </div>`;
}

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find sidebar menu block
        const startStr = 'id="sidebar_menu">';
        const endStr = '<!-- End of Sidebar Menu -->';
        
        const startIndex = content.indexOf(startStr);
        const endIndex = content.indexOf(endStr);
        
        if (startIndex !== -1 && endIndex !== -1) {
            const before = content.substring(0, startIndex + startStr.length);
            const after = content.substring(endIndex);
            
            content = before + '\n' + menuHtml + '\n      ' + after;
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedCount++;
        }
    }
});

console.log(`Mega Menu successfully injected into ${modifiedCount} files.`);
