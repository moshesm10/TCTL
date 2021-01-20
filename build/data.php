<?php  

include "connection.php";

$word = mb_strtoupper($_POST['word'], 'UTF-8');
$word = trim($word);
$lang = $_POST['lang'];

if ($lang == "ru_RU") {
	$lang_table_selector = "lemma_rus";
	$id_sentence_table_selector = "id_sentence_rus";
} elseif ($lang == "en_EN") {
	$lang_table_selector = "lemma_eng";
	$id_sentence_table_selector = "id_sentence_eng";
}


//$rows = getDataByWord($word, $link, $id_sentence_table_selector, $lang_table_selector);




//================ phpmorphy ===============
require_once( 'phpmorphy/src/common.php');
 
// путь к каталогу со словарями
$dir = 'phpmorphy/dicts';
 
$opts = array(
    'storage' => PHPMORPHY_STORAGE_FILE,
);
 
try {
    $morphy = new phpMorphy($dir, $lang, $opts);
} catch(phpMorphy_Exception $e) {
    die('Error occured while creating phpMorphy instance: ' . $e->getMessage());
}

$lemmatize_word = $morphy->lemmatize($word, phpMorphy::NORMAL);

// считаем и выводим все леммы
$counter = count($lemmatize_word);


for ($i=0; $i < $counter; $i++) { 
	$query = "SELECT `$id_sentence_table_selector` FROM `lemmas` WHERE `$lang_table_selector` LIKE '$lemmatize_word[$i]'";
	$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
	$rows = array();
	while ($data = mysqli_fetch_assoc($result)) {
	    $rows[] = $data;
	}
	if ($rows[0] != '') {
		$id_sentences = trim($rows[0][$id_sentence_table_selector]);
		
		$query = "SELECT * FROM `sentences` WHERE `id` IN ($id_sentences)";
		$result = mysqli_query($link, $query) or die("Ошибка " . mysqli_error($link)); 
		$rows = array();
		while ($data = mysqli_fetch_assoc($result)) {
		    $rows[] = $data;
		}
		$rows[] = $lemmatize_word[$i];
		
		$datas[] = $rows;
		
	}
	
}
echo json_encode($datas);


//print_r($lemmatize_word);

//mysqli_close($link);



?>
