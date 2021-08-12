"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * Returns a text according to the user's language
 * @param slug
 */
function translate(slug, lang) {
    try {
        if (!lang)
            lang = 'en-us';
        let exist = fs.existsSync(`${process.cwd()}/dist/translate/languages/${lang}.js`);
        if (!exist) {
            lang = 'en-us';
        }
        let messages = require('./languages/' + lang);
        messages = messages.default;
        const splited = slug.split('.');
        let translatedSlug = null;
        for (let i = 0; i < splited.length; i++) {
            if (i === 0) {
                if (messages[splited[i]]) {
                    translatedSlug = messages[splited[i]];
                }
                else {
                    throw new Error('Incorret slug[' + slug + ']');
                }
            }
            else {
                if (translatedSlug[splited[i]]) {
                    translatedSlug = translatedSlug[splited[i]];
                }
                else {
                    throw new Error('Incorret slug[' + slug + ']');
                }
            }
        }
        return translatedSlug;
    }
    catch (error) {
        return error.message;
    }
}
exports.default = translate;
//# sourceMappingURL=index.js.map