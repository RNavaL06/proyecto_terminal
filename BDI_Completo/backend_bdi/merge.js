const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Proyecto_Terminal';
const destDir = 'c:\\Proyecto_Terminal\\BDI\\backend_bdi';

const dirsToCopy = ['controllers', 'routes', 'middlewares', 'config', 'utils'];

const copyRecursiveSync = (src, dest) => {
    if (!fs.existsSync(src)) return;
    
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyRecursiveSync(srcPath, destPath);
        } else {
            // Check for collision
            if (fs.existsSync(destPath)) {
                console.log(`Collision detected: ${destPath}. Overwriting...`);
            }
            fs.copyFileSync(srcPath, destPath);
        }
    }
};

const mergeBackends = () => {
    const folders = fs.readdirSync(srcDir).filter(f => f.match(/^0/));
    
    for (const folder of folders) {
        let basePath = path.join(srcDir, folder);
        
        // Some activities have a nested 'backend' folder
        if (fs.existsSync(path.join(basePath, 'backend'))) {
            basePath = path.join(basePath, 'backend');
        }
        
        for (const target of dirsToCopy) {
            const targetPath = path.join(basePath, target);
            if (fs.existsSync(targetPath)) {
                copyRecursiveSync(targetPath, path.join(destDir, target));
                console.log(`Copied ${targetPath}`);
            }
        }
    }
};

mergeBackends();
console.log("Merge complete!");
