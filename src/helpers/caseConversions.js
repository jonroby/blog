const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const decapitalize = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const sentenceToCamel = sentence => {
  return sentence
    .toLowerCase()
    .split(' ')
    .map((s, i) => {
      if (i === 0) {
        return decapitalize(s);
      }

      return capitalize(s);
    })
    .join('');
}

// const camelToSentence = camel => {
//   camel
//     .replace(/([A-Z])/g, ' $1')   // insert a space before all caps
//     .replace(/^./, function(str){ return str.toUpperCase(); })   // uppercase the first character
//     .split(' ')


// }

const camelToKabob = camel => {
  return camel
    .replace(/([A-Z])/g, ' $1')   // insert a space before all caps
    .replace(/^./, function(str){ return str.toUpperCase(); })   // uppercase the first character
    .split(' ')
    .map(s => {
      return decapitalize(s);
    })
    .join('-');
}

const kabobToCamel = kabob => {
  return kabob
  .split('-')
  .map((s, i) => {
    if (i === 0) {
      return decapitalize(s);
    }

    return capitalize(s);
  })
  .join('');
}

export {
  sentenceToCamel,
  camelToKabob,
  kabobToCamel,
}
