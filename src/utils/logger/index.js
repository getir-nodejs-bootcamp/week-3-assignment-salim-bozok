const fs = require("fs");

const prepareLogFile = () => {
  // Eğer mevcut değilse, log.json dosyasını oluşturacağız
  fs.open("log.json", "wx", (err, fd) => {
    // race condition'a yol açabileceğinden dosyanın erişilebilir olup olmadığını
    // kontrol etmek için `fs.access()` kullanılması tavsiye edilmiyor.
    if (err) {
      // log.json dosyasının mevcut olup olmadığını kontrol ediyoruz
      if (err.code === "EEXIST") {
        // eğer dosya mevcutsa doğrudan return ediyoruz
        return;
      }
      console.log("something went wrong while opening the log.json file", err);
    }

    // eğer log.json dosyası mevcut değilse oluşturuyoruz
    fs.writeFile(fd, "[]", (err) => {
      fs.close(fd);
      if (err) {
        console.log(
          "something went wrong while creating the log.json file",
          err
        );
        return;
      }
    });
  });
};

function pushNewLog(newLog) {
  fs.readFile("log.json", "utf-8", (err, data) => {
    if (err) {
      console.log("something went wrong while reading the log file", err);
      return;
    }

    const log = JSON.parse(data);

    log.push(newLog);

    fs.writeFile("log.json", JSON.stringify(log), (err) => {
      if (err) {
        console.log(
          "something went wrong while pushing new log to the file",
          err
        );
        return;
      }
    });
  });
}

module.exports = {
  prepareLogFile,
  pushNewLog,
};
