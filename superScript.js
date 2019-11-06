"useStrict"

//saving my token
window.localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzA5Mzg1IiwiaWF0IjoxNTcyMjcxMTAwfQ.Ifaroy08WSikYjZuiKfC-vAVj8s2VF5iXdZR1FCXKhw");


var form = document.querySelector('.modal-body form'); 

form.addEventListener("change", validateInput);

function validateInput() {
    var formInvalidList = document.querySelectorAll("form input:invalid");
    var formValidList = document.querySelectorAll("form input:valid");

    if(formInvalidList.length > 0){
        let arr = Array.from(formInvalidList);
        arr.forEach(markInvalid);
        
        
    }
    if(formValidList.length > 0){
        let validArr = Array.from(formValidList);
        validArr.forEach(removeInvalid);
        if(formInvalidList.length == 0){
            console.log("should be enabled");
            document.querySelector('.modal-body .btn').disabled = false;
        }
    }
}

//for each functions
function markInvalid(item) {
    console.log("markInvalid");
    item.setAttribute("style", "border-color: red;");
}

function removeInvalid(item){
    item.removeAttribute("style");
}


console.log(form);