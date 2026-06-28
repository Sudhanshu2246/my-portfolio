const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

walkDir(path.join(__dirname, '../src'), (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
    console.log(`Processing: ${filePath}`);
    const code = fs.readFileSync(filePath, 'utf8');
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.Preserve
      }
    });

    const isTsx = filePath.endsWith('.tsx');
    const newPath = filePath.replace(/\.tsx?$/, isTsx ? '.jsx' : '.js');
    fs.writeFileSync(newPath, result.outputText);
    fs.unlinkSync(filePath);
  }
});
console.log("Done!");
