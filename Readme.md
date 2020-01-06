# Sample
```js
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
```

Output
```
Actual ip is: 195.176.3.24
RenewIP: Tor session successfully renewed!!
Actual ip is: 142.44.246.156
```

# Config Tor
[https://www.npmjs.com/package/tor-request#optional-configuring-tor-enabling-the-controlport](https://www.npmjs.com/package/tor-request#optional-configuring-tor-enabling-the-controlport)

You need to enable the Tor ControlPort if you want to programmatically refresh the Tor session (i.e., get a new proxy IP address) without restarting your Tor client.

Configure tor by editing the torrc file usually located at /etc/tor/torrc, /lib/etc/tor/torrc, ~/.torrc or /usr/local/etc/tor/torrc - Alternatively you can supply the path yourself with the --default-torrc PATH command line argument. See Tor Command-Line Options

Generate the hash password for the torrc file by running tor --hash-password SECRETPASSWORD.

`tor --hash-password giraffe`

The last line of the output contains the hash password that you copy paste into torrc

```
Jul 21 13:08:50.363 [notice] Tor v0.2.6.10 (git-58c51dc6087b0936) running on Darwin with Libevent 2.0.22-stable, OpenSSL 1.0.2h and Zlib 1.2.5.
Jul 21 13:08:50.363 [notice] Tor can't help you if you use it wrong! Learn how to be safe at https://www.torproject.org/download/download#warning
16:AEBC98A6777A318660659EC88648EF43EDACF4C20D564B20FF244E81DF
```

Copy the generated hash password and add it to your torrc file

```
# sample torrc file 
ControlPort 9051
HashedControlPassword 16:AEBC98A6777A318660659EC88648EF43EDACF4C20D564B20FF244E81DF
```

Lastly tell tor-request the password to use

```
var tr = require('tor-request')
tr.TorControlPort.password = 'giraffe'
```
