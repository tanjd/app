import csv
import random
from datetime import datetime, timedelta


def gen_datetime(min_year=2019, max_year=datetime.now().year):
    # generate a datetime in format yyyy-mm-dd hh:mm:ss.000000
    month = random.randrange(1, 12)
    year = 2020
    hour = random.randrange(8, 22)
    day = random.randrange(1, 30)
    start = datetime(year, month, day, hour, 00, 00)
    # years = max_year - min_year + 1
    # end = start + timedelta(days=365 * years)
    # return start + (end - start) * random.random()
    return start


def is_time_between(begin_time, end_time, check_time):
    if begin_time < end_time:
        return check_time >= begin_time and check_time <= end_time
    else:  # crosses midnight
        return check_time >= begin_time or check_time <= end_time


with open('reservation.csv', mode='w') as reservation_file:
    reservation_writer = csv.writer(
        reservation_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

    for x in range(500):
        student_id = random.randrange(1, 31)
        library_id = random.randrange(1, 3)
        seat_id = random.randrange(1, 80)
        floor = random.randrange(2, 6)
        section = random.randrange(1, 5)
        start = gen_datetime()

        hours = random.randrange(1, 7)
        # hours_added = datetime + timedelta(hours = hours)
        end = start + timedelta(hours=hours)
        if not (end.hour <= 23 and end.hour > 8):
            end = end.replace(hour=23)
            end = end.replace(day=start.day)
        reservation_writer.writerow(
            [student_id, library_id, seat_id, floor, section, start, end])
