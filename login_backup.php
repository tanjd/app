<body class="hold-transition login-page"> -->
    <div class="login-box">
        <div class="login-logo">
            <a href="index.html"><b>Login</b></a>
        </div>
        <!-- /.login-logo -->
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>
                <div id="errorMsg"></div>
                <form name="loginForm" class="form-signin" action="#">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <div class="input-group mb-3">
                        <input type="email" name="emailInput" id="inputEmail" class="form-control" placeholder="Email" required autofocus>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <label for="inputPassword" class="sr-only">Password</label>
                        <input type="password" name="passwordInput" id="inputPassword" class="form-control" placeholder="Password" required>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember">
                                <label for="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <div class="col-4">
                            <button id="loginBtn" class="btn btn-primary btn-block" type="submit">Sign in</button>
                        </div>
                    </div>
                </form>
                <div class="social-auth-links text-center mb-3">
                    <p>- OR -</p>
                    <div id="googleLogin" class="g-signin2" data-onsuccess="onSignIn"></div>
                </div>
            </div>
        </div>
    </div>
</body>