<?php
require_once 'template/head.php';

?>
<head>
    <link rel = "stylesheet" href="settings.css">
</head>
<body>
    <?php
    if (isset($_COOKIE['user'])) {
        require_once 'template/navbar2.php';
    } else {
        require_once 'template/navbar.php';
    }

    ?>
    <main role="main" class="container-wrapper" >

        <div class="container">
            <h1>Settings</h1>
        </div>
        <div class="list-group">
            <button type="button" id="password" class="list-group-item list-group-item-action ">
                Change Password
            </button>
            <button type="button" id="telegram" class="list-group-item list-group-item-action">Change Telegram Handle</button>
            <button type="button" id="changealert" class="list-group-item list-group-item-action">Notification</button>
        </div>



        <div id="form"></div>
        <div id="message"></div>






    </main> <!-- /.container -->
    <?php
    require_once 'template/footer.php';
    ?>
</body>

<script>
    // Load required script
    window.addEventListener('load', loadScript("starter-template.css"))

    document.getElementById("password").addEventListener("click", changePwd);
    document.getElementById("telegram").addEventListener("click", changeHandle);
    document.getElementById("changealert").addEventListener("click", changeAlert);

    function changePwd() {

        var pwdchange = `
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
                    </div>
        <div class="col-md-6">
			<div class="aro-pswd_info">
				<div id="pswd_info">
					<h4>Password requirements</h4>
					<ul>
						<li id="letter" class="invalid">At least <strong>one letter</strong></li>
						<li id="capital" class="invalid">At least <strong>one capital letter</strong></li>
						<li id="number" class="invalid">At least <strong>one number</strong></li>
						<li id="length" class="invalid">Be at least <strong>8 characters</strong></li>
						<li id="space" class="invalid">be<strong> use [~,!,@,#,$,%,^,&,*,-,=,.,;,']</strong></li>
					</ul>
				</div>
			</div>
        </div>
    </div>
        <div class="row " style="text-align: center;">
            
        </div>
                    
            </form>
        
    </div>
    
        
        `;
        
        document.getElementById("form").innerHTML = pwdchange;




    }

    function pwdValidate() {
        var newpwd = document.getElementById("newpwd").value;
        var cfmpwd = document.getElementById("cfmpwd").value;
        // console.log(newpwd);
        // console.log(cfmpwd);

        var tag = "";
        var userCookie = getCookie('user');
        const user = JSON.parse(userCookie);

        if (newpwd != cfmpwd) {
            tag = `<div class= 'alert alert-danger alert-dismissible fade show d-block' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;



            var strong = document.createElement("strong");
            var p = document.createElement("p");
            strong.innerText = "Passwords do not match!"
            p.innerText = "Please re-enter your new password!";


            // document.getElementById("alertMsg").className = "alert alert-danger alert-dismissible fade show";

        } else {
            tag = `<div class= 'alert alert-success alert-dismissible fade show d-block' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;

            var strong = document.createElement("strong");
            var p = document.createElement("p");
            strong.innerText = "Password Successfully changed!"
            p.innerText = "";

            postData = {
            "user_id" : user.user_id,
            "password" : newpwd
            }
            fetchData('POST',"http://localhost:5000/update_password/",postData)
            .then(data => {
                location.reload();
            });
        }

        document.getElementById("message").innerHTML = tag;
        document.getElementById("alertMsg").appendChild(strong);
        document.getElementById("alertMsg").appendChild(p);


        // document.getElementById("message").innerHTML = msg;
    }







    function changeHandle() {

        var telechange =
            `
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
            </form>
        </div>
        
        `;

        document.getElementById("form").innerHTML = telechange;
    }

    function validateHandle() {
        var tag = `<div class= 'alert alert-success alert-dismissible fade show d-none' id='alertMsg' role='alert'><button type='button' class='close' data-dismiss='alert' aria-label ='Close'><span aria-hidden='true'>&times;</span></button></div>`;

        var strong = document.createElement("strong");

        strong.innerText = "Telegram Handle Successfully changed!"

        document.getElementById("message").innerHTML = tag;
        document.getElementById("alertMsg").appendChild(strong);


    }



    function changeAlert() {
        var notifications = `<div class="custom-control custom-switch" style = "margin-top:20px;">
            <input type="checkbox" class="custom-control-input" id="customSwitches">
            <label class="custom-control-label" for="customSwitches">Get Telegram Notifications</label>
        </div>

        <div class="custom-control custom-switch" style = "margin-top:10px;">
            <input type="checkbox" class="custom-control-input" id="customSwitch">
            <label class="custom-control-label" for="customSwitch">Get Email Notifications</label>
        </div>
        
        <button type="button" class="btn btn-success" onclick="updateNotifications()">Change Telegram Handle</button>
        `;

        document.getElementById("form").innerHTML = notifications;
    }

    // var newpwd = document.getElementById("chgpwd");
    // newpwd.addEventListener("click", updatePwd);

    // function updatePwd(newpwd){
        
    // }

    var newhandle = document.getElementById("chgtele");
    
    newhandle.addEventListener("click", updateHandle);
    console.log(newhandle);

   

    function updateHandle(newhandle){
        
        postData = {
            "telegram_id" : newhandle
        }
        fetchData('POST',"http://localhost:5000/update_telegram_name/",postData);
    }
    

    // function updateNotifications(){
        
    // }
</script>