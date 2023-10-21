const ArrayBufferToString = (value: ArrayBuffer) => [...new Uint8Array(value)].map(x => x.toString(16).padStart(2, '0')).join('');
const Hash = (type: 'SHA-1' | 'SHA-256', token: string) => window.crypto.subtle.digest(type, new TextEncoder().encode(token));
const sha1 = (token: string) => Hash('SHA-1', token);
const sha256 = (token: string) => Hash('SHA-256', token);

export {
    ArrayBufferToString,
    Hash,
    sha1,
    sha256
}