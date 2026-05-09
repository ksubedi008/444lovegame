import urllib.request
import json
req = urllib.request.Request('https://444lovegame.vercel.app/api/login/', data=json.dumps({'username':'gudiya', 'password':'gudiya'}).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    resp = urllib.request.urlopen(req)
    print("SUCCESS", resp.status, resp.read().decode())
except urllib.error.HTTPError as e:
    print("ERROR", e.code, e.read().decode())
