const fs = require('fs');

const inputFile = 'input.txt';

fs.readFile(inputFile, 'utf8', (err, data) => {
  const outputFile = 'output_callback.txt';

  if (err) {
    console.error('Ошибка чтения файла: ', err);
    return;
  }

  const modifiedData = data.toUpperCase();

  fs.writeFile(outputFile, modifiedData, (err) => {
    if (err) {
      console.error('Ошибка записи файла: ', err);
      return;
    }
  });
});
