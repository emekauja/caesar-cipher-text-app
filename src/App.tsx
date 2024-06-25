import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { Button } from './components/forms/button/button';
import { Input, InputLabelWrapper } from './components/forms/input/input';
import { decrypt, encrypt } from './utils';

type EncryptedType = {
  password: string;
  text: string;
  encrypted: string;
};

interface IDecrypted extends Omit<EncryptedType, 'encrypt'> {
  decrypted: string;
}

type IError = Record<string, string> | null;

function App() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [decryptPassword, setDecryptPassword] = useState('');
  const [errors, setErrors] = useState<IError>(null);

  const encryptedListValue = localStorage.getItem('encryptedList');
  const decryptedListValue = localStorage.getItem('decryptedList');
  const [encryptedList, setEncryptedList] = useState<Array<EncryptedType>>(
    () => {
      if (typeof encryptedListValue === 'string') {
        return JSON.parse(encryptedListValue);
      }

      return [];
    }
  );
  const [decryptedList, setDecryptedList] = useState<Array<IDecrypted>>(() => {
    if (typeof decryptedListValue === 'string') {
      return JSON.parse(decryptedListValue);
    }

    return [];
  });

  const memoisedEncryptedList = useMemo(
    () => (encryptedList.length > 0 ? encryptedList : []),
    [encryptedList]
  );
  const memoisedDecryptedList = useMemo(
    () => (decryptedList.length > 0 ? decryptedList : []),
    [decryptedList]
  );

  function performEncryption() {
    let encrypted;

    if (password && text) {
      encrypted = encrypt(password, text);

      const newList = [...encryptedList, { text, password, encrypted }];
      localStorage.setItem('encryptedList', JSON.stringify(newList));

      setEncryptedList(newList as Array<EncryptedType>);
      setErrors((prev) => ({ ...prev, encrypted: '' }));
    } else {
      setErrors((prev) => ({
        ...prev,
        encrypted: 'please enter a password and text to encrypt!',
      }));
    }

    console.log(encrypted, encryptedListValue, encryptedList, 'encrypted');
  }

  function performDecryption() {
    let decrypted;
    const data = encryptedList.find(
      (item) => item.encrypted === decryptPassword
    );

    if (decryptPassword && data) {
      decrypted = decrypt(decryptPassword, data.text);

      const newList = [
        ...decryptedList,
        {
          text: data.text,
          password: data.password,
          decrypted: decryptPassword,
        },
      ];
      localStorage.setItem('decryptedList', JSON.stringify(newList));
      setDecryptedList(newList as Array<IDecrypted>);
      setErrors((prev) => ({ ...prev, decrypted: '' }));
    } else {
      setErrors((prev) => ({ ...prev, decrypted: 'no encrypted data found' }));
    }

    console.log(decrypted, data, 'decrypted');
  }

  useEffect(() => {
    setErrors(null);
  }, []);

  function ErrorMessage({ message }: { message?: string }) {
    if (message) {
      return <p className="text-sm text-red">{message}</p>;
    }

    return null;
  }

  return (
    <>
      <h1 className="text-3xl"> Caesar Cipher Text Encryption App </h1>
      <div className="w-full flex items-center justify-center mt-12 divide-black-50 divide-x">
        <div className="flex flex-col space-y-5 pr-3">
          <div className="flex flex-col">
            <div className="flex space-x-6">
              <InputLabelWrapper label="Text" name="Text">
                <Input
                  type="text"
                  placeholder="Enter a text to encrypt"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />{' '}
              </InputLabelWrapper>
              <InputLabelWrapper label="Encryption Password" name="password">
                <Input
                  type="text"
                  placeholder="Enter encryption Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputLabelWrapper>
            </div>
            <ErrorMessage message={errors?.encrypted} />
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Button text="Encrypt" onClick={() => performEncryption()} />
          </div>
        </div>

        <div className="space-y-5 pl-3">
          <div className="flex flex-col space-y-1">
            <InputLabelWrapper
              label="Enter Key to Decrypt Data "
              name="Decrypt Text"
            >
              <Input
                type="text"
                placeholder="Enter Password"
                value={decryptPassword}
                onChange={(e) => setDecryptPassword(e.target.value)}
              />
            </InputLabelWrapper>
            <ErrorMessage message={errors?.decrypted} />
          </div>
          <Button
            text="Decrypt"
            onClick={() => performDecryption()}
            variant="border"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-5 mt-12">
        <h2 className="text-2xl">Previous Encrypted List </h2>

        <div className="flex flex-col place-items-center space-y-2">
          {memoisedEncryptedList.length > 0
            ? memoisedEncryptedList.map((item) => (
                <div
                  key={item.password}
                  className="flex space-x-3 border border-gray-300 rounded-xl px-2 py-3"
                >
                  <p className="text-gray-400">
                    <span className="text-black"> Encrypted Key: </span>{' '}
                    {item.encrypted}
                  </p>
                </div>
              ))
            : 'no encrypted data'}
        </div>
      </div>

      <div className="flex flex-col space-y-5 mt-12">
        <h2 className="text-2xl">Previous Decrypted List </h2>

        <div className="flex flex-col place-items-center space-y-2">
          {memoisedDecryptedList.length > 0
            ? memoisedDecryptedList.map((item) => (
                <div
                  key={item.password}
                  className="flex space-x-3 border border-gray-300 rounded-xl px-2 py-3"
                >
                  <p className="text-gray-400">
                    <span className="text-black"> Decrypted text: </span>{' '}
                    {item.text}
                  </p>
                </div>
              ))
            : 'no decrypted data'}
        </div>
      </div>
    </>
  );
}

export default App;
