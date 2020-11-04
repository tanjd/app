import csv
import random
from datetime import datetime, timedelta
import names

with open('user.csv', mode='w') as user_file:
    user_writer = csv.writer(
        user_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')

    for x in range(30):

        name = names.get_full_name()
        email = name.replace(" ", ".") + ".2019@smu.edu.sg"
        role = 'student'
        telegramName = 'dummyValue'
        telegramID = 12345678
        password = 'hello'

        user_writer.writerow(
            [email, name, role, telegramName, telegramID, password])

    user_writer.writerow(
        ['jeddy.tan.2018@smu.edu.sg', 'jeddy tan', 'admin', 'jeddytan', 99770482, 'hello'])

    user_writer.writerow(
        ['verwin.kwa.2019@smu.edu.sg', 'Verwin Kwa', 'student', 'dummyValue', 12345678, 'hello'])

# jeddy.tan.2018@smu.edu.sg,jeddy tan,admin,jeddytan,99770482,hello
# verwin.kwa.2019@smu.edu.sg,Verwin Kwa, student,jeddytan,123,hello