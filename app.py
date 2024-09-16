from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure MySQL connection
db_config = {
    'user': 'root',
    'password': 'ghaidaa88',
    'host': 'localhost',
    'database': 'react_users'
}

# Establish a connection to the database
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

# Route to add a new user to the database
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    age = data.get('age')
    email = data.get('email')

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO user_data (first_name, last_name, age, email) VALUES (%s, %s, %s, %s)",
                       (first_name, last_name, age, email))
        conn.commit()
        return jsonify({'message': 'User added successfully'}), 201
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)})
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
# Route to test the connection
# @app.route('/test_db_connection')
# def test_db_connection():
    
#     try:
#         conn = get_db_connection()  # Attempt to get a connection
#         cursor = conn.cursor()  # Create a cursor
#         cursor.execute("SELECT DATABASE();")  # Run a query to test the connection
#         db_name = cursor.fetchone()
#         return jsonify({'message': f"Connected to database: {db_name[0]}"})
#     except mysql.connector.Error as err:
#         return jsonify({'error': str(err)})
#     finally:
#         # Close cursor and connection if they were successfully initialized
#         if cursor is not None:
#             cursor.close()
#         if conn is not None and conn.is_connected():  # Ensure conn is still open before closing
#             conn.close()

if __name__ == '__main__':
    app.run(debug=True)
