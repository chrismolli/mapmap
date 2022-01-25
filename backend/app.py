from flask import Flask
import numpy as np
import json
from psql import DBClient
from time import sleep

# bind endpoints
app = Flask(__name__)

# open database
db = None
while db is None:
    db = DBClient(host="database",
                  database="mapmap",
                  user="backend",
                  password="backend")
    sleep(1)

"""
    helper
"""
def writeEntry(entry):
    # TODO
    pass

def readAllEntries():
    # TODO
    return []

def databaseIsEmpty():
    res = db.query("SELECT COUNT(id) FROM entries;")
    print(res)
    if res:
        return True
    else:
        return False

# create random population if empty
def randomEntry():
    entry = {}
    entry["latlng"] = {
        # "lat" : np.random.rand() * 180 - 90,
        # "lng" : np.random.rand() * 360 - 180
        "lat" : np.random.rand() * 2 + 47,
        "lng" : np.random.rand() * 4 + 9
    }
    entry["consumption"] = np.random.rand() * 1000
    entry["production"] = np.random.rand() * 1000
    entry["total_capacity"] = np.random.rand() * 1000
    entry["avail_capacity"] = np.random.rand() * entry["total_capacity"]
    return entry

@app.route("/getEntries")
def getEntries():
    data = [randomEntry() for i in range(10)]
    return json.dumps(data), 200, {'ContentType':'application/json',"Access-Control-Allow-Origin":"*"}

# run app
if __name__ == '__main__':
    # create some entries
    if databaseIsEmpty():
        for i in range(10):
            writeEntry(randomEntry())

    print(databaseIsEmpty())

    # run app
    app.run(debug=False, host='0.0.0.0')
