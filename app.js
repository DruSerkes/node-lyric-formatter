const fs = require('fs');

const formatLyricLine = (lyricLine) => {
  if (!lyricLine) return '';
  return lyricLine[0].toUpperCase() + lyricLine.slice(1).toLowerCase();
};

const getFilename = (pathToFile) => {
  const filepathParts = pathToFile.split('/');
  return filepathParts[filepathParts.length - 1];
};

const generateNewFilename = (filename) => {
  return `./Formatted_Lyrics/${filename.split('.')[0]}.txt`;
};

const formatSongLyrics = (path) => {
  const filename = getFilename(path);
  if (filename[0] === '.') return;

  fs.readFile(path, (err, data) => {
    if (err) throw err;

    const lyrics = data.toString();
    const lines = lyrics.split('\n');

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine[trimmedLine.length - 1] === ':') return;

      const formattedLine = formatLyricLine(line);
      const newFilename = generateNewFilename(filename);
      fs.appendFileSync(newFilename, formattedLine + "\n");
    });
  })
};

const directory = fs.opendirSync('./Lyrics');

let entry = directory.readSync();

while (entry) {
  formatSongLyrics(`./Lyrics/${entry.name}`);
  entry = directory.readSync();
}

console.log('PROCESS COMPLETED IN ', process.uptime(), ' SECONDS');