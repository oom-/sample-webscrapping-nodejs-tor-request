let FS = require('fs');
let TOR = require('tor-request');

TOR.TorControlPort.password = 'giraffe';

TOR.GetCurrentIp = () => {
    return new Promise((resolve, reject) => {
        TOR.request('https://api.ipify.org', function (err, res, body) {
            if (!err && res.statusCode == 200) {
                resolve(body.trim()); //return actual ip as parameter
            }
            else
                reject(err);
        });
    });
};
TOR.RenewIp = () => {
    return new Promise((resolve, reject) => {
        TOR.renewTorSession((err, msg) => {
            if (err)
                reject(err);
            else
                resolve(msg);
        });
    });
};

(async () => {
    let ip = await TOR.GetCurrentIp();
    console.log(`Actual ip is: ${ip}`);
    let msg = await TOR.RenewIp();
    console.log(`RenewIP: ${msg}`);
    ip = await TOR.GetCurrentIp();
    console.log(`Actual ip is: ${ip}`);
})();