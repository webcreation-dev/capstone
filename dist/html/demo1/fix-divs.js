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

let fixedCount = 0;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Only fix if the missing div hasn't been added yet
        // Check if there's already a div right before the comment
        if (content.includes('</div>\n      <!-- End of Sidebar Menu -->')) {
            console.log(file + ' already fixed.');
            return;
        }

        // Replace the comment with the closing div + the comment
        const target = '<!-- End of Sidebar Menu -->';
        const replacement = '</div>\n      <!-- End of Sidebar Menu -->';
        
        if (content.includes(target)) {
            content = content.replace(target, replacement);
            fs.writeFileSync(filePath, content, 'utf8');
            fixedCount++;
        }
    }
});

console.log(`Fixed missing closing div in ${fixedCount} files.`);
