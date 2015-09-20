<?php
	
	header('Access-Control-Allow-Origin: *');
	header('content-type: application/json; charset=utf-8');
	// require_once "HTTP/Request.php";
	
	$func = isset($_REQUEST['func'])?$_REQUEST['func']:'';
	
	switch ($func) {
		case 'getIndexImages':{
			$n = rand(0,1000); // with MAX_RAND=32768
			getUrl('https://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*:*&fq=bundel:%20%22fashion_design%22%20OR%20%22jewelry_design%22%20OR%20%22industrial_design%22%20OR%20%22visual_communication%22&sort=random_'.$n.'+asc&start=1&rows=44&wt=json');
			break;
		}
		case 'getJewelryImages':
			getUrl("https://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*%3A*&fq=bundle%3Ajewelry_design&start=1&rows=44&wt=json");
			break;
		case 'getFashionImages':
			getUrl("https://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*%3A*&fq=bundle%3Afashion_design&start=1&rows=44&wt=json");
			break;
		case 'getIndustrialImages':
			getUrl("https://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*%3A*&fq=bundle%3Aindustrial_design&start=1&rows=44&wt=json");
			break;
		case 'getVisualImages':
			getUrl("https://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*%3A*&fq=bundle%3Avisual_communication&start=1&rows=44&wt=json");
			break;
		default:
			$arr = array('status' => 0, 'desc' =>'function error');
			echo json_encode($arr);
			break;
	}
	

	function getUrl($url)
	{	
		//  Initiate curl
		$ch = curl_init();
		// Disable SSL verification
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		// Will return the response, if false it print the response
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		// Set the url
		curl_setopt($ch, CURLOPT_URL,$url);
		// Execute
		$result=curl_exec($ch);
		// Closing
		curl_close($ch);
			
		if (!$result) {
			$arr = array('status' => 0, 'data' => array() ,'desc' =>'connection error');
		}
		else{
			$arr = array('status' => 1, 'data' => $result ,'desc' =>'get data success');
		}
		
		
		// $req =& new HTTP_Request($url);
		// if (PEAR::isError($req->sendRequest())) {
			// $arr = array('status' => 0, 'data' => array() ,'desc' =>'connection error');
		// }
		// else{
			// $arr = array('status' => 1, 'data' => $req->getResponseBody() ,'desc' =>'get images success');
		// }
		
		
		echo json_encode($arr);
	}

	
	

?>

