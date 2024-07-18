exports.storeToken = function (tok) {
    try {
        localStorage.setItem('token_data', tok);
        console.log("Token stored successfully:", tok);
    }
    catch (e) {
        console.error("Error storing token:", e.message);
    }
}

exports.retrieveToken = function () {
    var ud;
    try {
        ud = localStorage.getItem('token_data');
        console.log("Token retrieved:", ud ? "Token exists" : "No token found");
    }
    catch (e) {
        console.error("Error retrieving token:", e.message);
    }
    return ud;
}