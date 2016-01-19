/*
 *  wixmpimage TinyMCE plugin
 */

tinymce.PluginManager.add('wixmpimage', function(editor, url) {
  var wixImageButton = false;

  // Add a button that opens a window. This is just the toolbar.
  editor.addButton('wixmpimage', {
	text: false,
	icon: 'icon dashicons-admin-appearance',
	tooltip: 'Wix Image Edit',

	onclick: function() {
	  editImage(editor.selection.getNode());
	},

	onPostRender: function() {
	  wixImageButton = this;

	  editor.on( 'nodechange', function( event ) {
		setState( wixImageButton, event.element );
	  });
	}
  });

  function setState( button, node ) {
	if (editor.dom.getAttrib(node, 'data-wix-image-id' )) button.disabled(false);
	else button.disabled(true);
  }

  function editImage( img ) {
	var $img = jQuery(img),
		frame = {},
		image_edit = wix.imageEdit,
		result = '',
		wix_defaults = wixmedia.Defaults,
		form_model = {};

	image_edit.view.ImageEdit = image_edit.view.ImageEdit.extend({
		updateTransformation: function () {
			var attr = this.model.attributes,
				wix_file_url = $img.attr('data-wix-file-url'),
				wix_file_id = $img.attr('data-wix-image-id'),
				wix_file_sp = wix_file_url.split('/'),
				$img_prev = this.$('.image img'),
				processed,
				tr_params = {},
				filter = {},
				adjust = {},
				processed_url,
				base_url,
				image_id,
				image;

			base_url = wix.endPoint+'/'+wix_file_sp[0]+'/'+wix_file_sp[1];
			image_id = wix_file_id;
			image = wixmedia.WixImage(base_url, image_id, wix_file_sp[wix_file_sp.length - 1]);

			tr_params.w = attr.width;
			tr_params.h = attr.height;

			if (attr.oil) filter.oil = null;
			if (attr.neg) filter.neg = null;
			if (attr.pix) filter.pix = attr.pix;
			if (attr.blur) filter.blur = attr.blur;
			if (attr.shrp) filter.shrp = attr.shrp;
			if (attr.usm_apply) {
				attr.usm_r = parseFloat(attr.usm_r);
				attr.usm_a = parseFloat(attr.usm_a);
				attr.usm_t = parseFloat(attr.usm_t);
				filter.usm = [attr.usm_r.toFixed(2)+'_'+attr.usm_a.toFixed(2)+'_'+attr.usm_t.toFixed(2)];
			}
			if (attr.adjust_apply) {
				if (attr.adjust_br) adjust.br = attr.adjust_br;
				if (attr.adjust_con) adjust.con = attr.adjust_con;
				if (attr.adjust_sat) adjust.sat = attr.adjust_sat;
				if (attr.adjust_hue) adjust.hue = attr.adjust_hue;
			}

			if (attr.baseline) adjust.bl = null;
			if (attr.quality) adjust.q = attr.quality;
			
			switch(attr.transformation) {
			    case 'fit':
			    	if (attr.resize != 0) tr_params.rf = attr.resize;
			    	processed = image.fit(tr_params, filter, adjust);
			        break;
			    case 'fill':
			    	if (attr.resize != 0) tr_params.rf = attr.resize;
			    	tr_params.al = attr.alignment;
			    	processed = image.fill(tr_params, filter, adjust);
			        break;
				case 'canvas':
					tr_params.al = attr.alignment;
					if (attr.color) tr_params.c = attr.color;
					processed = image.canvas(tr_params, filter, adjust);
			        break;
			    case 'crop':
			    	tr_params.x = attr.crop_x;
			    	tr_params.y = attr.crop_y;
			    	processed = image.crop(tr_params, filter, adjust);
			        break;
			    default:
			}
			processed_url =  processed.toUrl();
			$img_prev.attr('src', processed_url);
			this.model.processed_url = processed_url;
		}
	});

	form_model = _.defaults(getDataAttributes(img, /^data\-wix\-model\-(.+)$/), {
		url: 			img.src,
		transformation: 'fit',
		width: 			img.width,
		height:			img.height,
		crop_x: 		0,
		crop_y:			0,
		resize: 		0,
		alignment:		wix_defaults.Alignment.CENTER,
		resize_list:	prepareList(_.extend(wix_defaults.ResizeFilters, {'AUTO': 0})),
		alignment_list:	prepareList(wix_defaults.Alignment),
		color: 			'000000',
		oil: 			false,
		neg: 			false,
		pix: 			0,
		blur: 			0,
		shrp: 			0,
		usm_apply:		false,
		adjust_apply:	false,
		usm_r: 			wix_defaults.US_RADIUS,
		usm_a: 			wix_defaults.US_AMOUNT,
		usm_t: 			wix_defaults.US_THRESHOLD,
		baseline:		true,
		quality:		wix_defaults.QUALITY
	});

	frame = new image_edit.mediaFrame.ImageEdit({
		frame: 'wixEdit',
		state: 'wix-image-edit',
		metadata: form_model
	});
	frame.state('wix-image-edit').on( 'update', function(selecton, processed_url) {
		if ($img) {
			$img.removeAttr('data-mce-src');
			$img.attr('src', processed_url);
			selecton.url = processed_url;
			saveWixData($img, selecton);
		} else {
			$img = jQuery('<img>');
			$img.attr('src', processed_url);
			selecton.url = processed_url;
			saveWixData($img, selecton);
			editor.execCommand('mceInsertContent', 0, $img[0].outerHTML);
		}
		editor.nodeChanged();
		frame.detach();
	});
	frame.open();
	image_edit.frame = frame;
	
  }

  function getDataAttributes(node, regex) {
      var d = {};

      if (!regex) regex = /^data\-(.+)$/;

      _.each(node.attributes, function(attr) {
          if (regex.test(attr.nodeName)) {
              var key = attr.nodeName.match(regex)[1];
              if (attr.value == "false") d[key] = false;
              else if (attr.value == "true") d[key] = true;
              else d[key] = attr.value;
          }
      });

      return d;
  }

  function prepareList(list) {
  	var result = {}, string;

  	_.each(list, function (id, name) {
  		string = name.split('_');
  		if (string.length === 1) {
  			result[id] = string[0].charAt(0).toUpperCase() + string[0].slice(1).toLowerCase();
  		} else if (string.length === 2) {
  			result[id] = string[0].charAt(0).toUpperCase() + string[0].slice(1).toLowerCase() + ' ' +
  				string[1].charAt(0).toUpperCase() + string[1].slice(1).toLowerCase();
  		}
  	});
  	return result;
  }

  function saveWixData($obj, attr) {
  	// remove unused properties
  	delete attr.alignment_list;
  	delete attr.resize_list;
  	_.each(attr, function (value, name) {
  		if (_.isObject(value)) value = JSON.stringify(value).replace(/'/g, "\\'")
  		$obj.attr('data-wix-model-'+name, value);
  	});
  }

  function strpos( haystack, needle, offset) {
  	var i = haystack.indexOf( needle, offset );
  	return i >= 0 ? i : false;
  }


  function isPlaceholder( node ) {
	return !! ( editor.dom.getAttrib( node, 'data-mce-placeholder' ) || editor.dom.getAttrib( node, 'data-mce-object' ) );
  }


  editor.on( 'mouseup', function( event ) {
	var image,
	  node = event.target,
	  dom = editor.dom;

	// Don't trigger on right-click
	if ( event.button && event.button > 1 ) {
	  return;
	}

	// Don't add to placeholders
	if ( ! node || node.nodeName !== 'IMG' || isPlaceholder( node ) ) {
	  dom.setAttrib( editor.dom.select( 'img[data-wp-wix-image-select]' ), 'data-wp-wix-image-select', null );
	} else {
	  dom.setAttrib( node, 'data-wp-wix-image-select', 1 );
	}
  });


  editor.on( 'PostProcess', function( event ) {
	if ( event.get ) {
	  event.content = event.content.replace( / data-wp-wix-image-select="1"/g, '' );
	}
  });

});