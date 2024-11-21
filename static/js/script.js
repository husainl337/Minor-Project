document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('finance-form');
    const predictionOutput = document.getElementById('prediction-output');
    const chartCanvas = document.getElementById('chartCanvas');
    let myChart = null; // To store the chart instance

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            age: parseInt(document.getElementById('age').value),
            income: parseFloat(document.getElementById('income').value),
            rent: parseFloat(document.getElementById('rent').value),
            food: parseFloat(document.getElementById('food').value)
        };

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.status === 'success') {
                predictionOutput.innerHTML = `
                    <div class="prediction-details">
                        <h3>Predicted Savings</h3>
                        <p><strong>Amount:</strong> ₹${data.prediction.toFixed(2)}</p>
                    </div>
                `;

                updateChart({
                    income: formData.income,
                    rent: formData.rent,
                    food: formData.food,
                    predictedSavings: data.prediction
                });
            } else {
                predictionOutput.innerHTML = `Error: ${data.error}`;
            }

        } catch (error) {
            console.error('Error:', error);
            predictionOutput.innerHTML = 'Error making prediction. Please try again.';
        }
    });

    function updateChart(data) {
        if (myChart) {
            myChart.destroy();
        }

        const otherExpenses = data.income - data.rent - data.food - data.predictedSavings;

        myChart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Rent', 'Food', 'Predicted Savings', 'Other Expenses'],
                datasets: [{
                    data: [
                        data.rent,
                        data.food,
                        data.predictedSavings,
                        otherExpenses > 0 ? otherExpenses : 0
                    ],
                    backgroundColor: [
                        '#FF6384', // Red for Rent
                        '#36A2EB', // Blue for Food
                        '#4CAF50', // Green for Savings
                        '#FFCE56'  // Yellow for Other
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Monthly Financial Breakdown',
                        font: {
                            size: 16
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Add input validation
    const numberInputs = form.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

});