

// JavaScript to handle sidebar toggling
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.toggle-cards');
    const cardContainer = document.getElementById('cardContainer');
    const graphArea = document.getElementById('graphAreaContainer');
    const graphDataArea = document.getElementById('graphDataAreaContainer');
    const infoContainer = document.getElementById('infoContainer');



    // Import the json and convert to json object
    async function getJson() {
        try {
            const response = await fetch('../JSON/data.json');
            const data = await response.json();


            data.cards.forEach(function (card) {
                const wrapperDiv = document.createElement('div');
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

            // Render Chart Data Area
            data.graph_data.forEach(function (graphData, index) {
                const rowWrapper = document.createElement('div');
                rowWrapper.classList.add('row');

                const colWrapper = document.createElement('div');
                colWrapper.classList.add('col', 'border-bottom', 'p-4');
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

            // render ticket area

            const ticketAreaWrapper = document.createElement('section');
            ticketAreaWrapper.classList.add('col-md-6', 'mb-4');

            const ticketArea = document.createElement('div');
            ticketArea.classList.add('pt-4', 'bg-white', 'rounded', 'border');

            const ticketHeader = document.createElement('div');
            ticketHeader.classList.add('p-3');

            const ticketHeaderSection = document.createElement('section');
            ticketHeaderSection.classList.add('hstack', 'justify-content-between');

            const ticketHeaderTitle = document.createElement('h5');
            ticketHeaderTitle.classList.add('fw-bold');
            ticketHeaderTitle.textContent = data.tickets.title;

            const ticketHeaderButton = document.createElement('button');
            ticketHeaderButton.classList.add('btn', 'btn-sm', 'text-primary', 'p-0', 'fw-bold');
            ticketHeaderButton.textContent = data.tickets.button;

            ticketHeaderSection.appendChild(ticketHeaderTitle);
            ticketHeaderSection.appendChild(ticketHeaderButton);

            const ticketHeaderSubTitle = document.createElement('span');
            ticketHeaderSubTitle.classList.add('text-muted', 'fs-xs');
            ticketHeaderSubTitle.innerHTML = `Group: <span class="text-dark fw-semibold">${data.tickets.group}</span>`;

            ticketHeader.appendChild(ticketHeaderSection);
            ticketHeader.appendChild(ticketHeaderSubTitle);

            ticketArea.appendChild(ticketHeader);

            data.tickets.categories.forEach(function (ticketData, index) {
                const ticketDataRow = document.createElement('div');
                ticketDataRow.classList.add('hstack', 'px-3', 'justify-content-between', 'mt-3', 'mb-3');

                const ticketDataTitle = document.createElement('span');
                ticketDataTitle.classList.add('fw-semibold', 'text-dark');
                ticketDataTitle.textContent = ticketData.title;

                const ticketDataValue = document.createElement('span');
                ticketDataValue.classList.add('fw-semibold', 'text-secondary');
                ticketDataValue.textContent = ticketData.count;

                ticketDataRow.appendChild(ticketDataTitle);
                ticketDataRow.appendChild(ticketDataValue);

                ticketArea.appendChild(ticketDataRow);

                if (index !== data.tickets.categories.length - 1) {
                    const ticketLine = document.createElement('hr');
                    ticketArea.appendChild(ticketLine);
                }
            });

            ticketAreaWrapper.appendChild(ticketArea);
            infoContainer.appendChild(ticketAreaWrapper);


            // Render Todo Area

            //             <section class="col-md-6">
            //   <div class="pt-4 bg-white rounded border">
            //     <div class="hstack p-3 mb-2 justify-content-between">
            //       <div>
            //         <h5 class="mb-1 fw-bold">Tasks</h5>
            //         <span class="text-muted fs-xs">Today</span>
            //       </div>
            //       <button class="btn btn-sm text-primary fw-bold">View all</button>
            //     </div>



            // <hr>

            //     <div class="hstack justify-content-between px-3 mt-3 mb-3 ">
            //       <div class="form-check hstack align-items-center gap-3">
            //         <input class="form-check-input rounded-circle" type="checkbox" name="flexRadioDefault"
            //           id="flexRadioDefault1">
            //         <label class="form-check-label fw-semibold cursor-pointer" for="flexRadioDefault1">
            //           Finish ticket update
            //         </label>
            //       </div>
            //       <div><span class="badge bg-warning text-white ">URGENT</span></div>
            //     </div>
            //     <hr>
            //     <div class="hstack justify-content-between px-3 my-3">
            //       <div class="form-check hstack align-items-center gap-3">
            //         <input class="form-check-input rounded-circle" type="checkbox" name="flexRadioDefault"
            //           id="flexRadioDefault2">
            //         <label class="form-check-label fw-semibold cursor-pointer" for="flexRadioDefault2">
            //           Create new ticket example
            //         </label>
            //       </div>
            //       <div><span class="badge bg-success text-white">NEW</span></div>
            //     </div>
            //     <hr>
            //     <div class="hstack justify-content-between px-3 my-3">
            //       <div class="form-check d-flex align-items-center gap-3">
            //         <input class="form-check-input rounded-circle" type="checkbox" name="flexRadioDefault"
            //           id="flexRadioDefault3" checked>
            //         <label class="form-check-label fw-semibold cursor-pointer" for="flexRadioDefault3">
            //           Update ticket report
            //         </label>
            //       </div>
            //       <span class="badge default-status">DEFAULT</span>
            //     </div>
            //   </div>
            // </section>

            const todoAreaWrapper = document.createElement('section');
            todoAreaWrapper.classList.add('col-md-6');

            const todoArea = document.createElement('div');
            todoArea.classList.add('pt-4', 'bg-white', 'rounded', 'border');

            const todoHeader = document.createElement('div');
            todoHeader.classList.add('hstack', 'mb-2', 'justify-content-between');

            const todoHeaderTitle = document.createElement('div');
            todoHeaderTitle.classList.add('p-3');

            const todoHeaderTitleText = document.createElement('h5');
            todoHeaderTitleText.classList.add('mb-1', 'fw-bold');
            todoHeaderTitleText.textContent = data.tasks.title;

            const todoHeaderSubTitle = document.createElement('span');
            todoHeaderSubTitle.classList.add('text-muted', 'fs-xs');
            todoHeaderSubTitle.textContent = data.tasks.time;

            todoHeaderTitle.appendChild(todoHeaderTitleText);
            todoHeaderTitle.appendChild(todoHeaderSubTitle);

            const todoHeaderButton = document.createElement('button');
            todoHeaderButton.classList.add('btn', 'btn-sm', 'text-primary', 'fw-bold');
            todoHeaderButton.textContent = data.tasks.button;

            todoHeader.appendChild(todoHeaderTitle);
            todoHeader.appendChild(todoHeaderButton);

            todoArea.appendChild(todoHeader);
            const todoRowCreate = document.createElement('div');
            todoRowCreate.classList.add('hstack', 'justify-content-between', 'px-3', 'mt-3', 'mb-3');

            const todoRowCreateLeft = document.createElement('p');
            todoRowCreateLeft.classList.add('mb-0', 'fw-semibold', 'text-muted');
            todoRowCreateLeft.textContent = "Create new task";

            const todoRowCreateRight = document.createElement('div');
            todoRowCreateRight.classList.add('btn', 'p-0');


            createTaskDiv();
            data.tasks.todo.forEach(function (task, index) {
                const todoRow = document.createElement('div');
                todoRow.classList.add('hstack', 'justify-content-between', 'px-3', 'mt-3', 'mb-3');

                const todoRowLeft = document.createElement('div');
                todoRowLeft.classList.add('form-check', 'hstack', 'align-items-center', 'gap-3');

                const todoRowInput = document.createElement('input');
                todoRowInput.classList.add('form-check-input', 'rounded-circle');
                todoRowInput.type = 'checkbox';
                todoRowInput.id = `flexRadioDefault${index + 1}`;

                const todoRowLabel = document.createElement('label');
                todoRowLabel.classList.add('form-check-label', 'fw-semibold', 'cursor-pointer');
                todoRowLabel.htmlFor = `flexRadioDefault${index + 1}`;
                todoRowLabel.textContent = task.taskname;

                todoRowLeft.appendChild(todoRowInput);
                todoRowLeft.appendChild(todoRowLabel);

                const todoRowRight = document.createElement('div');
                if (task.status === 'URGENT') {
                    todoRowRight.classList.add('badge', 'bg-warning', 'text-white');
                } else if (task.status === 'NEW') {
                    todoRowRight.classList.add('badge', 'bg-success', 'text-white');
                }
                else {
                    todoRowRight.classList.add('badge', 'default-status');
                }
                todoRowRight.textContent = task.status;

                todoRow.appendChild(todoRowLeft);
                todoRow.appendChild(todoRowRight);

                todoArea.appendChild(todoRow);

                if (index !== data.tasks.todo.length - 1) {
                    const todoLine = document.createElement('hr');
                    todoArea.appendChild(todoLine);
                }
            });
            function createTaskDiv() {
                // Create elements
                const div = document.createElement('div');
                const p = document.createElement('p');
                const btn = document.createElement('div');
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                // Set attributes and content
                div.className = 'hstack justify-content-between px-3 mt-3 mb-3';
                p.className = 'mb-0 fw-semibold text-muted';
                p.textContent = 'Create new task';
                btn.className = 'btn p-0';
                svg.setAttribute('width', '24');
                svg.setAttribute('height', '24');
                svg.setAttribute('viewBox', '0 0 24 24');
                svg.setAttribute('fill', 'none');
                rect.setAttribute('width', '24');
                rect.setAttribute('height', '24');
                rect.setAttribute('rx', '8');
                rect.setAttribute('fill', '#F0F1F7');
                path1.setAttribute('d', 'M12 7V17');
                path1.setAttribute('stroke', '#9FA2B4');
                path1.setAttribute('stroke-width', '2');
                path1.setAttribute('stroke-linecap', 'round');
                path2.setAttribute('d', 'M17 12L7 12');
                path2.setAttribute('stroke', '#9FA2B4');
                path2.setAttribute('stroke-width', '2');
                path2.setAttribute('stroke-linecap', 'round');

                // Append elements
                svg.appendChild(rect);
                svg.appendChild(path1);
                svg.appendChild(path2);
                btn.appendChild(svg);
                div.appendChild(p);
                div.appendChild(btn);

                // Append to body or other container
                todoArea.appendChild(div);
            }



            todoAreaWrapper.appendChild(todoArea);
            infoContainer.appendChild(todoAreaWrapper);
        }
        catch (error) {
            console.error('error: ', error);
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

