import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
    
    const searchButton = document.querySelector('.search-button'),
          searchBlock = document.querySelector('.search-block'),
          header = document.querySelector('.app-header'),
          titles = header.querySelector('.app-header__titles'),
          title = header.querySelector('.app-header__titles-title h1'),
          levelSelector = document.querySelector('.level-selector'),
          translationBlock = document.querySelector('.translation'),
          levelSelectorButtons = document.querySelectorAll('.level-selector__input'),
          levelSelectorButtonsLabel = document.querySelectorAll('.level-selector__label'),
          sentencesByLevel = document.querySelectorAll('.sent-lines'),
          searchingWordLabel = document.querySelector('.translation-word-title'),
          level1Data = document.querySelector('.lvl1'),
          level2Data = document.querySelector('.lvl2'),
          level3Data = document.querySelector('.lvl3'),
          level4Data = document.querySelector('.lvl4'),
          errorMessageLabel = document.querySelector('.error-message');


// == Reset level selector labels ==
const resetLevelSelectorLabels = () => {
    levelSelectorButtonsLabel.forEach(item => {
        item.classList.add('nohover');
        item.style.opacity = '0.2';
        item.previousElementSibling.disabled = true;
    });
}

// == Set current level ==
const setCurrentLevel = (level) => {
    levelSelectorButtons.forEach(item => {
        item.checked = false;
    });
    level -= 1;
    levelSelectorButtons[level].checked = true;
}

//== Reset old data ==
const resetOldData = () => {
    level1Data.innerHTML = '';
    level2Data.innerHTML = '';
    level3Data.innerHTML = '';
    level4Data.innerHTML = '';
    errorMessageLabel.textContent = '';
};

// == Get data ==
const getData = async (lang, word) => {
    const res = await axios.post('./data.php', JSON.stringify({
        lang: lang,
        word: word
    }));

    if (res.data) {

        resetLevelSelectorLabels();

        // Error handler
        if (res.data[0] == 'О') {
            resetOldData();
            searchingWordLabel.innerHTML = '';
            errorMessageLabel.textContent = 'Попробуете сменить язык поиска или поискать другое слово';
        } else {
            const data = res.data[0].slice(0, -1),
                  searchingWord = res.data[0][res.data[0].length-1];

            // Set searching word
            searchingWordLabel.innerHTML = `<h3>${searchingWord}</h3>`;

            // Unique existing levels 
            const existisngLevelsArr = Array.from(new Set(data.map(item => item.level)));

            // Set existing levels
            existisngLevelsArr.forEach(level => {
                level -= 1;
                levelSelectorButtonsLabel[level].classList.remove('nohover');
                levelSelectorButtonsLabel[level].previousElementSibling.disabled = false;
                levelSelectorButtonsLabel[level].style.opacity = '';
            });

            // Set current level
            setCurrentLevel(existisngLevelsArr[0]);
            setCurrentLevelSentences(sentencesByLevel, existisngLevelsArr[0]);

            // Add sentences by level
            const createLineSentences = (rus, eng, language) => {
                const line = document.createElement('div'),
                    firstSentence = document.createElement('p'),
                    secondSentence = document.createElement('p');

                line.classList.add('translation-row');
                firstSentence.classList.add('translation-row__colored');
                
                if (language == 'ru_RU') {
                    firstSentence.textContent = rus;
                    line.append(firstSentence);
                    secondSentence.textContent = eng;
                    line.append(secondSentence);
                } else if (language == 'en_EN') {
                    firstSentence.textContent = eng;
                    line.append(firstSentence);
                    secondSentence.textContent = rus;
                    line.append(secondSentence);
                }
                return line;
            };

            resetOldData();

            data.forEach(sentence => {
                switch (sentence.level) {
                    case '1':
                        document.querySelector('.lvl1').appendChild(createLineSentences(sentence.sentence_rus, sentence.sentence_eng, lang)); 
                        break;
                    case '2':
                        document.querySelector('.lvl2').appendChild(createLineSentences(sentence.sentence_rus, sentence.sentence_eng, lang));
                        break;
                    case '3':
                        document.querySelector('.lvl3').appendChild(createLineSentences(sentence.sentence_rus, sentence.sentence_eng, lang));
                        break;
                    case '4':
                        document.querySelector('.lvl4').appendChild(createLineSentences(sentence.sentence_rus, sentence.sentence_eng, lang));
                        break;
                }
            });
        }
    } else {
        resetOldData();
        searchingWordLabel.innerHTML = '';
        errorMessageLabel.textContent = 'Этого слова у нас нет, попробуете поискать другое';
    }
};

// == Search button click event ==
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const word = document.querySelector('.search-block__search-panel-input').value;
        const lang = document.querySelector('.search-block__langswitch-input-val:checked').value;

        if (word) {
            // == Style ==
            header.classList.remove('small');
            header.classList.add('big');
            searchBlock.style.margin = '0 auto';
            searchBlock.style.padding = '0 20px';
            title.style.display = 'none';
            titles.style.flexDirection = 'column';
            searchButton.style.marginTop = '20px';
            levelSelector.style.display = '';
            translationBlock.style.display = '';

            getData(lang, word);
        };
    });

// == Level selector interaction ==
    const displayNoneFunction = (selector) => {
        selector.forEach(item => {
            item.style.display = 'none';
        })
    };

    const setCurrentLevelSentences = (selector, level) => {
        displayNoneFunction(selector);
        selector.forEach(item => {
            if (item.classList[1] == `lvl${level}`) {
                item.style.display = '';
            }
        });
    };

    levelSelectorButtons.forEach(item => {
        item.addEventListener('click', (e) => setCurrentLevelSentences(sentencesByLevel, e.target.value));
    });

});