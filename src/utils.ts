const ALLCHARACTERS =
  'abcdefghijklmnopqrstuvwxyz0123456789=ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getCharacterFromType(char: string, charToChange: string) {
  const posChar = ALLCHARACTERS.indexOf(char);

  if (posChar === -1) {
    console.log('char ' + char + ' not allowed.');
    return null;
  }
  const posCharToChange = ALLCHARACTERS.indexOf(charToChange);

  if (posCharToChange === -1) {
    console.log('char ' + char + ' not allowed.');
    return null;
  }

  const part1 = ALLCHARACTERS.substring(posChar, ALLCHARACTERS.length);
  const part2 = ALLCHARACTERS.substring(0, posChar);
  const newCharacters = '' + part1 + '' + part2;

  const charAccordingToAbc = newCharacters.split('')[posCharToChange];

  return charAccordingToAbc;
}

export function encrypt(key: string, text: string) {
  const base64 = btoa(text);

  const arr = base64.split('');
  const arrPass = key.split('');
  let lastKeyChar = 0;

  let encrypted = '';

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];

    const keyChar = arrPass[lastKeyChar];

    const temp = getCharacterFromType(keyChar, char);

    if (temp) {
      // join response to encrypted text
      encrypted += temp;
    } else {
      return null;
    }

    if (lastKeyChar == arrPass.length - 1) {
      lastKeyChar = 0;
    } else {
      lastKeyChar++;
    }
  }
  return encrypted;
}

function getReversedCharacterFromText(letter: string, letterToChange: string) {
  const posLetter = ALLCHARACTERS.indexOf(letter);

  if (posLetter === -1) {
    console.log('character ' + letter + ' not allowed.');
    return null;
  }
  const part1 = ALLCHARACTERS.substring(posLetter, ALLCHARACTERS.length);
  const part2 = ALLCHARACTERS.substring(0, posLetter);

  const newABC = '' + part1 + '' + part2;

  const posLetterToChange = newABC.indexOf(letterToChange);

  if (posLetterToChange === -1) {
    console.log('character ' + letter + ' not allowed.');
    return null;
  }

  const letterAccordingToAbc = ALLCHARACTERS.split('')[posLetterToChange];

  return letterAccordingToAbc;
}

export function decrypt(key: string, text: string) {
  const arr = text.split('');

  const arrKey = key.split('');

  let lastKeyChar = 0;

  let decrypted = '';

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];

    const keyChar = arrKey[lastKeyChar];
    const temp = getReversedCharacterFromText(keyChar, char);
    if (temp) {
      decrypted += temp;
    } else {
      return null;
    }

    if (lastKeyChar == arrKey.length - 1) {
      lastKeyChar = 0;
    } else {
      lastKeyChar++;
    }
  }

  return atob(decrypted);
}
