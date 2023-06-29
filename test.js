// import * as bigInt from 'big-integer';
// import { BigInteger } from 'big-integer';
// import { mimcHash, perlin } from '@darkforest_eth/hashing';

const mimcHash = require('@darkforest_eth/hashing').mimcHash;
const BigInteger = require('big-integer').BigInteger;
const bigInt = require('big-integer');
const snarkjs = require('snarkjs');


const test = async () => {
    let x = bigInt('7');
    let y = bigInt('6');
    let seed = bigInt('22222');
    const hashFunc = mimcHash(seed);
    const jsHash = hashFunc(x, y);

    console.log(jsHash);

    x = 7;
    y = 6;
    seed = 22222;
    const width = 10;
    const height = 10;
    const {proof, publicSignals} = await snarkjs.groth16.fullProve(
        {x, y, seed, width, height},
        `circuit.wasm`,
        `circuit_0001.zkey`
    );
    const circomHash = publicSignals[0];

    console.log(circomHash);
    console.log(circomHash == jsHash);
}

test()