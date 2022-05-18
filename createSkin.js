const { buildSkinBoilerplate } = require( './bundle.js' );
const fs = require( 'fs' );
const rootFolder = `${__dirname}/`;
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

buildSkinBoilerplate(
    args[0],
    {
        Zipper: FileSystemSaver,
        CustomFileSaver: () => (
            () => Promise.resolve( true )
        )
    }
).then( ( result ) => {
    console.log( result );
} );