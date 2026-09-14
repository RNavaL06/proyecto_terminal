const fs = require('fs');
const path = require('path');

const frontends = [
    'c:\\Proyecto_Terminal\\05_conectar_interfaz_captura_de_recetas_con_backend',
    'c:\\Proyecto_Terminal\\07_Programar_busqueda_manual_de_farmacias_por_direccion\\frontend-farmacias',
    'c:\\Proyecto_Terminal\\09_Programar_la_captura_de_sintomas_por_voz\\frontend'
];

const destDir = 'c:\\Proyecto_Terminal\\BDI\\frontend_bdi\\src';
const dirsToCopy = ['components', 'pages', 'services', 'hooks', 'assets'];

const copyRecursiveSync = (src, dest) => {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyRecursiveSync(srcPath, destPath);
        } else {
            if (fs.existsSync(destPath)) {
                console.log(`Collision detected: ${destPath}. Skipping or overwriting...`);
            }
            fs.copyFileSync(srcPath, destPath);
        }
    }
};

for (const fe of frontends) {
    const srcBase = path.join(fe, 'src');
    if (!fs.existsSync(srcBase)) continue;
    
    for (const d of dirsToCopy) {
        const sourcePath = path.join(srcBase, d);
        if (fs.existsSync(sourcePath)) {
            copyRecursiveSync(sourcePath, path.join(destDir, d));
            console.log(`Copied ${sourcePath}`);
        }
    }
    // Copiar App.css, index.css si son más completos
    // Por simplicidad, los copiaré manualmente o concatenaré más tarde.
}
console.log("Frontend merge complete!");
