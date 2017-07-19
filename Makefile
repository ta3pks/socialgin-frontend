out:
	npm install
	webpack --output-filename ./public/js/client-styles.min.js --config ./webpack.config.js ./bundles/client.styles.js --optimize-minimize
	webpack --output-filename ./public/js/client.min.js --config ./webpack.config.js ./bundles/client.js --optimize-minimize
	webpack --output-filename ./public/js/landing.min.js --config ./webpack.config.js ./bundles/landing.js --optimize-minimize
 