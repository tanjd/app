from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from sqlalchemy.sql import func
from os import environ
import csv
import sys

sys.path.insert(1, 'library')

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/student_db'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///library_db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)


class Library(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    postal_code = db.Column(db.String(120), nullable=False)
    floors = db.Column(db.Integer, nullable=False)
    max_seats = db.Column(db.Integer, server_default="200", nullable=False)
    created_at = db.Column(
        db.DateTime, server_default=func.now(), nullable=False)

    seats = db.relationship(
        'Seat', backref='library', lazy=True)

    section = db.relationship(
        'Section', backref='library', lazy=True)

    def json(self):
        return {"id": self.id, "name": self.name, "address": self.address, "floors": self.floors, "max_seats": self.max_seats, "created_at": self.created_at}


class Seat(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    library_id = db.Column(db.Integer, db.ForeignKey(
        'library.id'), primary_key=True, nullable=False)
    floor = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.Integer, primary_key=True)

    def json(self):
        return {"id": self.id, "library_id": self.library_id, "floor": self.floor, "section": self.section}

class Section(db.Model):
    library_id = db.Column(db.Integer, db.ForeignKey(
        'library.id'), primary_key=True, nullable=False)
    floor = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.Integer, primary_key=True)
    venue = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(120))
    img_src = db.Column(db.String(200), nullable=False)

    def json(self):
        return {"library_id": self.library_id, "floor": self.floor, "section": self.section, "venue": self.venue, "description": self.description, "img_src":self.img_src}

@app.route('/')
def home():
    # return config.myname
    # return 'Hello, Flask!'
    return jsonify({"Library": [Library.json() for Library in Library.query.all()]})

# http://localhost:5001/get_libraries/
@app.route('/get_libraries/', methods=['GET'])
def get_libraries():
    libraries = [Library.json()
                 for Library in Library.query.all()]
    if libraries:
        return_message = ({"status": "success",
                           "libraries": libraries})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5001/get_library/?library_id=1
@app.route('/get_library/', methods=['GET'])
def get_library():
    library_id = request.args.get('library_id')
    library = Library.query.filter_by(id=library_id).first()
    if library:
        return_message = ({"status": "success",
                           "library": library.json()})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)


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

# http://localhost:5001/get_seats_by_library_floor/?library_id=1&floor=2
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

# http://localhost:5001/get_sections/
@app.route('/get_sections/', methods=['GET'])
def get_sections():
    sections = [Section.json()
             for Section in Section.query.all()]
    if sections:
        return_message = ({"status": "success",
                           "sections": sections})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5001/get_sections_by_library_floor/?library_id=1&floor=2
@app.route('/get_sections_by_library_floor/', methods=['GET'])
def get_sections_by_library_floor():
    library_id = request.args.get('library_id')
    floor = request.args.get('floor')
    section = [Section.json() for Section in Section.query.filter_by(
        library_id=library_id, floor=floor)]
    if section:
        return_message = ({"status": "success",
                           "sections": section})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

# http://localhost:5001/get_sections_by_library_floor_section/?library_id=1&floor=2&section=3
@app.route('/get_sections_by_library_floor_section/', methods=['GET'])
def get_sections_by_library_floor_section():
    library_id = request.args.get('library_id')
    floor = request.args.get('floor')
    section = request.args.get('section')
    section = [Section.json() for Section in Section.query.filter_by(
        library_id=library_id, floor=floor, section=section)]
    if section:
        return_message = ({"status": "success",
                           "sections": section})
    else:
        return_message = ({"status": "fail"})
    return jsonify(return_message)

@app.route('/load_libraries', methods=['GET'])
def load_libraries():
    libraries = []
    # load data from csv
    with open('library/library.csv', newline='') as csv_file:
        library_data = csv.reader(csv_file)
        for name, address, postal_code in library_data:
            library = {
                'name': name,
                'address': address,
                'postal_code': postal_code
            }
            libraries.append(library)

    for library in libraries:
        try:
            library = Library(**library)
            db.session.add(library)
            db.session.commit()
        except:
            return jsonify({"status": "fail",
                            "message": "An error occurred creating library."})
    return jsonify({"status": "success"})


@app.route('/load_seats', methods=['GET'])
def load_seats():
    seats = []
    # load data from csv
    with open('library/seat.csv', newline='') as csv_file:
        seat_data = csv.reader(csv_file)
        for library_id, floor, section, id in seat_data:
            seat = {
                'library_id': library_id,
                'floor': floor,
                'section': section,
                'id': id
            }
            seats.append(seat)

    for seat in seats:
        try:
            seat = Seat(**seat)
            db.session.add(seat)
            db.session.commit()
        except:
            return jsonify({"status": "fail",
                            "message": "An error occurred creating seat."})
    return jsonify({"status": "success"})

@app.route('/load_sections', methods=['GET'])
def load_sections():
    sections = []
    # load data from csv
    with open('library/section.csv', newline='') as csv_file:
        section_data = csv.reader(csv_file)
        for library_id, floor, section, venue, description, img_src in section_data:
            section = {
                'library_id': library_id,
                'floor': floor,
                'section': section,
                'venue': venue,
                'description': description,
                'img_src': img_src
            }
            sections.append(section)

    for section in sections:
        try:
            section = Section(**section)
            db.session.add(section)
            db.session.commit()
        except:
            return jsonify({"status": "fail",
                            "message": "An error occurred creating seat."})
    return jsonify({"status": "success"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
