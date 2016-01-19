;(function () {
var bluebird = window.Promise;
if (bluebird !== window.P) {
console.warn('Bluebird is not available, cancel and progress will not work');
}
var bower_components_wixmp_manager_src_utils_normalize_uri, bower_components_wixmp_manager_src_utils_utils, bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_events_notifier, bower_components_wixmp_manager_src_sources_Source, bower_components_wixmp_manager_src_sources_private_mappers_folder, bower_components_wixmp_manager_src_utils_mappers, bower_components_wixmp_manager_src_sources_private_parsers_error, bower_components_wixmp_manager_src_sources_private_folders, bower_components_wixmp_manager_src_sources_private_validators_new_props, bower_components_wixmp_manager_src_sources_private_folder, bower_components_wixmp_manager_src_sources_private_mappers_item, bower_components_wixmp_manager_src_sources_private_items, bower_components_wixmp_manager_src_sources_private_item, bower_components_wixmp_manager_src_sources_private_settings, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list, bower_components_wixmp_manager_src_services_upload_collection, bower_components_wixmp_manager_src_sources_private_Private, bower_components_wixmp_manager_src_sources_picasa_settings, bower_components_wixmp_manager_src_sources_picasa_mappers_folder, bower_components_wixmp_manager_src_sources_picasa_parsers_folders, bower_components_wixmp_manager_src_sources_picasa_parsers_error, bower_components_wixmp_manager_src_sources_picasa_folders, bower_components_wixmp_manager_src_sources_picasa_mappers_item, bower_components_wixmp_manager_src_sources_picasa_parsers_items, bower_components_wixmp_manager_src_sources_picasa_items, bower_components_wixmp_manager_src_sources_picasa_Picasa, bower_components_wixmp_manager_src_sources_instagram_settings, bower_components_wixmp_manager_src_sources_instagram_mappers_folder, bower_components_wixmp_manager_src_sources_instagram_parsers_folders, bower_components_wixmp_manager_src_sources_instagram_parsers_error, bower_components_wixmp_manager_src_sources_instagram_folders, bower_components_wixmp_manager_src_sources_instagram_mappers_item, bower_components_wixmp_manager_src_sources_instagram_parsers_items, bower_components_wixmp_manager_src_sources_instagram_items, bower_components_wixmp_manager_src_sources_instagram_Instagram, bower_components_wixmp_manager_src_sources_facebook_settings, bower_components_wixmp_manager_src_sources_facebook_mappers_folder, bower_components_wixmp_manager_src_sources_facebook_parsers_folders, bower_components_wixmp_manager_src_sources_facebook_parsers_error, bower_components_wixmp_manager_src_sources_facebook_folders, bower_components_wixmp_manager_src_sources_facebook_mappers_item, bower_components_wixmp_manager_src_sources_facebook_parsers_items, bower_components_wixmp_manager_src_sources_facebook_items, bower_components_wixmp_manager_src_sources_facebook_Facebook, bower_components_wixmp_manager_src_sources_flickr_settings, bower_components_wixmp_manager_src_sources_flickr_mappers_folder, bower_components_wixmp_manager_src_sources_flickr_parsers_folders, bower_components_wixmp_manager_src_sources_flickr_parsers_error, bower_components_wixmp_manager_src_sources_flickr_folders, bower_components_wixmp_manager_src_sources_flickr_mappers_item, bower_components_wixmp_manager_src_sources_flickr_parsers_items, bower_components_wixmp_manager_src_sources_flickr_items, bower_components_wixmp_manager_src_sources_flickr_Flickr, bower_components_wixmp_manager_src_sources_list, bower_components_wixmp_manager_src_events_events, bower_components_wixmp_manager_src_connector_connector_settings, bower_components_wixmp_manager_src_connector_connector, bower_components_wixmp_manager_src_services_bi_events_ids, bower_components_wixmp_manager_src_services_bi_request, bower_components_wixmp_manager_src_services_bi_bi, bower_components_wixmp_manager_src_wixmp, src_sources_bigstock_settings, src_sources_bigstock_mappers_folder, src_sources_bigstock_parsers_folders, src_sources_bigstock_folders, src_sources_bigstock_mappers_item, src_sources_bigstock_parsers_items, src_sources_bigstock_parsers_error, src_sources_bigstock_items, src_sources_bigstock_BigStock, src_sources_public_mappers_folder, src_sources_public_parsers_folders, src_sources_public_parsers_error, src_sources_public_folders, src_sources_public_mappers_item, src_sources_public_parsers_items, src_sources_public_items, src_sources_public_settings, src_sources_public_Public, src_wixmp;
bower_components_wixmp_manager_src_utils_normalize_uri = function (uri) {
  if (typeof uri !== 'string') {
    throw new Error('URI is not a string');
  }
  return uri.replace(/([a-z\-_0-9]+)\/\//gi, '$1/');
};
bower_components_wixmp_manager_src_utils_utils = function () {
  
  function minMaxFinder(method, arr, predicate) {
    var mappedArr;
    if (predicate) {
      mappedArr = arr.map(predicate);
      return arr[mappedArr.indexOf(Math[method].apply(null, mappedArr))];
    }
    return Math[method].apply(this, arr);
  }
  var utils = {
    /**
     * Extend object values with sources objects data
     * @param dest {Object}
     * @param source.. {Object}
     * @returns {*}
     */
    extend: function (dest) {
      var sources = Array.prototype.slice.call(arguments, 1);
      sources.forEach(function (source) {
        if (typeof source === 'object' && source != null) {
          Object.keys(source).forEach(function (key) {
            dest[key] = source[key];
          });
        }
      });
      return dest;
    },
    merge: function () {
      var hop = Object.prototype.hasOwnProperty;
      return Array.prototype.reduce.call(arguments, function (result, source) {
        Object.keys(result).forEach(function (key) {
          if (hop.call(source, key)) {
            result[key] = source[key];
          }
        });
        Object.keys(source).forEach(function (key) {
          result[key] = source[key];
        });
        return result;
      }, {});
    },
    /**
     * Return function with preset arguments
     * @param func {Function}
     * @param [argument..] {*}
     * @returns {Function}
     */
    partial: function (func) {
      var partialArguments = Array.prototype.slice.call(arguments, 1);
      return function () {
        var args = Array.prototype.slice.call(arguments);
        return func.apply(this, partialArguments.concat(args));
      };
    },
    getParameterByName: function (searchString, name) {
      var regex, results;
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      results = regex.exec(searchString);
      if (!results) {
        return '';
      }
      return decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
    snakeToCamel: function (string) {
      return string.replace(/(\_[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('_', '');
      });
    },
    find: function (arr, predicate) {
      var found;
      arr.some(function (el) {
        if (predicate(el) === true) {
          found = el;
          return true;
        }
      });
      return found;
    },
    encodeParams: function (a) {
      var s = [], add = function (key, value) {
          s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        };
      Object.keys(a).forEach(function (entity) {
        add(entity, a[entity]);
      });
      return s.join('&').replace(/%20/g, '+');
    }
  };
  utils.min = utils.partial(minMaxFinder, 'min');
  utils.max = utils.partial(minMaxFinder, 'max');
  return utils;
}();
bower_components_wixmp_manager_src_utils_http = function (Promise, normalizeUri, utils) {
  
  var post, get, upload, openRequest, encode, buildUrl, parseRequest, parseResponse, wrapRequestWithPromise, defaultOptions;
  defaultOptions = {
    withCredentials: false,
    cache: true,
    headers: { Accept: 'application/json, text/plain, */*' }
  };
  Promise.prototype.progress = function (callback) {
    this._progressCallback = callback;
    return this;
  };
  Promise.prototype.notify = function (message) {
    if (typeof this._progressCallback === 'function') {
      this._progressCallback(message);
    }
    return this;
  };
  wrapRequestWithPromise = function (request, caller, withProgress) {
    var promise = new Promise(function (resolve, reject) {
      request.addEventListener('error', function () {
        reject(parseRequest(utils.extend({}, request, { statusText: 'error' })));
      }, false);
      request.addEventListener('timeout', function () {
        reject(parseRequest(utils.extend({}, request, { statusText: 'timeout_has_exceeded' })));
      }, false);
      request.addEventListener('load', function () {
        if (/^2\d+/.test(request.status.toString())) {
          resolve(parseRequest(request));
        } else {
          reject(parseRequest(request));
        }
      }, false);
    });
    if (withProgress) {
      request.upload.onprogress = function (event) {
        var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
        promise.notify(progress);
      };
    }
    promise.cancellable().catch(function () {
      request.abort();
    });
    caller();
    return promise;
  };
  parseRequest = function (request) {
    return {
      status: request.status,
      statusText: request.statusText,
      data: parseResponse(request.responseText)
    };
  };
  parseResponse = function (response) {
    if (typeof response === 'string') {
      if ([
          '{',
          '['
        ].indexOf(response[0]) >= 0) {
        response = JSON.parse(response);
      } else {
        response = { message: response };
      }
    }
    return response;
  };
  buildUrl = function (url, params) {
    if (!params) {
      return url;
    }
    var parts = [];
    Object.keys(params).forEach(function (key) {
      var val = params[key];
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (!(val instanceof Array)) {
        val = [val];
      }
      val.forEach(function (v) {
        if (v instanceof Date && !isNaN(v.valueOf())) {
          v = v.toISOString();
        } else if (typeof v === 'object') {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });
    if (parts.length > 0) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
    }
    return url;
  };
  encode = function (val) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+');
  };
  openRequest = function (method, url, options) {
    var request = new XMLHttpRequest();
    if (options.cache === false) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now();
    }
    request.open(method.toUpperCase(), normalizeUri(url));
    request.responseType = options.responseType;
    request.withCredentials = options.withCredentials;
    Object.keys(options.headers).forEach(function (name) {
      request.setRequestHeader(name, options.headers[name]);
    });
    return request;
  };
  get = function (url, data, options) {
    var request = openRequest('get', buildUrl(url, data), utils.extend({}, defaultOptions, options));
    return wrapRequestWithPromise(request, function () {
      request.send(null);
    });
  };
  post = function (url, data, options) {
    var request = openRequest('post', url, utils.extend({}, defaultOptions, { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }, options));
    return wrapRequestWithPromise(request, function () {
      if (data && typeof data === 'object' && data instanceof FormData === false) {
        data = JSON.stringify(data);
      }
      request.send(data);
    });
  };
  upload = function (url, multipart, options) {
    var fd, request = openRequest('post', url, utils.extend({}, defaultOptions, options));
    fd = new FormData();
    Object.keys(multipart).forEach(function (name) {
      var value = multipart[name];
      var args = name === 'file' ? [
        name,
        value,
        value.name
      ] : [
        name,
        value
      ];
      return fd.append.apply(fd, args);
    });
    return wrapRequestWithPromise(request, function () {
      request.send(fd);
    }, true);
  };
  return {
    get: get,
    post: post,
    upload: upload
  };
}(bluebird, bower_components_wixmp_manager_src_utils_normalize_uri, bower_components_wixmp_manager_src_utils_utils);
bower_components_wixmp_manager_src_events_notifier = function (Promise) {
  
  var listeners = {};
  function noop() {
  }
  /**
   * Call each function at list with specified data
   * @param functions [{Function}]
   * @param data {*}
   */
  function callEach(functions, data) {
    functions.forEach(function (currentFunction) {
      currentFunction(data);
    });
  }
  /**
   * Give an array of array of functions, call all functions at specified index with specified data
   * @param functions [[{Function}]]
   * @param index {Number}
   * @param data {*}
   */
  function callEactAtIndex(functions, index, data) {
    functions.forEach(function (functions) {
      functions[index](data);
    });
  }
  /**
   * Emit event with new array of Promises for each listeners
   * @param eventTarget {Object} Who was emit an event
   * @param eventName {String}
   * @param [params] {Object} Any additional parameters for listener
   * @returns {{resolve: resolve, reject: reject}}
   */
  function emitWithArrayOfPromises(eventTarget, eventName, params) {
    // no listeners
    if (typeof listeners[eventName] === 'undefined') {
      return {
        resolveAt: noop,
        rejectAt: noop
      };
    }
    var resolvers = [], rejectors = [];
    listeners[eventName].forEach(function (listener) {
      var thisEventResolvers = [], thisEventRejectors = [], eventPromises = params.promises.map(function () {
          return new Promise(function (resolve, reject) {
            thisEventResolvers.push(resolve);
            thisEventRejectors.push(reject);
          });
        });
      resolvers.push(thisEventResolvers);
      rejectors.push(thisEventRejectors);
      listener(eventPromises, params);
    });
    return {
      resolveAt: function (index, data) {
        callEactAtIndex(resolvers, index, data);
      },
      rejectAt: function (index, data) {
        callEactAtIndex(rejectors, index, data);
      }
    };
  }
  /**
   * Emit event with new Promise for each listeners
   * @param eventTarget {Object} Who was emit an event
   * @param eventName {String}
   * @param [params] {Object} Any additional parameters for listener
   * @returns {{resolve: resolve, reject: reject}}
   */
  function emit(eventTarget, eventName, params) {
    if (typeof eventTarget !== 'object' || eventTarget === null) {
      throw new Error('target should be a function');
    }
    if (typeof eventName !== 'string') {
      throw new Error('eventName should be a string');
    }
    params = params || {};
    params.eventTarget = eventTarget;
    params.eventName = eventName;
    if (params.promises && params.promises.length) {
      return emitWithArrayOfPromises(eventTarget, eventName, params);
    }
    // no listeners
    if (typeof listeners[eventName] === 'undefined') {
      return {
        resolve: noop,
        reject: noop
      };
    }
    var resolvers = [], rejectors = [];
    listeners[eventName].forEach(function (listener) {
      var promise = new Promise(function (resolveCurrent, rejectCurrent) {
        resolvers.push(resolveCurrent);
        rejectors.push(rejectCurrent);
      });
      listener(promise, params);
    });
    return {
      resolve: function (data) {
        callEach(resolvers, data);
      },
      reject: function (reason) {
        callEach(rejectors, reason);
      }
    };
  }
  /**
   * Subscribe listener to event
   * @param eventName {String}
   * @param listener {Function}
   */
  function addListener(eventName, listener) {
    if (typeof listeners[eventName] === 'undefined') {
      listeners[eventName] = [];
    }
    listeners[eventName].push(listener);
  }
  /**
   * Unsubscribe listener from event
   * @param eventName {String}
   * @param listener {Function}
   */
  function removeListener(eventName, listener) {
    if (listeners[eventName]) {
      var index = listeners[eventName].indexOf(listener);
      listeners[eventName].splice(index, 1);
    }
  }
  return {
    emit: emit,
    addListener: addListener,
    removeListener: removeListener
  };
}(bluebird);
bower_components_wixmp_manager_src_sources_Source = function (http, notifier) {
  
  return function (SourceConstructor, settings) {
    if (typeof SourceConstructor !== 'function') {
      throw new Error('Source constructor should be a function');
    }
    if (typeof settings !== 'undefined' && (typeof settings !== 'object' || settings === null)) {
      throw new Error('Source settings should be an object');
    }
    return new SourceConstructor(settings, notifier.emit, http);
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_events_notifier);
bower_components_wixmp_manager_src_sources_private_mappers_folder = function (folderData) {
  return {
    id: folderData.folder_id,
    name: folderData.folder_name,
    mediaType: folderData.media_type,
    filesCount: folderData.files_count,
    createdAt: folderData.created_ts
  };
};
bower_components_wixmp_manager_src_utils_mappers = {
  toObject: function (data) {
    if (!data) {
      return null;
    }
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  },
  toError: function (error) {
    return {
      code: error.status,
      message: error.statusText || error.data.message || error.data.error && error.data.error.message || '',
      data: error.data.errors || error.data.error || error.data
    };
  }
};
bower_components_wixmp_manager_src_sources_private_parsers_error = function (Promise, mappers) {
  
  return function (response) {
    if (response.status === 403 && response.data.error_description === 'Missing Wix session') {
      response.status = 401;
      response.data.message = 'Wix Session required';
    }
    return Promise.reject(mappers.toError(response));
  };
}(bluebird, bower_components_wixmp_manager_src_utils_mappers);
bower_components_wixmp_manager_src_sources_private_folders = function (http, toFolder, toError) {
  
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      return http.get(settings.apiUrl + '/folders', {
        media_type: options.mediaType || 'picture',
        folder_id: folderId || null
      }, { withCredentials: true }).then(function (response) {
        return { data: response.data.folders.map(toFolder) };
      }, failHandler);
    }
    function removeFolder(folderId) {
      return http.post(settings.apiUrl + '/folders/' + folderId + '/delete', null, { withCredentials: true }).then(function () {
        return folderId;
      }, failHandler);
    }
    function remove(folderIds) {
      return folderIds.map(removeFolder);
    }
    return {
      list: list,
      remove: remove
    };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_private_mappers_folder, bower_components_wixmp_manager_src_sources_private_parsers_error);
bower_components_wixmp_manager_src_sources_private_validators_new_props = function (newProps) {
  if (typeof newProps !== 'object' || newProps === null) {
    return {
      valid: false,
      message: 'Please specify new props'
    };
  }
  if (typeof newProps.name !== 'undefined' && !newProps.name) {
    return {
      valid: false,
      message: 'Please specify name'
    };
  }
  if (typeof newProps.folderId !== 'undefined' && !newProps.folderId) {
    return {
      valid: false,
      message: 'Please specify folder id'
    };
  }
  return { valid: true };
};
bower_components_wixmp_manager_src_sources_private_folder = function (http, utils, toFolder, toError, validateNewProps) {
  
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function create(folderName, options) {
      if (!folderName) {
        return failHandler({
          status: -200,
          statusText: 'Internal JS Error',
          data: { message: 'Please specify name' }
        });
      }
      options = options || {};
      return http.post(settings.apiUrl + '/folders', {
        folder_name: folderName,
        media_type: options.mediaType || 'picture'
      }, { withCredentials: true }).then(function (res) {
        res.data = toFolder(res.data);
        return res;
      }, failHandler);
    }
    function update(folder, newFolderProps) {
      var arePropsValid = validateNewProps(newFolderProps);
      if (arePropsValid.valid === false) {
        return failHandler({
          status: -200,
          statusText: 'Internal JS Error',
          data: { message: arePropsValid.message }
        });
      }
      return http.post(settings.apiUrl + '/folders/' + folder.id + '/put', { folder_name: newFolderProps.name }, { withCredentials: true }).then(function (res) {
        res.data = utils.merge(folder, newFolderProps);
        return res;
      }, failHandler);
    }
    return {
      create: create,
      update: update
    };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_utils_utils, bower_components_wixmp_manager_src_sources_private_mappers_folder, bower_components_wixmp_manager_src_sources_private_parsers_error, bower_components_wixmp_manager_src_sources_private_validators_new_props);
bower_components_wixmp_manager_src_sources_private_mappers_item = function (normalizeUri, mappers) {
  
  var compileUrls, rembrandtCompile, vangoghCompile;
  compileUrls = function (item, settings) {
    if (settings.imageOperationsApi === 'rembrandt') {
      return rembrandtCompile(item, settings);
    }
    return vangoghCompile(item, settings);
  };
  rembrandtCompile = function (item, settings) {
    var nameSanitizedFromExtension;
    var preview;
    var regexp = /([^\/]+)$/;
    function cutNameFromId(id) {
      return id.replace(regexp, '');
    }
    function getFileName(id) {
      return regexp.exec(id)[1];
    }
    switch (item.media_type) {
    case 'picture':
    case 'site_icon':
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + cutNameFromId(item.file_url) + '/v1/fill/w_195,h_195/' + getFileName(item.file_url)),
        previewUrl: normalizeUri(settings.filesUrl + '/' + cutNameFromId(item.file_url) + '/v1/fit/w_375,h_375/' + getFileName(item.file_url)),
        originalUrl: normalizeUri(settings.filesUrl + '/' + cutNameFromId(item.file_url) + '/' + getFileName(item.file_url))
      };
    case 'document':
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'music':
    case 'secure_music':
      return {
        thumbnailUrl: './images/music-preview.png',
        previewUrl: './images/music-preview.png',
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'video':
      preview = item.icon_url ? normalizeUri(settings.filesUrl + '/' + item.icon_url) : './images/video-preview.png';
      return {
        thumbnailUrl: preview,
        previewUrl: preview,
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'ufonts':
      nameSanitizedFromExtension = item.file_name.replace(/\..*/, '');
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/media' + nameSanitizedFromExtension + '_prvw.jpg'),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'swf':
      return {
        thumbnailUrl: normalizeUri((settings.staticFiles || 'http://static.wix.com') + '/services/web/2.690.2/images/web/flash_swf_icon.png'),
        previewUrl: normalizeUri((settings.staticFiles || 'http://static.wix.com') + '/services/web/2.690.2/images/web/flash_swf_icon.png'),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'watermark':
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    default:
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    }
  };
  vangoghCompile = function (item, settings) {
    var nameSanitizedFromExtension;
    switch (item.media_type) {
    case 'picture':
    case 'site_icon':
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.file_url + '_srz_210_210_75_22_0.5_1.20_0.00_jpg_srz'),
        previewUrl: normalizeUri(settings.filesUrl + '/' + item.file_url + '_srb_375_375_75_22_0.5_1.20_0.00_jpg_srb'),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'document':
    case 'music':
    case 'secure_music':
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'ufonts':
      nameSanitizedFromExtension = item.file_name.replace(/\..*/, '');
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/media' + nameSanitizedFromExtension + '_prvw.jpg'),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'swf':
      return {
        thumbnailUrl: normalizeUri((settings.staticFiles || 'http://static.wix.com') + '/services/web/2.690.2/images/web/flash_swf_icon.png'),
        previewUrl: normalizeUri((settings.staticFiles || 'http://static.wix.com') + '/services/web/2.690.2/images/web/flash_swf_icon.png'),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    case 'watermark':
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    default:
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        previewUrl: normalizeUri(settings.filesUrl + '/' + item.icon_url),
        originalUrl: normalizeUri(settings.filesUrl + '/' + item.file_url)
      };
    }
  };
  return function (itemData, settings) {
    var item = {
      id: itemData.file_name,
      folderId: itemData.parent_folder_id || null,
      name: itemData.original_file_name,
      mediaType: itemData.media_type,
      fileUrl: normalizeUri(itemData.file_url),
      createdAt: itemData.created_ts,
      tags: itemData.tags,
      width: itemData.width || null,
      height: itemData.height || null,
      fileInfo: mappers.toObject(itemData.file_info),
      fileInput: mappers.toObject(itemData.file_input),
      fileOutput: mappers.toObject(itemData.file_output)
    };
    item.thumbnailUrl = compileUrls(itemData, settings).thumbnailUrl;
    item.originalUrl = compileUrls(itemData, settings).originalUrl;
    item.previewUrl = compileUrls(itemData, settings).previewUrl;
    return item;
  };
}(bower_components_wixmp_manager_src_utils_normalize_uri, bower_components_wixmp_manager_src_utils_mappers);
bower_components_wixmp_manager_src_sources_private_items = function (Promise, http, normalizeUri, utils, toItem, toError) {
  
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function toItemsList(res) {
      if (!res.data.files) {
        return [];
      }
      return res.data.files.map(function (item) {
        return toItem(item, settings);
      });
    }
    var defaultPaging = {
      size: 50,
      cursor: null
    };
    var defaultSort = {
      order: 'date',
      direction: 'desc'
    };
    function list(folderId, options) {
      options = options || {};
      var sort = utils.extend(defaultSort, options.sort);
      var paging = utils.extend(defaultPaging, options.paging);
      var queryParams = {
        page_size: paging.size,
        cursor: options.cursor,
        parent_folder_id: folderId,
        media_type: options.mediaType
      };
      queryParams.order = sort.direction === 'desc' ? '-' + sort.order : sort.order;
      return http.get(settings.apiUrl + '/files/getpage', queryParams, { withCredentials: true }).then(function (response) {
        return {
          data: toItemsList(response),
          paging: {
            size: paging.size,
            cursor: response.data.cursor
          }
        };
      }, failHandler);
    }
    function removeItem(itemId) {
      return http.post(settings.apiUrl + '/files/' + itemId + '/delete', null, { withCredentials: true }).then(function () {
        return itemId;
      }, failHandler);
    }
    function remove(itemsId) {
      return itemsId.map(removeItem);
    }
    function searchByTag(tag, options) {
      options = options || {};
      var sort = utils.extend(defaultSort, options.sort);
      var paging = utils.extend(defaultPaging, options.paging);
      var queryParams = {
        page_size: paging.size,
        cursor: options.cursor,
        media_type: options.mediaType,
        order: sort.direction === 'desc' ? '-' + sort.order : sort.order
      };
      return http.get(settings.apiUrl + '/files/get?tag=' + tag, queryParams, {
        withCredentials: true,
        cache: false
      }).then(function (response) {
        return {
          data: toItemsList(response),
          paging: {
            size: paging.size,
            cursor: response.data.cursor
          }
        };
      }, failHandler);
    }
    return {
      list: list,
      remove: remove,
      searchByTag: searchByTag
    };
  };
}(bluebird, bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_utils_normalize_uri, bower_components_wixmp_manager_src_utils_utils, bower_components_wixmp_manager_src_sources_private_mappers_item, bower_components_wixmp_manager_src_sources_private_parsers_error);
bower_components_wixmp_manager_src_sources_private_item = function (Promise, http, utils, normalizeUri, toItem, toError, validateNewProps) {
  
  return function (settings) {
    function failHandler(reason) {
      return toError(reason);
    }
    function getUploadUrl(fileSource) {
      function getEndpoind(mediaType) {
        if (mediaType === 'secure_music') {
          return 'music-goods/upload';
        } else if (mediaType === 'video') {
          return 'video/upload';
        }
        return 'upload';
      }
      return http.get(settings.apiUrl + '/files/' + getEndpoind(fileSource.mediaType) + '/url', {
        media_type: fileSource.mediaType,
        file_name: fileSource.name,
        file_size: fileSource.size,
        content_type: fileSource.file.type
      }, { withCredentials: true });
    }
    function uploadByUrl(file, options) {
      options = options || {};
      var params = {
        url: normalizeUri(file.url),
        media_type: file.mediaType,
        name: file.name || 'Untitled',
        tags: file.tags || null,
        parent_folder_id: options.folderId || null
      };
      return new Promise(function (resolve, reject) {
        http.post(settings.apiUrl + '/files/upload/external?url=' + params.url + '&media_type=' + params.media_type, params, { withCredentials: true }).then(function (response) {
          resolve(toItem(response.data, settings));
        }, reject);
      });
    }
    function upload(fileSource, options) {
      options = options || {};
      var fileToUpload = {
        parent_folder_id: options.folderId || null,
        file: fileSource.file,
        media_type: fileSource.mediaType
      };
      var wrapperPromise = new Promise(function (resolve, reject) {
        getUploadUrl(fileSource).then(function (response) {
          var uploadPromise = http.upload(response.data.upload_url, fileToUpload, { withCredentials: true });
          uploadPromise.progress(function (progress) {
            wrapperPromise.notify(progress);
          });
          uploadPromise.then(function (response) {
            resolve(toItem(response.data[0], settings));
          }, reject);
        }, reject);
      });
      return wrapperPromise;
    }
    function get(itemId) {
      return http.get(settings.apiUrl + '/files/' + itemId, null, {
        withCredentials: true,
        cache: false
      }).then(function (result) {
        return toItem(result.data, settings);
      }, failHandler);
    }
    function update(item, newItemProps) {
      var arePropsValid = validateNewProps(newItemProps);
      if (arePropsValid.valid === false) {
        return failHandler({
          status: -200,
          statusText: 'Internal JS Error',
          data: { message: arePropsValid.message }
        });
      }
      return http.post(settings.apiUrl + '/files/' + item.id + '/put', {
        original_file_name: newItemProps.name,
        parent_folder_id: newItemProps.folderId
      }, { withCredentials: true }).then(function (res) {
        res.data = utils.merge(item, newItemProps);
        return res;
      }, failHandler);
    }
    return {
      upload: upload,
      uploadByUrl: uploadByUrl,
      get: get,
      update: update
    };
  };
}(bluebird, bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_utils_utils, bower_components_wixmp_manager_src_utils_normalize_uri, bower_components_wixmp_manager_src_sources_private_mappers_item, bower_components_wixmp_manager_src_sources_private_parsers_error, bower_components_wixmp_manager_src_sources_private_validators_new_props);
bower_components_wixmp_manager_src_sources_private_settings = {
  apiUrl: 'http://files.wix.com',
  imageOperationsApi: 'vangogh',
  filesUrl: 'http://static.wixstatic.com'
};
bower_components_wixmp_manager_src_sources_decorators = function (Promise, notifier, utils) {
  
  return {
    /**
     * Add events to all namespaces methods at eventsTarget
     * @param eventsTarget {Object} source instance
     * @param events {Object} see events/list.js
     * @param methods {Object}
     * @returns {Object} methods with events
     */
    addEvents: function (eventsTarget, events, methods) {
      var methodsWithEvents = {};
      Object.keys(events).forEach(function (eventKey) {
        var methodName = utils.snakeToCamel(eventKey.toLowerCase());
        if (typeof methods[methodName] !== 'function') {
          return;
        }
        // define new method with event generation
        methodsWithEvents[methodName] = function () {
          // emit before event and call native method
          //var event = notifier.emit(eventsTarget, events[eventKey], {arguments: arguments});
          var args = arguments, promise = methods[methodName].apply(methods, args), params = { arguments: args }, event, wrapped;
          if (Array.isArray(promise)) {
            params.promises = promise;
            event = notifier.emit(eventsTarget, events[eventKey], params);
            promise.forEach(function (promise, index) {
              var wrappedInner = promise.then(function (data) {
                event.resolveAt(index, data);
              }, function (reason) {
                event.rejectAt(index, reason);
              });
              promise.progress(function (progress) {
                wrappedInner.notify(progress);
              });
            });
            return promise;
          }
          event = notifier.emit(eventsTarget, events[eventKey], params);
          wrapped = promise.then(function (data) {
            event.resolve(data);
            return data;
          }, function (reason) {
            event.reject(reason);
            return Promise.reject(reason);
          });
          promise.progress(function (progress) {
            wrapped.notify(progress);
          });
          return wrapped;
        };
      });
      return methodsWithEvents;
    }
  };
}(bluebird, bower_components_wixmp_manager_src_events_notifier, bower_components_wixmp_manager_src_utils_utils);
bower_components_wixmp_manager_src_events_list = {
  FOLDERS: {
    LIST: 'folders.list',
    REMOVE: 'folders.remove'
  },
  FOLDER: {
    CREATE: 'folder.create',
    UPDATE: 'folder.update',
    REMOVE: 'folder.remove'
  },
  ITEMS: {
    LIST: 'items.list',
    SEARCH: 'items.search',
    REMOVE: 'items.remove',
    UPLOAD: 'items.upload',
    UPLOAD_BY_URL: 'items.uploadByUrl',
    SEARCH_BY_TAG: 'items.searchByTag'
  },
  ITEM: {
    GET: 'item.get',
    UPDATE: 'item.update',
    REMOVE: 'item.remove',
    UPLOAD: 'item.upload',
    UPLOAD_BY_URL: 'item.uploadByUrl'
  }
};
bower_components_wixmp_manager_src_services_upload_collection = function (Promise) {
  
  return function (source) {
    var uploadQueue = [];
    var uploadIsInProgress = false;
    var dynamicPromiseReduce = function (itemsToUpload, callback) {
      var currentItem = itemsToUpload.shift();
      console.log(currentItem);
      if (!currentItem) {
        uploadIsInProgress = false;
        return;
      }
      callback(currentItem).finally(function () {
        dynamicPromiseReduce(itemsToUpload, callback);
      });
    };
    function defer() {
      var resolve, reject;
      var promise = new Promise(function () {
        resolve = arguments[0];
        reject = arguments[1];
      });
      return {
        resolve: resolve,
        reject: reject,
        promise: promise
      };
    }
    function startUpload(items, options, uploadFn) {
      var mapped = items.map(function (item) {
        var deferred = defer();
        uploadQueue.push({
          item: item,
          deferred: deferred
        });
        return deferred;
      });
      if (!uploadIsInProgress) {
        uploadIsInProgress = true;
        dynamicPromiseReduce(uploadQueue, function (itemToUpload) {
          return uploadFn(itemToUpload.item, options).progress(function (progress) {
            itemToUpload.deferred.promise.notify(progress);
          }).then(itemToUpload.deferred.resolve, itemToUpload.deferred.reject);
        });
      }
      return mapped.map(function (item) {
        return item.promise;
      });
    }
    function upload(items, options) {
      return startUpload(items, options, source.item.upload);
    }
    function uploadByUrl(items, options) {
      return startUpload(items, options, source.item.uploadByUrl);
    }
    this.upload = upload;
    this.uploadByUrl = uploadByUrl;
  };
}(bluebird);
bower_components_wixmp_manager_src_sources_private_Private = function (initFolders, initFolder, initItems, initItem, defaultSettings, utils, decorators, eventsList, Uploader) {
  
  return function (userSettings) {
    var settings = utils.extend({}, defaultSettings, userSettings), folders = initFolders(settings), folder = initFolder(settings), items = initItems(settings), item = initItem(settings);
    var uploadCollection = new Uploader(this);
    utils.extend(items, {
      upload: uploadCollection.upload,
      uploadByUrl: uploadCollection.uploadByUrl
    });
    this.name = 'private';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.folder = decorators.addEvents(this, eventsList.FOLDER, folder);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
    this.item = decorators.addEvents(this, eventsList.ITEM, item);
  };
}(bower_components_wixmp_manager_src_sources_private_folders, bower_components_wixmp_manager_src_sources_private_folder, bower_components_wixmp_manager_src_sources_private_items, bower_components_wixmp_manager_src_sources_private_item, bower_components_wixmp_manager_src_sources_private_settings, bower_components_wixmp_manager_src_utils_utils, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list, bower_components_wixmp_manager_src_services_upload_collection);
bower_components_wixmp_manager_src_sources_picasa_settings = { apiUrl: 'http://pix-test.wix.com/services/google' };
bower_components_wixmp_manager_src_sources_picasa_mappers_folder = function (data) {
  return {
    id: data.gphoto$id.$t,
    name: data.title.$t,
    mediaType: 'picture',
    parentId: null,
    filesCount: data.gphoto$numphotos.$t,
    createdAt: data.published.$t
  };
};
bower_components_wixmp_manager_src_sources_picasa_parsers_folders = function (toFolder) {
  
  return function (data) {
    return { data: data.feed.entry.map(toFolder) };
  };
}(bower_components_wixmp_manager_src_sources_picasa_mappers_folder);
bower_components_wixmp_manager_src_sources_picasa_parsers_error = function (Promise, mappers) {
  
  return function (response) {
    return Promise.reject(mappers.toError(response));
  };
}(bluebird, bower_components_wixmp_manager_src_utils_mappers);
bower_components_wixmp_manager_src_sources_picasa_folders = function (http, toFolders, toError) {
  
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list() {
      return http.get(settings.apiUrl + '/albums', {
        thumbsize: '150c',
        'max-results': 500
      }, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_picasa_parsers_folders, bower_components_wixmp_manager_src_sources_picasa_parsers_error);
bower_components_wixmp_manager_src_sources_picasa_mappers_item = function (normalizeUri) {
  
  function getLastImage(mediaGroup) {
    var images = mediaGroup.media$thumbnail.filter(function (item) {
      return !item.medium || item.medium !== 'video';
    });
    return images[images.length - 1].url || '';
  }
  return function (data) {
    var lastImage, width, height, bigImage, preview;
    lastImage = getLastImage(data.media$group);
    width = +data.gphoto$width.$t || 1024;
    height = +data.gphoto$height.$t || 768;
    // hack. API does not provide really full images
    // w1024-h768-no is used by google at slideshows
    bigImage = lastImage.replace(/\/s[0-9]+/, '/w' + width + '-h' + height + '-no');
    // sizes: 128, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600
    if (width > 400) {
      preview = lastImage.replace(/\/s[0-9]+(-c)?/, '/s400');
    } else {
      preview = bigImage;
    }
    return {
      id: data.id.$t,
      name: data.summary.$t || data.title.$t,
      mediaType: 'picture',
      fileUrl: normalizeUri(bigImage),
      thumbnailUrl: normalizeUri(lastImage),
      previewUrl: normalizeUri(preview),
      createdAt: data.published.$t,
      tags: [],
      width: width,
      height: height
    };
  };
}(bower_components_wixmp_manager_src_utils_normalize_uri);
bower_components_wixmp_manager_src_sources_picasa_parsers_items = function (toItem) {
  
  return function (data) {
    return {
      data: data.feed.entry.map(toItem),
      paging: {
        cursor: data.feed.openSearch$startIndex.$t + data.feed.openSearch$itemsPerPage.$t,
        pageSize: data.feed.openSearch$itemsPerPage.$t
      }
    };
  };
}(bower_components_wixmp_manager_src_sources_picasa_mappers_item);
bower_components_wixmp_manager_src_sources_picasa_items = function (http, toItems, toError) {
  
  return function (settings) {
    function successHandler(response) {
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        album_id: folderId || null,
        kind: 'photo',
        thumbsize: '150c',
        'max-results': options.paging.pageSize || 50,
        'start-index': options.paging.cursor || 1
      };
      return http.get(settings.apiUrl + '/photos', requestOptions, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_picasa_parsers_items, bower_components_wixmp_manager_src_sources_picasa_parsers_error);
bower_components_wixmp_manager_src_sources_picasa_Picasa = function (settings, initFolders, initItems, decorators, eventsList) {
  
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
    this.name = 'picasa';
  };
}(bower_components_wixmp_manager_src_sources_picasa_settings, bower_components_wixmp_manager_src_sources_picasa_folders, bower_components_wixmp_manager_src_sources_picasa_items, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list);
bower_components_wixmp_manager_src_sources_instagram_settings = {
  apiUrl: 'http://pix-test.wix.com/services/instagram',
  api2Url: 'http://pix-test.wix.com/services/instagram2'
};
bower_components_wixmp_manager_src_sources_instagram_mappers_folder = function (data) {
  return {
    id: 'Instagram',
    name: 'Instagram',
    mediaType: 'picture',
    parentId: null,
    filesCount: data.counts.media,
    createdAt: null
  };
};
bower_components_wixmp_manager_src_sources_instagram_parsers_folders = function (toFolder) {
  
  return function (data) {
    return { data: [toFolder(data)] };
  };
}(bower_components_wixmp_manager_src_sources_instagram_mappers_folder);
bower_components_wixmp_manager_src_sources_instagram_parsers_error = function (Promise, mappers) {
  
  return function (response) {
    if (response.status === 500) {
      response.status = 403;
      response.data = {
        message: 'Unauthorized',
        result: 'error'
      };
    }
    return Promise.reject(mappers.toError(response));
  };
}(bluebird, bower_components_wixmp_manager_src_utils_mappers);
bower_components_wixmp_manager_src_sources_instagram_folders = function (http, toFolders, toError) {
  
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list() {
      return http.get(settings.apiUrl + '/user', null, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_instagram_parsers_folders, bower_components_wixmp_manager_src_sources_instagram_parsers_error);
bower_components_wixmp_manager_src_sources_instagram_mappers_item = function (normalizeUri) {
  
  return function (data) {
    if (!data.caption) {
      data.caption = { text: '' };
    }
    return {
      id: data.id,
      name: data.caption.text,
      mediaType: 'picture',
      fileUrl: normalizeUri(data.images.standard_resolution.url),
      thumbnailUrl: normalizeUri(data.images.low_resolution.url),
      previewUrl: normalizeUri(data.images.standard_resolution.url),
      createdAt: +data.created_time * 1000,
      tags: data.tags,
      width: data.images.standard_resolution.width,
      height: data.images.standard_resolution.height
    };
  };
}(bower_components_wixmp_manager_src_utils_normalize_uri);
bower_components_wixmp_manager_src_sources_instagram_parsers_items = function (toItem) {
  
  return function (data) {
    data.next = data.next || {};
    var cursor = data.next.max_id || null, pageSize = data.next.count || null;
    return {
      data: data.photos.map(toItem),
      paging: {
        cursor: cursor,
        pageSize: pageSize
      }
    };
  };
}(bower_components_wixmp_manager_src_sources_instagram_mappers_item);
bower_components_wixmp_manager_src_sources_instagram_items = function (http, toItems, toError) {
  
  return function (settings) {
    function successHandler(response) {
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        count: options.paging.pageSize || 50,
        max_id: options.paging.cursor || null
      };
      return http.get(settings.api2Url + '/photos', requestOptions, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_instagram_parsers_items, bower_components_wixmp_manager_src_sources_instagram_parsers_error);
bower_components_wixmp_manager_src_sources_instagram_Instagram = function (settings, initFolders, initItems, decorators, eventsList) {
  
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.name = 'instagram';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
  };
}(bower_components_wixmp_manager_src_sources_instagram_settings, bower_components_wixmp_manager_src_sources_instagram_folders, bower_components_wixmp_manager_src_sources_instagram_items, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list);
bower_components_wixmp_manager_src_sources_facebook_settings = { apiUrl: 'http://pix-test.wix.com/services/facebook2' };
bower_components_wixmp_manager_src_sources_facebook_mappers_folder = function (data) {
  return {
    id: data.id,
    name: data.name,
    mediaType: 'picture',
    parentId: null,
    filesCount: data.count,
    createdAt: data.created_time
  };
};
bower_components_wixmp_manager_src_sources_facebook_parsers_folders = function (toFolder) {
  
  return function (data) {
    return { data: data.data.map(toFolder) };
  };
}(bower_components_wixmp_manager_src_sources_facebook_mappers_folder);
bower_components_wixmp_manager_src_sources_facebook_parsers_error = function (Promise, mappers) {
  
  return function (response) {
    if (response.status === 400 && response.data.error.code === 190) {
      response.status = 403;
    }
    return Promise.reject(mappers.toError(response));
  };
}(bluebird, bower_components_wixmp_manager_src_utils_mappers);
bower_components_wixmp_manager_src_sources_facebook_folders = function (http, toFolders, toError) {
  
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list() {
      return http.get(settings.apiUrl + '/albums', null, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_facebook_parsers_folders, bower_components_wixmp_manager_src_sources_facebook_parsers_error);
bower_components_wixmp_manager_src_sources_facebook_mappers_item = function (normalizeUri, utils) {
  
  function findThumbnailUrl(images, minWidth, minHeight) {
    minHeight = minHeight || 190;
    minWidth = minWidth || 190;
    var bigImages, biggestImage, smallestImage;
    if (images.length === 1) {
      return images[0].source;
    }
    bigImages = images.filter(function (image) {
      return image.width > minWidth && image.height > minHeight;
    });
    smallestImage = utils.min(bigImages, function (image) {
      return image.width + image.height;
    });
    if (smallestImage) {
      return smallestImage.source;
    }
    biggestImage = utils.max(images, function (image) {
      return image.width + image.height;
    });
    return biggestImage.source;
  }
  return function (data) {
    return {
      id: data.id,
      folderId: null,
      name: data.name || '',
      mediaType: 'picture',
      fileUrl: normalizeUri(data.source),
      thumbnailUrl: normalizeUri(findThumbnailUrl(data.images)),
      previewUrl: normalizeUri(data.source),
      createdAt: data.created_time,
      tags: [],
      width: data.width,
      height: data.height
    };
  };
}(bower_components_wixmp_manager_src_utils_normalize_uri, bower_components_wixmp_manager_src_utils_utils);
bower_components_wixmp_manager_src_sources_facebook_parsers_items = function (toItem) {
  
  return function (data) {
    data.paging = data.paging || {};
    data.paging.cursors = data.paging.cursors || {};
    data.paging.cursors.after = data.paging.cursors.after || null;
    return {
      data: data.data.map(toItem),
      paging: {
        cursor: data.paging.cursors.after,
        pageSize: null
      }
    };
  };
}(bower_components_wixmp_manager_src_sources_facebook_mappers_item);
bower_components_wixmp_manager_src_sources_facebook_items = function (http, toItems, toError) {
  
  return function (settings) {
    function successHandler(response) {
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        album_id: folderId,
        limit: options.paging.pageSize || 50,
        after: options.paging.cursor || null
      };
      return http.get(settings.apiUrl + '/photos', requestOptions, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_facebook_parsers_items, bower_components_wixmp_manager_src_sources_facebook_parsers_error);
bower_components_wixmp_manager_src_sources_facebook_Facebook = function (settings, initFolders, initItems, decorators, eventsList) {
  
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.name = 'facebook';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
  };
}(bower_components_wixmp_manager_src_sources_facebook_settings, bower_components_wixmp_manager_src_sources_facebook_folders, bower_components_wixmp_manager_src_sources_facebook_items, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list);
bower_components_wixmp_manager_src_sources_flickr_settings = { apiUrl: 'http://pix-test.wix.com/services/flickr' };
bower_components_wixmp_manager_src_sources_flickr_mappers_folder = function (data) {
  return {
    id: data.id,
    name: data.title._content,
    mediaType: 'picture',
    parentId: null,
    filesCount: +data.photos + +data.videos,
    createdAt: +data.date_create * 1000
  };
};
bower_components_wixmp_manager_src_sources_flickr_parsers_folders = function (toFolder) {
  
  return function (data) {
    return { data: data.photosets.photoset.map(toFolder) };
  };
}(bower_components_wixmp_manager_src_sources_flickr_mappers_folder);
bower_components_wixmp_manager_src_sources_flickr_parsers_error = function (Promise, mappers) {
  
  return function (response) {
    return Promise.reject(mappers.toError(response));
  };
}(bluebird, bower_components_wixmp_manager_src_utils_mappers);
bower_components_wixmp_manager_src_sources_flickr_folders = function (http, toFolders, toError) {
  
  return function (settings) {
    function successHandler(response) {
      return toFolders(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list() {
      return http.get(settings.apiUrl + '/albums', { primary_photo_extras: 'url_t,url_s,url_m,url_b,url_o' }, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_flickr_parsers_folders, bower_components_wixmp_manager_src_sources_flickr_parsers_error);
bower_components_wixmp_manager_src_sources_flickr_mappers_item = function (normalizeUri) {
  
  function toThumbnails(photo) {
    var thumbnail = photo.url_m || photo.url_s || photo.url_t, big = photo.url_b || thumbnail, original = photo.url_o || big;
    return {
      fileUrl: original,
      thumbnailUrl: thumbnail,
      previewUrl: big
    };
  }
  return function (data) {
    var thumbnails = toThumbnails(data);
    return {
      id: data.id,
      name: data.title,
      folderId: null,
      mediaType: 'picture',
      fileUrl: normalizeUri(thumbnails.fileUrl),
      thumbnailUrl: normalizeUri(thumbnails.thumbnailUrl),
      previewUrl: normalizeUri(thumbnails.previewUrl),
      createdAt: null,
      tags: [],
      width: +(data.width_o || data.width_m || data.width_s || data.width_t),
      height: +(data.height_o || data.height_m || data.height_s || data.height_t)
    };
  };
}(bower_components_wixmp_manager_src_utils_normalize_uri);
bower_components_wixmp_manager_src_sources_flickr_parsers_items = function (toItem) {
  
  return function (data) {
    var cursor = data.photoset.page < data.photoset.pages ? data.photoset.page + 1 : null, pageSize = +data.photoset.perpage;
    return {
      data: data.photoset.photo.map(toItem),
      paging: {
        cursor: cursor,
        pageSize: pageSize
      }
    };
  };
}(bower_components_wixmp_manager_src_sources_flickr_mappers_item);
bower_components_wixmp_manager_src_sources_flickr_items = function (http, toItems, toError) {
  
  return function (settings) {
    function successHandler(response) {
      if (response.data.stat === 'fail') {
        return toError(response);
      }
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        extras: 'url_t,url_s,url_m,url_b,url_o',
        set_id: folderId,
        per_page: options.paging.pageSize || 50,
        page: options.paging.cursor || null
      };
      return http.get(settings.apiUrl + '/photoset', requestOptions, { withCredentials: true }).then(successHandler, failHandler);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_sources_flickr_parsers_items, bower_components_wixmp_manager_src_sources_flickr_parsers_error);
bower_components_wixmp_manager_src_sources_flickr_Flickr = function (settings, initFolders, initItems, decorators, eventsList) {
  
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.name = 'flickr';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
  };
}(bower_components_wixmp_manager_src_sources_flickr_settings, bower_components_wixmp_manager_src_sources_flickr_folders, bower_components_wixmp_manager_src_sources_flickr_items, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list);
bower_components_wixmp_manager_src_sources_list = function (Private, Picasa, Instagram, Facebook, Flickr) {
  
  return {
    PRIVATE: Private,
    PICASA: Picasa,
    INSTAGRAM: Instagram,
    FACEBOOK: Facebook,
    FLICKR: Flickr
  };
}(bower_components_wixmp_manager_src_sources_private_Private, bower_components_wixmp_manager_src_sources_picasa_Picasa, bower_components_wixmp_manager_src_sources_instagram_Instagram, bower_components_wixmp_manager_src_sources_facebook_Facebook, bower_components_wixmp_manager_src_sources_flickr_Flickr);
bower_components_wixmp_manager_src_events_events = function (notifier, list, utils) {
  
  var events = {};
  function defineNonEnumerableProperty(name, value) {
    Object.defineProperty(events, name, {
      enumerable: false,
      value: value
    });
  }
  events = utils.merge(list);
  defineNonEnumerableProperty('on', notifier.addListener);
  defineNonEnumerableProperty('off', notifier.removeListener);
  return events;
}(bower_components_wixmp_manager_src_events_notifier, bower_components_wixmp_manager_src_events_list, bower_components_wixmp_manager_src_utils_utils);
bower_components_wixmp_manager_src_connector_connector_settings = {
  PICASA: {
    connectUrl: 'http://pix-test.wix.com/services/google/connect',
    disconnectUrl: 'http://pix-test.wix.com/services/google/disconnect',
    parameterName: 'goglact'
  },
  INSTAGRAM: {
    connectUrl: 'http://pix-test.wix.com/services/instagram/connect',
    disconnectUrl: 'http://pix-test.wix.com/services/instagram/disconnect',
    parameterName: 'instact'
  },
  FACEBOOK: {
    connectUrl: 'http://pix-test.wix.com/services/facebook/connect',
    disconnectUrl: 'http://pix-test.wix.com/services/facebook/disconnect',
    parameterName: 'fbact'
  },
  FLICKR: {
    connectUrl: 'http://pix-test.wix.com/services/flickr/connect',
    disconnectUrl: 'http://pix-test.wix.com/services/flickr/disconnect',
    parameterName: 'flact'
  }
};
bower_components_wixmp_manager_src_connector_connector = function (Promise, connectorSettings, http, utils) {
  
  return function (adapterName, userSettings) {
    var settings = connectorSettings[adapterName];
    if (typeof settings !== 'object') {
      throw new Error('Invalid source');
    }
    function getParameterName() {
      return settings.parameterName;
    }
    function isConnected() {
      return !!localStorage.getItem(settings.parameterName);
    }
    function disconnect() {
      localStorage.removeItem(settings.parameterName);
      http.get(settings.disconnectUrl, null, { withCredentials: true });
    }
    function connect() {
      var promise;
      window.open(settings.connectUrl + '?return_url=' + userSettings.redirectUrl, 'connector', 'width=950,height=550');
      promise = new Promise(function (resolve, reject) {
        window.connectService = function (data) {
          var token, status;
          token = utils.getParameterByName(data, getParameterName());
          status = utils.getParameterByName(data, 'status');
          if (token && (!status || status !== 'FAIL')) {
            resolve(token);
          } else {
            reject('Not Authorized');
          }
        };
      });
      promise.then(function (token) {
        localStorage.setItem(settings.parameterName, token);
      }, function (reason) {
        return reason;
      });
      return promise;
    }
    return {
      isConnected: isConnected,
      disconnect: disconnect,
      connect: connect
    };
  };
}(bluebird, bower_components_wixmp_manager_src_connector_connector_settings, bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_utils_utils);
bower_components_wixmp_manager_src_services_bi_events_ids = {
  severity: {
    info: 10,
    warning: 20,
    error: 30,
    fatal: 40
  },
  BIEventsIds: {
    'folder.create': '112',
    'folder.rename': '115',
    'folder.remove': '117',
    'item.remove': '118',
    responseTime: '125',
    searchItems: '126'
  },
  BIAdaptersIds: {
    private: '01',
    public: '02',
    facebook: '03',
    flickr: '04',
    instagram: '05',
    picasa: '06',
    flickrSearch: '07',
    googleSearch: '08'
  },
  BIAdaptersRequestsIds: {
    'folders.list': '01',
    'folder.create': '02',
    'folder.rename': '03',
    'folder.remove': '04',
    'items.list': '11',
    'item.upload': '12',
    'item.uploadByUrl': '13',
    'item.update': '14',
    'item.remove': '15',
    moveItem: '16',
    'items.search': '17',
    getMoreSearchedItems: '17',
    getItemsByTag: '18',
    transcodeItem: '19'
  }
};
bower_components_wixmp_manager_src_services_bi_request = function (BIEventIds, utils) {
  
  var getBaseHost, error, report, benchmark, send, getCurrentTime, notifyResponseTime, benchmarkRequest;
  send = function (url, data) {
    var biImage = document.createElement('img');
    biImage.setAttribute('src', url + '?' + utils.encodeParams(data));
    biImage = null;
  };
  getCurrentTime = function () {
    return new Date().getTime();
  };
  notifyResponseTime = function (adapter, eventName, data) {
    var requestName = adapter.name + '(' + eventName + ')';
    var responseTime = getCurrentTime() - data.startedAt;
    //console.log('BI: [',requestName, '] ',responseTime, ' ms');
    benchmark({
      requestName: requestName,
      responseTime: responseTime,
      isSuccess: data.isSuccess,
      responseSize: data.responseSize
    });
  };
  benchmarkRequest = function (promise, params) {
    var startedAt = getCurrentTime();
    promise.then(function (result) {
      notifyResponseTime(params.eventTarget, params.eventName, {
        startedAt: startedAt,
        responseSize: 0,
        isSuccess: true
      });
    }).catch(function () {
      notifyResponseTime(params.eventTarget, params.eventName, {
        startedAt: startedAt,
        responseSize: 0,
        isSuccess: false
      });
    });
  };
  getBaseHost = function () {
    return 'http://frog.wixpress.com';  //return settings.biNotifications || (/\.wixpress\.com/i.test(settings.baseHost || document.location.host) ? 'http://frog.wix.com' : 'http://frog.wixpress.com');
  };
  report = function (eventId, data) {
    data.evid = eventId;
    //data = _.extend({
    //  evid: eventId
    //}, data);
    return send(getBaseHost() + '/mg', data);
  };
  error = function (adapterName, eventName, response) {
    var httpCode = response.code || '000', adapterCode = BIEventIds.BIAdaptersIds[adapterName] || '00', requestCode = BIEventIds.BIAdaptersRequestsIds[eventName] || '00', errorDesc = adapterName + ' ' + eventName + ': ' + response.message, errorCode = adapterCode + requestCode + httpCode;
    return send(getBaseHost() + '/trg', {
      src: 25,
      evid: 10,
      // 10 (Error), 20 (Load time)
      iss: 1,
      // issue (sub-category)
      sev: BIEventIds.severity.error,
      errc: errorCode || '0000000',
      ver: 'MEDIA_GALLERY_VERSION',
      site_id: '',
      // ex-did param
      httpc: httpCode || '000',
      dsc: errorDesc || ''
    });
  };
  benchmark = function (data) {
    return send(getBaseHost() + '/mg', {
      evid: BIEventIds.BIEventsIds.responseTime,
      call_name: data.requestName || '',
      ts: data.responseTime || 0,
      result: data.isSuccess ? 'success' : 'fail',
      response_speed: Math.floor(data.responseSize || 0 / (data.responseTime / 1000)),
      response_size: data.responseSize
    });
  };
  return {
    report: report,
    error: error,
    benchmark: benchmarkRequest
  };
}(bower_components_wixmp_manager_src_services_bi_events_ids, bower_components_wixmp_manager_src_utils_utils);
bower_components_wixmp_manager_src_services_bi_bi = function (notifier, eventsList, sendRequest) {
  
  return function (state) {
    var biListener = function (promise, params) {
      // params.eventTarget
      // params.eventName
      sendRequest.benchmark(promise, params);
      var sendError = function (adapter, eventName, response) {
        sendRequest.error(adapter.name, eventName, response);
      };
      var reportSuccess = function (response) {
      };
      var reportError = function (response) {
        sendError(params.eventTarget, params.eventName, response);
      };
      return promise.then(reportSuccess, reportError);
    };
    Object.keys(eventsList).forEach(function (group) {
      Object.keys(eventsList[group]).forEach(function (action) {
        if (state === true) {
          notifier.addListener(eventsList[group][action], biListener);
        } else {
          notifier.removeListener(eventsList[group][action], biListener);
        }
      });
    });
  };
}(bower_components_wixmp_manager_src_events_notifier, bower_components_wixmp_manager_src_events_list, bower_components_wixmp_manager_src_services_bi_request);
bower_components_wixmp_manager_src_wixmp = function (Source, sources, events, externalSourceConnector, enableBI) {
  
  return {
    Source: Source,
    sources: sources,
    events: events,
    bi: enableBI,
    connectExternalSource: externalSourceConnector
  };
}(bower_components_wixmp_manager_src_sources_Source, bower_components_wixmp_manager_src_sources_list, bower_components_wixmp_manager_src_events_events, bower_components_wixmp_manager_src_connector_connector, bower_components_wixmp_manager_src_services_bi_bi);
src_sources_bigstock_settings = { apiUrl: 'http://pix-test.wix.com/services/bigstock' };
src_sources_bigstock_mappers_folder = function (data) {
  return {
    id: data.id,
    name: data.name,
    mediaType: 'picture',
    parentId: null,
    filesCount: null,
    createdAt: null
  };
};
src_sources_bigstock_parsers_folders = function (toFolder) {
  
  return function (data) {
    return { data: data.map(toFolder) };
  };
}(src_sources_bigstock_mappers_folder);
src_sources_bigstock_folders = function (http, toFolders, Promise) {
  
  return function () {
    var folders = toFolders([
      {
        id: null,
        name: 'All'
      },
      {
        id: 'Abstract',
        name: 'Abstract'
      },
      {
        id: 'Animals',
        name: 'Animals'
      },
      {
        id: 'Architecture',
        name: 'Architecture'
      },
      {
        id: 'Backgrounds',
        name: 'Backgrounds'
      },
      {
        id: 'Business',
        name: 'Business'
      },
      {
        id: 'Communication',
        name: 'Communication'
      },
      {
        id: 'Computers',
        name: 'Computers'
      },
      {
        id: 'Conceptual',
        name: 'Conceptual'
      },
      {
        id: 'Editorial',
        name: 'Editorial'
      },
      {
        id: 'Education',
        name: 'Education'
      },
      {
        id: 'Food',
        name: 'Food'
      },
      {
        id: 'Health',
        name: 'Health'
      },
      {
        id: 'Holidays',
        name: 'Holidays'
      },
      {
        id: 'Industry',
        name: 'Industry'
      },
      {
        id: 'Internet',
        name: 'Internet'
      },
      {
        id: 'Landscapes',
        name: 'Landscapes'
      },
      {
        id: 'Maps',
        name: 'Maps'
      },
      {
        id: 'Miscellaneous',
        name: 'Miscellaneous'
      },
      {
        id: 'Musical',
        name: 'Musical'
      },
      {
        id: 'Nature',
        name: 'Nature'
      },
      {
        id: 'Objects',
        name: 'Objects'
      },
      {
        id: 'People',
        name: 'People'
      },
      {
        id: 'Places',
        name: 'Places'
      },
      {
        id: 'Sports',
        name: 'Sports'
      },
      {
        id: 'Transportation',
        name: 'Transportation'
      }
    ]);
    function list() {
      return Promise.resolve(folders);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, src_sources_bigstock_parsers_folders, bluebird);
src_sources_bigstock_mappers_item = function (normalizeUri) {
  
  return function (data) {
    var size = data.formats.pop();
    return {
      id: data.id,
      name: data.title,
      folderId: null,
      mediaType: 'picture',
      fileUrl: null,
      thumbnailUrl: normalizeUri(data.large_thumb.url),
      previewUrl: normalizeUri(data.preview.url),
      createdAt: null,
      tags: [],
      width: size.width,
      height: size.height
    };
  };
}(bower_components_wixmp_manager_src_utils_normalize_uri);
src_sources_bigstock_parsers_items = function (toItem) {
  
  return function (data) {
    var cursor = data.paging && data.paging.page < data.paging.total_pages ? data.paging.page + 1 : null, pageSize = +data.paging.items_per_page;
    return {
      data: data.images.map(toItem),
      paging: {
        cursor: cursor,
        pageSize: pageSize
      }
    };
  };
}(src_sources_bigstock_mappers_item);
src_sources_bigstock_parsers_error = function (mappers) {
  
  return function (response) {
    if (response.data.error.length) {
      response.data.error = response.data.error[0];
    }
    response.data.message = response.data.error.code ? response.data.error.code : response.data.error;
    return Promise.reject(mappers.toError(response));
  };
}(bower_components_wixmp_manager_src_utils_mappers);
src_sources_bigstock_items = function (http, toItems, toError) {
  
  return function (settings) {
    function successHandler(response) {
      response.data = response.data.data;
      return toItems(response.data);
    }
    function failHandler(reason) {
      return toError(reason);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      options.sort = options.sort || {};
      var requestOptions = {
        limit: options.paging.pageSize || 50,
        page: options.paging.cursor || null,
        order: options.sort.field || null,
        category: folderId || null,
        orientation: options.orientation || null
      };
      return http.get(settings.apiUrl + '/search', requestOptions).then(successHandler, failHandler);
    }
    function search(folderId, query, options) {
      options = options || {};
      options.paging = options.paging || {};
      options.sort = options.sort || {};
      var requestOptions = {
        q: query || null,
        limit: options.paging.pageSize || 50,
        page: options.paging.cursor || null,
        order: options.sort.field || null,
        category: folderId || null,
        orientation: options.orientation || null
      };
      return http.get(settings.apiUrl + '/search', requestOptions).then(successHandler, failHandler);
    }
    return {
      list: list,
      search: search
    };
  };
}(bower_components_wixmp_manager_src_utils_http, src_sources_bigstock_parsers_items, src_sources_bigstock_parsers_error);
src_sources_bigstock_BigStock = function (settings, initFolders, initItems, decorators, eventsList) {
  
  return function () {
    var folders = initFolders(settings), items = initItems(settings);
    this.name = 'bigstock';
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
  };
}(src_sources_bigstock_settings, src_sources_bigstock_folders, src_sources_bigstock_items, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list);
src_sources_public_mappers_folder = function (data, parentId) {
  return {
    id: data.guid,
    name: data.title,
    mediaType: data.mediaType,
    parentId: parentId || null,
    filesCount: null,
    createdAt: null
  };
};
src_sources_public_parsers_folders = function (toFolder) {
  
  return function (data) {
    return { data: data.category.children.map(toFolder) };
  };
}(src_sources_public_mappers_folder);
src_sources_public_parsers_error = function (Promise, mappers) {
  
  return function (response) {
    return Promise.reject(mappers.toError(response));
  };
}(bluebird, bower_components_wixmp_manager_src_utils_mappers);
src_sources_public_folders = function (http, toFolders, toError) {
  
  return function (settings) {
    function isParentCategoryId(id) {
      return [
        'backgrounds',
        'clipart',
        'file_icons',
        'icons',
        'photos',
        'watermarks',
        'shapes',
        'social_icons'
      ].indexOf(id) >= 0;
    }
    function list(folderId) {
      var data = { levels: 1 };
      if (isParentCategoryId(folderId)) {
        data.legacyKey = folderId;
      } else {
        data.guid = folderId;
      }
      return http.get(settings.apiUrl + '/categories', data).then(function (response) {
        return toFolders(response.data);
      }, toError);
    }
    return { list: list };
  };
}(bower_components_wixmp_manager_src_utils_http, src_sources_public_parsers_folders, src_sources_public_parsers_error);
src_sources_public_mappers_item = function (normalizeUri) {
  
  function compileUrls(data, settings) {
    var url;
    switch (data.mediaType) {
    case 'picture':
      url = data.thumbnailUrl ? '/micons/' + data.thumbnailUrl : '/media/' + data.sourceUrl;
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + url + '_srz_160_160_75_22_0.5_1.20_0.00_jpg_srz'),
        previewUrl: normalizeUri(settings.filesUrl + url + '_srb_375_375_75_22_0.5_1.20_0.00_jpg_srb'),
        originalUrl: normalizeUri(settings.filesUrl + url)
      };
    case 'shape':
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + '/shapes/' + data.thumbnailUrl),
        previewUrl: normalizeUri(settings.filesUrl + '/shapes/' + data.thumbnailUrl),
        originalUrl: normalizeUri(settings.filesUrl + url)
      };
    default:
      url = data.thumbnailUrl ? '/micons/' + data.thumbnailUrl : '/media/' + data.sourceUrl;
      return {
        thumbnailUrl: normalizeUri(settings.filesUrl + url + '_srz_160_160_75_22_0.5_1.20_0.00_jpg_srz'),
        previewUrl: normalizeUri(settings.filesUrl + url + '_srb_375_375_75_22_0.5_1.20_0.00_jpg_srb'),
        originalUrl: normalizeUri(settings.filesUrl + url)
      };
    }
  }
  return function (settings, data) {
    return {
      id: data.guid,
      name: data.title,
      mediaType: data.mediaType,
      fileUrl: normalizeUri(data.sourceUrl),
      thumbnailUrl: compileUrls(data, settings).thumbnailUrl,
      previewUrl: compileUrls(data, settings).previewUrl,
      createdAt: null,
      tags: [],
      width: data.width,
      height: data.height
    };
  };
}(bower_components_wixmp_manager_src_utils_normalize_uri);
src_sources_public_parsers_items = function (utils, toItem) {
  
  return function (settings, data) {
    data.nextPage = data.nextPage || '';
    var cursor = utils.getParameterByName(data.nextPage, 'pageNumber') || null, pageSize = utils.getParameterByName(data.nextPage, 'pageSize') || null;
    return {
      data: data.items.map(utils.partial(toItem, settings)),
      paging: {
        cursor: cursor,
        pageSize: pageSize
      }
    };
  };
}(bower_components_wixmp_manager_src_utils_utils, src_sources_public_mappers_item);
src_sources_public_items = function (http, utils, toItems, toError) {
  
  return function (settings) {
    function requestItems(action, requestOptions) {
      return http.get(settings.apiUrl + action, requestOptions).then(function (response) {
        return toItems(settings, response.data);
      }, toError);
    }
    function list(folderId, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        guid: folderId || null,
        pageSize: options.paging.pageSize || 50,
        pageNumber: options.paging.cursor || 1
      };
      return requestItems('/items', requestOptions);
    }
    function search(folderId, query, options) {
      options = options || {};
      options.paging = options.paging || {};
      var requestOptions = {
        guid: folderId || null,
        searchString: query || '',
        pageSize: options.paging.pageSize || 50,
        pageNumber: options.paging.cursor || 1
      };
      return requestItems('/search', requestOptions);
    }
    return {
      list: list,
      search: search
    };
  };
}(bower_components_wixmp_manager_src_utils_http, bower_components_wixmp_manager_src_utils_utils, src_sources_public_parsers_items, src_sources_public_parsers_error);
src_sources_public_settings = {
  apiUrl: 'http://publicmedia.wix.com/public',
  filesUrl: 'http://static.wixstatic.com'
};
src_sources_public_Public = function (initFolders, initItems, defaultSettings, utils, decorators, eventsList) {
  
  return function (userSettings) {
    var settings = utils.extend({}, defaultSettings, userSettings), folders = initFolders(settings), items = initItems(settings);
    this.folders = decorators.addEvents(this, eventsList.FOLDERS, folders);
    this.items = decorators.addEvents(this, eventsList.ITEMS, items);
    this.name = 'public';
  };
}(src_sources_public_folders, src_sources_public_items, src_sources_public_settings, bower_components_wixmp_manager_src_utils_utils, bower_components_wixmp_manager_src_sources_decorators, bower_components_wixmp_manager_src_events_list);
src_wixmp = function (sdk, BigStock, Public) {
  
  sdk.sources.BIGSTOCK = BigStock;
  sdk.sources.PUBLIC = Public;
  return sdk;
}(bower_components_wixmp_manager_src_wixmp, src_sources_bigstock_BigStock, src_sources_public_Public);
window.wixmp = src_wixmp;
}());