const POLYFILLS = {};

const POLYFILLS_MATCH = {
	'?action=history': `mw.requestIdleCallback( function () {
	// History URL
	$('[href="?action=history"]').prop('href', mw.util.getUrl( mw.config.get('wgTitle'), { action: 'history' } ) );
} );`
};

const polyfill = (js, templates) => {
	Object.keys( templates ).forEach( ( template ) => {
		if (POLYFILLS[template]) {
			js = POLYFILLS[template] + js;
		}
		const text = templates[template];
		Object.keys( POLYFILLS_MATCH ).forEach( ( key ) => {
			if ( text.indexOf( key ) > -1 ) {
				js = POLYFILLS_MATCH[ key ] + js;
			}
		} );
	});
	return js;
};

export default polyfill;

