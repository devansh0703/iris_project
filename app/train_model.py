import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import joblib

# Load the dataset
iris = pd.read_csv('Iris.csv')
iris = iris.drop('Id', axis=1)

# Separate features and target
X = iris.iloc[:, :-1].values
Y = iris.iloc[:, -1].values

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2)

# Train the model
model = SVC()
model.fit(X_train, y_train)

# Predict on the test dataset
predictions = model.predict(X_test)

# Save the model
joblib.dump(model, 'model.pkl')
