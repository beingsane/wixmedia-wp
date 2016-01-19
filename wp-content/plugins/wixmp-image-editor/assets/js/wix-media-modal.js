/*globals window, document, $, jQuery, _, Backbone */
(function ($, _, Backbone, wix) {
	"use strict";
	//  Wix Embed Media Manager ====================================================================================
	if (wix.credentialsValid) { // check if api_key and secret are accepted by wixmp server
		var WixMediaFrame = wp.media.view.MediaFrame.Post;

		wp.media.view.MediaFrame.Post = WixMediaFrame.extend({
			initialize: function() {
				WixMediaFrame.prototype.initialize.apply( this, arguments );

				this.states.add([
					new wp.media.controller.Library( {
						id:                 'image',
						title:              'Wix Media Manger',
						priority:           20,
						searchable:         false,
						library:            wp.media.query( { type: 'image' } ),
						multiple:           true
					} )
				]);

				this.state( 'image' ).on( 'select', this.select );
			},
			select : function(){
			   this.get( 'selection').map(processAttachment);

			   function processAttachment( attachment ) {
			   		var data = attachment.attributes,
			   			$img = $('<img>'),
			   			img_attr = {},
			   			wix_file_sp,
			   			base_url,
						image_id,
						image;
			   			
					if (!data.hasOwnProperty('wix')) return;

					wix_file_sp = data.wix.file_url.split('/')
					base_url = wix.endPoint+'/'+wix_file_sp[0]+'/'+wix_file_sp[1];
					image_id = data.wix.file_name;
					image = wixmedia.WixImage(base_url, image_id, wix_file_sp[wix_file_sp.length - 1]);

					img_attr = {
						// src: 					data.url,
						src: 					image.fit({w: data.wix.width, h: data.wix.height}, null, null).toUrl(),
						title: 					data.title,
						alt: 					data.alt,
						'data-wix-image-id': 	data.wix.file_name,
						'data-wix-file-url': 	data.wix.file_url
					};

					$img.attr(img_attr);
					if (!window.hasOwnProperty('tinyMCE') || !window.tinyMCE.hasOwnProperty('activeEditor')) return;
					tinyMCE.activeEditor.execCommand('mceInsertContent', 0, $img[0].outerHTML);
					tinyMCE.activeEditor.nodeChanged();
			   }
			}

		});
	}





	//  Wix Image Editor ====================================================================================
	var media = wp.media,
		imageEdit = {};

	_.extend(imageEdit, { view: {}, controller: {}, mediaFrame: {} });

	imageEdit.controller.ImageEdit = media.controller.State.extend({
		defaults: {
			id: 'wix-image-edit',
			title: 'Wix Image Editor',
			toolbar: 'wix-image-edit',
			content: 'wix-image-edit',
			menu: 'default',
			router: false,
			priority: 60
		},

		initialize: function( options ) {
			this.wixEdit = options.wixEdit;
			media.controller.State.prototype.initialize.apply( this, arguments );
		}
	});

	imageEdit.view.ImageEdit = media.view.Settings.extend({
		events: _.defaults(media.view.Settings.prototype.events, {
			'keyup input':    'updateHandler',
			'click .filter-toggle': 'onToggleFilter',
			'click .jpeg-toggle': 'onToggleJpeg',
			'click .adjust-toggle': 'onToggleAdjust'
		}),

		className: 'image-details wix-image-edit',
		template:  media.template( 'wix-image-edit' ),

		initialize: function() {
			media.view.Settings.prototype.initialize.apply( this, arguments );

			this.model.on( 'change', this.updateTransformation, this );
			this.model.on( 'change', this.updateUI, this );
		},

		prepare: function() {
			return _.defaults( {
				model: this.model.toJSON()
			}, this.options );
		},

		updateAdjustUI: function () {
			var enabled = this.model.get('adjust_apply'),
				$adjust_br = this.$('.adjust-br input'),
				$adjust_con = this.$('.adjust-con input'),
				$adjust_sat = this.$('.adjust-sat input'),
				$adjust_hue = this.$('.adjust-hue input');

			if (enabled) {
				$adjust_br.removeAttr('disabled');
				$adjust_con.removeAttr('disabled');
				$adjust_sat.removeAttr('disabled');
				$adjust_hue.removeAttr('disabled');
			} else {
				$adjust_br.attr('disabled', 'disabled');
				$adjust_con.attr('disabled', 'disabled');
				$adjust_sat.attr('disabled', 'disabled');
				$adjust_hue.attr('disabled', 'disabled');
			}
		},

		updateUsmUI: function () {
			var usm_enabled = this.model.get('usm_apply'),
				$usm_gr = this.$('.us-section'),
				$usm_r = this.$('.usm-r input'),
				$usm_a = this.$('.usm-a input'),
				$usm_t = this.$('.usm-t input');

			if (usm_enabled) {
				$usm_r.removeAttr('disabled');
				$usm_a.removeAttr('disabled');
				$usm_t.removeAttr('disabled');
			} else {
				$usm_r.attr('disabled', 'disabled');
				$usm_a.attr('disabled', 'disabled');
				$usm_t.attr('disabled', 'disabled');
			}
		},

		updateUI: function (update_all) {
			var that = this,
				changed = this.model.changed;

			if (update_all === true) changed = this.model.attributes;
			_.each(changed, function (value, name) {
				switch(name) {
				    case 'transformation':
				    	that.updateTransformationUI();
				        break;
				    case 'usm_apply':
				    	that.updateUsmUI();
				        break;
				    case 'adjust_apply':
				    	that.updateAdjustUI();
				        break;
				}
			});
		},

		updateTransformationUI: function () {
			var transform = this.model.get('transformation'),
				$crop_x = this.$('.crop-x'),
				$crop_y = this.$('.crop-y'),
				$resize = this.$('.resize-algorithm'),
				$color = this.$('.color'),
				$alignment = this.$('.alignment');

			switch(transform) {
			    case 'fit':
			    	$crop_x.addClass('hidden');
			    	$crop_y.addClass('hidden');
			    	$color.addClass('hidden');
			    	$alignment.addClass('hidden');

			    	$resize.removeClass('hidden');
			        break;
			    case 'fill':
			    	$crop_x.addClass('hidden');
			    	$crop_y.addClass('hidden');
			    	$color.addClass('hidden');

			    	$alignment.removeClass('hidden');
			    	$resize.removeClass('hidden');
			        break;
				case 'canvas':
					$crop_x.addClass('hidden');
			    	$crop_y.addClass('hidden');
			    	$resize.addClass('hidden');

			    	$alignment.removeClass('hidden');
			    	$color.removeClass('hidden');
			        break;
			    case 'crop':
			    	$color.addClass('hidden');
			    	$alignment.addClass('hidden');
			    	$resize.addClass('hidden');

			    	$crop_x.removeClass('hidden');
			    	$crop_y.removeClass('hidden');
			        break;
			}
		},

		updateTransformation: function () {
		},

		onToggleFilter: function( event ) {
			event.preventDefault();
			this.toggleFilter();
		},

		toggleFilter: function( show ) {
			var $section = this.$el.find( '.filter-section' ),
				mode;

			if ( $section.hasClass('filter-visible') || show === false ) {
				$section.removeClass('filter-visible');
				$section.find('.filter-settings').addClass('hidden');
				mode = 'hide';
			} else {
				$section.addClass('filter-visible');
				$section.find('.filter-settings').removeClass('hidden');
				mode = 'show';
			}

			setUserSetting( 'wixImgFilter', mode );
		},

		onToggleJpeg: function( event ) {
			event.preventDefault();
			this.toggleJpeg();
		},

		toggleJpeg: function( show ) {
			var $section = this.$el.find( '.jpeg-section' ),
				mode;

			if ( $section.hasClass('jpeg-visible') || show === false ) {
				$section.removeClass('jpeg-visible');
				$section.find('.jpeg-settings').addClass('hidden');
				mode = 'hide';
			} else {
				$section.addClass('jpeg-visible');
				$section.find('.jpeg-settings').removeClass('hidden');
				mode = 'show';
			}

			setUserSetting( 'wixImgJpeg', mode );
		},

		onToggleAdjust: function( event ) {
			event.preventDefault();
			this.toggleAdust();
		},

		toggleAdust: function( show ) {
			var $section = this.$el.find( '.adjust-section' ),
				mode;

			if ( $section.hasClass('adjust-visible') || show === false ) {
				$section.removeClass('adjust-visible');
				$section.find('.adjust-settings').addClass('hidden');
				mode = 'hide';
			} else {
				$section.addClass('adjust-visible');
				$section.find('.adjust-settings').removeClass('hidden');
				mode = 'show';
			}

			setUserSetting( 'wixImgAdjust', mode );
		},

		render: function() {
			media.view.Settings.prototype.render.apply( this, arguments );
			this.postRender();			
			return this;
		},

		postRender: function() {
			if ( getUserSetting( 'wixImgFilter' ) === 'show' ) {
				this.toggleFilter( true );
			}
			if ( getUserSetting( 'wixImgJpeg' ) === 'show' ) {
				this.toggleJpeg( true );
			}
			if ( getUserSetting( 'wixImgAdjust' ) === 'show' ) {
				this.toggleAdust( true );
			}
			this.updateUI(true);
			this.updateTransformation();
		},

	});

	imageEdit.mediaFrame.ImageEdit = media.view.MediaFrame.Select.extend({
		defaults: {
			id:      'wixEdit',
			url:     '',
			type:    'link',
			title:   'Wix Image Editor',
			priority: 120
		},

		initialize: function( options ) {
			this.wixEdit = new Backbone.Model( options.metadata );
			media.view.MediaFrame.Select.prototype.initialize.apply( this, arguments );
		},

		bindHandlers: function() {
			media.view.MediaFrame.Select.prototype.bindHandlers.apply( this, arguments );

			this.on( 'menu:create:wix-image-edit', this.createMenu, this );
			this.on( 'content:render:wix-image-edit', this.contentDetailsRender, this );
			this.on( 'toolbar:render:wix-image-edit', this.toolbarRender, this );
		},

		contentDetailsRender: function() {
			var view = new imageEdit.view.ImageEdit({
				controller: this,
				model: this.state().wixEdit,
			}).render();

			this.content.set( view );
		},

		toolbarRender: function() {
			this.toolbar.set( new media.view.Toolbar({
				controller: this,
				items: {
					button: {
						style:    'primary',
						text:     'Update',
						priority: 80,
						click:    function() {
							var controller = this.controller;
							controller.close();
							controller.state().trigger( 'update', controller.wixEdit.toJSON(), controller.wixEdit.processed_url);
							controller.setState( controller.options.state );
							controller.reset();
						}
					}
				}
			}) );
		},

		createStates: function() {
			this.states.add([
				new imageEdit.controller.ImageEdit( {
					wixEdit: this.wixEdit
				} )
			]);
		}
	});

	// global wix object
	wix.imageEdit = imageEdit;


}(jQuery, _, Backbone, wix));