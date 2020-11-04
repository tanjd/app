from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from sqlalchemy.sql import func
from os import environ
import csv
import sys

sys.path.insert(1, 'user')

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/student_db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user_db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(120), nullable=False)
    telegram_name = db.Column(db.String(120), unique=False, nullable=True)
    telegram_id = db.Column(db.String(120), unique=False, nullable=True)
    password = db.Column(db.String(60), nullable=False)
    email_setting = db.Column(db.Boolean, server_default="1", nullable=False)
    telegram_setting = db.Column(
        db.Boolean, server_default="0", nullable=False)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)

    def json(self):
        return {"id": self.id, "email": self.email, "name": self.name, "role": self.role, "telegram_name": self.telegram_name, "telegram_id": self.telegram_id, "password": self.password,
                "email_setting": self.email_setting, "telegram_setting": self.telegram_setting, "created_at": self.created_at}


@app.route('/')
def home():
    return jsonify({"user": [User.json() for User in User.query.all()]})

# http://localhost:5000/authenticate/
# use postman, select POST and put data in Body, select raw and json
# json data:
# {
#   "email": "jeddy.tan.2018@smu.edu.sg",
#   "password": "hello"
# }
@app.route('/authenticate/', methods=['POST'])
def authenticate():
    user_data = request.get_json()
    email = user_data['email']
    password = user_data['password']
    user = User.query.filter_by(email=email).first()
    if user:
        if password == user.password:
            return_message = ({"status": "success",
                               "user_id": user.id,
                               "role": user.role})
        else:
            return_message = ({"status": "fail",
                               "message": "Invalid Password"})
    else:
        return_message = ({"status": "fail",
                           "message": "Invalid Email"})
    return jsonify(return_message)


@app.route('/googleAuthenticate/', methods=['POST'])
def googleAuthenticate():
    user_data = request.get_json()
    email = user_data['email']
    user = User.query.filter_by(email=email).first()
    if user:
        return_message = ({"status": "success",
                           "user_id": user.id,
                           "role": user.role})
    else:
        return_message = ({"status": "fail",
                           "message": "Invalid Email"})
    return jsonify(return_message)


# http://localhost:5000/get_user/?user_id=1
@app.route('/get_user/', methods=['GET'])
def get_user():
    user_id = request.args.get('user_id')
    user = User.query.filter_by(id=user_id).first()
    if user:
        return_message = ({"status": "success",
                           "user": user.json()})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)


# http://localhost:5000/update_setting/
# use postman, select POST and put data in Body, select raw and json
# json data:
# {
#     "user_id": 1,
#     "telegram_id": "99770482",
#     "telegram_setting": true,
#     "email_setting": true
# }
@app.route('/update_setting/', methods=['POST'])
def update_setting():
    setting_data = request.get_json()
    user_id = setting_data['user_id']
    user = User.query.filter_by(id=user_id).first()
    user.telegram_name = setting_data['telegram_name']
    user.telegram_id = setting_data['telegram_id']
    user.email_setting = setting_data['email_setting']
    user.telegram_setting = setting_data['telegram_setting']

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"status": "fail",
                        "message": "An error occurred updating user settings."})
    return jsonify({"status": "success"})

#http://localhost:5000/update_password/
@app.route('/update_password/', methods=['POST'])
def update_password():
    setting_data = request.get_json()
    user_id = setting_data['user_id']
    user = User.query.filter_by(id=user_id).first()
    user.password = setting_data['password']

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"status": "fail",
                        "message": "An error occurred updating user password."})
    return jsonify({"status": "success"})

#http://localhost:5000/update_telegram_name/
@app.route('/update_telegram_name/', methods=['POST'])
def update_telegram_name():
    setting_data = request.get_json()
    user_id = setting_data['user_id']
    user = User.query.filter_by(id=user_id).first()
    user.telegram_name = setting_data['telegram_name']

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"status": "fail",
                        "message": "An error occurred updating user telegram name."})
    return jsonify({"status": "success"})

#http://localhost:5000/update_email_notification/
@app.route('/update_email_notification/', methods=['POST'])
def update_email_notification():
    setting_data = request.get_json()
    user_id = setting_data['user_id']
    user = User.query.filter_by(id=user_id).first()
    user.email_setting = setting_data['email_setting']

    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"status": "fail",
                        "message": "An error occurred updating user email notification setting."})
    return jsonify({"status": "success"})
# @app.route('/fb_login', methods=['POST'])
# def fb_login():
#     fb_data = request.get_json()
#     email = fb_data['email']
#     customer = Customer.query.filter_by(email=email).first()
#     if customer:
#         return_message = ({"status": "success",
#                            "customer_id": customer.id})
#     else:
#         fb_data['password'] = 'password'
#         try:
#             cust = Customer(**fb_data)
#             db.session.add(cust)
#             db.session.commit()
#         except:
#             return jsonify({"status": "fail",
#                             "message": "An error occurred creating customer."})
#         customer = Customer.query.filter_by(email=email).first()
#         if customer:
#             return_message = ({"status": "success",
#                                "customer_id": customer.id})
#         else:
#             return_message = ({"status": "fail",
#                                "message": "Invalid Email"})
#     return jsonify(return_message)


@app.route('/load_users', methods=['GET'])
def load_users():
    users = []
    # load data from csv
    with open('user/user.csv', newline='') as csv_file:
        user_data = csv.reader(csv_file)
        for email, name, role, telegram_name, telegram_id, password in user_data:
            user = {
                'email': email,
                'name': name,
                'role': role,
                'telegram_name': telegram_name,
                'telegram_id': telegram_id,
                'password': password
            }
            print(user)
            users.append(user)

    for user in users:
        try:
            user = User(**user)
            db.session.add(user)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            print(error)
            return jsonify({"status": "fail", "message": "An error occurred creating user."})
    return jsonify({"status": "success"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
