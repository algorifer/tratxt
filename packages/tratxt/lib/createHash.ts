import { DateTime } from 'luxon'
import CryptoJS from 'crypto-js'

// const base32 = (payload: string) => b32encode(Buffer.from(payload), 'RFC3548', { padding: false });

function formatRFC3339(text: string) {
  return DateTime.fromISO(text, { setZone: true, zone: 'utc' })
    .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ")
    .replace(/\+00:00$/, 'Z');
}

export const createRecordHash = (url: string, date: string, body: string) => {
  const created = formatRFC3339(date);
  const payload = [url, created, body].join('\n');
  const hash = CryptoJS.AES.encrypt(payload, 'secret key 123').toString()
  return hash
}
