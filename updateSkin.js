#!/usr/bin/env node
const { buildSkinBoilerplate } = require( './bundle.js' );
const FileSystemSaver = require( './src/FileSystemSaver.js');
const fs = require( 'fs' );
const args = process.argv.slice(2);
const base = args[ 0 ] ? args[ 0 ] : __dirname;
const { exec } = require("child_process");

try {
    const skin = JSON.parse(
        fs.readFileSync( `${base}/skin.json` ).toString()
    );
    const name = skin.name;
    const skinStyles = skin.ResourceModuleSkinStyles || {};
    const skinStyleKey = Object.keys( skinStyles )[ 0 ];

    if ( name ) {
        buildSkinBoilerplate(
            name,
            {
                license: skin['license-name'],
                skinStyles: skinStyles[ skinStyleKey ] || {},
                Zipper: FileSystemSaver,
                CustomFileSaver: () => (
                    () => Promise.resolve( true )
                )
            }
        ).then( () => {
            exec(
                [
                    `mv ./${name}/templates/* templates/`,
                    `mv ./${name}/i18n/* i18n/`,
                    `mv ./${name}/resources/* resources/`,
                    `mv ./${name}/* .`,
                    `rm -r ./${name}`
                ].join( ' && ' ),
                () => {
                     console.log(`Skin updated.`);
                }
            )
        } );
    }
} catch ( e ) {
    console.log('got ', e);
    console.warn( 'Error occurred. Is this script being run in a valid MediaWiki directory?' );
}
