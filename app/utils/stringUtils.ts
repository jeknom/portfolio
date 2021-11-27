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
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);

  return match && match[7] ? match[7] : "";
};
