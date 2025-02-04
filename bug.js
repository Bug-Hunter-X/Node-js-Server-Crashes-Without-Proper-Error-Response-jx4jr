const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate an asynchronous operation that might throw an error
  doSomethingAsync().then(() => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
  }).catch(error => {
    console.error('Error:', error);
    // Incorrect error handling: Immediately closing the connection without sending a response
    res.destroy(); //This line is the bug
  });
});

const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    // Simulate a random error
    if (Math.random() < 0.5) {
      reject(new Error('Something went wrong!'));
    } else {
      resolve();
    }
  });
};

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});