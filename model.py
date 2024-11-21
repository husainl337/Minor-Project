import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

# Load the dataset
df = pd.read_csv("finance data.csv")

# Display the first few rows
print(df.head())



plt.scatter(df["Age"], df["Savings"])
plt.show()



# # Features and target
X = df[["Age", "Income", "Rent", "Food Expences"]]
y = df["Savings"]
# # print(X)
# # print(y)




# # Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# print(len(X_train))
# print(len(X_test))


from sklearn.linear_model import LinearRegression
# from sklearn.metrics import mean_squared_error

# # Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# # Make predictions
y_pred = model.predict(X_test)
print(y_pred)

print(y_test)
print(model.score(X_test, y_test))


# Evaluate the model
# mse = mean_squared_error(y_test, y_pred)
# print(f"Mean Squared Error: {mse}")

import pickle

# # Save the model
with open("savings_predictor.pkl", "wb") as file:
    pickle.dump(model, file)

print("Model saved as 'savings_predictor.pkl'.")

