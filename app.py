from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd

app = Flask(__name__)

model = pickle.load(open("savings_predictor.pkl", "rb"))

@app.route("/predictions")
def predictions():
    return render_template("predictions.html")

@app.route("/predict", methods=["POST"])
def predict(): 
    try:
        # get the data from the request
        data = request.get_json()
        #create a dataframe 
        features_df = pd.DataFrame({
            'Age': [data['age']],
            'Income': [data['income']],
            'Rent': [data['rent']],
            'Food Expences': [data['food']]
        })

        # make a prediction
        prediction = model.predict(features_df)[0]
        return jsonify({
        "prediction": prediction,
            "status": "success"
        })
    
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 400

@app.route("/")
def dashboard():
    return render_template("dashboard.html")


if __name__ == "__main__":
    app.run(debug=True)
