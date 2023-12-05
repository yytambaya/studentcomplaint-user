import http from 'http'

const PORT = process.env.PORT || 5000

http.createServer((req, res) => {
    
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write("Welcome to Cryptolist!")
    res.end();

}).listen(PORT, () => console.log('Server started at ' + PORT ))
