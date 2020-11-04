import csv
import random
from datetime import datetime, timedelta


def sortData(data):
    timeDict = {}
    timeList = []
    for i in range(7, 24):
        # timeDict[i] = 0
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
                for y in range(start_hour, end_hour):
                    timeList[y]["y"] = obj["y"] + 1
    return timeList



# def sortData(data):
#     timeDict = {}
#     # timeList = []
#     for i in range(7, 24):
#         timeDict[i] = 0
#         # timeList.append(obj)
#     for i in range(len(data)):
#         start = data[i]["start"]
#         end = data[i]["end"]
#         # start = datetime.strptime(start, '%Y-%m-%d %H:%M:%S')
#         # end = datetime.strptime(end, '%Y-%m-%d %H:%M:%S')
#         start_hour = start.hour
#         end_hour = end.hour

#         for i in range(start_hour, end_hour):
#             count = timeDict[i]
#             count = count + 1
#             timeDict[i] = count
#     return timeDict