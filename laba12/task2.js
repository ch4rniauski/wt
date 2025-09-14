const fsPromises = require('fs').promises;

async function task2() {
  const inputFile = 'input.txt';
  const outputFile = 'output_async_await.txt';

  try {
    const data = await fsPromises.readFile(inputFile, 'utf8');
    const modifiedData = data.toUpperCase();

    await fsPromises.writeFile(outputFile, modifiedData);
    await fsPromises.appendFile(outputFile, '--- End of file ---');
  } catch (err) {
    console.error('Ошибка: ', err);
  }
}

task2();
