<?php
header('Content-Type: application/json');

$directory = "../assets/";
$jpgImages = glob($directory . "*jpg");

$filelist = array();

foreach($jpgImages as $image)
{
	$filelist[] = $image;
}

echo json_encode($filelist);

?>