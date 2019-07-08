const fs = require('fs');
const {execSync} = require('child_process');
const {rmdir} = require('./utils');



const mainIn = './src/augmentedGlobal.d.ts';
const interfacesIn = './node_modules/@waves/waves-transactions/dist/transactions.d.ts';
const mainOut = './build/global.d.ts'
const interfacesOut = './build/transactions.d.ts';
const typedocPath = './node_modules/typedoc/bin/typedoc';

if (!fs.existsSync('build')) {
    fs.mkdirSync('build');
    // rmdir('build')
}


/// Prepare main file
const mainContent = fs.readFileSync(mainIn, "utf8").replace('declare global {', '').trim().slice(0,-1);
fs.writeFileSync(mainOut, mainContent, "utf-8");

/// Prepare interface file
const modulePrefix = '/**\n' +
    ' * @module Interfaces\n' +
    ' */\n';
const interfacesContent = fs.readFileSync(interfacesIn, "utf8");
const firstImportIndex = interfacesContent.indexOf('import');
fs.writeFileSync(interfacesOut, modulePrefix, "utf-8");
fs.appendFileSync(interfacesOut, interfacesContent.slice(firstImportIndex), "utf-8")


execSync(`${typedocPath} --listFiles ${interfacesOut} ${mainOut}`);
console.log('Docs built successfully');


