//Function to validate user's login
function login(){
    
    //Created variable in localstorage to record access status
    localStorage.setItem("access", false);
    
    //Declared variable to record username
    var name = document.getElementById("Name").value;
    
    //Declared variable to record user eamail
    var email = document.getElementById("Email");
    
    //Declared variable to record user password
    var senha = document.getElementById("Password");
    
    //declared variable as a regular expression to verify if email format is valid
    var filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    
    //Condition to compare email format with var filter (regular expression)
    if(!filter.test(document.getElementById("Email").value)){
        alert('Invalid e-mail format');
        document.getElementById("Email").focus();
    
    //Condition to validade useremail and password with hardcoded credentials
    }else if(email.value == "admin@admin.com" && senha.value == "admin"){
        localStorage.setItem("access", true);
        localStorage.setItem("nameUser",name);
         
        //If condition above is true, function opens "index.html"
        window.location.href = "../html/index.html";
    
        
    //Condition to ensure access to system won't be allowed should credentials are incorrect    
    }else{
        localStorage.setItem("access", false);
        alert("Invalid username or password!");
        
    }
}

