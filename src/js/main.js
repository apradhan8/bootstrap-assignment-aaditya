// JavaScript to handle sidebar toggling
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const expandButton = document.getElementById('expand-btn');
    const sidebarLinks = document.querySelectorAll('.nav-link');
    const navLinks = document.querySelectorAll('.nav-link');

    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            sidebarLinks.forEach(function (otherLink) {
                otherLink.classList.remove('active');
            });
            link.classList.add('active');
        })


    })


    expandButton.addEventListener('click', function () {
        sidebar.classList.toggle('collapsed');
    });



});