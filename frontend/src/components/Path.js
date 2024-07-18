const app_name = 'swipet-becad9ab7362';
exports.buildPath =

function buildPath(route) {
    if (process.env.NODE_ENV == 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
        return 'http://localhost:3001/' + route;
    }
}