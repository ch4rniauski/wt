const fs = require('fs');

function generateLargeFile(path, sizeInMB, callback) {
  const stream = fs.createWriteStream(path);
  const chunk = 'a'.repeat(1024);
  const chunkSize = Buffer.byteLength(chunk);
  const totalChunks = Math.ceil((sizeInMB * 1024 * 1024) / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    stream.write(chunk);
  }

  stream.end();

  stream.on('finish', () => {
    callback();
  });
}

function task4() {
  const inputFile = 'large_input.txt';
  const outputFile = 'large_output.txt';
  const fileSizeInMb = 10;

  generateLargeFile(inputFile, fileSizeInMb, () => {
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(outputFile);

    readStream.on('error', (err) => {
      console.error('Ошибка чтения:', err);
    });

    writeStream.on('error', (err) => {
      console.error('Ошибка записи:', err);
    });

    writeStream.on('finish', () => {
      console.log('File copied successfully!');
    });

    readStream.pipe(writeStream);
  });
}

task4();
