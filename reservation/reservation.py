from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from sqlalchemy.sql import func
from os import environ
import csv
import sys

sys.path.insert(1, 'reservation')
app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reservation_db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)


class Reservation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    student_id = db.Column(db.Integer, nullable=False)
    library_id = db.Column(db.Integer, nullable=False)
    seat_id = db.Column(db.Integer, nullable=False)
    floor = db.Column(db.Integer, nullable=False)
    section = db.Column(db.Integer, nullable=False)
    start = db.Column(db.DateTime, nullable=False)
    end = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)

    def json(self):
        return {"id": self.id, "student_id": self.student_id, "library_id": self.library_id, "seat_id": self.seat_id,
                "floor": self.floor, "section": self.section, "start": self.start, "end": self.end}


def sortData(data):
    timeDict = {}
    timeList = []
    for i in range(7, 24):
        timeDict[i] = 0
        obj = {
            "x": i,
            "y": 0
        }
        timeList.append(obj)

    for i in range(len(data)):
        start = data[i]["start"]
        end = data[i]["end"]

        start_hour = start.hour
        end_hour = end.hour
        for i in range(len(timeList)):
            if timeList[i]["x"] == start_hour:
                for y in range(i, i + (end_hour - start_hour)):
                    timeList[y]["y"] = timeList[y]["y"] + 1
    return timeList


@app.route('/')
def home():
    return jsonify({"reservations": [Reservation.json() for Reservation in Reservation.query.all()]})

# http://localhost:5002/get_reservations/
@app.route('/get_reservations/', methods=['GET'])
def get_reservations():
    reservations = [Reservation.json()
                    for Reservation in Reservation.query.all()]
    if reservations:
        return_message = ({"status": "success",
                           "reservations": reservations})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5002/get_reservations_by_school/?library_id=1
@app.route('/get_reservations_by_school/', methods=['GET'])
def get_reservations_by_school():
    library_id = request.args.get('library_id')

    reservations = [reservation.json(
    ) for reservation in Reservation.query.filter_by(library_id=library_id)]
    if reservations:
        return_message = ({"status": "success",
                           "reservations": reservations})
    else:
        return_message = ({"status": "fail"})
    return return_message

# http://localhost:5002/get_reservations_data_by_library_floor/?library_id=1&floor=2
@app.route('/get_reservations_data_by_library_floor/', methods=['GET'])
def get_reservations_data_by_library_floor():
    library_id = request.args.get('library_id')
    floor = request.args.get('floor')

    try:
        reservation_data = []
        for i in range(1, 5):
            reservations = [reservation.json(
            ) for reservation in Reservation.query.filter_by(library_id=library_id, floor=floor,section=i)]
            sections_reservations = {
                "section": i,
                "sections_reservations": reservations
            }
            reservation_data.append(sections_reservations)
        return_message = ({"status": "success",
                           "sections_reservations": reservation_data})
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"status": "fail",
                        "message": "An error occurred retrieving data."})
    return return_message

# http://localhost:5002/get_reservations_by_library_floor/?library_id=1&floor=2
@app.route('/get_reservations_by_library_floor/', methods=['GET'])
def get_reservations_by_library_floor():
    library_id = request.args.get('library_id')
    floor = request.args.get('floor')

    reservations = [reservation.json(
    ) for reservation in Reservation.query.filter_by(library_id=library_id, floor=floor)]
    if reservations:
        return_message = ({"status": "success",
                           "reservations": reservations})
    else:
        return_message = ({"status": "fail"})
    return return_message

# http://localhost:5002/get_reservations_by_library_floor_section/?library_id=1&floor=2&section=1
@app.route('/get_reservations_by_library_floor_section/', methods=['GET'])
def get_reservations_by_library_floor_section():
    library_id = request.args.get('library_id')
    floor = request.args.get('floor')
    section = request.args.get('section')

    reservations = [reservation.json(
    ) for reservation in Reservation.query.filter_by(library_id=library_id, floor=floor, section=section)]
    if reservations:
        return_message = ({"status": "success",
                           "reservations": reservations})
    else:
        return_message = ({"status": "fail"})
    return return_message

# http://localhost:5002/get_reservations_by_student/?student_id=1
@app.route('/get_reservations_by_student/', methods=['GET'])
def get_reservations_by_student():
    student_id = request.args.get('student_id')

    reservations = [reservation.json(
    ) for reservation in Reservation.query.filter_by(student_id=student_id)]
    if reservations:
        return_message = ({"status": "success",
                           "reservations": reservations})
    else:
        return_message = ({"status": "fail"})
    return return_message

# http://localhost:5002/create_reservation/
@app.route("/create_reservation/", methods=["POST"])
def create_reservation():
    user_data = request.get_json()
    student_id = user_data['student_id']
    library_id = user_data['library_id']
    seat_id = user_data['seat_id']
    floor = user_data['floor']
    section = user_data['section']

    start = user_data['start']
    start = datetime.strptime(start, '%Y-%m-%dT%H:%M:%S')
    end = user_data['end']
    end = datetime.strptime(end, '%Y-%m-%dT%H:%M:%S')

    try:
        # Automatically expires the object
        db.session.add(Reservation(student_id=student_id, library_id=library_id,
                                   seat_id=seat_id, floor=floor, section=section, start=start, end=end))
        db.session.commit()
    except:
        return jsonify({"status": "fail",
                        "message": "An error occurred creating reservation."})

    return jsonify({"status": "success"})

# http://localhost:5002/create_reservation_bulk/
@app.route("/create_reservation_bulk/", methods=["POST"])
def create_reservation_bulk():
    user_data = request.get_json()
    reservations = user_data['reservations']
    for reservation in reservations:
        student_id = reservation['student_id']
        library_id = reservation['library_id']
        seat_id = reservation['seat_id']
        floor = reservation['floor']
        section = reservation['section']

        start = reservation['start']
        start = datetime.strptime(start, '%Y-%m-%dT%H:%M:%S')
        end = reservation['end']
        end = datetime.strptime(end, '%Y-%m-%dT%H:%M:%S')

        try:
            # Automatically expires the object
            db.session.add(Reservation(student_id=student_id, library_id=library_id,
                                       seat_id=seat_id, floor=floor, section=section, start=start, end=end))
            db.session.commit()
        except:
            return jsonify({"status": "fail",
                            "message": "An error occurred creating reservation."})

    return jsonify({"status": "success"})

# http://localhost:5001/get_seats/
@app.route('/get_seats/', methods=['GET'])
def get_seats():
    seats = [Seat.json()
             for Seat in Seat.query.all()]
    if seats:
        return_message = ({"status": "success",
                           "seats": seats})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5001/get_seats_by_library/?library_id=1
@app.route('/get_seats_by_library/', methods=['GET'])
def get_seats_by_library():
    library_id = request.args.get('library_id')
    seats = [Seat.json() for Seat in Seat.query.filter_by(
        library_id=library_id)]
    if seats:
        return_message = ({"status": "success",
                           "seats": seats})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5001/get_seats_by_library_floor/?library_id=1&floor=1
@app.route('/get_seats_by_library_floor/', methods=['GET'])
def get_seats_by_library_floor():
    library_id = request.args.get('library_id')
    floor = request.args.get('floor')
    seats = [Seat.json() for Seat in Seat.query.filter_by(
        library_id=library_id, floor=floor)]
    if seats:
        return_message = ({"status": "success",
                           "seats": seats})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5001/get_seats_by_library_floor_section/?library_id=1&floor=2&section=1
@app.route('/get_seats_by_library_floor_section/', methods=['GET'])
def get_seats_by_library_floor_section():
    library_id = request.args.get('library_id')
    floor = request.args.get('floor')
    section = request.args.get('section')
    seats = [Seat.json() for Seat in Seat.query.filter_by(
        library_id=library_id, floor=floor, section=section)]
    if seats:
        return_message = ({"status": "success",
                           "seats": seats})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5002/get_reservations_data_by_school/?library_id=1
@app.route('/get_reservations_data_by_school/', methods=['GET'])
def get_reservations_data_by_school():
    library_id = request.args.get('library_id')

    reservations = [reservation.json(
    ) for reservation in Reservation.query.filter_by(library_id=library_id)]
    if reservations:
        timeList = sortData(reservations)
        return_message = ({"status": "success",
                           "reservations": timeList})
    else:
        return_message = ({"status": "fail"})
    return return_message

# http://localhost:5002/remove_reservation/
@app.route('/remove_reservation/', methods=['POST'])
def remove_reservation():
    data = request.get_json()
    reservation_id = data['reservation_id']
    try:
        Reservation.query.filter(
            Reservation.id == reservation_id).delete()
        db.session.commit()
    except:
        return jsonify({"status": "fail",
                        "message": "An error occurred in deleting reservation."})
    return jsonify({"status": "success"})

# http://localhost:5002/get_capacity_by_school/
@app.route('/get_capacity_by_school/', methods=['GET'])
def get_capacity_by_school():
    datetime_now = datetime.now()
    datetime_now = (datetime_now.strftime("%Y-%m-%d %H:%M:%S"))
    try:
        capacity_data = []
        for i in range(1, 3):
            library_capacity = Reservation.query.filter(
                Reservation.library_id == i, Reservation.start <= datetime_now, Reservation.end >= datetime_now).count()
            capacity = {
                "library_id": i,
                "library_capacity": library_capacity
            }
            capacity_data.append(capacity)
        return_message = ({"status": "success",
                           "capacity": capacity_data})
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"status": "fail",
                        "message": "An error occurred retrieving data."})
    return return_message

# http://localhost:5002/get_reservation_count_by_library_floor/
@app.route('/get_reservation_count_by_library_floor/', methods=['GET'])
def get_reservation_count_by_library_floor():

    library_id = request.args.get('library_id')
    floor = request.args.get('floor')

    start = request.args.get('start')
    datetime_start = datetime()
    start = datetime.strptime(start, '%Y-%m-%dT%H:%M:%S')
    end = request.args.get('end')
    end = datetime.strptime(end, '%Y-%m-%dT%H:%M:%S')

    try:
        reservation_count_data = []
        for i in range(1, 5):
            reservation_count = Reservation.query.filter(
                Reservation.library_id == library_id, Reservation.floor == floor, Reservation.section == i, Reservation.start >= start, Reservation.end <= end).count()
            reservation_count = {
                "section": i,
                "reservation_count": reservation_count
            }
            reservation_count_data.append(reservation_count)
        return_message = ({"status": "success",
                           "reservation_count": reservation_count_data})
    except Exception as error:
        db.session.rollback()
        print(error)
        return jsonify({"status": "fail",
                        "message": "An error occurred retrieving data."})
    return return_message

@app.route('/load_reservation', methods=['GET'])
def load_reservation():
    reservations = []
    # load data from csv
    with open('reservation.csv', newline='') as csv_file:
        reservation_data = csv.reader(csv_file)
        for student_id, library_id, seat_id, floor, section, start, end in reservation_data:
            start = datetime.strptime(start, '%Y-%m-%d %H:%M:%S')
            end = datetime.strptime(end, '%Y-%m-%d %H:%M:%S')
            reservation = {
                'student_id': student_id,
                'library_id': library_id,
                'seat_id': seat_id,
                'floor': floor,
                'section': section,
                'start': start,
                'end': end
            }
            reservations.append(reservation)

    for reservation in reservations:
        try:
            reservation = Reservation(**reservation)
            db.session.add(reservation)
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            print(error)
            return jsonify({"status": "fail",
                            "message": "An error occurred creating reservation."})
    return jsonify({"status": "success"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)
