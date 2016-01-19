<?php
/**
 * Plugin Name: Wix Media Manager
 * Plugin URI: http://www.linnovate.net
 * Description: Integrates a Wix Media Platform into the Wordpress
 * Version: 1.0
 * Author: Linnovate Technolgoies LTD
 * License: GPL2
 */

defined('ABSPATH') or die();

class WixMediaImageEditor {

	public static $end_point = 'media.wixapps.net';
	private $api_key;
	private $secret;

	public function __construct() {
		register_activation_hook( __FILE__, array(__CLASS__, 'install'));
		register_deactivation_hook( __FILE__, array(__CLASS__, 'uninstall'));

		if (is_admin()) {
			add_action('admin_menu', array($this, 'add_plugin_page'));
			add_action('admin_init', array($this, 'page_init'));
			add_action('admin_notices', array($this, 'show_errors'));
			add_action( 'admin_footer', array($this, 'wixmp_add_tmpl'));
			add_filter('media_view_strings', array($this, 'custom_media_string'), 10, 2);
			add_filter('wp_generate_attachment_metadata',  array($this, 'wixmp_upload_to_servier'), 10, 2);
			add_filter('wp_prepare_attachment_for_js', array($this, 'wixmp_prepare_attachment_for_js'), 10, 3);
			add_filter( 'mce_external_languages', array($this, 'wixmp_add_tinymce_translation'));
			add_action('admin_enqueue_scripts', array($this, 'wixmp_enqueue_scripts'));
			add_action('admin_head', array($this, 'wixmp_admin_head'));

			$settings = get_option('wixmp_settings');
			if (isset($settings['api_key'])) $this->api_key = $settings['api_key'];
			if (isset($settings['secret'])) $this->secret = $settings['secret'];
		}

	}

	public static function install() {
	    update_option('wixmp_cred_valid', false);
	}

	public static function uninstall() {
	    delete_option('wixmp_settings');
	    delete_option('wixmp_cred_valid');
	}

	public function get_credentials_valid() {
		return (bool) get_option('wixmp_cred_valid');
	}

	public function set_credentials_valid($value) {
		return update_option('wixmp_cred_valid', (bool)$value);
	}

	public function get_api_key() {
		return $this->api_key;
	}

	public function get_secret() {
		return $this->secret;
	}

	public function wixmp_admin_head() {
		global $typenow;
		// check user permissions
		if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) return;
		// verify the post type
		// if(!in_array($typenow, array('post', 'page'))) return;
		// check if WYSIWYG is enabled
		if ( get_user_option('rich_editing') == 'true') {
			add_filter("mce_external_plugins", array($this, "wixmp_add_tinymce_plugin"));
			add_filter('mce_buttons', array($this, 'wixmp_register_tinymce_button'));
		}

		?>

		<script type="text/javascript">
			window.wix = {
				endPoint: '<?php echo self::$end_point; ?>',
				credentialsValid: <?php echo (int)$this->get_credentials_valid(); ?>,
				apiKey: '<?php echo $this->get_api_key(); ?>'
			};
		</script>

		<?php
	}

	// specify the path to the script with our plugin for TinyMCE
	public function wixmp_add_tinymce_plugin($plugin_array) {
		$plugin_array['wixmpimage'] = plugins_url( 'tinymce/wixmpimage.js', __FILE__ );
		return $plugin_array;
	}

	// add buttons in the editor – in this case we will add one button
	public function wixmp_register_tinymce_button($buttons) {
	   array_push($buttons, "wixmpimage");
	   return $buttons;
	}

	public function wixmp_enqueue_scripts() {
		// wp_enqueue_media();
		wp_enqueue_style('wixmp-tc-css', plugins_url('/assets/css/style.css', __FILE__));
		wp_enqueue_script(
			'wix-media-modal',
			plugins_url('/assets/js/wix-media-modal.js', __FILE__),
			array( 'media-views' ),
			false,
			1
		);
		wp_enqueue_script('wixmedia', plugins_url('/assets/js/wixmedia.js', __FILE__));
		wp_enqueue_script('wixmp-sdk', plugins_url('/assets/js/wixmp-sdk.js', __FILE__));
	}


	public function custom_media_string($strings,  $post) {
	    $strings['customMenuTitle'] = __('Custom Menu Title', 'custom');
	    $strings['customButton'] = __('Custom Button', 'custom');
	    return $strings;
	}

	public function wixmp_upload_to_servier($meta, $attachment_id) {
		$source_sdk = __DIR__.'/inc/wixmedia-php/wix/media/';
		require_once($source_sdk.'WixClient.php');

		$client = new WixClient($this->get_api_key(), $this->get_secret());
		$filepath = get_attached_file($attachment_id);
		if ($image = $client->uploadImage($filepath)) {
			$meta['wix'] = (array)$image->getMetadata();
			// error_log('The image was successfully uploaded!');
			// error_log(print_r($meta['wix'], true));
		} else {
			// error_log('An error occurred, check your php log file for more information.');
		}

		return $meta;
	}

	public function wixmp_prepare_attachment_for_js($response, $attachment, $meta) {
		if (isset($meta['wix'])) {
			$response['wix'] = $meta['wix'];
		}
		return $response;
	}

	public function wixmp_add_tmpl() {
		?>
		<script type="text/html" id="tmpl-wix-image-edit">
			<div class="media-embed">
				<div class="embed-media-settings">
					<div class="column-image">
						<div class="image">
							<img src="{{ data.model.url }}" />
							<p class="image-url"><p>
						</div>
					</div>
					<div class="column-settings">
						<div class="setting transformation-section">
							<span><?php _e('Transformation'); ?></span>
							<div class="button-group button-large" data-setting="transformation">
								<button class="button active" value="fit">
									<?php esc_attr_e('Fit'); ?>
								</button>
								<button class="button" value="fill">
									<?php esc_attr_e('Fill'); ?>
								</button>
								<button class="button" value="canvas">
									<?php esc_attr_e('Canvas'); ?>
								</button>
								<button class="button" value="crop">
									<?php esc_attr_e('Crop'); ?>
								</button>
							</div>
						</div>

						<label class="setting width">
							<span><?php _e('Width'); ?></span>
							<input type="text" data-setting="width" value="{{ data.width }}" />
						</label>

						<label class="setting height">
							<span><?php _e('Height'); ?></span>
							<input type="text" data-setting="height" value="{{ data.height }}" />
						</label>

						<label class="setting crop-x">
							<span><?php _e('Crop X'); ?></span>
							<input type="text" data-setting="crop_x" value="{{ data.crop_x }}" />
						</label>

						<label class="setting crop-y">
							<span><?php _e('Crop Y'); ?></span>
							<input type="text" data-setting="crop_y" value="{{ data.crop_y }}" />
						</label>

						<# if ( 'undefined' !== typeof data.model.alignment_list ) { #>
							<label class="setting alignment">
								<span><?php _e('Alignment'); ?></span>
								<select name="alignment" data-setting="alignment">
									<# _.each( data.model.alignment_list, function (name, id) { #>
										<# if ( id === data.alignment) { #>
											<option selected value="{{ id }}">
												{{ name }}
											</option>
										<# } else { #>
											<option value="{{ id }}">
												{{ name }}
											</option>
										<# } #>
									<# } ) #>
								</select>
							</label>
						<# } #>

						<# if ( 'undefined' !== typeof data.model.resize_list ) { #>
							<label class="setting resize-algorithm">
								<span><?php _e('Resize algorithm'); ?></span>
								<select name="resize" data-setting="resize">
									<# _.each( data.model.resize_list, function (name, id) { #>
										<# if ( id === data.resize) { #>
											<option selected value="{{ id }}">
												{{ name }}
											</option>
										<# } else { #>
											<option value="{{ id }}">
												{{ name }}
											</option>
										<# } #>
									<# } ) #>
								</select>
							</label>
						<# } #>

						<label class="setting color">
							<span><?php _e('Color #'); ?></span>
							<input type="text" data-setting="color" value="{{ data.color }}" />
						</label>

						<div class="advanced-section adjust-section">
							<h3><a class="advanced-toggle adjust-toggle" href="#"><?php _e('Adjustments'); ?></a></h3>
							<div class="adjust-settings hidden">
								<label class="setting link-target adjust-apply">
									<input 
										type="checkbox" 
										data-setting="adjust_apply" 
										value="_blank" <# if ( data.adjust_apply ) { #>checked="checked"<# } #>>
										<?php _e( 'Adjustments' ); ?>
								</label>

								<div class="adjustments-section">
									<label class="setting adjust-br">
										<span><?php _e('Brightness'); ?></span>
										<input placeholder="<?php _e('value between -100 and 100'); ?>" type="text" data-setting="adjust_br" value="{{ data.adjust_br }}" />
									</label>
									<label class="setting adjust-con">
										<span><?php _e('Contrast'); ?></span>
										<input placeholder="<?php _e('value between -100 and 100'); ?>" type="text" data-setting="adjust_con" value="{{ data.adjust_con }}" />
									</label>
									<label class="setting adjust-sat">
										<span><?php _e('Saturation'); ?></span>
										<input placeholder="<?php _e('value between -100 and 100'); ?>" type="text" data-setting="adjust_sat" value="{{ data.adjust_sat }}" />
									</label>
									<label class="setting adjust-hue">
										<span><?php _e('Hue'); ?></span>
										<input placeholder="<?php _e('value between -100 and 100'); ?>" type="text" data-setting="adjust_hue" value="{{ data.adjust_hue }}" />
									</label>
								</div>

							</div>
						</div>

						<div class="advanced-section filter-section">
							<h3><a class="advanced-toggle filter-toggle" href="#"><?php _e('Filters'); ?></a></h3>
							<div class="filter-settings hidden">
								<div class="setting link-target oil-filter">
									<label>
										<input 
											type="checkbox" 
											data-setting="oil" 
											value="_blank" <# if ( data.oil ) { #>checked="checked"<# } #>>
											<?php _e( 'Oil' ); ?>
									</label>
								</div>

								<div class="setting link-target neg-filter">
									<label>
										<input 
											type="checkbox" 
											data-setting="neg" 
											value="_blank" <# if ( data.neg ) { #>checked="checked"<# } #>>
											<?php _e( 'Negate' ); ?>
									</label>
								</div>

								<label class="setting pix">
									<span><?php _e('Pixelate'); ?></span>
									<input type="text" data-setting="pix" value="{{ data.pix }}" />
								</label>

								<label class="setting blur">
									<span><?php _e('Blur'); ?></span>
									<input type="text" data-setting="blur" value="{{ data.blur }}" />
								</label>

								<label class="setting shrp">
									<span><?php _e('Sharp'); ?></span>
									<input type="text" data-setting="shrp" value="{{ data.shrp }}" />
								</label>

								<label class="setting link-target usm">
									<label class="usm-apply">
										<input 
											type="checkbox" 
											data-setting="usm_apply" 
											value="_blank" <# if ( data.usm_apply ) { #>checked="checked"<# } #>>
											<?php _e( 'Unsharp mask' ); ?>
									</label>
								</label>

								<div class="usm-section">
									<label class="setting usm-r">
										<span><?php _e('Radius'); ?></span>
										<input type="text" data-setting="usm_r" value="{{ data.usm_r }}" />
									</label>
									<label class="setting usm-a">
										<span><?php _e('Amount'); ?></span>
										<input type="text" data-setting="usm_a" value="{{ data.usm_a }}" />
									</label>
									<label class="setting usm-t">
										<span><?php _e('Threshold'); ?></span>
										<input type="text" data-setting="usm_t" value="{{ data.usm_t }}" />
									</label>
								</div>

							</div>
						</div>

						<div class="advanced-section jpeg-section">
							<h3><a class="advanced-toggle jpeg-toggle" href="#"><?php _e('JPEG'); ?></a></h3>
							<div class="jpeg-settings hidden">
								<label class="setting quality">
									<span><?php _e('Quality'); ?></span>
									<input type="text" data-setting="quality" value="{{ data.quality }}" />
								</label>

								<div class="setting link-target baseline-filter">
									<label>
										<input 
											type="checkbox" 
											data-setting="baseline" 
											value="_blank" <# if ( data.baseline ) { #>checked="checked"<# } #>>
											<?php _e( 'Progressive' ); ?>
									</label>
								</div>

							</div>
						</div>

					</div>
				</div>
			</div>
		</script>
		<?php
	}

	public function wixmp_add_tinymce_translation($locales) {
		$locales['gk_tc_button2'] = plugin_dir_path ( __FILE__ ) . 'translations.php';
		return $locales;
	}

	function error_log($message, $level = 'info') {
	    if (!$message) return;

	    $log_file = __DIR__.'/'.$level.'.log';
	    // удалить лог если он превышает $logfile_limit
	    $logfile_limit = 1024000; // размер лог файла в килобайтах (102400 = 100 мб)
	    if (file_exists($log_file) && filesize($log_file) / 1024 > $logfile_limit) unlink($log_file);
	    
	    // $date = new Datetime(null, new DateTimeZone('Europe/Minsk'));
	    $date = new Datetime();
	    $date_format = $date->format('d.m.Y H:i:s');
	    error_log($date_format .' '. $message."\n", 3, $log_file);
	}

	/**
	 * Add options page
	 */
	public function add_plugin_page() {
	    add_menu_page(
	        'Wix Media Settings',				// page title
	        'Wix Media',						// button
	        'manage_options', 
	        'wixmp',							// admin url segment
	        array($this, 'create_admin_page'), 
	        '', 
	        '80.1'
	    );
	}

	/**
     * Displays all error messages
     */
    public function show_errors() {
        settings_errors();
    }

	/**
	 * Options page callback
	 */
	public function create_admin_page() {
	    ?>
	    <div class="wrap">
	        <?php screen_icon(); ?>
	        <h2>Wix Media Settings</h2>
	        <form method="post" action="options.php">
	        <?php
	            // This prints out all hidden setting fields
	            settings_fields( 'wixmp_option_group' );   
	            do_settings_sections( 'wixmp-set-admin' );
	            submit_button(); 
	        ?>
	        </form>
	    </div>
	    <?php
	}

	/**
	 * Register and add settings
	 */
	public function page_init() {
	    register_setting(
	        'wixmp_option_group', // Option group
	        'wixmp_settings', // Option name
	        array( $this, 'sanitize' ) // Sanitize
	    );
	    add_settings_section(
	        'setting_section_wixmp', // ID
	        null, // Title
	        null, // Callback
	        'wixmp-set-admin' // Page
	    );  
	    add_settings_field(
	        'api_key', 
	        'API Key', 
	        array( $this, 'api_key_callback' ), 
	        'wixmp-set-admin', 
	        'setting_section_wixmp'
	    );  
	    add_settings_field(
	        'secret', 
	        'Secret', 
	        array( $this, 'secret_callback' ), 
	        'wixmp-set-admin', 
	        'setting_section_wixmp'
	    );

	    $this->options = get_option('wixmp_settings');
	}

	/**
	 * Sanitize each setting field as needed
	 *
	 * @param array $input Contains all settings fields as array keys
	 */
	public function sanitize( $input ) {
	    $new_input = array();
	    $error = false;

	    if(!$input['api_key']) {
	    	$error = true;
	    	add_settings_error('api_key', 'api_key', '"API Key" is empty');
	    }
	    if(!$input['secret']) {
	    	$error = true;
	    	add_settings_error('secret', 'secret', '"Secret" is empty');
	    }

	    if (!$error) {
	    	$check = $this->checkCredentials($input['api_key'], $input['secret']);
	    	$this->set_credentials_valid($check);

	    	if (!$check) add_settings_error('', '', 'Your credentials (key or secret) are not valid', 'error');
	    	else add_settings_error('', '', 'Your credentials are accepted', 'updated');
	    }

	    $new_input['api_key'] = $input['api_key'];
	    $new_input['secret'] = $input['secret'];

	    return $new_input;
	}

	public function api_key_callback() {
	    printf(
	        '<input type="text" id="api_key" name="wixmp_settings[api_key]" value="%s" size="50" />',
	        isset( $this->options['api_key'] ) ? esc_attr( $this->options['api_key']) : ''
	    );
	}

	public function secret_callback() {
	    printf(
	        '<input type="text" id="secret" name="wixmp_settings[secret]" value="%s" size="50" />',
	        isset( $this->options['secret'] ) ? esc_attr( $this->options['secret']) : ''
	    );
	}

	public function checkCredentials($api_key, $secret) {
		$source_sdk = __DIR__.'/inc/wixmedia-php/wix/media/';
		require_once($source_sdk.'WixClient.php');

		$client = new WixClient($api_key, $secret);
		return (bool)$client->getAuth()->getToken();
	}

}

$inst = new WixMediaImageEditor();