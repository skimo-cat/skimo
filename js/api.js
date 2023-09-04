const API_DOMAIN = "https://backend.skimo.cat/api/";

var CURRENT_USERNAME = null;
var SELECTED_CIM = null;
var SELECTED_ROUTE = null;

overlays_ids = [
    'login-overlay',
    'register-overlay',
    'dificultat-overlay',
    'wc-overlay'
]

catched_dificultats = {}

function getSelectedCim() {
    if (SELECTED_CIM === null) {
        return null;
    }
    return cims[SELECTED_CIM-1];
}


function closeAllOverlays() {
    for (let i=0; i<overlays_ids.length; i++) {
        document.getElementById(overlays_ids[i]).style.visibility='hidden';
    }
}

function openLoginOverlay(e) {
    closeAllOverlays();
    document.getElementById('login-overlay').style.visibility='visible';
    document.getElementById('register-overlay').style.visibility='hidden';
}

function openRegisterOverlay(e) {
    closeAllOverlays();
    document.getElementById('register-overlay').style.visibility='visible';
    document.getElementById('login-overlay').style.visibility='hidden';
}

function openDificultatOverlay(id_ruta) {
    closeAllOverlays();
    document.getElementById('dificultat-overlay').style.visibility='visible';
    document.getElementById('dificultat-cim-nom').innerHTML = getSelectedCim().name;

    SELECTED_ROUTE = id_ruta;

    if (CURRENT_USERNAME === null) {
        document.getElementById('dificultat-error-message').innerHTML = "Has d'iniciar sessió per afegir una dificultat";
        document.getElementById('dificultat-form-button').disabled = true;
        return;
    } else {
        document.getElementById('dificultat-error-message').innerHTML = "";
        document.getElementById('dificultat-form-button').disabled = false;
    }
}

function handleRegisterForm(e) {
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let username = document.getElementById('register-username').value;
    let password = document.getElementById('register-password').value;

    document.getElementById('register-error-message').innerHTML = "";
    document.getElementById('register-error-message').style.color = "red";

    fetch(API_DOMAIN + "/auth/register", 
        {
        method: 'POST',
        body: "email=" + email + "&username=" + username + "&password=" + password,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    document.getElementById("register-error-message").innerHTML = data.message;
                    return;
                }
                getCurrentUsername();
                document.getElementById('login-error-message').innerHTML = "Registre correcte, ja pots iniciar sessió";
                document.getElementById('login-error-message').style.color = "green";
                openLoginOverlay();
            });
        } else {
            document.getElementById("register-error-message").innerHTML = "Error del servidor";
        }
    });
}

function handleLoginForm(e) {
    e.preventDefault();
    let username = document.getElementById('login-username').value;
    let password = document.getElementById('login-password').value;

    document.getElementById('login-error-message').innerHTML = "";
    document.getElementById('login-error-message').style.color = "red";

    fetch(API_DOMAIN + "/auth/login", 
        {
        method: 'POST',
        body: "username=" + username + "&password=" + password,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    document.getElementById("login-error-message").innerHTML = data.message;
                    return;
                }
                getCurrentUsername();
                document.getElementById('login-error-message').innerHTML = "";
                document.getElementById('login-overlay').style.visibility='hidden';
            });
        } else {
            document.getElementById("login-error-message").innerHTML = "Error del servidor";
        }
    })
    .catch(err => {
        document.getElementById("login-error-message").innerHTML = "Error del servidor";
    });

}

function logoutHandler(e) {
    fetch(API_DOMAIN + "/auth/logout")
    .then(function (response) {
        if (response.ok) {
            CURRENT_USERNAME = null;
            document.getElementById('login-register-text').innerHTML = '<a id="login-button">Inicia Sessió</a> / <a id="register-button">Registra\'t</a>';
            document.getElementById('login-button').addEventListener('click', openLoginOverlay);
            document.getElementById('register-button').addEventListener('click', openRegisterOverlay);
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function handleDificultatForm(e) {
    e.preventDefault();

    if (e.submitter.value !== "Enviar") {
        document.getElementById('dificultat-overlay').style.visibility='hidden';
        document.getElementById('dificultat-error-message').innerHTML = "";
        return;
    }

    let alpina = document.getElementById('dificultat-alpina-select').value;
    let esqui = document.getElementById('dificultat-esqui-select').value;
    let fisica = document.getElementById('dificultat-fisica-select').value;
    //let cim_id = SELECTED_CIM;
    let route_id = SELECTED_ROUTE;

    fetch(API_DOMAIN + "/rutes/" + route_id + "/dificultat/add",
        {
        method: 'POST',
        body: "dificultat_alpina=" + alpina + "&dificultat_esqui=" + esqui + "&dificultat_fisica=" + fisica,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    document.getElementById("dificultat-error-message").innerHTML = data.message;
                    return;
                }
                document.getElementById('dificultat-error-message').innerHTML = "";
                document.getElementById('dificultat-overlay').style.visibility='hidden';
                catched_dificultats[route_id] = undefined;
                setDificultatFromRoute(route_id);
            });
        } else {
            document.getElementById("dificultat-error-message").innerHTML = "Error del servidor";
        }
    })
    .catch(err => {
        document.getElementById("dificultat-error-message").innerHTML = "Error del servidor";
    });
}

function getCurrentUsername() {
 	fetch(API_DOMAIN + "/auth/user/current")
    .then(function (response) {
        CURRENT_USERNAME = null;
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    console.log("Error: " + data.message);
                    return;
                }
                CURRENT_USERNAME = data.username;
                document.getElementById('login-register-text').innerHTML = "Hola, " + data.user.username + '<a id="logout-button">Desconectar-se</a>';
                document.getElementById('logout-button').addEventListener('click', logoutHandler);
            });
        } else {
            console.log("Error del servidor");
        }
    })
	.catch(err => {
        CURRENT_USERNAME = null;
        console.log("Fetch error" + err.message);
    });
}

function setDificultatFromRoute(route_id) {
    document.getElementById("dificultats-" + route_id).style.color = "black";

    if (catched_dificultats[route_id] !== undefined) {
        document.getElementById('dificultat-alpina-' + route_id).innerHTML = catched_dificultats[route_id].dificultat_alpina;
        document.getElementById('dificultat-esqui-' + route_id).innerHTML = catched_dificultats[route_id].dificultat_esqui;
        document.getElementById('dificultat-fisica-' + route_id).innerHTML = catched_dificultats[route_id].dificultat_fisica;
        return;
    }

    fetch(API_DOMAIN + "/rutes/" + route_id + "/dificultat")
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    document.getElementById("dificultats-" + route_id).innerHTML = data.message;
                    document.getElementById("dificultats-" + route_id).style.color = "red";
                    return;
                }
                let dificultat_alpina = data.dificultat.dificultat_alpina;
                let dificultat_esqui = data.dificultat.dificultat_esqui;
                let dificultat_fisica = data.dificultat.dificultat_fisica;
                if (dificultat_alpina === null) {
                    dificultat_alpina = "?";
                } else {
                    dificultat_alpina = Math.round(dificultat_alpina * 10) / 10;
                }

                if (dificultat_esqui === null) {
                    dificultat_esqui = "?";
                } else {
                    dificultat_esqui = Math.round(dificultat_esqui * 10) / 10;
                }

                if (dificultat_fisica === null) {
                    dificultat_fisica = "?";
                } else {
                    dificultat_fisica = Math.round(dificultat_fisica * 10) / 10;
                }

                document.getElementById('dificultat-alpina-' + route_id).innerHTML = dificultat_alpina
                document.getElementById('dificultat-esqui-' + route_id).innerHTML = dificultat_esqui; 
                document.getElementById('dificultat-fisica-' + route_id).innerHTML = dificultat_fisica;
                catched_dificultats[route_id] = {
                    dificultat_alpina: dificultat_alpina,
                    dificultat_esqui: dificultat_esqui,
                    dificultat_fisica: dificultat_fisica
                }
            });
        } else {
            document.getElementById("dificultats-" + route_id).innerHTML = data.message;
            document.getElementById("dificultats-" + route_id).style.color = "red";
            return;
        }
    })
    .catch(err => {
        document.getElementById("dificultats-" + route_id).innerHTML = "Error del servidor";
        document.getElementById("dificultats-" + route_id).style.color = "red";
    });
}

// Handlers
document.getElementById('login-button').addEventListener('click', openLoginOverlay);
document.getElementById('register-button').addEventListener('click', openRegisterOverlay);
document.getElementById('login-form').addEventListener('submit', handleLoginForm);
document.getElementById('register-form').addEventListener('submit', handleRegisterForm);
document.getElementById('dificultat-form').addEventListener('submit', handleDificultatForm);
getCurrentUsername();