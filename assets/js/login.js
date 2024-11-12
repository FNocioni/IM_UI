var loginForm = document.getElementById("login_form");

var email = document.getElementById("email");
var password = document.getElementById("password");
var submitButton = document.getElementById("submit_button");

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

loginForm.addEventListener('input', function() {
    validatePassword();
    validateEmail();
    submitButton.disabled = isSubmitDisabled();
});


async function login (){
    
    var data = {
        params: {
            'email': email.value,
            'password': password.value
        }
    }

    try {
        const result = await axios.post('http://localhost:8080/user/login', null, data);
    }catch (error) {
        if(error.code == "ERR_NETWORK"){
            alert("Could not connect to login server");
        }
        console.log(error);
        alert(error.response.data);

        return;
    }

    alert("Successfully Logged In!");
    window.location.href = "dashboard.html";
    localStorage.setItem("user", email.value);
}

function validatePassword(){
    if(!password.value){
        password.classList = [];
        return false;
    }else{
        if(password.value.length < 8){
            password.classList = ["invalid"];
            return false;
        }
    }

    password.classList = ["valid"];
    return true;
}

function validateEmail(){
    if(!email.value){
        email.classList = [];
        return false;
    }

    if (!email.value.match(mailformat)){
        email.classList = ["invalid"];
        return false;
    }
    
    email.classList = ["valid"];
    return true;
}

function isSubmitDisabled(){
    return (!validateEmail() || !validatePassword());
}
