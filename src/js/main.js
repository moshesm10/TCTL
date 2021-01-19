'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const searchButton = document.querySelector('.search-button');
    const searchBlock = document.querySelector('.search-block');
    const header = document.querySelector('.app-header');
    const titles = header.querySelector('.app-header__titles');
    const title = header.querySelector('.app-header__titles-title h1');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();

        // == Style ==
        header.style.maxWidth = '100%';
        header.style.marginTop = 0;
        header.style.display = 'flex';
        header.style.alignItems = 'baseline';

        searchBlock.style.margin = '0 auto';
        searchBlock.style.padding = '0 20px';

        title.style.display = 'none';
        titles.style.flexDirection = 'column';

    });
    

});