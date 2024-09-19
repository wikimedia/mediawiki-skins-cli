#!/usr/bin/env node
const { buildSkinBoilerplate } = require( './bundle.js' );
const rootFolder = './';
const args = process.argv.slice(2);
const FileSystemSaver = require( './src/FileSystemSaver.js');

const name = args[0];
if ( name ) {
    buildSkinBoilerplate(
        name,
        {
            Zipper: FileSystemSaver,
            CustomFileSaver: () => (
                () => Promise.resolve( true )
            )
        }
    ).then( () => {
        console.log(`Skin created at ${rootFolder}${name}`);
    } );
} else {
    console.warn( 'Cannot create a skin with no name!' );
}
