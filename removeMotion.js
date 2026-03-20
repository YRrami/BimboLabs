const fs = require('fs');

const files = [
  'src/pages/OurWork.tsx',
  'src/pages/Solutions.tsx', 
  'src/pages/About.tsx',
  'src/components/layout/SiteLayout.tsx',
  'src/AppRouter.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove framer-motion imports  
  content = content.replace(/import\s*{[^}]*motion[^}]*}\s*from\s*["']framer-motion["'];\n?/g, '');
  content = content.replace(/import\s*{\s*AnimatePresence[^}]*}\s*from\s*["']framer-motion["'];\n?/g, '');
  content = content.replace(/import\s*{[^}]*useScroll[^}]*}\s*from\s*["']framer-motion["'];\n?/g, '');
  
  // Remove remaining empty import lines
  content = content.replace(/^import.*from.*;\n/gm, (match) => {
    if (match.includes('from "react"') || match.includes('from \'react\'')) return match;
    if (match.includes('framer-motion')) return '';
    return match;
  });
  
  fs.writeFileSync(file, content, 'utf8');
  console.log('Cleaned imports from', file);
});

console.log('Import cleanup complete!');
