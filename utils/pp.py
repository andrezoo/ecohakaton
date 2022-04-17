from datetime import datetime
import sqlite3
import requests
import json
src = "https://www.mapquestapi.com/geocoding/v1/address?key=9IiFu65JkkKIRsKgDBcWiBG8Y3FzxDfc&location="
conn = sqlite3.connect('kazecotech.db')
cur = conn.cursor()
cur.execute("""CREATE TABLE IF NOT EXISTS markers(
   lat INT,
   lng INT,
   addr TEXT);
""")
conn.commit()

f = open(input("Enter filename: "), "r")
log = open("log.txt", "w")
log.write("Log for ({})".format(datetime.now().strftime("%H:%M:%S")))
while True:
    line = f.readline()
    if not line:
        break
    elif (line == "" or line == "\n"):
        continue
    addr = line 
    addr = addr.replace("\n", ", Нур-Султан")
    r = requests.get(src+addr)
    p = r.json()
    try:
        print("Parsing '{}':".format(addr))
        lat = p["results"][0]["locations"][0]["latLng"]["lat"]
        lng = p["results"][0]["locations"][0]["latLng"]["lng"]
        print("For \"{}\" lat = {}, lng = {}".format(addr, lat, lng))
        cur.execute("INSERT INTO markers(lat, lng, addr) VALUES('{}', '{}', '{}')".format(lat, lng, addr))
        conn.commit()
    except:
        print("Blia, oszybka, suka. Wot JSON:\n{}".format(p))
        log.write("Blia, oszybka, suka. Wot JSON:\n{}".format(p))

# loc = "Сарыарка 24, Нур-Султан"
# r = requests.get(src+loc)
# p = r.json()
# print("Street:")
# print(p["results"][0]["locations"][0]["street"])
# print("latlng:")
# print(p["results"][0]["locations"][0]["latLng"]["lat"], end=" ")
# print(p["results"][0]["locations"][0]["latLng"]["lng"])