import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirs = [
  // Asegúrate que estos son los directorios correctos que necesitas crear antes de construir
  path.join(__dirname, 'public', 'assets'), 
  path.join(__dirname, 'dist') 
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    // La opción { recursive: true } crea directorios padres si no existen
    fs.mkdirSync(dir, { recursive: true }); 
    console.log(`Directorio creado: ${dir}`);
  } else {
    console.log(`Directorio ya existe: ${dir}`);
  }
});