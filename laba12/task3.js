const fsPromises = require('fs').promises;

async function task3() {
  try {
    const dir = 'my_directory';

    try {
      await fsPromises.access(dir);
    } catch {
      await fsPromises.mkdir(dir, { recursive: true });
      console.log('Каталог создан:', dir);
    }

    await fsPromises.writeFile(`${dir}/file1.txt`, '');
    await fsPromises.writeFile(`${dir}/data.json`, '');

    const files = await fsPromises.readdir(dir);
    console.log('Содержимое каталога:', files);
    
    for (const file of files) {
      const stats = await fsPromises.stat(`${dir}/${file}`);

      if (stats.isFile()) {
        console.log(`${file} is a file`);
      } else if (stats.isDirectory()) {
        console.log(`${file} is a directory`);
      }
    }

    await fsPromises.unlink(`${dir}/data.json`);

    const finalFiles = await fsPromises.readdir(dir);

    console.log('Итоговое содержимое каталога: ', finalFiles);
  } catch (err) {
    console.error('Ошибка: ', err);
  }
}

task3();
