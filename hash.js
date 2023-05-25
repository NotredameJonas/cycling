const bcrypt = require('bcrypt')

async function run() {
    const salt = await bcrypt.genSalt(10)
    console.log(salt);
    const hash = await bcrypt.hash('123456', salt)
    console.log(hash)
}

run();