<?php
/**
 * A WordPress fő konfigurációs állománya
 *
 * Ebben a fájlban a következő beállításokat lehet megtenni: MySQL beállítások
 * tábla előtagok, titkos kulcsok, a WordPress nyelve, és ABSPATH.
 * További információ a fájl lehetséges opcióiról angolul itt található:
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 *  A MySQL beállításokat a szolgáltatónktól kell kérni.
 *
 * Ebből a fájlból készül el a telepítési folyamat közben a wp-config.php
 * állomány. Nem kötelező a webes telepítés használata, elegendő átnevezni
 * "wp-config.php" névre, és kitölteni az értékeket.
 *
 * @package WordPress
 */

// ** MySQL beállítások - Ezeket a szolgálatótól lehet beszerezni ** //
/** Adatbázis neve */
define( 'DB_NAME', 'owento' );

/** MySQL felhasználónév */
define( 'DB_USER', 'root' );

/** MySQL jelszó. */
define( 'DB_PASSWORD', '' );

/** MySQL  kiszolgáló neve */
define( 'DB_HOST', 'localhost' );

/** Az adatbázis karakter kódolása */
define( 'DB_CHARSET', 'utf8mb4' );

/** Az adatbázis egybevetése */
define('DB_COLLATE', '');

/**#@+
 * Bejelentkezést tikosító kulcsok
 *
 * Változtassuk meg a lenti konstansok értékét egy-egy tetszóleges mondatra.
 * Generálhatunk is ilyen kulcsokat a {@link http://api.wordpress.org/secret-key/1.1/ WordPress.org titkos kulcs szolgáltatásával}
 * Ezeknek a kulcsoknak a módosításával bármikor kiléptethető az összes bejelentkezett felhasználó az oldalról.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY', 'yvBx[O3UPG0tH}SDI(+uH?RPodx]ax)+w2cYG%]mT?pGFbc1_^36~l=Ei@|$Ss|J' );
define( 'SECURE_AUTH_KEY', '{S:P]Y!Ow>0_!K/(zg V^ `FQZ|e!.P@zzUan@P%Gj>!}LRU?z9A2yt..7H{3qG&' );
define( 'LOGGED_IN_KEY', '/DVDFLHm&o)pXabhh$EZ#yJKDFx+vUi_Bj:(zQg4n}3s7v1EloACJs5o(iVh}RC~' );
define( 'NONCE_KEY', 'jFKch:38DxN4jp|NG sq:/cWmjbW#s)nt3Z/+cA5GZ+-b.$E$JB4YE7jFB}e!5+F' );
define( 'AUTH_SALT',        'mo(.}(r=2}-<g`K3 ~hU3#gGAW>p9D{g&&6Z?F|/F1aFnq}LY0PN%+PPzG,L5|g#' );
define( 'SECURE_AUTH_SALT', 'z>zO;/F(}y3 6AA9yUJ[hcW{s-1M`P*SKxrXo2^B<YzP,EF50_:Al)GwgISaSh1S' );
define( 'LOGGED_IN_SALT',   '|{9J@tyB( }|JWHuucUm#SuMxaYt!J;n.#BZ;}U<lk#tsYmK9gY;Yj`y2[Btib7I' );
define( 'NONCE_SALT',       '^A;u0r>4I5;i6ZJjNH`L3[h[7InxZjwkHQJ,ls&sByA{L~[D@VE$*398,Wy&H#U$' );

/**#@-*/

/**
 * WordPress-adatbázis tábla előtag.
 *
 * Több blogot is telepíthetünk egy adatbázisba, ha valamennyinek egyedi
 * előtagot adunk. Csak számokat, betűket és alulvonásokat adhatunk meg.
 */
$table_prefix = 'wp_';

/**
 * Fejlesztőknek: WordPress hibakereső mód.
 *
 * Engedélyezzük ezt a megjegyzések megjelenítéséhez a fejlesztés során.
 * Erősen ajánlott, hogy a bővítmény- és sablonfejlesztők használják a WP_DEBUG
 * konstansot.
 */
define('WP_DEBUG', false);

/* Ennyi volt, kellemes blogolást! */

/** A WordPress könyvtár abszolút elérési útja. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Betöltjük a WordPress változókat és szükséges fájlokat. */
require_once(ABSPATH . 'wp-settings.php');
