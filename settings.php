<?php
require_once 'template/head.php';

?>
<head>
    

    <style>
        .jumbotron{
            background-image: url("img/settings.jpg");
            background-size: 100% ;
            background-repeat: no-repeat;
            /* opacity: 0.7; */
        }
    </style>
</head>
<body>
    <?php
    if (isset($_COOKIE['user'])) {
        require_once 'template/navbar2.php';
    } else {
        require_once 'template/navbar.php';
    }

    ?>
    <script>
    </script>
    <main role="main" class="container" >
        <div class="wrapper" style="background-color:white;">
            <div class="wrapper jumbotron jumbotron-fluid" style="background-color:white;">
                <h1 class="display-4" style="text-align: bottom; color: white; margin-top: 150px; margin-left: 10px;">Settings</h1>
            </div>
            <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne">
                    <h5 style="align-content:center; color: black;">Change Password</h5>
                    </button>
                </h5>
            </div>

        <div id="collapseOne" class="collapse show" data-parent="#accordionExample">
            <div class="card-body">
                <div class="container">
                    <form style="margin-top: 20px;">
                        <div class="row">
                            <div class=" col-md-6 col-md-offset-6">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Enter Old Password</label>
                                    <input type="password" class="form-control" id="oldpwd" >
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Enter New Password</label>
                                    <input type="password" class="form-control" id="newpwd">
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword2">Confirm New Password</label>
                                    <input type="password" class="form-control" id="cfmpwd">
                                </div>

                                <div class="form-group">
                                    <button type="button" id="chgpwd"class="btn btn-success" onclick="pwdValidate()">Change Password</button>
                                </div>
                                <div id="errormsg"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="headingTwo">
            <h5>
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <h5 style="align-content:center; color: black;">Change Telegram Handle</h5>
                </button>
            </h5>
        </div>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            <div class="card-body">
                <div class="container">
                    <form style="margin-top: 20px;">

                        <div class="form-group">
                            <label for="exampleInputEmail1">Enter Old Telegram Handle</label>
                            <input type="text" class="form-control" id="oldhandle" >
                        </div>

                        <div class="form-group">
                            <label for="exampleInputPassword1">Enter New Telegram Handle</label>
                            <input type="text" class="form-control" id="newhandle">
                        </div>


                        <button type="button" id="chgtele" class="btn btn-success" onclick="validateHandle()">Change Telegram Handle</button>
                        <div id="wrongmsg"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="card-header" id="headingThree">
            <h5 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <h5 style="align-content:center; color: black;">Change Notifications</h5>
                </button>
            </h5>
        </div>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
        <!-- <div class="card-body"> -->
        <div class="checkbox mx-3">
            <label><input type="checkbox" value="" id="teleSwitch">Get Telegram Notifications</label>
        </div>
        <div class="checkbox mx-3">
            <label ><input type="checkbox" value="" id="emailSwitch">Get Email Notifications</label>
        </div>
        <div>
            <button type="button" class="btn btn-success mx-3" id="updateNoti">Change Telegram Handle</button>
        </div>
        <div id="successMsg"></div>
    <!-- </div> -->
</div>
            

    
    </main>


    <?php
    require_once 'template/footer.php';
    ?>
</body>

<script>
    // Load required script
    window.addEventListener('load', loadScript("starter-template.css"))
    var updateBtn = document.getElementById("updateNoti");
    console.log(updateBtn);
    var userCookie = getCookie("user");
    var user = JSON.parse(userCookie);
    window.addEventListener('load', updateSwitch);


    function updateSwitch(){
        // console.log("test");
        userId = {
        "user_id": user.user_id,
        }
        fetchData('GET', userHost + '/get_user/',getData)
            .then(data => {
                console.log('ted');
                var email = data["user"]["email_setting"];
                var tele = data["user"]["telegram_setting"];
                var teleS = document.getElementById("teleSwitch");
                var emailS = document.getElementById("emailSwitch");
                console.log(teleS);
                // console.log(data);
                // console.log(teleS);
                // cosole.log(emailS);
                if (email == 1){
                    document.getElementById("emailSwitch").checked = true;

                }
                if (tele == 1){
                    document.getElementById("teleSwitch").checked = true;
                }
            });
    }
    function updateNotifications(){
        // var tags = [];
        // alert("good");
        var userCookie = getCookie("user");
        if(userCookie !== ""){
            var user = JSON.parse(userCookie);
            userId = {
                "user_id": user.user_id,
            }
            fetchData('GET', userHost + '/get_user/',getData)
                .then(data => {
                    // alert("good");
                    var email = data["user"]["email_setting"];
                    var tele = data["user"]["telegram_setting"];
                    console.log(email);         
                    console.log(tele);
                    //true -> email is 1
                    //false -> tele is 0
                    var teleSwitch = document.getElementById("teleSwitch").checked;
                    var emailSwitch = document.getElementById("emailSwitch").checked;
                    
                    teleSwitch = teleSwitch * 1;
                    emailSwitch = emailSwitch * 1;
                    console.log(emailSwitch);         
                    console.log(teleSwitch);

                   var msg = `<div class= 'alert alert-success alert-dismissible fade show d-block' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;

                    var strong = document.createElement("strong");
                    strong.innerText = "Notifications successfully updated";

                    document.getElementById("successMsg").innerHTML = msg;
                    document.getElementById("alertMsg").appendChild(strong);

                    postData = {
                        "user_id" : user.user_id,
                        "email_setting" : emailSwitch,
                        "telegram_setting" : teleSwitch,
                        }
                        fetchData('POST',userHost + '/update_email_notification/',postData)
                            .then(data => {
                                // console.log('nani');
                            });
                        


                

                        })
            }
    }
    updateBtn.addEventListener('click', updateNotifications);
    function pwdValidate() {
        var tags = [];
        // alert("good");
        var userCookie = getCookie("user");
        if(userCookie !== ""){
            var user = JSON.parse(userCookie);
            userId = {
                "user_id": user.user_id,
            }
            fetchData('GET', userHost + '/get_user/',getData)
                .then(data => {
                    var pwdold = data["user"]["password"];
                    console.log(pwdold);

                    var oldpwd = document.getElementById("oldpwd").value;
                    console.log(oldpwd);

                    var newpwd = document.getElementById("newpwd").value;
                    console.log(newpwd);

                    var cfmpwd = document.getElementById("cfmpwd").value;
                    console.log(cfmpwd);

                    if(oldpwd != pwdold){
                        tags.push("Your old password is incorrect!");
                    }
                    if(newpwd != cfmpwd){
                        tags.push("Your passwords do not match!");
                    }
                    if(newpwd.length < 8 || cfmpwd.length < 8){
                        tags.push("Your password is too short! Please have atleast 8 characters!");
                    }
                    if (newpwd.search(/[a-z]/) < 0) {
                        tags.push("Your password must contain at least one lowercase letter.");
                    }
                    
                    if (newpwd.search(/[A-Z]/) < 0 ) {
                        tags.push("Your password must contain at least one uppercase letter.");
                    }
                    
                    // console.log(tags);
                    if(tags.length > 0){
                        var html_str = `<div class= 'alert alert-danger alert-dismissible fade show d-block' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;

                        var strong = document.createElement("strong");
                        strong.innerText = "Please enter the passwords again";
                        
                        var tag;
                        // console.log("meep");

                        document.getElementById("errormsg").innerHTML = html_str;
                        document.getElementById("alertMsg").appendChild(strong);

                        var p = document.createElement("p");
                        p.innerHTML += `<ul>`;
                        for(tag of tags){
                            
                            p.innerHTML += `

                            <li>${tag}</li>

                            `;
                            
                        }
                        p.innerHTML += `</ul>`;
                        document.getElementById("alertMsg").appendChild(p);

                        
                        
                    }

                    else {
                        html_str = `<div class= 'alert alert-success alert-dismissible fade show d-block' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;

                        var strong = document.createElement("strong");
                        var p = document.createElement("p");
                        strong.innerText = "Password Successfully changed!"
                        p.innerText = "";

                        document.getElementById("errormsg").innerHTML = html_str;
                        document.getElementById("alertMsg").appendChild(strong);
                        // document.getElementById("alertMsg").appendChild(p);

                        postData = {
                        "user_id" : user.user_id,
                        "password" : newpwd
                        }
                        fetchData('POST', userHost + '/update_password/',postData)     
                        
                    }


                })
            }
        }

    function validateHandle(){
        var tags = [];
            // alert("good");
            var userCookie = getCookie("user");
            if(userCookie !== ""){
                var user = JSON.parse(userCookie);
                userId = {
                    "user_id": user.user_id,
                }
                fetchData('GET', userHost + '/get_user/',getData)
                    .then(data => {
                        var teleold = data["user"]["telegram_name"];
                        console.log(teleold);

                        var oldhandle = document.getElementById("oldhandle").value;
                        var newhandle = document.getElementById("newhandle").value;

                        if(oldhandle != teleold){
                            var tele_fail = `<div class= 'alert alert-danger alert-dismissible fade show d-block' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;

                            var strong = document.createElement("strong");
                            strong.innerText = "You have entered the wrong Telegram Handle. Please try again!";
                            

                            document.getElementById("wrongmsg").innerHTML = tele_fail;
                            document.getElementById("alertMsg").appendChild(strong);



                        }

                        else{
                            var tele_right = `<div class= 'alert alert-success alert-dismissible fade show d-block' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;

                            var strong = document.createElement("strong");
                            strong.innerText = "Your Telegram handle has been successfully updated!";
                            document.getElementById("wrongmsg").innerHTML = tele_right;
                            document.getElementById("alertMsg").appendChild(strong);

                        postData = {
                        "user_id" : user.user_id,
                        "telegram_name" : newhandle
                        }
                        fetchData('POST', userHost + '/update_telegram_name/', postData)
                        

                        }
                    })
                }
    }
            

     
</script>