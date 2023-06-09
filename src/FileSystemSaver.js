const fs = require( 'fs' );
const rootFolder = './';

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

module.exports = FileSystemSaver;
