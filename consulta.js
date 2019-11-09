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


//edit buttons



//load and display users from the backend
function loadUsers() {
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
            // console.table(usersArray);
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
                <br>
                <!--<p >Fecha de nacimiento: 01-01-2001 </p>-->
                <p >Sexo: ${userObj.sexo == "H" ? "Hombre" : "Mujer"} </p>
            </div>
            <div class="media-right align-self-center">
                <div class="row">
                    <a onclick="viewDetails(${userObj.correo})" href="#" class="btn btn-primary edit"><i class="fas fa-search edit  "></i></a>
                </div>
                <div class="row">
                    <a onclick='editUser(${userObj.correo})' href="#" class="btn btn-primary mt-2"><i class="fas fa-pencil-alt edit  "></i></a>
                </div>
                <div class="row">
                    <a onclick="removeUser(${userObj.correo})" href="#" class="btn btn-primary mt-2"><i class="fas fa-trash-alt  remove "></i></i></a>
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

}

//edit Users / onclick handler
function editUSer(correo) {
    let userXhr = new XMLHttpRequest();
    userXhr.open("GET", `${baseUrl}users/${correo}/`);
    userXhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    userXhr.setRequestHeader('x-user-token', localStorage.getItem("tokenUsuario"));
    userXhr.send();
    userXhr.onload = function() {
        if(userXhr.status != 200) {
            alert(userXhr.status + ': ' + userXhr.statusText + ' ' + userXhr.responseText);
        } else {
            let tmp = JSON.parse(userXhr.statusText);
            editName.value = tmp.nombre;
            console.log(editName.value);
        }

    }

}

//remove user / onclick handler
function removeUser(correo) {

}