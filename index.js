'use strict';

var meta = require('./package.json'),
    express = require('express'),
    path = require('path'),
    app = module.exports = express();

process.on('uncaughtException', function (err) {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
});

app.set('name', meta.name);
app.set('version', meta.version);
app.set('port', process.env.PORT || 6633);
app.set('views', path.join(__dirname, '/delight/demo/admin-template', 'html'));
app.use(express.static(__dirname + '/demo/delight'));
app.set('logger', console);
app.enable('trust proxy');

app.get('*', function (req, res) {
    res.redirect(301, '/demo/delight/demo/admin-template/index.html');
});

if (require.main === module) {
    app.listen(app.get('port'), function () {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}
