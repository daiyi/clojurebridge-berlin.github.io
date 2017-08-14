toggleLanguage(initialLanguage());

function initialLanguage() {
  // First check URL params for language
  // e.g. "http://clojurebridge-berlin.org?lang=de"
  var lang = getURLParam('lang', window.location.href);
  if (acceptedLanguage(lang)) {
    return lang;
  }

  // Next, check browser for language preferences
  if (navigator && navigator.languages) {
    var langlist = navigator.languages;

    for (var i = 0; i < langlist.length; i++) {
      var lang = langlist[i].slice(0, 2);

      if (acceptedLanguage(lang)) {
        return lang;
      }
    }
  }

  // Last, fall back to German
  return 'de';
}

function toggleLanguage(languageCode) {
  if (acceptedLanguage(languageCode)) {
    document.body.setAttribute('lang', languageCode)
  }
}

function acceptedLanguage(languageCode) {
  if (languageCode == 'en' || languageCode == 'de' || languageCode == 'all') {
    return true;
  }
  return false;
}


function getURLParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
