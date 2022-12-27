const POLYFILLS = {
	LastModifiedLine: `/** Polyfills for MediaWiki <= 1.40 */
mw.requestIdleCallback( function () {
	/* Polyfill for LastModifiedLine */
	var $polyfillLastMod = $('.skin-polyfill-last-modified');
	if ( !$polyfillLastMod.length) {
		return;
	}
	mw.loader.using( 'mediawiki.api' ).then( function () {
		var api = new mw.Api();
		api.get( {
			action: 'query',
			prop: 'revisions',
			titles: mw.config.get('wgTitle'),
			formatversion: 2,
			redirects: 1
		} ).then( function ( a ) {
			var lastmod;
			try {
				lastmod = new Date( a.query.pages[0].revisions[0].timestamp );
				lastmod = lastmod.toLocaleDateString(
					mw.config.get('wgUserLanguage'),
					{ year:"numeric", month:"short", day:"numeric" }
				);
			} catch ( e ) {
				lastmod = 'Unknown';
			}
			$polyfillLastMod.parent().text(lastmod);
		} );
	} );
} );
`
};

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

