#!/usr/bin/env node
const { buildSkinBoilerplate } = require( './bundle.js' );
const fs = require( 'fs' );
const rootFolder = './';
const args = process.argv.slice(2);

class FileSystemSaver {
    constructor( root = '' ) {
        this.root = root;
        const path = `${rootFolder}/${root}`;
        if (!fs.existsSync( path )) {
            fs.mkdirSync( path, { recursive: true } );
        }
    }
    folder( root ) {
        return new FileSystemSaver( `${this.root}/${root}` );
    }
    file( path, content ) {
        fs.writeFileSync( `${rootFolder}${this.root}/${path}`, content );
    }
    generateAsync() {
        return Promise.resolve();
    }
}

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
