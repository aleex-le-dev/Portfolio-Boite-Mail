import fs from 'fs';
import path from 'path';

// Fonction pour corriger les chemins dans les fichiers JSON
function fixPathsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remplacer les chemins src/assets par assets pour la production
    content = content.replace(/\.\/src\/assets\//g, './assets/');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Chemins corrigés dans ${filePath}`);
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error);
  }
}

// Corriger les fichiers JSON dans dist/
const distPath = './dist';
const jsonFiles = ['email.json', 'projets.json', 'certification.json'];

jsonFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    fixPathsInFile(filePath);
  }
});

console.log('🎉 Correction des chemins terminée !');