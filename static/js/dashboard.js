document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });

    // Chart Type Toggle
    const chartButtons = document.querySelectorAll('.chart-type-btn');
    chartButtons.forEach(button => {
        button.addEventListener('click', () => {
            chartButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateChart(button.dataset.type);
        });
    });

    // Live Data Updates
    function updateStats() {
        const stats = document.querySelectorAll('.stat-value');
        stats.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 100 - 50);
            stat.textContent = '₹' + newValue.toLocaleString();
        });
    }

    setInterval(updateStats, 5000);

    // Dynamic Transaction List
    function addTransaction(transaction) {
        const transactionList = document.querySelector('.transaction-list');
        const transactionElement = document.createElement('div');
        transactionElement.className = 'transaction-item';
        transactionElement.innerHTML = `
            <div class="transaction-icon ${transaction.type}">
                <i class="fas ${transaction.icon}"></i>
            </div>
            <div class="transaction-details">
                <h4>${transaction.title}</h4>
                <p>${transaction.date}</p>
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${transaction.amount}
            </div>
        `;
        transactionList.prepend(transactionElement);
    }

    // Sample transaction data
    const sampleTransactions = [
        {
            type: 'expense',
            icon: 'fa-shopping-cart',
            title: 'Grocery Shopping',
            date: 'Today',
            amount: '-₹2,500'
        },
        // Add more transactions
    ];

    // Add sample transactions
    sampleTransactions.forEach(transaction => addTransaction(transaction));
});

// Chart Configuration
function updateChart(type) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Expenses',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 2
        }]
    };

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: type,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
} 