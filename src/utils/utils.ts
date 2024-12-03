import { fromBase64, fromBech32, toBase64, toBech32 } from "@cosmjs/encoding";
import { sha256 } from "@cosmjs/crypto";

export function valconsToBase64(address: string) {
    if (address) return toBase64(fromBech32(address).data);
    return '';
}

export function decodeAddress(address: string) {
    return fromBech32(address);
}

export function pubKeyToValcons(
    consensusPubkey: { '@type': string; key: string },
    prefix: string
) {
    if (consensusPubkey && consensusPubkey.key) {
        const pubkey = fromBase64(consensusPubkey.key);
        if (pubkey) {
            const addressData = sha256(pubkey).slice(0, 20);
            return toBech32(prefix, addressData);
        }
    }
    return '';
}