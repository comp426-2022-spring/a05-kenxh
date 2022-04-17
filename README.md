[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7597484&assignment_repo_type=AssignmentRepo)
# a05 Human Interface

In this assignment, you will build an HTML human interface for your API. You will also document your API endpoints and consider package structure.

## DO NOT CLONE THIS REPOSITORY DIRECTLY

Use the GitHub classroom link instead: https://classroom.github.com/a/PUVGxeMe

If you clone this repo directly, it will not be added to the organization as an individual repo associated with your account and you will not be able to push to it.

## Instructions

Full instructions for this assignment are available at: https://comp426.johndmart.in/a/05/

<!-- DELETE EVERYTHING ABOVE THIS LINE -->

# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/
```

#### Response body

```
{"flip":"heads"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-N9e0DDykqBPnqphc8f4bzHcjsuM"
Date: Sat, 16 Apr 2022 23:34:11 GMT     
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flips/15/
```

#### Response body

```
{"raw":["tails","tails","heads","heads","heads","tails","heads","heads","tails","tails","tails","tails","heads","heads","heads"],"summary":{"heads":8,"tails":7}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 161
ETag: W/"a1-3ZkiZJKz20hzg4s6O3WBkQOz1zw"
Date: Sat, 16 Apr 2022 23:35:15 GMT     
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coin/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/coin/
```

#### Response body

```

```

#### Response headers

```

```

### /app/flip/call/:guess/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/call/heads
```

#### Response body

```
{"call":"heads","flip":"tails","result":"lose"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 47
ETag: W/"2f-7jHpBxeRlMwmX45a5nEiITPVllI"
Date: Sat, 16 Apr 2022 23:37:08 GMT     
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","heads","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":21,"tails":9}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 07 Apr 2022 15:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/log/access/
```

#### Response body

```
[{"id":1,"remote_addr":"::1","remote_user":null,"time":"1647574186947.0","method":"GET","url":"/app/error","protocol":"http","http_version":1.1,"secure":null,"status":null,"referer":null,"user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36"},{"id":2,"remote_addr":"::1","remote_user":null,"time":"1647574201800.0","method":"GET","url":"/app/log/access","protocol":"http","http_version":1.1,"secure":null,"status":null,"referer":null,"user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36"},{"id":3,"remote_addr":"::1","remote_user":null,"time":"1647574346023.0","method":"GET","url":"/app/log/access","protocol":"http","http_version":1.1,"secure":0,"status":null,"referer":null,"user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36"}]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 13985
ETag: W/"36a1-BvIv8VyKZ5ffQ6lJM0eYpJNhIw8"
Date: Sat, 16 Apr 2022 23:56:58 GMT   
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/log/access/
```

#### Response body

```
[{"id":1,"remote_addr":"::1","remote_user":null,"time":"1647574186947.0","method":"GET","url":"/app/error","protocol":"http","http_version":1.1,"secure":null,"status":null,"referer":null,"user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36"},{"id":2,"remote_addr":"::1","remote_user":null,"time":"1647574201800.0","method":"GET","url":"/app/log/access","protocol":"http","http_version":1.1,"secure":null,"status":null,"referer":null,"user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36"},{"id":3,"remote_addr":"::1","remote_user":null,"time":"1647574346023.0","method":"GET","url":"/app/log/access","protocol":"http","http_version":1.1,"secure":0,"status":null,"referer":null,"user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.36"}]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 13985
ETag: W/"36a1-BvIv8VyKZ5ffQ6lJM0eYpJNhIw8"
Date: Sat, 16 Apr 2022 23:56:58 GMT   
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/error/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/log/error/
```

#### Response body

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Error: Error test successful.<br> &nbsp; &nbsp;at C:\Users\howar\comp 426\a04-kenxh\server.js:84:15<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\layer.js:95:5)<br> &nbsp; &nbsp;at next (C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\route.js:137:13)<br> &nbsp; &nbsp;at Route.dispatch (C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\route.js:112:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\layer.js:95:5)<br> &nbsp; &nbsp;at C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\index.js:281:22<br> &nbsp; &nbsp;at Function.process_params (C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\index.js:341:12)<br> &nbsp; &nbsp;at next (C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\index.js:275:10)<br> &nbsp; &nbsp;at logger (C:\Users\howar\comp 426\a04-kenxh\node_modules\morgan\index.js:144:5)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (C:\Users\howar\comp 426\a04-kenxh\node_modules\express\lib\router\layer.js:95:5)</pre>
</body>
</html>
```

#### Response headers

```
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1295
Date: Sat, 16 Apr 2022 23:58:50 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/login/ (POST)

#### Request cURL

```
curl http://localhost:5000/app/user/login/?id=2
```

#### Response body

```
{"id":2,"username":"anotherusername","password":"anotherpassword"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *        
Content-Type: application/json; charset=utf-8
Content-Length: 66
ETag: W/"42-TYMo5jYrmEA/T04rdVwP9cch5PM"
Date: Sat, 16 Apr 2022 23:53:13 GMT   
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/new/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"username":"user1", "password":"123456"}' http://localhost:5000/app/user/new
```

#### Response body

```
{"changes":1,"lastInsertRowid":3}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *        
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-HPdMZDIubVjwIzzAbhvg290bo30"
Date: Sat, 16 Apr 2022 23:43:54 GMT   
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/update/ (PATCH)

#### Request cURL

```
curl -X PATCH -H 'Content-Type: application/json' -d '{"id": "3", "username":"updateduser1", "password":"1234567"}' http://localhost:5000/app/user/update
```

#### Response body

```
{"changes":1,"lastInsertRowid":0}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *        
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-+MFfVpeuf3t7uypuWUgnF1Kjjak"
Date: Sat, 16 Apr 2022 23:48:05 GMT   
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/delete/ (DELETE)

#### Request cURL

```
curl -X DELETE http://localhost:5000/app/user/delete/3
```

#### Response body

```
{"changes":1,"lastInsertRowid":0}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *        
Content-Type: application/json; charset=utf-8
Content-Length: 33
ETag: W/"21-+MFfVpeuf3t7uypuWUgnF1Kjjak"
Date: Sat, 16 Apr 2022 23:50:27 GMT   
Connection: keep-alive
Keep-Alive: timeout=5
```
