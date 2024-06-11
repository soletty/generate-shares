from flask import Flask, request, jsonify, send_from_directory
from bip_utils import Bip39MnemonicValidator
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='/')
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/validate', methods=['POST'])
def validate():
    data = request.json

    print(data)
    seed_phrase = data['seedPhrase']

    try:
        validator = Bip39MnemonicValidator()
        if validator.IsValid(seed_phrase):
            return jsonify({ 'message': 'You have been hacked! This is a valid seed phrase.' })
        else:
            return jsonify({ 'message': 'Invalid seed phrase.' })
    except Exception as e:
        return jsonify({ 'message': 'An error occurred.' })

if __name__ == '__main__':
    app.run(port=3000)
