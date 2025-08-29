/**
 *  What is a Stream in Node.js?
 * - A stream is a way to handle data bit by bit, instead of all at once.
 * - Streams let you read or write data in small chunks.
 * - Streams use events like 'data', 'end', and 'error' to let you know what's happening.
 *
 * Why use Streams?
 * - Streams help work with big files or lots of data without using too much memory.
 * - You can start working with data as soon as it arrives.
 * - Streams make reading and writing data faster and more efficient.
 *
 * What can you do with Streams?
 * - Read data from files or the internet (Readable streams).
 * - Write data to files or send it somewhere (Writable streams).
 * - Duplex -> can be used for both read and wrie [TCP Sockets]
 * - Change or process data as it moves (Transform streams) [zlib streams].
 * - Connect streams together to pass data from one to another (pipe).
 */

/**
 * Difference between Stream and Buffer in Node.js:
 *
 * - Buffer:
 *   - Represents a fixed-size chunk of memory for storing raw binary data.
 *   - Used when you need to handle the entire data set at once.
 *   - Consumes more memory for large files since all data is loaded at once.
 *   - Example: fs.readFile loads the whole file into a buffer.
 *
 * - Stream:
 *   - Handles data piece by piece, as it arrives.
 *   - Efficient for large files or data sources, as it doesn't load everything into memory.
 *   - Uses events to process data chunks (e.g., 'data', 'end').
 *   - Example: fs.createReadStream reads a file in small chunks.
 *
 * In summary: Buffers are for handling complete data in memory, while streams are for processing data in chunks, making them more memory-efficient for large or continuous data.
 */

//! creating a transform stream , beacuase readable and writable is understandabe using their name

import fs from 'fs';
import crypto from 'crypto'; // for encryption
import zlib from 'zlib'; // help in compress
import { Transform } from 'stream';

class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  //! here i am creating a transform method , for when we have a data so for each chunk of data passed through that stream and their we want to do something
  _transform(chunk, _, callback) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]); // encrypt the chunk data which we passed here
    this.push(encrypted);
    callback();
  }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

//! creating txt file and reading that data
const readableStream = fs.createReadStream('input.txt');

//* new gzip object to compress the stream of data
const gzipStream = zlib.createGzip();

//* creating a object using above class we made EncryptStream and passing key and vector
const encryptStream = new EncryptStream(key, vector);

//*  making writtable stream
const writableStream = fs.createWriteStream('output.txt.gz.enc');

//* chaining all the stream together using pipe method
//read -> compress -> encrypt -> write
readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writableStream);

console.log('Streaming -> compressing -> writing data');
//! now u can check the output.txt.gz.enc file - our input.txt file is encrypted now
