"useStrict"

//saving my token
// window.localStorage.setItem("tokenAlumno", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5Mzg1IiwiaWF0IjoxNTcyMjcxMTAwfQ.Ifaroy08WSikYjZuiKfC-vAVj8s2VF5iXdZR1FCXKhw");
//localStorage.getItem("tokenAlumno")

// ${sex == "HOMBRE" ? "men" : "women"}/${currentId}.jpg`

//Base URL
// var baseUrl = "https://users-dasw.herokuapp.com/api/"

//admin users
// console.log("I'm loaded");
window.onload = loadUsers;
var userObj = {};

//load and display users from the backend
function loadUsers() {
    console.log("loaded");
    xhr = new XMLHttpRequest();
    xhr.open("GET", `${baseUrl}users/`);
    xhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    xhr.setRequestHeader('x-user-token', localStorage.getItem("tokenUsuario"));
    xhr.send();
    xhr.onload = function() {
        if(xhr.status != 200){
            alert(xhr.status + ': ' + xhr.statusText + ' ' + xhr.responseText);
        }else {
            //generar HTML
            let usersArray = JSON.parse(xhr.responseText);
            //console.table(usersArray);
            usersArray.forEach(generateHtml);
        }
    }
}

function generateHtml(item, index) {
    let htmlElement = document.createElement("DIV");
    htmlElement.setAttribute("CLASS", "media col-8 mt-2");
    getUserByEmail(item, index);
    // console.log("localStorage" + localStorage.getItem(`user${index}`));
    let userObj = JSON.parse(localStorage.getItem(`user${index}`));
    htmlElement.setAttribute("ID", userObj.iid);
    htmlElement.innerHTML = `
            <div class="media-left align-self-center mr-3">
                <img class="rounded-circle" style="width: inherit;" src="${userObj.url}">
            </div>
            <div class="media-body">
                <h4>${userObj.nombre} ${userObj.apellido}</h4>
                <p >Correo: ${userObj.correo}</p>
                <p >Fecha de nacimiento: ${userObj.fecha} </p>
                <p >Sexo: ${userObj.sexo == "H" ? "Hombre" : "Mujer"} </p>
            </div>
            <div class="media-right align-self-center">
                <div class="row">
                    <a onclick="viewDetails('${userObj.correo}')" href="#" class="btn btn-primary"><i class="fas fa-search  "></i></a>
                </div>
                <div class="row">
                    <a onclick="editUser('${userObj.correo}')" href="#" class="btn btn-primary mt-2 editBut" data-toggle="modal" data-target="#edit"><i class="fas fa-pencil-alt  "></i></a>
                </div>
                <div class="row">
                    <a onclick="removeUser('${userObj.correo}')" href="#" class="btn btn-primary mt-2" data-toggle="modal" data-target="#deleteConfirmation"><i class="fas fa-trash-alt "></i></i></a>
                </div>
            </div>
        `
    document.getElementById("lista").append(htmlElement);
}

//get more details to display
function getUserByEmail(item, index) {
    let userXhr = new XMLHttpRequest();
    userXhr.open("GET", `${baseUrl}users/${item.correo}/`);
    userXhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    userXhr.setRequestHeader('x-user-token', localStorage.getItem("tokenUsuario"));
    userXhr.send();
    userXhr.onload = function() {
        if(userXhr.status != 200){
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
        }else {
            window.localStorage.setItem(`user${index}`, userXhr.responseText);
        }
    }
}

//TODO
function viewDetails(correo) {
    console.log(correo);
}

//edit Users / onclick handler
function editUser(correo) {
    let userXhr = new XMLHttpRequest();
    userXhr.open("GET", `${baseUrl}users/${correo}/`);
    userXhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    userXhr.setRequestHeader('x-user-token', localStorage.getItem("tokenUsuario"));
    userXhr.send();
    userXhr.onload = function() {
        if(userXhr.status != 200) {
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
        } else {
            userObj = JSON.parse(userXhr.responseText);
            document.getElementById("editForm").addEventListener("submit", updateUser);
            updateEditModal();
            console.log("I'm still here");
            //TODO: //save the new info from the user.
        }

    }
}


//remove user / onclick handler
function removeUser(correo) {
    let userXhr = new XMLHttpRequest();
    userXhr.open("GET", `${baseUrl}users/${correo}/`);
    userXhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    userXhr.setRequestHeader('x-user-token', localStorage.getItem("tokenUsuario"));
    userXhr.send();
    userXhr.onload = function() {
        if(userXhr.status != 200) {
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
        } else {
            userObj = JSON.parse(userXhr.responseText);
            updateDeleteModal();
            document.getElementById("deleteButton").addEventListener("click", deleteUser);
        }

    }

}

function updateEditModal() {

    document.getElementById("editSexH").setAttribute("disabled", true);
    document.getElementById("editSexM").setAttribute("disabled", true);
    document.getElementById("editCorreo").setAttribute("disabled", true);

    document.getElementById("editName").value = userObj.nombre;
    document.getElementById("editLast").value = userObj.apellido;
    document.getElementById("editCorreo").value = userObj.correo;
    document.getElementById("editDate").value = userObj.fecha;
    document.getElementById("editUrl").value = userObj.url;
    document.getElementById("editPassword1").value = userObj.password;

    if(userObj.sexo == "H"){
        document.getElementById("editSexH").setAttribute("CHECKED", true);
        document.getElementById("editSexM").setAttribute("checked", false);

    } else {
        document.getElementById("editSexH").setAttribute("checked", false);
        document.getElementById("editSexM").setAttribute("checked", true);
    }
}

function updateDeleteModal() {

    document.getElementById("deleteUrl").setAttribute("src", userObj.url);
    document.getElementById("deleteNombre").innerText = `${userObj.nombre} ${userObj.apellido}`;
    document.getElementById("deleteCorreo").innerText = `Correo. ${userObj.correo}`;
    document.getElementById("deleteFecha").innerText = `Fecha de nacimiento: ${userObj.fecha}`;
    document.getElementById("deleteSexo").innerText = `Sexo: ${userObj.sexo == 'H' ? 'Hombre' : 'Mujer'}`;

}

function deleteUser() {
    console.log("delete on click")
    let userXhr = new XMLHttpRequest();
    userXhr.open("DELETE", `${baseUrl}users/${userObj.correo}/`);
    userXhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    userXhr.setRequestHeader('x-user-token', localStorage.getItem("tokenUsuario"));
    userXhr.send();
    userXhr.onload = function() {
        if(userXhr.status != 200) {
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
        } else {
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
            location.reload();
        }
    }
}

function updateUser(event) {
    event.preventDefault(); 
    console.log("update user");
    let formInputs = document.querySelectorAll("#edit input:valid");
    let formInputsArray =  Array.from(formInputs);
    let string = "{";
    formInputsArray.forEach((item) => string += `"${item.name}":"${item.value}",`);
    string = string.slice(0, -1) + "}";
    console.log("update: " + string);

    let userXhr = new XMLHttpRequest();
    userXhr.open("PUT", `${baseUrl}users/${userObj.correo}/`);
    userXhr.setRequestHeader('Content-Type', 'application/json');
    userXhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    userXhr.setRequestHeader('x-user-token', localStorage.getItem("tokenUsuario"));
    userXhr.send(string);
    userXhr.onload = function () {
        if(userXhr.status != 200) {
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
        } else {
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
            location.reload();
        }
    }
}