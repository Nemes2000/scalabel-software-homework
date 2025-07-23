import { EncryptStorage } from 'encrypt-storage';

export const encryptedStorageFactory = (): EncryptStorage => {
  const encryptionKey = 'EbTWbMR2hOEXMdOmR4lLqbGuXYQEP7sl';
  return new EncryptStorage(encryptionKey);
};
