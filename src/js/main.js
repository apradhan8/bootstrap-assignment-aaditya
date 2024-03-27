// JavaScript to handle sidebar toggling
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const expandButton = document.getElementById('logo-btn');
    const sidebarLinks = document.querySelectorAll('.nav-link');
    const mainContent = document.querySelector('.content');
    // Match media
    const mediaQuery = window.matchMedia('(min-width: 765px)');
    const mediaQuery2 = window.matchMedia('(max-width: 768px)');

    // Collapse sidebar on small screens

    // Add active class to clicked sidebar link
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            sidebarLinks.forEach(function (otherLink) {
                otherLink.classList.remove('active');
            });
            link.classList.add('active');
        })


    })

    // Collapse sidebar on small screens
    if (mediaQuery2.matches) {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    }
    // Expand sidebar only on large screens
    expandButton.addEventListener('click', function () {
        if (mediaQuery.matches) {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
        }

    });

    // Render apex chart
    var options = {
        series: [{
            name: "Today",
            data: [{
                x: 0,
                y: 12
            }, {
                x: 3,
                y: 30
            }, {
                x: 5,
                y: 28
            }, {
                x: 8,
                y: 50
            }, {
                x: 11,
                y: 18
            }, {
                x: 14.5,
                y: 38
            },
            {
                x: 16,
                y: 47
            },
            {
                x: 19,
                y: 38
            },
            ],
        },
        {
            name: 'Yesterday',
            data: [{
                x: 0,
                y: 35
            }, {
                x: 5,
                y: 20
            }, {
                x: 8,
                y: 32
            }, {
                x: 13,
                y: 18
            }, {
                x: 15.5,
                y: 37
            },
            {
                x: 16.5,
                y: 29.5
            },
            {
                x: 19,
                y: 33
            },
            ],


        }
        ],
        chart: {
            type: "area",
            toolbar: {
                show: false,
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }

        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: "numeric",
            min: 0,
            max: 22,
            tickAmount: 23,
            labels: {
                formatter: function (val) {
                    return Math.round(val);
                }
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            min: 0,
            max: 60,
            opposite: true,
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: .15,
                opacityTo: 0,
                stops: [0, 90, 100],
                type: "horizontal",
            }
        },
        colors: ["var(--bs-primary)", "var(--bs-gray-300)"],

        tooltip: {
            theme: "dark",
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return '';
                    }
                }
            },
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",

        }

    };
    var chart = new ApexCharts(document.querySelector(".chart"), options);
    chart.render();
});

