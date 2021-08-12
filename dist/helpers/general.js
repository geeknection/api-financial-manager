"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSkipPagination = void 0;
/**
 * Retorna o valor da páginação do mongoose
 * @todo deve ser usado no método skip das collections
 * @param page
 * @param totalDocuments
 * @param limitPerPage
 * @returns {number} total de documentos a serem pulados
 */
const getSkipPagination = (page, totalDocuments, limitPerPage) => {
    const pages = totalDocuments / limitPerPage;
    const excedPages = page > 1 && page > pages;
    if (excedPages) {
        return totalDocuments;
    }
    else {
        return page < 2 ? 0 : (pages - 1) * limitPerPage;
    }
};
exports.getSkipPagination = getSkipPagination;
//# sourceMappingURL=general.js.map