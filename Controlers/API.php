<?php

/**
 * Class API
 * Fonction d'appel à l'API smite
 */
class API {

    /**
     * Connect SM à API
     * @return string
     */
    public static function connection() {
        date_default_timezone_set('Africa/Lome');
        $timestamp = date('YmdHis');
        $url = 'http://api.smitegame.com/smiteapi.svc/createsessionJson/1410/'.md5('1410createsession8F70BFD30A3648D7B5BCC66DDB888CA7'.$timestamp)."/";
        $url .= $timestamp;
        $c = curl_init();
        curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2" );
        $content = curl_exec($c);
        $json = file_get_contents($url);
        curl_close($c);
        return $json;
    }

    /**
     * Récupère le status du joueur
     * @param $p
     * @param $s
     * @return string
     */
    public static function getPlayerStatus($p,$s) {
        date_default_timezone_set('Africa/Lome');
        $timestamp = date('YmdHis');
        $url = 'http://api.smitegame.com/smiteapi.svc/getplayerstatusJson/1410/'.md5('1410getplayerstatus8F70BFD30A3648D7B5BCC66DDB888CA7'.$timestamp)."/";
        $url .= $s.'/';
        $url .= $timestamp . '/' . $p;
        $c = curl_init();
        curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2" );
        $content = curl_exec($c);
        $json = file_get_contents($url);
        curl_close($c);
        return $json;
    }

    /**
     * Récupère la liste des joueurs d'un match
     * @param $m
     * @param $s
     * @return string
     */
    public static function getMatchPlayer($m,$s) {
        date_default_timezone_set('Africa/Lome');
        $timestamp = date('YmdHis');
        $url = 'http://api.smitegame.com/smiteapi.svc/getmatchplayerdetailsJson/1410/'.md5('1410getmatchplayerdetails8F70BFD30A3648D7B5BCC66DDB888CA7'.$timestamp)."/";
        $url .= $s.'/';
        $url .= $timestamp;
        $url .= '/' . $m;
        $c = curl_init();
        curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2" );
        $content = curl_exec($c);
        $json = file_get_contents($url);
        curl_close($c);
        return $json;
    }

    public static function getRank($p,$s) {
        date_default_timezone_set('Africa/Lome');
        $timestamp = date('YmdHis');
        $url='http://api.smitegame.com/smiteapi.svc/getgodranksJson/1410/'.md5('1410getgodranks8F70BFD30A3648D7B5BCC66DDB888CA7'.$timestamp)."/";
        $url.=$s.'/'.$timestamp.'/'.$p;
        $c=curl_init();
        curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2" );
        $content = curl_exec($c);
        $json = file_get_contents($url);
        curl_close($c);
        $res = json_decode($json);
        return $res;
    }

    public static function getKDA($p,$q,$s) {
        date_default_timezone_set('Africa/Lome');
        $t = date('YmdHis');
        $url='http://api.smitegame.com/smiteapi.svc/getqueuestatsJson/1410/'.md5('1410getqueuestats8F70BFD30A3648D7B5BCC66DDB888CA7'.$t)."/";
        $url.=$s.'/'.$t.'/'.$p.'/'.$q;
        $c = curl_init();
        curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2" );
        $content = curl_exec($c);
        $json = file_get_contents($url);
        curl_close($c);
        $res = json_decode($json);
        return $res;
    }

    public static function getLeague($p, $s)
    {
        date_default_timezone_set('Africa/Lome');
        $timestamp = date('YmdHis');
        $url = 'http://api.smitegame.com/smiteapi.svc/getplayerJson/1410/'.md5('1410getplayer8F70BFD30A3648D7B5BCC66DDB888CA7'.$timestamp)."/";
        $url .= $s.'/'.$timestamp.'/'.$p;
        $c = curl_init();
        curl_setopt($c, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Chrome/22.0.1216.0 Safari/537.2" );
        $content = curl_exec($c);
        $json = file_get_contents($url);
        curl_close($c);
        $res = json_decode($json);
        return $res;
    }
}