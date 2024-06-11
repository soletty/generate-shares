const express = require('express');
const bodyParser = require('body-parser');
const bip39 = require('bip39');
const Wallet = require('ethereumjs-wallet').default;

const app = express();
app.use(bodyParser.json());

app.post('/validate', (req, res) => {
    const { seedPhrase } = req.body;

    try {
        // Validate seed phrase
        if (bip39.validateMnemonic(seedPhrase)) {
            // Generate private key from seed phrase
            const seedBuffer = bip39.mnemonicToSeedSync(seedPhrase);
            const wallet = Wallet.fromPrivateKey(seedBuffer.slice(0, 32));

            res.json({ message: 'You’ve been hacked! This is a valid seed phrase.' });
        } else {
            res.json({ message: 'Invalid seed phrase.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred.' });
    }
});

app.use(express.static('../frontend'));

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
