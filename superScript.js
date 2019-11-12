"useStrict"

//saving my token
window.localStorage.setItem("tokenAlumno", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5Mzg1IiwiaWF0IjoxNTcyMjcxMTAwfQ.Ifaroy08WSikYjZuiKfC-vAVj8s2VF5iXdZR1FCXKhw");
//localStorage.getItem("tokenAlumno")

//count for the urls
if(localStorage.getItem("menCount") == null) window.localStorage.setItem("menCount", 0);
if(localStorage.getItem("womenCount") == null) window.localStorage.setItem("menCount", 0);

//Base URL
var baseUrl = "https://users-dasw.herokuapp.com/api/"

//XMLHTTPRequest
var xhr;

//user object
var user = {};

//registry form
var form = document.getElementById("registryForm");
if(form != null){
    form.addEventListener("change", validateInput);
    form.addEventListener("submit", submitForm);
}

//submit button
var submit = document.getElementById("submitRegistry");
if(submit != null) submit.disabled = true;

//login 
var loginButton = document.getElementById("loginButton");
if(loginButton != null) loginButton.onclick = loginRequest;

//form onchange listener
function validateInput() {
    var formInvalidList = document.querySelectorAll("#registryForm input:invalid");
    var formValidList = document.querySelectorAll("#registryForm input:valid");

    //passwords
    var password1 = document.getElementById("password1");
    var password2 = document.getElementById("password2");

    if(formInvalidList.length > 0){
        let arr = Array.from(formInvalidList);
        arr.forEach((item) => item.setAttribute("style", "border-color: red;"));
        submit.disabled = true;
    }
    if(formValidList.length > 0){
        let validArr = Array.from(formValidList);
        validArr.forEach((item) => item.removeAttribute("style"));
        if(formInvalidList.length == 0){       
            if(password1.value != password2.value){
                submit.disabled = true;
                password2.setAttribute("style", "border-color: red;");
            }     
            else{
                submit.disabled = false;
            }
        }
    }
}

//form onsubmit listener
function submitForm(event) {
    event.preventDefault();

    let inputArr = Array.from(document.querySelectorAll("#registryForm input:valid"));
    inputArr.forEach(createInputJson); 

    //manage the URL
    if(user.url == ""){
        let menCount = parseInt(localStorage.getItem("menCount"));
        let womenCount = parseInt(localStorage.getItem("womenCount"));

        user.url = `https://randomuser.me/api/portraits/${user.sexo == "H" ? `men/${menCount++}` : `women/${womenCount++}`}.jpg`
        window.localStorage.setItem("menCount", menCount);  
        window.localStorage.setItem("womenCount", womenCount);

    } 

    //HTTP request
    xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseUrl}users/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    xhr.send(JSON.stringify(user));
    xhr.onload = function() {
        if(xhr.status != 201){
            //error
            alert(xhr.status + ': ' + xhr.statusText + ' ' + xhr.responseText);
            console.log(xhr.responseText);
        }else {
            alert("User registered succesfully"); //
        }
    }
}

//login onclick handler
function loginRequest() {
    let loginUser = {
        correo: document.getElementById("loginMail").value,
        password: document.getElementById("loginPassword").value
    };

    //HTTP request
    xhr = new XMLHttpRequest();
    xhr.open('POST', `${baseUrl}login/`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.getItem("tokenAlumno"));
    xhr.send(JSON.stringify(loginUser));
    xhr.onload = function() {
        if(xhr.status != 200){
            //error
            alert(xhr.status + ': ' + xhr.statusText + ' ' + xhr.responseText);
        }else {
            //go to consultas
            let onj = JSON.parse(xhr.responseText);
            window.localStorage.setItem("tokenUsuario", onj.token);       
            window.location = "consulta.html";
        }
    }
}

//forEach functions
function createInputJson(item) {

    if(item.name == "confirmPassword") return;
    user[`${item.name}`] = item.value;
}