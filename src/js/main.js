// JavaScript to handle sidebar toggling
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const expandButton = document.getElementById('logo-btn');
    const sidebarLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.querySelector('.content');
    const mediaQueryList = window.matchMedia('(max-width: 992px)');

    mediaQueryList.addEventListener('change', function (event) {
        if (event.matches) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
        }
    })

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
        mainContent.classList.toggle('collapsed');
    });

    var options = {
        chart: {
            type: 'line',
            toolbar: {
                show: false,

            }
        },
        series: [{
            name: 'Yesterday',
            data: [0, 10, 20, 30, 40, 50, 60]
        },
        {
            name: 'Today',
            data: [10, 20, 30, 40, 50, 60, 70]
        }],
        xaxis: {
            categories: [0, 1, 2, 3, 4, 5, 6],
        },
        yaxis: [{
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#008FFB'
            },
            labels: {
                style: {
                    colors: '#008FFB',
                }
            },
            title: {
                text: "Yesterday",
                style: {
                    color: '#008FFB',
                }
            },
            tooltip: {
                enabled: true
            }
        },
        {
            opposite: true,
            axisTicks: {
                show: true,
            },
            axisBorder: {
                show: true,
                color: '#00E396'
            },
            labels: {
                style: {
                    colors: '#00E396',
                }
            },
            title: {
                text: "Today",
                style: {
                    color: '#00E396',
                }
            },
            tooltip: {
                enabled: true
            }
        }],
        legend: {
            position: 'top',
            horizontalAlign: 'center'
        }
    };

    var chart = new ApexCharts(document.querySelector(".chart"), options);

    chart.render();


});

