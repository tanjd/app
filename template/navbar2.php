<div class="container">
    <nav id="mainNavbar" class="navbar navbar-light bg-light py-2 fixed-top">
        <a href="index.php" class="navbar-brand" style="margin-right: 0;">SMULBS</a>
        <div class="d-flex" id="homepageSections">

            
        </div>
        <div class="ml-auto lead pr-4">Welcome <span id="userName"></span></div>

        <button class="navbar-toggler" data-toggle="collapse" data-target="#navLinks" aria-label="Toggle Navbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navLinks">
            <ul id="ul1" class="navbar-nav">
                <li class="nav-item">
                    <a href="user_booking.php" class="nav-link">BOOKING<i class="fas fa-book-reader pl-1"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="history.php" class="nav-link">HISTORY<i class="fa fa-history pl-1"></i>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="settings.php" class="nav-link">SETTINGS<i class="fa fa-cog fa-spin fa-lg fa-fw pl-1"></i>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="index.php" onclick="signOut()" class="nav-link">LOG OUT<i class="fas fa-sign-out-alt pl-1"></i>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</div>

<script>
    window.addEventListener('load', navbar2Load);

    if (window.location.pathname == '/app/index.php') {
        document.getElementById('homepageSections').innerHTML = `<ul class="navbar-nav flex-row">
                                                                    <li class="nav-item ml-3">
                                                                        <a class="nav-link" href="#section1">HOME</a>
                                                                    </li>
                                                                    <li class="nav-item ml-3">
                                                                        <a class="nav-link" href="#section2">ABOUT US</a>
                                                                    </li>
                                                                    <li class="nav-item ml-3">
                                                                        <a class="nav-link" href="#section3">CONTACT</a>
                                                                    </li>
                                                                </ul>`;
    }
    else {
        document.getElementById('homepageSections').innerHTML = '';
    }
</script>