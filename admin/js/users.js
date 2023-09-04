const API_DOMAIN = "https://backend.skimo.cat/api/"

function changeUsername(id) {
    let newUsername = prompt("Nou nom d'usuari");
    if (newUsername == null) {
        return;
    }

    fetch(API_DOMAIN + "/admin/users/" + id + "/username/edit", 
        {
        method: 'POST',
        body: "username=" + newUsername,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                getUsers();
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function changeEmail(id) {
    let newEmail = prompt("Nou email");
    if (newEmail == null) {
        return;
    }

    fetch(API_DOMAIN + "/admin/users/" + id + "/email/edit", 
        {
        method: 'POST',
        body: "email=" + newEmail,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                getUsers();
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function changeAdmin(id, username, admin) {
    if (admin === 0) {
        admin = 1;
    } else {
        admin = 0;
    }

    if (confirm("Vols canviar el valor admin de l'usuari " + username + " per " + admin + "?")) {
        fetch(API_DOMAIN + "/admin/users/" + id + "/admin/" + admin)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (data.status != "ok") {
                        alert(data.message);
                        return;
                    }
                    getUsers();
                });
            } else {
                alert("Error del servidor");
            }
        })
        .catch(err => {
            alert("Error del servidor");
        });
    }
}

function changeBan(id, username, ban) {
    if (ban === 0) {
        ban = 1;
    } else {
        ban = 0;
    }

    if (confirm("Vols canviar el valor ban de l'usuari " + username + " per " + ban + "?")) {
        fetch(API_DOMAIN + "/admin/users/" + id + "/banned/" + ban)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (data.status != "ok") {
                        alert(data.message);
                        return;
                    }
                    getUsers();
                });
            } else {
                alert("Error del servidor");
            }
        })
        .catch(err => {
            alert("Error del servidor");
        });
    }
}

function setPassword(id) {
    let newPassword = prompt("Nova contrasenya");
    if (newPassword == null) {
        return;
    }

    fetch(API_DOMAIN + "/admin/users/" + id + "/password/edit",
        {
        method: 'POST',
        body: "password=" + newPassword,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        credentials: 'include'
        })
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    alert(data.message);
                    return;
                }
                alert("Contrasenya canviada correctament");
            });
        } else {
            alert("Error del servidor");
        }
    })
    .catch(err => {
        alert("Error del servidor");
    });
}

function deleteUser(id) {
    if (confirm("Vols eliminar l'usuari amb id " + id + "?")) {
        fetch(API_DOMAIN + "/admin/users/" + id + "/delete")
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    if (data.status != "ok") {
                        alert(data.message);
                        return;
                    }
                    getUsers();
                });
            } else {
                alert("Error del servidor");
            }
        })
        .catch(err => {
            alert("Error del servidor");
        });
    }
}

function getUsers() {
    let tbody = document.getElementById("users-table-body");
    tbody.innerHTML = "";
    fetch(API_DOMAIN + '/admin/users')
    .then(function(response) {
        if (response.ok) {
            response.json().then(function (data) {
                if (data.status != "ok") {
                    document.getElementById("main-container").innerHTML = data.message;
                    document.getElementById("main-container").style.color = "red";
                    return;
                }
                let users = data.users;
                for (let i = 0; i < users.length; i++) {
                    let user = users[i];
                    let tr = document.createElement("tr");
                    let td1 = document.createElement("td");
                    td1.innerHTML = user.id;

                    let td2 = document.createElement("td");
                    td2.innerHTML = user.username;
                    td2.setAttribute("onclick", "changeUsername(" + user.id + ")");

                    let td3 = document.createElement("td");
                    td3.innerHTML = user.email;
                    td3.setAttribute("onclick", "changeEmail(" + user.id + ")");


                    let td4 = document.createElement("td");
                    if (user.admin !== 0) {
                        td4.innerHTML = "Si";
                    } else {
                        td4.innerHTML = "No";
                    }
                    td4.setAttribute("onclick", "changeAdmin(" + user.id + ", '" + user.username + "', " + user.admin + ")");

                    let td5 = document.createElement("td");
                    td5.innerHTML = user.banned;
                    if (user.banned !== 0) {
                        td5.innerHTML = "Si";
                    } else {
                        td5.innerHTML = "No";
                    }
                    td5.setAttribute("onclick", "changeBan(" + user.id + ", '" + user.username + "', " + user.banned + ")");

                    let td6 = document.createElement("td");
                    let button = document.createElement("button");
                    button.setAttribute("onclick", "deleteUser(" + user.id + ")");
                    button.innerHTML = "Eliminar";
                    let buttonSetPassword = document.createElement("button");
                    buttonSetPassword.setAttribute("onclick", "setPassword(" + user.id + ")");
                    buttonSetPassword.innerHTML = "Canviar contrasenya";
                    td6.appendChild(buttonSetPassword);
                    td6.appendChild(button);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tbody.appendChild(tr);
                }
            });
        } else {
            document.getElementById("main-container").innerHTML = "Error del servidor";
            document.getElementById("main-container").style.color = "red";
        }

    })
    .catch(function(error) {
        document.getElementById("main-container").innerHTML = "Error del servidor";
        document.getElementById("main-container").style.color = "red";
    });
}

document.getElementById("acces-denied").style.display = "none";
getUsers();