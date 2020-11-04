
<div class="container">
    <nav id="mainNavbar" class="navbar navbar-dark bg-light navbar-expand-md py-2 fixed-top">
        <a href="index.php" class="navbar-brand">SMU</a>
        <button class="navbar-toggler" data-toggle="collapse" data-target="#navLinks" aria-label="Toggle Navbar">
            <span class="navbar-toggler-icon navbar-dark"></span>
        </button>
        <div class="collapse navbar-collapse" id="navLinks">
            <ul id="ul1" class="navbar-nav">
                <li class="nav-item">
                    <a href="#section1" class="nav-link">HOME</a>
                </li>
                <li class="nav-item">
                    <a href="#section2" class="nav-link">ABOUT US</a>
                </li>
                <li class="nav-item">
                    <a href="#section3" class="nav-link">CONTACT</a>
                </li>
            </ul>
            <div class="mx-auto lead">Welcome <span id="userName"></span></div>

            <ul id="ul2" class="navbar-nav">
                <li class="nav-item">
                    <a href="history.php" class="nav-link">HISTORY<i class="fa fa-history"></i>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="settings.php" class="nav-link">SETTINGS<i class="fa fa-cog fa-spin fa-lg fa-fw"></i>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="index.php" onclick="signOut()" class="nav-link ">LOG OUT<i class="fas fa-sign-out-alt"></i>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</div>

<script>
    window.addEventListener('load', navbar2Load);
</script>
