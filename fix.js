import fs from 'fs';
['src/data/scriptPatterns.ts', 'src/data/templates.ts'].forEach(f => {
    let s = fs.readFileSync(f, 'utf8');
    s = s.replace(/\\'/g, "'");
    s = s.replace(/\\`/g, "`");
    s = s.replace(/\\\$/g, "$");
    fs.writeFileSync(f, s);
});
