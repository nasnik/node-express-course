const os = require("os");

const osInformation = {
    homeDir: os.homedir(),
    platformOS: os.platform(),
    releaseOS: os.release(),
    typeOS: os.type()
}
console.log(osInformation);

