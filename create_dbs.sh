#!/bin/bash
python student/create_db.py &
python library/create_db.py &
python reservation/create_db.py