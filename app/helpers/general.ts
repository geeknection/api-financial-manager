/**
 * Retorna o valor da páginação do mongoose
 * @todo deve ser usado no método skip das collections
 * @param page 
 * @param totalDocuments 
 * @param limitPerPage 
 * @returns {number} total de documentos a serem pulados
 */
export const getSkipPagination = (page: number, totalDocuments: number, limitPerPage: number): number => {
    const pages = totalDocuments/limitPerPage;
    const excedPages = page > 1 && page > pages;
    if (excedPages) {
        return totalDocuments;
    }
    else {
        return page < 2 ? 0 : (pages-1)*limitPerPage;
    }
}