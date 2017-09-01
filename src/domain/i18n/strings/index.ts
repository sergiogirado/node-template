let supportedLangs = ['en', 'es'];
let defaultLang = supportedLangs[0];
let currentLang = defaultLang;

export function setPreferredLanguage(langs: string) {
  // let lang = requ.header('accept-language');
  if (langs) {
    let prior = langs.split(';');
    let langExpression = '-1';
    let lastLangExpression = prior[prior.length - 1];
    let matchLang = false;
    do {
      langExpression = prior[prior.indexOf(langExpression) + 1];
      let matchs = langExpression.split(',').filter(part => supportedLangs.indexOf(part) !== -1);

      if (matchs.length) {
        currentLang = matchs[0];
        matchLang = true;
        break;
      }
    } while (langExpression !== lastLangExpression);

    if (!matchLang) {
      currentLang = defaultLang;
    }
  }
}

export interface IDomainStrings {
  generic: {
    INVALID_PARAMETERS: string
  };
  demo: {

  };
}

export function getString(selector: (strings: IDomainStrings) => string): string {
  return selector(require('strings.' + currentLang));
}