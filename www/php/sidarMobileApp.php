<?php
	
	header('Access-Control-Allow-Origin: *');
	header('content-type: application/json; charset=utf-8');
	// require_once "HTTP/Request.php";
	
	$func = isset($_REQUEST['func'])?$_REQUEST['func']:'';
	
	switch ($func) {
		case 'getIndexImages':
			getIndexImages();
			break;
		
		default:
			$arr = array('status' => 0, 'desc' =>'function error');
			echo json_encode($arr);
			break;
	}
	

	function getIndexImages()
	{	
		//  Initiate curl
		$ch = curl_init();
		// Disable SSL verification
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		// Will return the response, if false it print the response
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		// Set the url
		curl_setopt($ch, CURLOPT_URL,"https://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*%3A*&fq=bundle%3Afashion_design&start=1&rows=44&wt=json");
		// Execute
		$result=curl_exec($ch);
		// Closing
		curl_close($ch);
			
		if (!$result) {
			$arr = array('status' => 0, 'data' => array() ,'desc' =>'connection error');
		}
		else{
			$arr = array('status' => 1, 'data' => $result ,'desc' =>'get images success');
		}
		echo json_encode($arr);
		
		/*$req =& new HTTP_Request('https://ec2-la-usa.opensolr.com/solr/Shenkar/select?q=*%3A*&fq=bundle%3Afashion_design&start=1&rows=44&wt=json');
		if (PEAR::isError($req->sendRequest())) {
			$arr = array('status' => 0, 'data' => array() ,'desc' =>'connection error');
		}
		else{
			$arr = array('status' => 1, 'data' => $req->getResponseBody() ,'desc' =>'get images success');
		}
		echo json_encode($arr);*/	
	}

	
	

?>

