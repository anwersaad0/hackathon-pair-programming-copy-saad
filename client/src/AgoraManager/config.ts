import { EncryptionMode, UID, SDK_MODE } from 'agora-rtc-sdk-ng';

const config: configType = {
    uid: 123,
    appId: 'c38030fc48f446a6b8e2ac7d7924fc88',
    channelName: 'test',
    rtcToken: '',
    // '007eJxSYLBT2TAz6rQ/E88l60uTbb05doZfe7B5rqiiSef0iJw3U+8rMBibGlkmJaYlGhoam5mkmSclmRulmBgZmRkZmhtYGhsYx7WsSRXgY2BYWzuTlZGBkYGFgZEBxGcCk8xgkgVKlqQWl7AyGBobGlkCAgAA//9StB5P',
    // '007eJxTYNCed/nq8dTbbJZJeza5LubbYX8qju+T+psrn/u+L5ZTaWFRYEg2tjAwNkhLNrFIMzExSzRLskg1Skw2TzG3NDJJS7awYA1ak9oQyMgQNP0rKyMDBIL4LAwlqcUlDAwAjP0gMA==',
    serverUrl: 'https://agora-token-server-ujkt.onrender.com',
    proxyUrl: '',
    tokenExpiryTime: 600,
    token: '',
    encryptionMode: 'aes-128-gcm2',
    salt: '',
    encryptionKey: '',
    destChannelName: '',
    destChannelToken: '',
    destUID: 2,
    secondChannel: '',
    secondChannelToken: '',
    secondChannelUID: 2,
    selectedProduct: 'rtc',
};

export type configType = {
    uid: UID;
    appId: string;
    channelName: string;
    rtcToken: string | null;
    serverUrl: string;
    proxyUrl: string;
    tokenExpiryTime: number;
    token: string;
    encryptionMode: EncryptionMode;
    salt: '';
    encryptionKey: string;
    destUID: number;
    destChannelName: string;
    destChannelToken: string;
    secondChannel: string;
    secondChannelToken: string;
    secondChannelUID: number;
    selectedProduct: SDK_MODE;
};

export default config;
