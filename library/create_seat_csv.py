import csv
import random
from datetime import datetime, timedelta


with open('seat.csv', mode='w') as reservation_file:
    reservation_writer = csv.writer(
        reservation_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

    for library_id in range(1, 3):
        if library_id == 1:
            seatRange = 90
        else:
            seatRange = 80
        for floor in range(2, 6):
            for section in range(1, 5):
                for seat in range(1, seatRange):
                    reservation_writer.writerow(
                        [library_id, floor, section, seat])
