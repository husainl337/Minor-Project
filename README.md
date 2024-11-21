# Personal Finance Savings Predictor

A web application that helps users plan their savings by analyzing their income and expenses. The application predicts savings and provides recommendations for achieving financial goals.

## Features

- **Income and Expense Tracking**: Input monthly income and expenses across various categories.
- **Savings Prediction**: Estimate potential savings based on financial data.
- **Interactive UI**: Simple, user-friendly interface for data input and results visualization.
- **Backend API**: Robust RESTful API to handle predictions using a trained machine learning model.

---

## Technologies Used

### **Frontend**
- HTML, CSS, JavaScript
- Framework: [Bootstrap](https://getbootstrap.com) (for responsive design)

### **Backend**
- Python (Flask Framework)
- RESTful API Integration

### **Machine Learning**
- Libraries:
  - `pandas`: Data manipulation and analysis
  - `numpy`: Numerical computations
  - `scikit-learn`: Model training and evaluation
  - `pickle`: Model serialization
- Model: Linear Regression for savings prediction

### **Others**
- JSON: Data exchange between frontend and backend
- Git: Version control
- GitHub: Repository hosting

---

## Getting Started

### **Prerequisites**
- Python 3.9 or higher
- Node.js (optional for frontend development)

### **Installation Steps**
1. Clone the repository:
   ```bash
   git clone https://github.com/husainl337/Minor-Project.git
   cd Minor project

## Future Plans

This project is just the beginning of a comprehensive personal finance application. Here are the planned enhancements:

1. **Advanced Goal Setting**:
   - Allow users to set financial goals, such as buying a house, car, or other high-value items.
   - Support goal prioritization and progress tracking.

2. **Time-Bound Savings Calculation**:
   - Predict how much users need to save each month to achieve specific goals within a set timeframe.
   - Adjust predictions dynamically based on changes in income, expenses, or savings behavior.

3. **Investment Module**:
   - Introduce investment options such as:
     - **Stocks**
     - **Bonds**
     - **Mutual Funds**
     - **Company-Specific Investments**
   - Predict the potential **risk of loss** or **profit** for investments based on historical market data, user preferences, and investment duration.

4. **Risk Analysis**:
   - Develop models to assess and predict financial risks for users’ investments.
   - Provide tailored advice based on risk tolerance.

5. **Interactive Data Visualizations**:
   - Use charts and graphs to display:
     - Savings trends.
     - Monthly expense breakdowns.
     - Investment growth over time.
   - Integrate libraries like **Plotly**, **Chart.js**, or **Matplotlib** for dynamic visuals.
