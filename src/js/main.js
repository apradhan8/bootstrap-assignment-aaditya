

// JavaScript to handle sidebar toggling
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.toggle-cards');
    const cardContainer = document.getElementById('cardContainer');
    const graphArea = document.getElementById('graphAreaContainer');
    const graphDataArea = document.getElementById('graphDataAreaContainer');
    
    

    // Import the json and convert to json object
    async function getJson() {
        try {
            const response = await fetch('../JSON/data.json');
            const data = await response.json();
            
            
            data.cards.forEach(function (card) {
               const wrapperDiv =  document.createElement('div');
                wrapperDiv.classList.add('col');
                
                const cardWrapper = document.createElement('div');
                cardWrapper.classList.add('card', 'text-center', 'bg-white', 'cursor-pointer');

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'toggle-cards');
                cardBody.setAttribute('onclick', 'toggleActive(this)');

                const cardTitle = document.createElement('h6');
                cardTitle.classList.add('card-title', 'fw-bold', 'text-secondary');
                cardTitle.textContent = card.title;

                const cardValue = document.createElement('h1');
                cardValue.classList.add('fw-bold');
                cardValue.textContent = card.count;
                
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardValue);
                cardWrapper.appendChild(cardBody);
                wrapperDiv.appendChild(cardWrapper);
                cardContainer.appendChild(wrapperDiv);

            });

            
            // Render the chartArea
            
            const titleWrapper = document.createElement('div');
            titleWrapper.classList.add('pt-4');

            const title = document.createElement('h5');
            title.classList.add('fw-bold');
            title.textContent = data.graph.trendstitle;

            const subTitle = document.createElement('p');
            subTitle.classList.add('text-secondary');
            subTitle.textContent = data.graph.timestamp;

            titleWrapper.appendChild(title);
            titleWrapper.appendChild(subTitle);
            graphArea.appendChild(titleWrapper);

             
            const chartArea = document.createElement('div');
            chartArea.classList.add('chart');
            graphArea.appendChild(chartArea);    
            
            const chart = new ApexCharts(document.querySelector(".chart"), options);
            chart.render();


            data.graph_data.forEach(function (graphData, index) {
                const rowWrapper = document.createElement('div');
                rowWrapper.classList.add('row');

                const colWrapper = document.createElement('div');
                colWrapper.classList.add('col', 'border-bottom','p-4');
                if (index == data.graph_data.length - 1) {
                    colWrapper.classList.remove('border-bottom');
                }
                

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

                const cardTitle = document.createElement('h6');
                cardTitle.classList.add('card-title', 'fw-bold', 'text-secondary');
                cardTitle.textContent = graphData.title;

                const cardValue = document.createElement('h4');
                cardValue.classList.add('fw-bold');
                cardValue.textContent = graphData.count || graphData.value || graphData.percentage;

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardValue);
                colWrapper.appendChild(cardBody);
                rowWrapper.appendChild(colWrapper);
                graphDataArea.appendChild(rowWrapper);
            });

           
        }
        catch (error) {
            console.error('error: ',error);
        }
        
    }
    getJson();

    // Add active class to clicked sidebar link
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            sidebarLinks.forEach(function (otherLink) {
                otherLink.classList.remove('active');
            });
            link.classList.add('active');
        })


    })


    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            toggleActive(card);
        });

    });
    function toggleActive(card) {
        cards.forEach(function (otherCard) {
            otherCard.classList.remove('border-primary', 'text-primary');
            card.querySelector('h6').classList.add('text-secondary');
        })
        card.classList.add('border-primary', 'text-primary');
        card.querySelector('h6').classList.toggle('text-secondary');
    }


    // Render apex chart
    const options = {
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
            labels: {
                formatter: function (val) {
                    return Math.round(val);
                }
            },
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
            markers: {
                customHTML: [
                    function () {
                        // wrap the rect in a svg 
                        return '<rect x="0" y="0" width="10" height="5" rx="2" ry="2" style="fill: var(--bs-primary);"/>'
                    },
                    function () {
                        return '<rect x="0" y="0" width="10" height="5" rx="2" ry="2" style="fill: var(--bs-gray-300);"/>'
                    }
                ],
                width: 16,
                height: 3,
                offsetY: -3
            }
        }

    };

});

