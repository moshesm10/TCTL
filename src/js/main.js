'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const searchButton = document.querySelector('.search-button');
    const searchBlock = document.querySelector('.search-block');
    const header = document.querySelector('.app-header');
    const titles = header.querySelector('.app-header__titles');
    const title = header.querySelector('.app-header__titles-title h1');
    const levelSelector = document.querySelector('.level-selector');
    const translationBlock = document.querySelector('.translation');
    const levelSelectorButtons = document.querySelectorAll('.level-selector__input');

// == Search button click event ==
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();

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
    });

// == Level selector interaction ==
    const displayNoneFunction = (selector) => {
        selector.forEach(item => {
            item.style.display = 'none';
        })
    };

    const setCurrentLevelSentences = (selector, level) => {
        selector.forEach(item => {
            if (item.classList[1] == `lvl${level}`) {
                item.style.display = '';
            }
        });
    };

    levelSelectorButtons.forEach(item => {
        item.addEventListener('click', (e) => {
            const sentencesByLevel = document.querySelectorAll('.sent-lines');

            displayNoneFunction(sentencesByLevel);
            setCurrentLevelSentences(sentencesByLevel, e.target.value);
        });
    });

// == Get data ==
    const getData;

// ================= old script ==================

/*
$( "input[name=level-btn]" ).click(function(event) {
	var $level = $( this );
	console.log();
	if ($level.val() == "1") {
		$('.sent-line1').css('display', 'inline-flex');
		$('.sent-line2').css('display', 'none');
		$('.sent-line3').css('display', 'none');
		$('.sent-line4').css('display', 'none');
	} else if ($level.val() == "2") {
		$('.sent-line1').css('display', 'none');
		$('.sent-line2').css('display', 'inline-flex');
		$('.sent-line3').css('display', 'none');
		$('.sent-line4').css('display', 'none');
	} else if ($level.val() == "3") {
		$('.sent-line1').css('display', 'none');
		$('.sent-line2').css('display', 'none');
		$('.sent-line3').css('display', 'inline-flex');
		$('.sent-line4').css('display', 'none');
	} else if ($level.val() == "4") {
		$('.sent-line1').css('display', 'none');
		$('.sent-line2').css('display', 'none');
		$('.sent-line3').css('display', 'none');
		$('.sent-line4').css('display', 'inline-flex');
	}
}) 

// Attach a submit handler to the form
$( "#search-form" ).submit(function( event ) {


	$('.word').remove();
	$('.sent-line1').remove();
	$('.sent-line2').remove();
	$('.sent-line3').remove();
	$('.sent-line4').remove();

  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this ),
    word = $form.find( "input[name='search']" ).val(),
 	lang = $form.find("input[name='lang-btn']:checked").val()
  // Send the data using post
  var posting = $.post( "data.php", { 'word': word, 'lang': lang } );
 
  // Put the results in a div
  posting.done(function( data ) {
    console.log(JSON.parse(data)); //console.log(JSON.parse(data));
    var normal_data = JSON.parse(data)
    console.log(normal_data)
    if (normal_data != null) {
    	let counterForWord = normal_data.length;
		display_sentences(lang, counterForWord, normal_data);
    } else {
    	$('.sentences').append(`<div class="word"><p>Такого слова в базе нет, попробуйте поискать другое слово</p></div>`);
    }
    


// проверка на наличие данных по уровню сложности 

	if(!$("#sent-line4").hasClass("sent-line4")) {
		$('label[for=level_radio_4]').css('opacity', '0.3'); 
		$('label[for=level_radio_4]').addClass('nohover');
		$('#level_radio_4').prop("disabled", true);
		$('#level_radio_4').prop('checked', false);
	} else {
		$('label[for=level_radio_4]').css('opacity', '0.99');
		$('label[for=level_radio_4]').removeClass('nohover');
		$('#level_radio_4').prop("disabled", false);
		$('#level_radio_4').prop('checked', true);
	}
	if(!$("#sent-line3").hasClass("sent-line3")) {
		$('label[for=level_radio_3]').css('opacity', '0.3');
		$('label[for=level_radio_3]').addClass('nohover');
		$('#level_radio_3').prop("disabled", true);
		$('#level_radio_3').prop('checked', false);
	} else {
		$('label[for=level_radio_3]').css('opacity', '0.99');
		$('label[for=level_radio_3]').removeClass('nohover');
		$('#level_radio_3').prop("disabled", false);
		$('#level_radio_3').prop('checked', true);
	}
	if(!$("#sent-line2").hasClass("sent-line2")) {
		$('label[for=level_radio_2]').css('opacity', '0.3');
		$('label[for=level_radio_2]').addClass('nohover');
		$('#level_radio_2').prop("disabled", true);
		$('#level_radio_2').prop('checked', false);
	} else {
		$('label[for=level_radio_2]').css('opacity', '0.99');
		$('label[for=level_radio_2]').removeClass('nohover');
		$('#level_radio_2').prop("disabled", false);
		$('#level_radio_2').prop('checked', true);
	}
	if(!$("#sent-line1").hasClass("sent-line1")) {
		$('label[for=level_radio_1]').css('opacity', '0.3');
		$('label[for=level_radio_1]').addClass('nohover');
		$('#level_radio_1').prop("disabled", true);
		$('#level_radio_1').prop('checked', false);
	} else {
		$('label[for=level_radio_1]').css('opacity', '0.99');
		$('label[for=level_radio_1]').removeClass('nohover');
		$('#level_radio_1').prop("disabled", false);
		$('#level_radio_1').prop('checked', true);
	}

	//включить селектор
	if ($("#level_radio_4").prop("checked") == true) {
		$('.sent-line1').css('display', 'none');
		$('.sent-line2').css('display', 'none');
		$('.sent-line3').css('display', 'none');
		$('.sent-line4').css('display', 'inline-flex');
	} else if ($("#level_radio_3").prop("checked") == true) {
		$('.sent-line1').css('display', 'none');
		$('.sent-line2').css('display', 'none');
		$('.sent-line3').css('display', 'inline-flex');
		$('.sent-line4').css('display', 'none');
	} else if ($("#level_radio_2").prop("checked") == true) {
		$('.sent-line1').css('display', 'none');
		$('.sent-line2').css('display', 'inline-flex');
		$('.sent-line3').css('display', 'none');
		$('.sent-line4').css('display', 'none');
	} else if ($("#level_radio_1").prop("checked") == true) {
		$('.sent-line1').css('display', 'inline-flex');
		$('.sent-line2').css('display', 'none');
		$('.sent-line3').css('display', 'none');
		$('.sent-line4').css('display', 'none');
	}

	});

});

function display_sentences (lang, counterForWord, normal_data) {
		for (var j = 0; j <= counterForWord-1; j++) {
			let counterForSentence = normal_data[j].length;
			$('.sentences').append(`<div class="word">`+normal_data[j][normal_data[j].length-1]+`</div>`);
			if (lang == "ru_RU") {	
				for (var i = 0; i < counterForSentence; i++) {
					if (normal_data[j][i]['level'] == "1") {
						display_one_sentence_by_level_rus("1", i, normal_data, j);
					}
	    		    if (normal_data[j][i]['level'] == "2") {
						display_one_sentence_by_level_rus("2", i, normal_data, j);
					}
					if (normal_data[j][i]['level'] == "3") {
						display_one_sentence_by_level_rus("3", i, normal_data, j);
					}
					if (normal_data[j][i]['level'] == "4") {
						display_one_sentence_by_level_rus("4", i, normal_data, j);
					}
				}

			} else if (lang == "en_EN") {
				for (var i = 0; i < counterForSentence; i++) {
					if (normal_data[j][i]['level'] == "1") {
						display_one_sentence_by_level_eng("1", i, normal_data, j);
					}
	    		    if (normal_data[j][i]['level'] == "2") {
						display_one_sentence_by_level_eng("2", i, normal_data, j);
					}
					if (normal_data[j][i]['level'] == "3") {
						display_one_sentence_by_level_eng("3", i, normal_data, j);
					}
					if (normal_data[j][i]['level'] == "4") {
						display_one_sentence_by_level_eng("4", i, normal_data, j);
					}
				}
			
			}
		}

		
}

function display_one_sentence_by_level_eng (num_of_level, i, normal_data, j) {
    $('.sentences').append(`\   	
    	<div id="sent-line`+num_of_level+`" class="sent-line`+num_of_level+`"> \
			<div class="sent"><p>`+normal_data[j][i]['sentence_eng']+`</p></div> \
			<div class="sent"><p>`+normal_data[j][i]['sentence_rus']+`</p></div> \
		</div>`); 
}


function display_one_sentence_by_level_rus (num_of_level, i, normal_data, j) {
	$('.sentences').append(`\
    	<div id="sent-line`+num_of_level+`" class="sent-line`+num_of_level+`"> \
			<div class="sent"><p>`+normal_data[j][i]['sentence_rus']+`</p></div> \
			<div class="sent"><p>`+normal_data[j][i]['sentence_eng']+`</p></div> \
		</div>`); 
}

*/

// ================= old script ==================

});