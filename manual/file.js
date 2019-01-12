const fs = require('fs');
function summarizeFilesInDirectorySync(directory) {
    return fs.readdirSync(directory).map(fileName => ({
      directory,
      fileName,
    }));
    //返回路径及文件名
  }
  
  exports.summarizeFilesInDirectorySync = summarizeFilesInDirectorySync;