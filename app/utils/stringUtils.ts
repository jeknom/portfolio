export const formatUpperCaseSnakeCaseToSentence = (
  upperCaseSnakeCaseString: string
) => {
  const words = upperCaseSnakeCaseString.split("_");
  let prettyName = "";

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    for (let charIndex = 0; charIndex < words[wordIndex].length; charIndex++) {
      const currentChar = words[wordIndex][charIndex];

      // Append white spaces
      if (wordIndex !== 0 && charIndex === 0) {
        prettyName = prettyName.concat(" ");
      }

      // Format character
      if (wordIndex === 0 && charIndex === 0) {
        prettyName = prettyName.concat(currentChar.toUpperCase());
      } else {
        prettyName = prettyName.concat(currentChar.toLowerCase());
      }
    }
  }

  return prettyName;
};

export const getYoutubeVideoIdFromEmbedUrl = (url: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[7] ? match[7] : "";
};

export const isValidEmail = (email: string) => {
  const regExp =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const match = email.match(regExp);

  return match !== null;
};
