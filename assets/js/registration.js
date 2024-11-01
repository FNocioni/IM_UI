var loginForm = document.getElementById("registration_form");

var firstName = document.getElementById("first_name");
var lastName = document.getElementById("last_name");
var email = document.getElementById("email");
var phoneNumber = document.getElementById("phone");
var password = document.getElementById("password");
var retype_password = document.getElementById("retype_password");
var submitButton = document.getElementById("submit_button");

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

loginForm.addEventListener('input', function() {
    validatePassword();
    validateRetypePassword();
    validateEmail();
    submitButton.disabled = isSubmitDisabled();
});

axios.get('http://localhost:8080/passenger')
    .then(response => {
        const responseData = response.data
        console.log(responseData);
}).catch(error => { });


async function register (){
    var data = {
        params: {
            'firstName': firstName.value,
            'lastName': lastName.value,
            'email': email.value,
            'phone': phoneNumber.value,
            'password': password.value
        }
    }

    try {
        const result = await axios.post('http://localhost:8080/user/register', null, data);
    }catch (error) {
        if(error.code == "ERR_NETWORK"){
            alert("Could not connect to login server");
        }
        console.log(error);
        alert(error.response.data);


        return;
    }

    alert("Successfully created account");
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

function validateRetypePassword(){
    if(!retype_password.value){
        retype_password.classList = [];
        return false;
    }else{
        if(retype_password.value != password.value){
            retype_password.classList = ["invalid"];
            return false;
        }
    }

    retype_password.classList = ["valid"];
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
    return (!firstName.value || !lastName.value || !validateEmail() || !phoneNumber.value || !validatePassword() || !validateRetypePassword());
}
