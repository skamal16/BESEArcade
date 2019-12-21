<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="Home.html"><img style="height: 40px; width: 40px;" src="https://i.imgur.com/kk8VIfY.jpg" alt=""></a>
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
            </button>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav">
                <li id="home"><a href="Home.html">Home</a></li>
                <li id="synopsis"><a href="synopsis.html">Synopsis</a></li>
                <li id="levels"><a href="levels.html">Levels</a></li>
                <li id="aboutus"><a href="About Us.html">About Us</a></li>
                <li id="similargames"><a href="Similar Games.html">Similar Games</a></li>
                <li id="news"><a href="news.html">News</a></li>
                <li id="contact"><a href="Contact.html">Get in touch</a></li>
                <li id="feedback"><a href="Feedbacks.html">Feedback</a></li>
                <li id="profile"></li>
            </ul>
        </div>
    </div>
</nav>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
    $(document).ready(function() {
        $.ajax({
            url: "server_scripts/check_signedIn.php",
            success: function(result) {
                var html = !result ? '<a href="Register.html">Login / Register</a>' : '<a href="Profile.html">Profile</a>';
                $('#profile').html(html);
            }
        });
    });
</script>