export const useText = () => {
  const CARRIAGE_RETURN = '\n';
  const WORD_COUNT_PER_CARRIAGE_RETURN = 60;
  const MIN_CARRIAGE_RETURN_COUNT = 3;
  const MAX_CARRIAGE_RETURN_COUNT = 9;

  const getShortenedString = (
    input: string,
    lengthToShortenTo: number,
    ignoreCarriageReturn = true,
  ) => {
    if (!input || !lengthToShortenTo) {
      return '';
    }
    let carriageReturnCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i) === CARRIAGE_RETURN) {
        carriageReturnCount++;
      }
    }
    const inputSize = input.length;
    if (carriageReturnCount > MAX_CARRIAGE_RETURN_COUNT) {
      carriageReturnCount = MAX_CARRIAGE_RETURN_COUNT;
    }

    // Assuming each carriage return substitutes for a min of 3 and max of 60 characters
    if (!ignoreCarriageReturn) {
      if (inputSize < carriageReturnCount * MIN_CARRIAGE_RETURN_COUNT) {
        lengthToShortenTo = carriageReturnCount * 2;
      } else {
        if (carriageReturnCount > 0) {
          carriageReturnCount = MIN_CARRIAGE_RETURN_COUNT;
        }
        lengthToShortenTo -=
          carriageReturnCount * WORD_COUNT_PER_CARRIAGE_RETURN;
      }
    }
    if (inputSize <= lengthToShortenTo) {
      return input;
    }
    return `${input.substring(0, lengthToShortenTo - 5)} ... `;
  };

  const transform = (
    input: string,
    lengthToShortenTo = 600,
    ignoreCarriageReturn = true,
  ) => getShortenedString(
    input,
    lengthToShortenTo,
    ignoreCarriageReturn,
  );
  
  return {
    transform,
  };
};