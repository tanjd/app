<div class="container">
    <nav id="mainNavbar" class="navbar navbar-light bg-light py-2 fixed-top">
        <a href="index.php" class="navbar-brand" style="margin-right: 0;">SMULBS</a>
        <div class="d-flex" id="homepageSections">
        </div>
        <div class="dropdown ml-auto">
            <button class="navbar-toggler btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome <span class="" id="userName"></span>
            </button>
            <div class="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                <a href="user_booking.php" class="nav-link">BOOKING<i class="fas fa-book-reader pl-1"></i>
                </a>
                <a href="history.php" class="nav-link">HISTORY<i class="fa fa-history pl-1"></i>
                </a>
                <a href="settings.php" class="nav-link">SETTINGS<i class="fa fa-cog fa-spin fa-lg fa-fw pl-1"></i>
                </a>
                <a href="index.php" onclick="signOut()" class="nav-link">LOG OUT<i class="fas fa-sign-out-alt pl-1"></i>
                </a>
            </div>
        </div>
    </nav>
</div>

<script>
    window.addEventListener('load', navbar2Load);

    if (window.location.pathname == '/app/index.php') {
        document.getElementById('homepageSections').innerHTML = `<ul class="navbar-nav flex-row">
                                                                    <li class="nav-item ml-3">
                                                                        <a class="nav-link" href="#section1">HOME<i class="fas fa-home pl-1"></i></a>
                                                                    </li>
                                                                    <li class="nav-item ml-3">
                                                                        <a class="nav-link" href="#section2">ABOUT US<i class="fas fa-users pl-1"></i></a>
                                                                    </li>
                                                                    <li class="nav-item ml-3">
                                                                        <a class="nav-link" href="#section3">CONTACT<i class="fas fa-id-card pl-1"></i></a>
                                                                    </li>
                                                                </ul>`;
    } else {
        document.getElementById('homepageSections').innerHTML = '';
    }
</script>