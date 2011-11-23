/* $Rev: 5780 $ */
/* ------------------------------------------ JQUERY PLUGINS (BEGIN) ------------------------------------------ */
 
if (jQuery) (function($) {
	$.extend($.fn, {
		scrollEvent:function(p) {
			var obj = {
				init:function(items, fun) {
					items.each(function() {
						var visibleAtTop = $(this).offset().top + $(this).height() >= window.scrollY;
						var visibleAtBottom = $(this).offset().top <= window.scrollY + $(window).height();
						if (visibleAtTop && visibleAtBottom) {
							fun($(this).attr('id'), true, null);
						} else {
							fun($(this).attr('id'), false, (visibleAtTop ? 'bottom' : 'top'));
						}
					});
				}
			};
			this.unbind('scroll');
			var items = $(p.eclass);
			this.scroll(function() {
				obj.init(items, p.fun);
			});
			if (('undefined' != typeof p.autostart) && (p.autostart)) {
				obj.init(items, p.fun);
			}
			return false;
		}
	});
})(jQuery);

if (jQuery) (function($) {
	$.countryState = function(c, s) {
		var country = $(c);
		var state = $(s);
		if ((0 == country.length) || (0 == state.length)) {
			return false;
		}
		state.find('option=[value="Outside U.S./Canada"]:first').attr('disabled', true);
		country.change(function() {
			var country_name = country.val();
			if (('' == country_name) || ('UNITED STATES' == country_name) || ('CANADA' == country_name) || ('US' == country_name) ||('CA' == country_name)) {
				state.val('').attr('disabled', false);
			} else {
				state.val('Outside U.S./Canada').attr('disabled', true);
			}
		});
		return true;
	};
})(jQuery);


    /* --- Jajax jQuery plugin (begin) --- */

    if (jQuery) (function($) {

        $.jajax = function(c, p) {
            if ('string' != typeof c) {
                alert('JAJAX url not set');
                return false;
            }
            if ('undefined' == typeof p) {
                p = {};
            }
            if ('undefined' == typeof p.fun) {
                p.fun = null;
            }
            if ('undefined' == typeof p.funParams) {
                p.funParams = null;
            }
            if ('undefined' == typeof p.error) {
                p.error = null;
            }
            if ('undefined' == typeof p.datatype) {
                p.datatype = 'json';
            }
            if ('undefined' == typeof p.post) {
                p.post = '';
            }
            if ('undefined' == typeof p.async) {
                p.async = true;
            }
            if ('undefined' != typeof p.formid) {
                var a = $('#' + p.formid).serialize();
                if (('' != a) && ('' != p.post)) {
                    a += '&';
                }
                if (('boolean' == typeof p.clearform) && (p.clearform)) {
                    $('#' + p.formid).each(function() {
                        this.reset();
                    });
                }
                p.post = a + p.post;
            }
            $.ajax({
                type:'POST',
                url:c,
                data:p.post,
                cache:false,
                async:p.async,
                dataType:p.datatype,
                processData:false,
                scriptCharset:'UTF-8',
                beforeSend:function(xmlHttpRequest) {
                    xmlHttpRequest.setRequestHeader('X-JAJAX-Version', '0.2');
                },
                success:function(response) {
                    if (null != p.fun) {
						if (null != p.funParams) {
							p.fun(response, p.funParams);
						} else {
							p.fun(response);
						}
                    }
                },
                error:function(response) {
                    if (null != p.error) {
                        p.error(response);
                    }
                }
            });
        };

        $.jajaxparse = function(r) {
            if (null == r) {
                return false;
            }
            if ('undefined' != typeof r.innerhtml) {
                for (var i in r.innerhtml) {
                    $('#' + r.innerhtml[i].id).html(r.innerhtml[i].html);
                }
            }
            if ('undefined' != typeof r.appendhtml) {
                for (var i in r.appendhtml) {
                    $('#' + r.appendhtml[i].id).append(r.appendhtml[i].html);
                }
            }
            if ('undefined' != typeof r.prependhtml) {
                for (var i in r.prependhtml) {
                    $('#' + r.prependhtml[i].id).prepend(r.prependhtml[i].html);
                }
            }
            if ('undefined' != typeof r.eval) {
                for (var i in r.eval) {
                    eval(r.eval[i]);
                }
            }
            if ('undefined' != typeof r.addclass) {
                for (var i in r.addclass) {
                    $('#' + r.addclass[i].id).addClass(r.addclass[i].classes);
                }
            }
            if ('undefined' != typeof r.removeclass) {
                for (var i in r.removeclass) {
                    $('#' + r.removeclass[i].id).removeClass(r.removeclass[i].classes);
                }
            }
            if ('undefined' != typeof r.loadjs) {
                for (var i in r.loadjs) {
                    $('head:first').prepend('<script type="text/javascript" src="' + r.loadjs[i] + '"></script>');
                }
            }
            if ('undefined' != typeof r.loadcss) {
                for (var i in r.loadcss) {
                    $('head:first').prepend('<link rel="stylesheet" type="text/css" href="' + r.loadcss[i] + '"/>');
                }
            }
            if ('undefined' != typeof r.redirect) {
                window.location = r.redirect[0];
            }
            if ('undefined' != typeof r.focusId) {
                // setTimeout need for IE browsers
				setTimeout(function() { $('#' + r.focusId[0]).focus(); }, 10);
            }
        };

    })(jQuery);

    /* --- Jajax jQuery plugin (end) --- */

    /* --- Base 64 jQuery plugin (begin) --- */

    if (jQuery) (function($) {
        var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var uTF8Encode = function(string) {
            string = string.replace(/\x0d\x0a/g, "\x0a");
            var output = "";
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);
                if (c < 128) {
                    output += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    output += String.fromCharCode((c >> 6) | 192);
                    output += String.fromCharCode((c & 63) | 128);
                } else {
                    output += String.fromCharCode((c >> 12) | 224);
                    output += String.fromCharCode(((c >> 6) & 63) | 128);
                    output += String.fromCharCode((c & 63) | 128);
                }
            }
            return output;
        };
        var uTF8Decode = function(input) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;
            while ( i < input.length ) {
                c = input.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = input.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = input.charCodeAt(i+1);
                    c3 = input.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
        $.extend({
            base64Encode: function(input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = uTF8Encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
                }
                return output;
            },
            base64Decode: function(input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = keyString.indexOf(input.charAt(i++));
                    enc2 = keyString.indexOf(input.charAt(i++));
                    enc3 = keyString.indexOf(input.charAt(i++));
                    enc4 = keyString.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = uTF8Decode(output);
                return output;
            }
        });
    })(jQuery);

    /* --- Base 64 jQuery plugin (end) --- */

    /* --- Altitle jQuery plugin (begin) --- */

    if (jQuery) (function($) {
            $.alttitle = {
                    setItem:function(item, el) {
                            $.alttitle.listItems[$.alttitle.listItems.length] = {
                                    item:item,
                                    el:el,
                                    visible:false
                            };
                    },
                    getItemIdex:function(item) {
                            for (var i = 0; i<$.alttitle.listItems.length; i++) {
                                    if (item == $.alttitle.listItems[i].item) {
                                            return i;
                                    }
                            }
                            return -1;
                    },
                    getWidthDocument:function() {
                            var width = 0;
                            if ($.browser.msie && $.browser.version < 7) {
                                    var scrollWidth = Math.max(
                                            document.documentElement.scrollWidth,
                                            document.body.scrollWidth
                                    );
                                    var offsetWidth = Math.max(
                                            document.documentElement.offsetWidth,
                                            document.body.offsetWidth
                                    );
                                    if (scrollWidth < offsetWidth) {
                                            width = $(window).width();
                                    } else {
                                            width = scrollWidth;
                                    }
                            } else {
                                    width = $(document).width();
                            }
                            return width;
                    },
                    showAlt:function(itemIndex, clientX, clientY) {
                            if (-1 == itemIndex) {
                                    return false;
                            }
                            var item = $.alttitle.listItems[itemIndex].item;
                            var el = $.alttitle.listItems[itemIndex].el;
                            var propeties = $(item).data('alttitle_propeties');
                            var posX = clientX + propeties.xShift;
                            var posY = clientY + propeties.yShift;
                            posX += self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
                            posY += self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
                            var docWidth = this.getWidthDocument();
                            if (posX + el.outerWidth() > docWidth) {
                                    posX = docWidth - propeties.xStep - el.outerWidth();
                                    posY += propeties.yStep;
                            }
                            var asif = $('#alttitle-substrate:first');
                            if (0 == asif.length) {
                                    asif = $('<iframe id="alttitle-substrate"></iframe>').css('display', 'none').appendTo('body');
                            }
                            asif.css({
                                    'position':'absolute',
                                    'top':posY + 'px',
                                    'left':posX + 'px',
                                    'width':el.outerWidth() + 'px',
                                    'height':el.outerHeight() + 'px',
                                    'border':'none',
                                    'z-index':1000,
                                    'display':'block'
                            });
                            el.css({
                                    'display':'block',
                                    'left':posX + 'px',
                                    'top':posY + 'px'
                            });
                            $.alttitle.listItems[itemIndex].visible = true;
                    },
                    initAlt:function(item, event, delay) {
                            return setTimeout(function() {
                                    $.alttitle.showAlt($.alttitle.getItemIdex(item), event.clientX, event.clientY);
                            }, delay);
                    }
            },
            $.alttitle.listItems = [],
            $.extend($.fn, {
                    alttitle:function(s, p) {
                            var propeties = this.data('alttitle_propeties');
                            if ((null == propeties) || ('undefined' == typeof propeties)) {
                                    propeties = {
                                            delay:300,
                                            xShift:15,
                                            yShift:5,
                                            xStep:15,
                                            yStep:15
                                    };
                            }
                            if ('object' == typeof p) {
                                    $.extend(propeties, p);
                            }
                            this.data('alttitle_propeties', propeties);
                            var el = $(s);
                            if (0 == el.length) {
                                    return false;
                            }
                            this.css({
                                    'position':'relative'
                            });
                            el.css({
                                    'position':'absolute',
                                    'z-index':1001
                            });
                            var itemTimeout = null;
                            this.each(function() {
                                    $.alttitle.setItem(this, el);
                            });
                            this.mouseenter(function(event) {
                                    clearTimeout(itemTimeout);
                                    itemTimeout = $.alttitle.initAlt(this, event, propeties.delay);
                            }).mouseleave(function() {
                                    clearTimeout(itemTimeout);
                                    $.alttitle.listItems[$.alttitle.getItemIdex(this)].visible = false;
                                    $('#alttitle-substrate:first').css('display', 'none');
                                    el.css('display', 'none');
                            }).mousemove(function(event) {
                                    if (!$.alttitle.listItems[$.alttitle.getItemIdex(this)].visible) {
                                            clearTimeout(itemTimeout);
                                            itemTimeout = $.alttitle.initAlt(this, event, propeties.delay);
                                    }
                            });
                    }
            });
    })(jQuery);

    /* --- Altitle jQuery plugin (end) --- */

    /* --- Popup jQuery plugin (begin) --- */

if (jQuery) (function($) {
	$.extend($.fn, {
		popup:function(c, p) {
			var popupobj = {
				openPopup:function() {
					if (!propeties.scroll) {
						popupobj._hiddenBodyScroll();
					}
					if (propeties.modal) {
						popupobj._lockScreen();
					}
					if (propeties.closeESC) {
						popupobj._setCloseKeyUpESC();
					}
					if (propeties.closeOutClick) {
						popupobj._setCloseOutClick();
					}
					popupobj._showPopup();
				},
				closePopup:function() {
					if (!propeties.scroll) {
						popupobj._showBodyScroll();
					}
					if (propeties.modal) {
						popupobj._unLockScreen();
					}
					if (propeties.closeESC) {
						popupobj._unSetCloseKeyUpESC();
					}
					if (propeties.closeOutClick) {
						popupobj._unSetCloseOutClick();
					}
					popupobj._hiddenPopup();
				},
				_hiddenBodyScroll:function() {
					$(window).bind('DOMMouseScroll', popupobj.__blockScroll);
					$(window).bind('mousewheel', popupobj.__blockScroll);
					$(document).bind('mousewheel', popupobj.__blockScroll);
					$(document).bind('keypress', popupobj.__blockScroll);
					$('html').css('overflow', 'hidden');
				},
				_showBodyScroll:function() {
					$(window).unbind('DOMMouseScroll', popupobj.__blockScroll);
					$(window).unbind('mousewheel', popupobj.__blockScroll);
					$(document).unbind('mousewheel', popupobj.__blockScroll);
					$(document).unbind('keypress', popupobj.__blockScroll);
					$('html').css('overflow', 'auto');
				},
				_lockScreen:function() {
					var screenHeight = popupobj._getDocumentHeight();
					var screenWidth = popupobj._getDocumentWidth();
					var lw1 = $('<div id="popup-lockscreen"></div>').css(popupobj._getCSSLock(screenHeight, screenWidth, propeties.color, propeties.zIndex + 5, propeties.opacity * 100)).appendTo('body');
					var lw2 = $('<iframe id="popup-ilockscreen"></iframe>').css(popupobj._getCSSLock(screenHeight, screenWidth, propeties.color, propeties.zIndex, 0)).appendTo('body');
					if (!$.browser.msie) {
						lw1.css('opacity', '0');
						lw2.css('opacity', '0');
						lw1.css('display', 'block').fadeTo(propeties.speed, propeties.opacity);
					} else {
						lw1.css('display', 'block');
					}
					lw2.css('display', 'block');
					$(window).bind('resize', popupobj.__resizeLockScreen);
				},
				_unLockScreen:function() {
					$(window).unbind('resize', popupobj.__resizeLockScreen);
					$('#popup-lockscreen, #popup-ilockscreen').remove();
				},
				_setCloseKeyUpESC:function() {
					$(document).bind('keyup', popupobj.__closeESC);
				},
				_unSetCloseKeyUpESC:function() {
					$(document).unbind('keyup', popupobj.__closeESC);
				},
				_setCloseOutClick:function() {
					$('#popup-lockscreen').bind('mouseup', popupobj.closePopup);
				},
				_unSetCloseOutClick:function() {
					$('#popup-lockscreen').unbind('mouseup', popupobj.closePopup);
				},
				_showPopup:function() {
					var elwidth = elobj.width();
					var wnd = $(window), doc = $(document);
					var postype = 'fixed';
					var top = ((wnd.height() - elobj.height()) / 2);
					if (($.browser.msie && $.browser.version < 7) || (('boolean' == typeof propeties.absolutePosition) && (true == propeties.absolutePosition))) {
						postype = 'absolute';
						top = top + doc.scrollTop();
					}
					elobj.css({
						'position':postype,
						'top':top + 'px',
						'left':((wnd.width() - elwidth) / 2) + 'px',
						'z-index':propeties.zIndex + 10,
						'display':'block'
					});
				},
				_hiddenPopup:function() {
					elobj.css('display', 'none');
				},
				_getDocumentHeight:function() {
					if ($.browser.msie && $.browser.version < 7) {
						var scrollHeight, offsetHeight;
						scrollHeight = Math.max(
							document.documentElement.scrollHeight,
							document.body.scrollHeight
						);
						offsetHeight = Math.max(
							document.documentElement.offsetHeight,
							document.body.offsetHeight
						);
						if (scrollHeight < offsetHeight) {
							return $(window).height() + 'px';
						} else {
							return scrollHeight + 'px';
						}
					}
					return $(document).height() + 'px';
				},
				_getDocumentWidth:function() {
					var scrollWidth, offsetWidth;
					if ($.browser.msie) {
						
						scrollWidth = Math.max(
							document.documentElement.scrollWidth,
							document.body.scrollWidth
						);
						offsetWidth = Math.max(
							document.documentElement.offsetWidth,
							document.body.offsetWidth
						);
						if (scrollWidth < offsetWidth) {
							return $(window).width() + 'px';
						} else {
							return scrollWidth + 'px';
						}
					}
					return $(document).width() + 'px';
				},
				_getCSSLock:function(height, width, color, zindex, opacity) {
					return {
						'position':'absolute',
						'top':'0',
						'left':'0',
						'right':'0',
						'display':'none',
						'bottom':'0',
						'border':'none',
						'width':width,
						'height':height,
						'background-color':color,
						'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')',
						'filter':'progid:DXImageTransform.Microsoft.Alpha(opacity = ' + opacity + ')',
						'filter':'alpha(opacity=' + opacity + ')',
						'moz-opacity':'0',
						'-khtml-opacity':'0',
						'z-index':zindex
					};
				},
				__blockScroll:function(event) {
					event = event || window.event; 
					var target = $(event.target);
					var elid = elobj.attr('id');
					if ((target.attr('id') == elid) || (target.parents('#' + elid).length != 0)) {
					    event.returnValue = false;
					    return true;
					}
					if (event.preventDefault) {
						event.preventDefault();
					}
				    event.returnValue = false;
				    return false;
				},
				__closeESC:function(event) {
					var keycode;
					if (window.event) {
						keycode = window.event.keyCode;
					} else if (event) {
						keycode = event.which;
					} else {
						keycode = false;
					}
					if (27 == keycode) {
						popupobj.closePopup();
					}
				},
				__resizeLockScreen:function() {
					$('#popup-lockscreen, #popup-ilockscreen').css('width', 0).css('width', popupobj._getDocumentWidth());
				}
			}
			if ('string' != typeof c) {
				return true;
			}
			var propeties = this.data('popup_propeties');
			if (('undefined' == typeof propeties) || (null == propeties)) {
				propeties = {
					modal:true,
					color:'#000000',
					opacity:0.5,
					speed:'fast',
					scroll:true,
					zIndex:1000,
					closeESC:true,
					closeOutClick:true,
					absolutePosition:true
				};
			}
			if ('object' == typeof p) {
				$.extend(propeties, p);
			}
			this.data('popup_propeties', propeties);
			elobj = this;
			switch (c) {
				case 'open':
					popupobj.openPopup();
					break;
				case 'close':
					popupobj.closePopup();
					break;
			}
			return false;
		}
	});
})(jQuery);

/* --- Popup jQuery plugin (end) --- */

if (jQuery) (function($) {
	$.extend($.fn, {
		uitabs:function() {
			var ids = '';
			var all_li = this.find('ul li');
			all_li.find('a').each(function() {
				ids += ('' == ids ? '' : ',') + '#profile-tab-' + $(this).attr('href').substr(1);
			}).click(function() {
				$(ids).css('display', 'none');
				all_li.removeClass('active');
				$(this).parent().addClass('active');
				$('#profile-tab-' + $(this).attr('href').substr(1)).css('display','block');
				$(this).blur();
				return false;
			});

		}
	});
})(jQuery);

if (jQuery) (function($) {
	$.screen = function(c, p) {
		if (typeof p == 'undefined') {
			p = {};
		}
		var fullScreenDiv = $('#fullScreenDiv:first');
		if ($.browser.msie) {
			var fullScreenIframe = $('#fullScreenIframe:first');
		}
		if (fullScreenDiv.size() == 0) {
			fullScreenDiv = $('<div id="fullScreenDiv"></div>').css('display', 'none').appendTo('body');
			if ($.browser.msie) {
				fullScreenIframe = $('<iframe id="fullScreenIframe"></iframe>').css('display', 'none').appendTo('body');
			}
		}
		switch (c) {
			case 'lock':
				if (typeof p['opacity'] != 'undefined') {
					$.screen.prototype.propeties['opacity'] = p['opacity'];
				}
				if (typeof p['background-color'] != 'undefined') {
					$.screen.prototype.propeties['background-color'] = p['background-color'];
				}
				if (typeof p['z-index'] != 'undefined') {
					$.screen.prototype.propeties['z-index'] = p['z-index'];
				}
				var height = 0;
				if ($.browser.msie && $.browser.version < 7) {
					var scrollHeight = Math.max(
						document.documentElement.scrollHeight,
						document.body.scrollHeight
					);
					var offsetHeight = Math.max(
						document.documentElement.offsetHeight,
						document.body.offsetHeight
					);
					if (scrollHeight < offsetHeight) {
						height = $(window).height();
					} else {
						height = scrollHeight;
					}
				} else {
					height = $(document).height();
				}
				$.screen.prototype.css['height'] = height + 'px';
				$.screen.prototype.css['background-color'] = $.screen.prototype.propeties['background-color'];
				$.screen.prototype.css['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + ($.screen.prototype.propeties['opacity'] * 100) + ')';
				$.screen.prototype.css['filter'] = 'alpha(opacity=' + ($.screen.prototype.propeties['opacity'] * 100) + ')';
				$.screen.prototype.css['z-index'] = $.screen.prototype.propeties['z-index'];
				fullScreenDiv.css($.screen.prototype.css);
				if (!$.browser.msie) {
					fullScreenDiv.css('opacity', $.screen.prototype.propeties['opacity']);
				} else {
					$.screen.prototype.css['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
					$.screen.prototype.css['filter'] = 'alpha(opacity=0)';
					$.screen.prototype.css['z-index'] = $.screen.prototype.propeties['z-index'] - 2;
					fullScreenIframe.css($.screen.prototype.css);
				}
				fullScreenDiv.css('display', 'block');
				if ($.browser.msie) {
					fullScreenIframe.css('display', 'block');
				}
				break;
			case 'unlock':
				if (fullScreenDiv.size() != 0 ) {
					fullScreenDiv.css('display', 'none');
					if ($.browser.msie) {
						fullScreenIframe.css('display', 'none');
					}
				}
				break;
		}
		return false;
	};
	$.extend($.screen.prototype, {
		propeties: {
			'opacity':0.5,
			'background-color':'#000000',
			'z-index':1000
		},
		css: {
			'position':'absolute',
			'top':'0',
			'left':'0',
			'right':'0',
			'bottom':'0',
			'border':'none',
			'width':'100%',
			'moz-opacity':'0',
			'-khtml-opacity':'0'
		}
	});
})(jQuery);

/* ------------------------------------------ JQUERY PLUGINS (END) ------------------------------------------ */

/* ------------------------------------------ Common.js (begin) ------------------------------------------ */

function offIframe() {
	if ((window != top) || (self != top)) {
		top.location.href = location.href;
	}
}

$(document).ready(function() {
	offIframe();
});

var hr = escape(window.location.href);
var popups = new Array();

function MM_preloadImages() { //v3.0
    var d=document;
    if (d.images) {
        if (!d.MM_p) {d.MM_p = new Array();}
        var i,j=d.MM_p.length,
            a=MM_preloadImages.arguments;
        for(i=0; i<a.length; i++) {
            if (a[i].indexOf("#")!=0){
                d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];
            }
        }
    }
}

function MM_swapImgRestore() { //v3.0
    var i,x,a=document.MM_sr;
    for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) {x.src=x.oSrc;}
}

function MM_findObj(n, d) { //v4.0
    var p,i,x;
    if (!d) {d=document;}
    if ((p=n.indexOf("?"))>0&&parent.frames.length) {
        d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);
    }
    if (!(x=d[n])&&d.all) {x=d.all[n];}
    for (i=0;!x&&i<d.forms.length;i++) {x=d.forms[i][n];}
    for (i=0;!x&&d.layers&&i<d.layers.length;i++) {x=MM_findObj(n,d.layers[i].document);}
    if (!x && document.getElementById) {x=document.getElementById(n);}
    return x;
}

function MM_swapImage() { //v3.0
    var i,j=0,x,a=MM_swapImage.arguments;
    document.MM_sr=new Array;
    for(i=0;i<(a.length-2);i+=3) {
        if ((x=MM_findObj(a[i]))!=null){
            document.MM_sr[j++]=x;
            if(!x.oSrc) {x.oSrc=x.src;}
            x.src=a[i+2];
        }
    }
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
    window.open(theURL,winName,features);
}

function Popup(url,width,height,target,status){
    if(!target) target = '_blank';
    if(!width)  width  = '430';
    if(!height) height = '250';
    if(!status) status = 'no';
    popups[popups.lenght] = window.open(url, target, "width="+width+", height="+height+", scrollbars=yes, status="+status+", resizable=yes");
}

function Replay(id,url){
    document.getElementById(id).src=url;
}


function submit_tell_friend(form, type, templ){
    real_action = '/tell_friend.php';
    target = "_tell_friend";
    if (type != 3) {
        email = form.friendsemail.value;
        arr = email.match("^[0-9a-zA-Z]([0-9a-zA-Z\._\-]*)@(([0-9a-zA-Z\-]+\.)+)([0-9a-zA-Z\-]+)$");
	if (!arr) {
            alert("Please enter valid email");
            return;
        }
    }
    if (type == 2) {
        window.open(real_action + "?type=2&friend_email=" + escape(email), target, "width=580, height=400, location=0, menubar=0, status=0, resizable=1");
    } else if (type == 3) {
        window.open(real_action + "?type=3&templ=" + escape(templ), target, "width=580, height=400, location=0, menubar=0, status=0, resizable=1");
    } else {
        window.open(real_action + "?friend_email=" + escape(email), target, "width=580, height=400, location=0, menubar=0, status=0, resizable=1");
    }
}

function wopen2(url){
    window.open(url, 'ww', 'width=600, height=450, location=no,resizable=yes,scrollbars=yes');
}

function wopen(url){
    window.open(url, 'ww', 'width=550, height=450, location=no,resizable=yes,scrollbars=yes');
}
function wopen3(url) {
    window.open(url, 'ww', 'width=575, height=385, location=no,resizable=yes,scrollbars=no');
}

/******************POPUP*******************/

function getClientCenterX() {
    return parseInt(getClientWidth()/2)+getBodyScrollLeft();
}

function getClientCenterY() {
    return parseInt(getClientHeight()/2)+getBodyScrollTop();
}

function getClientWidth() {
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

function getClientHeight() {
    return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}

function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

function getBodyScrollLeft() {
    return self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
}

function hidden(id) {
    document.getElementById('price').value = '';
    document.getElementById('info').innerHTML = '';
    document.getElementById(id).style.display = 'none';
    document.getElementById('iframe').style.display = 'none';
}


function showpopup(id,tml_id) {
    template_id = tml_id;
    document.getElementById(id).style.top = getBodyScrollTop()+(getClientHeight()/4);
    document.getElementById('iframe').style.top = getBodyScrollTop()+(getClientHeight()/4);
    document.getElementById('iframe').style.display = 'block';
    document.getElementById(id).style.display = 'block';
    document.getElementById('price').focus();
}

function checkPrice() {
    var price = document.getElementById('price').value;
    if (price >= 5) {
        add_link = "javascript: cartWithYourPrice('"+template_id+"', '"+price+"')";
        document.getElementById('buy').href = add_link;
        document.getElementById('add').href = add_link;
    } else {
        document.getElementById('info').innerHTML = "We are sorry but you cannot set the price that is lower than $5.";
    }
}

/*********************************************************/

function tell_a_friend(e) {
    var f = $(e).closest('form');
    var dataToSend=f.serialize();
    var urlToRequest=f.attr('action')+'?';
    $.ajax({
       url: urlToRequest,
       data: dataToSend,
       dataType:'json',
       success: function(json) {
           if (json && json.type) {
               switch(json.type) {
                   case "error":
                       var v='';
                       for (i=0;json.data.length>i;i++) {v=v+(json.data[i])+'<br />';}
                       $("#tell-a-friend-errors").html('<label style="color: red; font-weght: normal;">' + v + '<br></label>');
                       break;
                   case "ok":
                       $("#tell-a-friend-errors").html('<label style="color: #3F89C3;">' + json.data + '<br><br></label>');
                       $('input[name="friend_email"]',f).val('');
                       $('input[name="friend_name"]',f).val('');
                       break;
               }
           }
       }
    });
}

function ga_track_banner(banner_code){
    try {
        if (_gaq) {
			_gaq.push(['b._trackEvent', 'OutLinks', banner_code.bid, banner_code.data]);
        }
    }
    catch(err) {}
}

function trim(text) {
    return (text || "").replace(/^\s+|\s+$/g, "");
}

/* ------------------------------------------ Common.js (end) ------------------------------------------ */

/* ------------------------------------------ Absolute-div.js (begin) ------------------------------------------ */

var IE = 0;
if (navigator.userAgent.indexOf("MSIE")!=-1) IE = 1;
var IE70 = 0;
if (navigator.userAgent.indexOf("MSIE 7.0")!=-1) IE70 = 1;
var konqueror = 0;
if (navigator.userAgent.indexOf("Konqueror") !=-1) konqueror = 1;
var opera = 0;
if (navigator.userAgent.indexOf("Opera")!=-1) opera = 1;
var FF20 = 0;
if (navigator.userAgent.indexOf("Firefox/2.0")!=-1) FF20 = 1;
var FF15 = 0;
if (navigator.userAgent.indexOf("Firefox/1.5")!=-1) FF15 = 1;
var safari419_3 = 0;
if (navigator.userAgent.indexOf("Safari/419")!=-1) safari419_3 = 1;


function show_hide_block(block,id) {
    var div_block=document.getElementById(current_popuppeds[block][1]+id);
    if(div_block.style.display != 'none' && (!current_popuppeds[block][2] || current_popuppeds[block][4])) {
        div_block.style.display = 'none';
        removeBodyClickListener();
    } else if(div_block != null) {
        auto_hide_blocks();
        div_block.style.display = '';
        addBodyClickListener();
    }

    if((current_popuppeds[block][0]!="") && (current_popuppeds[block][0]!=id)){
        var div_block=document.getElementById(current_popuppeds[block][1]+current_popuppeds[block][0]);
        div_block.style.display = 'hidden';
        removeBodyClickListener();
    }

    //change_visibility(current_popuppeds[block][1]);

    current_popuppeds[block][0]=id;
}

function auto_hide_blocks() {
    var i=0;
    for(i=0;i<current_popuppeds.length;i++) {
        if(current_popuppeds[i][3] && current_popuppeds[i][0] != "") {
            var div_block=document.getElementById(current_popuppeds[i][1]+current_popuppeds[i][0]);
            if(div_block!=null) {
                div_block.style.display = 'none';
                //change_visibility(current_popuppeds[i][1]);
            }
        }
    }
    removeBodyClickListener();
}

function hide_all_blocks(event) {
    if((event.type=='mousedown'&&event.button==0) || event == 'mousedown') {
        var i=0;
        for (i=0;i<current_popuppeds.length;i++) {
            if (current_popuppeds[i][2] &&  current_popuppeds[i][0] != "") {
                var div_block=document.getElementById(current_popuppeds[i][1]+current_popuppeds[i][0]);
                if (div_block!=null) div_block.style.display = 'none';
                //change_visibility(current_popuppeds[i][1]);
            }
        }
        removeBodyClickListener();
    }
    return(true);
}

function hide_all_blocks_listener() {
    hide_all_blocks('mousedown');
}

function cancelBubbleEvent(elementObject, event) {
    event.cancelBubble=true;
    if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    if (elementObject.stopPropagation) {
        elementObject.stopPropagation();
    }
    return false;
}


function addBodyClickListener() {
    AttachEvent(document.body, 'mousedown', hide_all_blocks_listener, false);
}

function removeBodyClickListener() {
    if (document.body.removeEventListener) { //Mozilla
        document.body.removeEventListener("mousedown", hide_all_blocks_listener, false);
    } else if (document.detachEvent) { //IE
        document.body.detachEvent('mousedown', hide_all_blocks_listener);
    }
}

function AttachEvent(obj,evt,fnc,useCapture) {
    if (!useCapture) {useCapture=false;}
    if (obj.addEventListener) {
        obj.addEventListener(evt,fnc,useCapture);
        return true;
    } else if (obj.attachEvent) {
        return obj.attachEvent("on"+evt,fnc);
    } else {
        MyAttachEvent(obj,evt,fnc);
        obj['on'+evt]=function(){MyFireEvent(obj,evt)};
    }
}

//The following are for browsers like NS4 or IE5Mac which don't support either
//attachEvent or addEventListener

function MyAttachEvent(obj,evt,fnc){
    if (!obj.myEvents) obj.myEvents={};
    if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
    var evts = obj.myEvents[evt];
    evts[evts.length]=fnc;
}
function MyFireEvent(obj,evt){
    if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
    var evts = obj.myEvents[evt];
    for (var i=0,len=evts.length;i<len;i++) evts[i]();
}

/* ------------------------------------------ Absolute-div.js (end) ------------------------------------------ */

/* ------------------------------------------ Formsubmit.js (begin) ------------------------------------------ */

function isEnterPressed(e){
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;
    else
        return false;
    return (keycode == 13);
}

var cssFix = function(){
var u = navigator.userAgent.toLowerCase(),
addClass = function(el,val){
    if(!el.className) {
        el.className = val;
    } else {
        var newCl = el.className;
        newCl+=(" "+val);
        el.className = newCl;
    }
},
is = function(t){return (u.indexOf(t)!=-1)};
addClass(document.getElementsByTagName('html')[0],[
(!(/opera|webtv/i.test(u))&&/msie (\d)/.test(u))?('ie ie'+RegExp.$1)
:is('firefox/2')?'gecko ff2'
:is('firefox/3')?'gecko ff3'
:is('gecko/')?'gecko'
:is('opera/9')?'opera opera9':/opera (\d)/.test(u)?'opera opera'+RegExp.$1
:is('konqueror')?'konqueror'
:is('safari/')?'webkit safari'
:is('mozilla/')?'gecko':'',
(is('x11')||is('linux'))?' linux'
:is('mac')?' mac'
:is('win')?' win':''
].join(" "));
}();

function checkFormSubmitEnter(event) {
    if ((event.keyCode==10) || (event.keyCode==13)) {
        return true
    }
    return false;
}

function formSubmitEnter(event) {
    if (checkFormSubmitEnter(event)) {
        event.target.form.submit();
    }
}

/* ------------------------------------------ Formsubmit.js (end) ------------------------------------------ */

/* ------------------------------------------ Cart functions (begin) ------------------------------------------ */

      var isFocused = 0;

        function updateInfo(result) {
                if (typeof result.location != 'undefined') {
                        var error = '';
                        if (typeof result.update != 'undefined') {
                                if (typeof result.update[0] != 'undefined') {
                                        error = result.update[0].html;
                                }
                        }
                        window.location = result.location+'&error='+escape(error);
                }
                if (typeof result.ga != 'undefined') {
                    for (var index in result.ga) {
                        _gaq.push(['b._trackEvent', 'BillingDetailsFormError', result.ga[index].field_name, result.ga[index].field_value]);
                    }
                }
                if (typeof result.update != 'undefined') {
                        for (var index in result.update) {
                            if ($('#' + result.update[index].id).length > 0) {
                                $('#' + result.update[index].id).html(result.update[index].html);
                            }
                        }
                }
                if (typeof result.style != 'undefined') {
                        for (var index1 in result.style) {
                                switch (result.style[index1].action) {
                                        case 'add':
                                                $('#' + result.style[index1].id).addClass(result.style[index1]._class);
                                                break;
                                        case 'del':
                                                $('#' + result.style[index1].id).removeClass(result.style[index1]._class);
                                                break;
                                }
                        }
                }
                if (typeof result.focusId != 'undefined') {
                        isFocused = 1;
                        $('#' + result.focusId[0]).focus();
                        isFocused = 0;
                }
				if (typeof result.eval != 'undefined') {
					eval(result.eval);
				}
        }

        function verify_email_info(postData, youSure) {
            var isYouSure = true;
            if ('boolean' == typeof youSure) {
                isYouSure = youSure;
            }
            if (isFocused == 0 && isYouSure) {
                $.jajax('/jajaxserver.php?app=SystemCart&controller=CheckFormDetails&action=checkDetails', {
                    fun:updateInfo,
                    formid:'form',
                    post:postData
                });
            }
            return false;
        }

        function verify_alternative_checkout_info(postData) {
			$.jajax('/jajaxserver.php?app=SystemCart&controller=CheckFormDetails&action=checkAlternativeCheckout', {
				fun:$.jajaxparse,
				post:postData
			});
            return false;
        }

        function getPopupContent(tab) {
            $.jajax('/jajaxserver.php?app=SystemCart&controller=Popups&action=content', {
                fun:function(result) {
                    $('#listTabsPopup li a').blur();
                    $('#listTabsPopup li').removeClass('active');
                    $('#listTabsPopup li.' + result.tab).addClass('active');
                    $('#ajax-email-popup-content').html(result.html);
                },
                post:'name=' + tab
            });
            return false;
        }

        function showDiscount(id) {
            // Author: Ujeen
            var targetContainerId = 'discountPopup';
            if (document.getElementById(targetContainerId) == null) {$('body').append('<div id='+targetContainerId+'></div>');}
            $('#'+targetContainerId).html($('#'+id).html()).css({'visibility':'hidden','display':'block'});
        }

        function showPreviewOfferDiscountPopup(text) {
            $('#discountPopup').html(text).css({'visibility':'hidden','display':'block'});
        }

        function moveDiscount(e,width) {
           var popup=$('#discountPopup');
           var offsetX=e.pageX-popup.width()/2;
           var offsetY=e.pageY-popup.height()-20;
           popup.css({'top' : offsetY,'left': offsetX,'visibility' : 'visible','width':width});
        }

        function hideDiscount() {
            document.getElementById('discountPopup').style.display = 'none';
        }

/* ------------------------------------------ Cart functions (end) ------------------------------------------ */

/* ------------------------------------------ INIT AFTER DOM READY (BEGIN) ------------------------------------------ */

$(function () {

    /* --- Align today's thumbnails (begin) --- */

    if ($('#featured_cell_0').length > 0) {

        function align_todays_thumbnails(first_cell_arg, second_cell_arg) {
            var first_cell = $('#featured_cell_' + first_cell_arg);
            var first_cell_meta = first_cell.children('.template_meta');
            var first_cell_price = first_cell.children('.product-price');
            var second_cell = $('#featured_cell_' + second_cell_arg);
            var second_cell_meta = second_cell.children('.template_meta');
            var second_cell_price = second_cell.children('.product-price');
            if (first_cell_meta.height() > second_cell_meta.height()) {
                second_cell_meta.css('height', first_cell_meta.height());
            } else {
                first_cell_meta.css('height', second_cell_meta.height());
            }
            if (first_cell_price.height() > second_cell_price.height()) {
                second_cell_price.css('height', first_cell_price.height());
            } else {
                first_cell_price.css('height', second_cell_price.height());
            }
        }

        if ($('body').hasClass('isIE') || $('body').hasClass('isIE6')) {
            $(function () {
                align_todays_thumbnails(0,1);
                align_todays_thumbnails(2,3);
            });
        } else {
            align_todays_thumbnails(0,1);
            align_todays_thumbnails(2,3);
        }

    }

    /* --- Align today's thumbnails (end) --- */

    /* --- Align thumbnails -> category page (begin) --- */

    if ($('#template_row_0').length > 0) {

        function align_thumbnails() {
            var i=0;
            while (document.getElementById('template_row_'+i)!=null) {
                var meta_max_height=0;
                var price_max_height=0;
                $('#template_row_'+i+' .template_meta').each(function(index) {
                    if ($(this).height()>meta_max_height) {
                        meta_max_height=$(this).height();
                    }
                }).css('height',meta_max_height);
                $('#template_row_'+i+' .product-price').each(function(index) {
                    if ($(this).height()>price_max_height) {
                        price_max_height=$(this).height();
                    }
                }).css('height',price_max_height);
                i++;
            }
        }
        if ($('body').hasClass('isIE') || $('body').hasClass('isIE6')) {
            $(function () {align_thumbnails();});
        } else {
            align_thumbnails();
        }

    }

    /* --- Align thumbnails -> category page (end) --- */

    /* --- Thumbnails links events (begin) --- */

    if ($('.picture_menu').length > 0) {

        $('.picture_menu a').each(function() {
            $(this).click(function() {
                _gaq.push(['b._trackEvent', 'SiteUsage', 'smallPreview', $(this).text()]);
            });
        });

    }

    /* --- Thumbnails links events (end) --- */

    /* --- Shopping cart link event (begin) --- */

        $('#shopping_cart').click(function() {
            cart('');
            return false;
        });

    /* --- Shopping cart link event (end) --- */

   /* --- Accounts popup (begin) --- */

    var accountsPopup = new function() {

        var wac_popup = new Object();

        var getVerticalOffset = function() {
            return ($(window).height() - wac_popup.front.height())/2;
        }

        var getHorizontalOffset = function() {
            return ($(window).width() - wac_popup.front.width())/2;
        }

        var beforeShowWacPopup = function(iframe_width, iframe_height, class_name) {
			$.screen('lock', {
				opacity:'0.6'
			});
			$('#account_back_popup').css('display', 'block');
			$('body').addClass(wac_popup.meta.body_class);
            wac_popup.front.css('visibility','visible');
            wac_popup.content.addClass(class_name);
            wac_popup.content.children("#beforeSignInPopup").remove();

            var beforeSignInDiv = $("#beforeSignInPopup").clone(true);

            if ('undefined' !== typeof wac_popup.iframe) {
                wac_popup.iframe.hide();
            }
            wac_popup.content.append(beforeSignInDiv);

            $(beforeSignInDiv).css({
                'height' : iframe_height + 'px',
                'width' : iframe_width + 'px',
                'display' : 'block'
            });

            wac_popup.front.css({
                'top' : getVerticalOffset(),
                'left' : getHorizontalOffset(),
                'display' : 'block'
            });
        }

        var showWacPopup = function(iframe_src, iframe_width, iframe_height, class_name) {
			$.screen('lock', {
				opacity:'0.6'
			});
			$('#account_back_popup').css('display', 'block');
			$('body').addClass(wac_popup.meta.body_class)
            wac_popup.front.css('visibility','visible');
            wac_popup.content.addClass(class_name);
            wac_popup.content.children("#beforeSignInPopup").remove();

            if ('undefined' === typeof wac_popup.iframe) {
                wac_popup.iframe = $('<iframe src="' + iframe_src + '" width="' + iframe_width + '" height="' + iframe_height + '" frameborder="0" scrolling="no"></iframe>');
                wac_popup.iframe.load(function() {
                    if ($(this).attr('src') != wac_popup.meta.blank_iframe) {
                        wac_popup.front.addClass(wac_popup.meta.loaded_iframe_class);
                    }
                });
                wac_popup.content.append(wac_popup.iframe);
            } else {
                wac_popup.iframe.attr({
                    width : iframe_width,
                    height : iframe_height,
                    src : iframe_src
                });
                wac_popup.iframe.show();
            }

            wac_popup.front.css({
                'top' : getVerticalOffset(),
                'left' : getHorizontalOffset(),
                'display' : 'block'
            });
        }

        var hideWacPopup = function() {
			$.screen('unlock');
			$('#account_back_popup').css('display', 'none');
			wac_popup.front.css('display','none');
			replaceFlashContent(false);
            wac_popup.front.css({
                'visibility' : 'hidden',
                'display' : 'none'
            });
            if ('undefined' !== typeof wac_popup.iframe) {
                wac_popup.iframe.attr('src',wac_popup.meta.blank_iframe);
            }
            wac_popup.content.removeAttr('class');
            wac_popup.content.children("#beforeSignInPopup").remove();
            $('body').removeClass(wac_popup.meta.body_class);
        }

		var prepareWacPopup = function(authState, params) {
			switch (params.thisObject.attr('id')) {
				case 'edit_billing_details':
					iframe_width = 324;
					iframe_height = 450;
					class_name = 'billing';
					if (authState[0]) {
						break;
					}
				case 'sign_in':
				case 'sign_in_button':
					iframe_width = 324;
					iframe_height = 212;
					class_name = 'sign';
					var siclasses;
					if ('undefined' == typeof params.thisObject.attr('class')) {
						siclasses = [];
					} else {
						siclasses = params.thisObject.attr('class').split(' ');
					}
					for (var i in siclasses) {
						if ('preview_fid_' == siclasses[i].substr(0, 12)) {
							flem = siclasses[i].substr(12);
							replaceFlashContent(true);
							break;
						}
					}
					break;
				default:return false;
			}
			showWacPopup(params.thisObject.attr('href'), iframe_width, iframe_height, class_name);
		}

        this.init = function() {

            wac_popup.front = $('<div id="account_front_popup"><div id="account_popup_content"><a href="#" id="close_account_popup"></a></div></div>');
            wac_popup.back = $('<div id="account_back_popup"></div>');
            wac_popup.meta = {
                blank_iframe : 'about:blank',
                loaded_iframe_class : 'loaded_iframe',
                body_class : 'popup_related'
            }
            $('body').append(wac_popup.front,wac_popup.back);
            wac_popup.content = $('#account_popup_content',wac_popup.front);
            wac_popup.hideTrigger = $('#close_account_popup,#account_back_popup');

            $('#sign_in,#sign_in_button,#edit_billing_details').click(function() {
				$.jajax('/jajaxserver.php?app=Accounts&controller=wac&action=isCustomerAuthorised', {
					fun:prepareWacPopup,
					funParams:{thisObject : $(this)}
				});
                return false;
            }).removeAttr('onclick');

            $('.before_sign_in').click(function() {
                iframe_width = 324;
                iframe_height = 212;
                class_name = 'sign';
                beforeShowWacPopup(iframe_width, iframe_height, class_name);
                return false;
            }).removeAttr('onclick');

            wac_popup.hideTrigger.click(function() {
                hideWacPopup();
                return false;
            });

            $(window).resize(function() {
                if (wac_popup.front.is(':visible')) {
                    wac_popup.front.css({
                        'top' : getVerticalOffset(),
                        'left' : getHorizontalOffset()
                    });
                }
            });

        }
    }

    accountsPopup.init();

    /* --- Accounts popup (end) --- */

    /* --- Price options -> preview page (begin) --- */

    if ($('#price_options').length > 0) {

        var price_options_form = $('#priceVariantsForm');
        var regular_price_input = $('#regular_price');
        var regular_install_price_input = $('#regular_install_price');
        var preview_page_offers = $('#preview_page_offers');
        var installation_offer = $('input[regularInstallation="on"]',preview_page_offers);
        var total_amount_tag = $('#total_order_amount_bottom .order_amount');

        function toggleSelectPriceClass() {
            if ($('.selected input:checked',price_options_form).length == 0) {
                $('.selected',price_options_form).removeClass('selected');
                $('input:checked',price_options_form).closest('.price_block').addClass('selected');
            }
        }

        function calculatePreviewTempaltePrice() {
            var total_price_option_amount = 0;
            var total_offer_amount = 0;
            var total_order_amount = 0;
            total_price_option_amount = parseInt($('input:checked',price_options_form).attr('price'));
            $('input:checked',preview_page_offers).each(function(index) {
                total_offer_amount += parseInt($(this).attr('price'));
            });
            total_order_amount = total_price_option_amount + total_offer_amount;
            total_amount_tag.html(total_order_amount);
        }

        $('input',price_options_form).each(function() {
            var button=$(this);
            var blockHeight=button.closest('.price_content').height()/2;
            var inputHeight=button.height()/2;
            button.css('margin-top',blockHeight-inputHeight+'px');
        }).change(function() {
            if($(this).get(0) === regular_price_input.get(0)) {
                if ($(this).is(':checked')) {
                    if (installation_offer.is(':checked')) {
                        installation_offer.removeAttr('checked');
                    }
                }
            } else if ($(this).get(0) === regular_install_price_input.get(0)) {
                if ($(this).is(':checked')) {
                    if (!installation_offer.is(':checked')) {
                        installation_offer.attr('checked',true);
                    }
                }
            } else {
                if ($(this).is(':checked')) {
                    if (installation_offer.is(':checked')) {
                        installation_offer.removeAttr('checked');
                    }
                }
            }
            toggleSelectPriceClass();
            calculatePreviewTempaltePrice();
        }).click(function(event) {
            event.stopPropagation();
        });
        $('.price_block').click(function() {
            $(this).find('input').click().change();
        });

        if ($('input:checked',price_options_form).length == 0) {
            if ($('.recommended input',price_options_form).length > 0) {
                $('.recommended input',price_options_form).attr('checked',true);
            } else {
                regular_price_input.attr('checked',true);
            }
        } else {
            if (regular_price_input.is(':checked') && installation_offer.is(':checked')) {
                regular_install_price_input.attr('checked',true);
            }
        }

        toggleSelectPriceClass();

        $('input',preview_page_offers).change(function() {
            if ($(this).get(0) === installation_offer.get(0)) {
                if ($(this).is(':checked')) {
                    if (regular_price_input.is(':checked')) {
                        regular_install_price_input.attr('checked',true);
                        toggleSelectPriceClass();
                    }
                } else {
                    if (regular_install_price_input.is(':checked')) {
                        regular_price_input.attr('checked',true);
                        toggleSelectPriceClass();
                    }
                }
            }
            calculatePreviewTempaltePrice();
        });

        var preview_offer_toggle_switchers = $('#preview_page_offers .toggle_switcher');

        preview_offer_toggle_switchers.each(function(index) {
            $(this).click(function() {
                $('.offer_description',$(this).closest('li')).toggle();
                $(this).toggleClass('active');
                return false;
            });
            $(this).removeAttr('onclick');
        });

        var preview_offer_discount_labels = $('#preview_page_offers .price_text strike');

        if (preview_offer_discount_labels.length > 0) {
            var discount_label_title_text = '';
            if (!($('#discountPopup').length > 0)) {
                $('body').append('<div id="discountPopup"></div>');
            }
            preview_offer_discount_labels.each(function(index) {
                discount_label_title_text = $(this).prop('title');
                $(this).data('title',discount_label_title_text);
                $(this).removeAttr('title').hover(function() {
                    showPreviewOfferDiscountPopup($(this).data('title'));
                },function() {
                    hideDiscount();
                }).mousemove(function(event) {
                    moveDiscount(event,'auto');
                });
            });
        }

        /* --- Preview page offers (end) --- */
    }

    /* --- Price options -> preview page (end) --- */

    /* --- Price options -> live demo page (begin) --- */

    if ($('#price_choice_form').length > 0) {

        $('#price_choice_form .recommended input').attr('checked','true');

        $('#price_choice_form input').change(function() {
            $('#price_choice_form .recommended').removeClass('recommended');
            $(this).parent().addClass('recommended');
        });

    }

   /* --- Price options -> live demo page (end) --- */

    /* --- Main banner switch (begin) --- */

    if ($('#banners_list li').length > 1) {

        var banners_list = $('#banners_list');
        var banners_list_items = $('li',banners_list);
        var banner_buttons = $('#banner_buttons');

        var switchBannerTimeout;
        function switch_banner(control_button) {
            var active_banner = $('.active_banner', banners_list);
            var active_button = $('.active_button', banner_buttons);
            if (control_button.index() !== active_banner.index()) {
                banners_list_items.not('.active_banner').css('display','none');
                var banner_to_activate = banners_list_items.eq(control_button.index());
                active_banner.removeClass('active_banner');
                banner_to_activate.addClass('active_banner');
				active_banner.fadeOut(500, function() {
			        active_button.removeClass('active_button');
			        control_button.addClass('active_button');
					banner_to_activate.fadeIn(500);
				});
                return true;
            } else {
                return false;
            }
        }
        function auto_switch_banner() {
            var current_button = $('.active_button', banner_buttons);
            switchBannerTimeout = setTimeout(function() {
                if ($('li', banner_buttons).length > current_button.index() + 1) {
                    switch_banner(current_button.next());
                } else {
                    switch_banner($('li', banner_buttons).eq(0));
                }
                auto_switch_banner();
            }, 10000);
        }
        $(window).load(function() {
            var banner_list_html = '';
            banners_list_items.not('.active_banner').each(function() {
                banner_list_html = $.base64Decode($(this).attr('id'));
                $(this).html(banner_list_html).removeAttr('id');
            });
            var not_active_banners_img = $('img',banners_list_items.not('.active_banner'));
            var not_active_banners_img_count = not_active_banners_img.length;
            var counter = 0;
            not_active_banners_img.load(function() {
                counter++;
                if (not_active_banners_img_count == counter) {
                    $('li', banner_buttons).click(function() {
                        clearTimeout(switchBannerTimeout)
                        switch_banner($(this));
                    });
                    auto_switch_banner();
                }
            });
        });

    }

    /* --- Main banner switch (end) --- */

    /* --- Wide preview align -> preview page (begin) --- */

    if ($('#page .flash_preview_box .flashbox iframe').length > 0) {

        var originalIframeWidth = parseInt($('#page .flash_preview_box .flashbox iframe').css('width'));

        if (originalIframeWidth>980) {

            var previewCenterTag = $('#page .flash_preview_box .flashbox center');

            function alignPreview(windowWidth) {
                if (windowWidth>originalIframeWidth+18) {
                    previewCenterTag.css('width','auto');
                } else {
                    if (windowWidth>1000) {
                        previewCenterTag.css('width',windowWidth-18);
                    } else {
                        previewCenterTag.css('width','980px');
                    }
                }
            }

            alignPreview($(window).width());

            $(window).resize(function() {alignPreview($(this).width())});

        }

    }

    /* --- Wide preview align -> preview page (end) --- */

    /* --- Search form (begin) --- */

    if ($('#search-form').length > 0) {

        /* non particles ver 1996 */
        var mouseOverChecklist=true;
        var spanNodeAppendix='-options-container';
        var inputDefaultValue='- Any -';

        function selectClickEventHandler (checklistObj,event,arrayChecklist) {
            if (checklistObj.visible==false) {
                $.each(arrayChecklist,function(i,v) {
                    if (checklistObj.checklist!=v.checklist && v.visible==true) {
                        hideChecklist(v);
                    }
                });
                if (checklistObj.spanCheckboxContainerJQ==null) {
                    checklistBlockJQ=ajaxFormRequest(checklistObj);
                    showChecklist(checklistObj,checklistObj.spanCheckboxContainerJQ,event,arrayChecklist);
                }
                else {
                    showChecklist(checklistObj,checklistObj.spanCheckboxContainerJQ,event,arrayChecklist);
                }
            }
            else {
                hideChecklist(checklistObj)
                }
        }

        function ajaxFormRequest(checklistObj) {
            var dataToSend="mode=ajax-search&id="+checklistObj.id;
            var spanNodeID=checklistObj.spanCheckboxContainerId;
            var spanNode='<span style="display:none;" id="'+spanNodeID+'"></span>';
            checklistObj.checklist.append(spanNode);
            var jqSpanNode=checklistObj.spanCheckboxContainerJQ=$('#'+spanNodeID);
            var html = search_from_options[checklistObj.id];
            jqSpanNode.html(html);
            var checklistName=checklistObj.inputId;
            if (checklistName=='type') {
                var multiul1 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(0).outerWidth();
                var multiul2 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(1).outerWidth();
                var multiul3 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(2).outerWidth();
                var multiul4 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(3).outerWidth();
                multiul = multiul1 + multiul2 + multiul3 + multiul4;
                $('#productTypeChecklist-options-container .checklist-options').css({
                    'width': multiul + 10  + 'px'
                });
            }
            if (jQuery.browser.mozilla && jQuery.browser.version < '1.9') {
                if (checklistName=='cat' || checklistName=='author') {
                    jqSpanNode.children('.checklist-options').css('width',checklistObj.ff2width+'px');
                }
            }
            addEventListeners(checklistObj);
            return jqSpanNode
        }

        function addEventListeners(checklistObj) {
            $('.small_button.checkAll').live('click',function() {
                changeCheckbox(checklistObj,$(this).parents('.checklist-widget'),true);
            });

            $('.small_button.uncheckAll').live('click',function() {
                changeCheckbox(checklistObj,$(this).parents('.checklist-widget'),false);
            });

            $('.small_button.btn-apply').live('click',function() {
                mouseOverChecklist=false;
                $('body').trigger('click');
            });

            var inputRange ='';
            if (checklistObj.id == 'productTypeChecklist') {
                inputRange='.multilevel >li ul li input[type=checkbox]';
            }
            else {
                inputRange='input[type=checkbox]';
            }
            $(inputRange,checklistObj.checklist).live('click',function() {
                var currentCheckboxValue=$.trim($(this).parent().text());
                var currentSelectValue=$.trim(checklistObj.valueKeeper.text());
                var tempValue='';
                if ($(this).attr('checked')) {
                    if (currentSelectValue==checklistObj.defaultValue) {
                        tempValue=currentCheckboxValue;
                    }
                    else {
                        tempValue=currentSelectValue+', '+currentCheckboxValue;
                    }
                }
                else {
                    currrentStringPosition=currentSelectValue.indexOf(currentCheckboxValue, 0);
                    if (currrentStringPosition==0) {
                        if (currentCheckboxValue.length==currentSelectValue.length) {
                            tempValue=currentSelectValue.substr(currrentStringPosition+currentCheckboxValue.length);
                        }
                        else {
                            tempValue=currentSelectValue.substr(currrentStringPosition+currentCheckboxValue.length+2);
                        }
                    }
                    else {
                        firstPartTempValue=currentSelectValue.substr(0,currrentStringPosition-2);
                        secondPartTempValue=currentSelectValue.substr(currrentStringPosition+currentCheckboxValue.length);
                        tempValue=firstPartTempValue+secondPartTempValue;
                    }
                }
                if (tempValue=='') {
                    tempValue=checklistObj.defaultValue;
                }
                checklistObj.valueKeeper.text(tempValue);
            });

            $('.checklist-options .multilevel >li input:first-child').live('click',function(){
                currentCheckbox=$(this);
                if (currentCheckbox.is(':checked')) {
                    changeCheckbox(checklistObj,currentCheckbox.parents('li:first'),true);
                }
                else {
                    changeCheckbox(checklistObj,currentCheckbox.parents('li:first'),false);
                }
            });
            $('.checklist-options .multilevel >li ul li input[type=checkbox]').live('click', function(){
                var element=$(this).parent().parent().parent().parent().find('input[type=checkbox]:first');
                var currentSelectValue=checklistObj.valueKeeper;
                var tempValue='';
                if ($(this).parents('ul:first').find('li input[type=checkbox]').size()==$(this).parents('ul:first').find('li input[type=checkbox]:checked').size()) {
                    if (!element.is(':checked')) {
                        element.attr('checked',true);
                        tempValue=$.trim(element.parent().text())+', '+currentSelectValue.text();
                        currentSelectValue.text(tempValue);
                    }
                } else {
                    if (element.is(':checked')) {
                        element.attr('checked',false);
                        if ($('input[type=checkbox]:checked',checklistObj.checklist).size()==0) {
                            currentSelectValue.text(checklistObj.defaultValue);
                        }
                        else {
                            var values='';
                            $('input[type=checkbox]:checked',checklistObj.checklist).each(function() {
                                if (values=='') {
                                    values=$.trim($(this).parent().text());
                                }
                                else {
                                    values=values+', '+$.trim($(this).parent().text());
                                }
                                currentSelectValue.text(values);
                            });
                        }
                    }
                }
            });
        }

        function showChecklist(checklistObj,checklistJqObj,event,arrayChecklist) {
            animateScroll();
            var checklistName=checklistObj.inputId;
            if (checklistName=='type') {
                checklistJqObj.css('display','block');
                var multiul1 = $('ul.multilevel').outerWidth();
                var multiul2 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(1).outerWidth();
                var multiul3 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(2).outerWidth();
                var multiul4 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(3).outerWidth();
                var multiul = multiul1 + multiul2 + multiul3 + multiul4;
                if (multiul < '400') {
                    if ($.browser.msie && $.browser.version==6 || $.browser.msie && $.browser.version==7) {
                        $('#productTypeChecklist-options-container .checklist-options').css({
                            'width': multiul + 425  + 'px'
                        });
                    } else {
                        $('#productTypeChecklist-options-container .checklist-options').css({
                            'width': multiul + 394  + 'px'
                        });
                    }
                } else {
                    $('#productTypeChecklist-options-container .checklist-options').css({
                        'width': multiul + 10  + 'px'
                    });
                }

            } else {
                checklistJqObj.css('display','block');
            }
            checklistObj.checklist.bind('mouseenter',function() {
                mouseOverChecklist=true;
            });
            checklistObj.checklist.bind('mouseleave',function() {
                mouseOverChecklist=false;
            });
            checklistObj.visible=true;
            mouseOverChecklist=true;
            waitForChecklistBlur(event,arrayChecklist);
        }

        function hideChecklist(checklistObj) {
            checklistObj.checklist.unbind('mouseenter');
            checklistObj.checklist.unbind('mouseleave');
            checklistObj.spanCheckboxContainerJQ.css('display','none');
            checklistObj.visible=false;
            $('body').unbind('click');
        }

        function waitForChecklistBlur(event,arrayChecklist) {
            event.stopPropagation();
            $('body').bind('click',function() {
                if (mouseOverChecklist==false) {
                    hideAllChecklist(arrayChecklist);
                }
            });
        }

        function hideAllChecklist(arrayChecklist) {
            $('#searchFormResetButton').css('display','none');
            $.each(arrayChecklist,function(i,v) {
                if (v.visible==true) {
                    v.spanCheckboxContainerJQ.css('display','none');
                    v.visible=false;
                }
                if ($('input[type=checkbox]:checked',v.checklist).size()>0) {
                    $('#searchFormResetButton').css('display','block');
                }
                else {
                    $('#'+v.inputId).val('');
                }
            });
            $('body').unbind('click');
            checkResetButtonShow();
        }

        function changeCheckbox(checklistObj,checkboxRange,status) {
            checklistGroup=$('input[type=checkbox]',checkboxRange);
            checklistGroup.attr('checked',status);
            var values='';
            if (status) {
                if (checkboxRange==checklistObj.checklist) {
                    $('#'+checklistObj.id+' ul li label').each(function() {
                        if (values=='') {
                            values=$.trim($(this).text());
                        }
                        else {
                            values=values+', '+$.trim($(this).text());
                        }
                    });

                }
                else {
                    $('input[type=checkbox]:checked',checklistObj.checklist).each(function() {
                        if (values=='') {
                            values=$.trim($(this).parent().text());
                        }
                        else {
                            values=values+', '+$.trim($(this).parent().text());
                        }
                    });
                }
                checklistObj.valueKeeper.text(values);
            }
            else {
                $('input[type=checkbox]:checked',checklistObj.checklist).each(function() {
                    if (values=='') {
                        values=$.trim($(this).parent().text());
                    }
                    else {
                        values=values+', '+$.trim($(this).parent().text());
                    }
                });
                checklistObj.valueKeeper.text(values);
            }
            if ($('input[type=checkbox]:checked',checklistObj.checklist).size()==0) {
                checklistObj.valueKeeper.text(checklistObj.defaultValue);
            }
        }

        function checkResetButtonShow() {
            var resetButtonVisible = false;
			if (
				('- Any Product -' != trim($('#productTypeChecklist .checklist-select-value:first').html())) ||
				('- Any Category -' != trim($('#categoryChecklist .checklist-select-value:first').html())) ||
				('- Any Style -' != trim($('#styleChecklist .checklist-select-value:first').html())) ||
				('- Any Author -' != trim($('#authorChecklist .checklist-select-value:first').html())) ||
                ('- Any -' != trim($('#tid_field').val())) ||
                ('- Any -' != trim($('#search_words_field').val())) ||
                ('- Any -' != trim($('#from_field').val())) ||
                ('- Any -' != trim($('#to_field').val())) ||
				(0 != $('#colour-selector li.checked:first').length)
			) {
				resetButtonVisible = true;
			}
            $('#searchFormResetButton').css('display', (resetButtonVisible ? 'block' : 'none'));
        }

        function animateScroll() {
            var headerOffset=$('#search-form').offset().top;
            if ($.browser.webkit) {
                $('body').animate({
                    scrollTop: headerOffset
                }, 1300);
            } else {
                $('html').animate({
                    scrollTop: headerOffset
                }, 1300);
            }
        }

        function collectCheckboxValues(checklistObj) {
            if (checklistObj.spanCheckboxContainerJQ!=null) {
                checkboxes=$('input[type=checkbox]:checked',checklistObj.spanCheckboxContainerJQ)
                if (checkboxes.size()>0) {
                    values='';
                    checkboxes.each(function(){
                        if (values.length==0) {
                            values=values+$(this).val();
                        }
                        else {
                            values=values+','+$(this).val();
                        }
                    });
                    document.getElementById(checklistObj.inputId).value=values;
                }
            }
        }

        var formContainer=$('#sform_container');
        var productType=new Object();
        productType.checklist=$('#productTypeChecklist');
        productType.id=productType.checklist.attr('id');
        productType.valueKeeper=$('#'+productType.id+' .checklist-select-value');
        productType.defaultValue='- Any Product -';
        productType.visible=false;
        productType.spanCheckboxContainerId=productType.id+spanNodeAppendix;
        productType.spanCheckboxContainerJQ=null;
        productType.inputId='type';
        productType.ff2width=400;
        var productCategory=new Object();
        productCategory.checklist=$('#categoryChecklist');
        productCategory.id=productCategory.checklist.attr('id');
        productCategory.valueKeeper=$('#'+productCategory.id+' .checklist-select-value');
        productCategory.defaultValue='- Any Category -';
        productCategory.visible=false;
        productCategory.spanCheckboxContainerId=productCategory.id+spanNodeAppendix;
        productCategory.spanCheckboxContainerJQ=null;
        productCategory.inputId='cat';
        productCategory.ff2width=755;
        var productStyle=new Object();
        productStyle.checklist=$('#styleChecklist');
        productStyle.id=productStyle.checklist.attr('id');
        productStyle.valueKeeper=$('#'+productStyle.id+' .checklist-select-value');
        productStyle.defaultValue='- Any Style -';
        productStyle.visible=false;
        productStyle.spanCheckboxContainerId=productStyle.id+spanNodeAppendix;
        productStyle.spanCheckboxContainerJQ=null;
        productStyle.inputId='style';
        productStyle.ff2width=350;
        var productAuthor=new Object();
        productAuthor.checklist=$('#authorChecklist');
        productAuthor.id=productAuthor.checklist.attr('id');
        productAuthor.valueKeeper=$('#'+productAuthor.id+' .checklist-select-value');
        productAuthor.defaultValue='- Any Author -';
        productAuthor.visible=false;
        productAuthor.spanCheckboxContainerId=productAuthor.id+spanNodeAppendix;
        productAuthor.spanCheckboxContainerJQ=null;
        productAuthor.inputId='author';
        productAuthor.ff2width=620;

        var ajaxChecklistGroup=new Array(productType,productCategory,productStyle,productAuthor);

        var tid_field=$('#tid_field');
        var search_words_field=$('#search_words_field');
        var from_field=$('#from_field');
        var to_field=$('#to_field');
        var inputsGroup=new Array(tid_field,search_words_field,from_field,to_field);

        var searchFormSubmit=$('#searchFormSubmit');
        var searchFormResetButton=$('#searchFormResetButton');
        var colorSearch=$('#colour-selector');
        var searchForm=$('#searchForm');

        searchFormSubmit.click(function() {
            searchForm.submit();
        });

        searchForm.submit(function() {
            $.each(ajaxChecklistGroup,function(index,value) {
                collectCheckboxValues(value);
            });
        });

        searchFormResetButton.click(function(){
            $('#colour-selector li').removeClass('checked');
            $('#colour-selector input[type=checkbox]:checked').attr('checked', false);
            $.each(ajaxChecklistGroup,function(i,v) {
                $('input[type=checkbox]:checked',v.checklist).attr('checked', false);
                v.valueKeeper.text(v.defaultValue);
                $('#'+v.inputId).val('');
            });
            $.each(inputsGroup,function(i,v) {
                v.val(inputDefaultValue).css('text-align','center');
            });
            checkResetButtonShow();
        });

        $.each(ajaxChecklistGroup, function(index,value) {
            value.checklist.children().click(function(event) {
                selectClickEventHandler(value,event,ajaxChecklistGroup)
                });
            if ($('#'+value.inputId).val()!='') {
                var tempArray=$('#'+value.inputId).val().split(',');
                ajaxFormRequest(value)
                $('input[type=checkbox]',value.checklist).ready(function() {
                    $.each(tempArray,function(i,v) {
                        $('input[value="'+v+'"]',value.checklist).attr('checked',true);
                    });
                });
            }
        });

        checkResetButtonShow();

        $.each(inputsGroup, function(index,value) {
            value.focus(function() {
                if ($(this).val()==inputDefaultValue) {
                    value.val('').css('text-align','left');
                }
            });
            value.blur(function() {
                if ($(this).val()=='') {
                    value.val(inputDefaultValue).css('text-align','center');
                }
                else if ($(this).val()==inputDefaultValue) {
                    value.css('text-align','center');
                }
                checkResetButtonShow();
            }).keypress(function(e) {
                var code = e.keyCode || e.which;
                if(code == 13) {
                    searchForm.submit();
                }
            });
        });

        $('#colour-selector li span').click(function(event){
            var checked = $(this).parent().hasClass('checked');
            if (!checked && $('#colour-selector input[type=checkbox]:checked').size()>=3) {
                alert('You may not use more colors for search!');
            }
            else {
                $(this).parent().toggleClass('checked');
                $(this).next().attr('checked', $(this).parent().hasClass('checked'));
                checkResetButtonShow();
            }
        });

    }

    /* --- Search form (end) --- */

    /* --- Template preview (begin) --- */

    if ($('.product-thumbnail').length > 0) {

        var previewTimeout;

        function showPreview(wrapper,heading,title,src,width,height) {
            var previewHTML='<img id="templatePreviewImage" height="'+height+'" width="'+width+'" src="'+src+'" alt=""/><div id="templatePreviewProgressBar">Loading template preview...</div>';
            heading.innerHTML=title;
            document.getElementById('templatePreviewBody').innerHTML=previewHTML;
            previewProgress = document.getElementById('templatePreviewProgressBar');
            previewImage = document.getElementById('templatePreviewImage');
            previewImage.onload=function() {
                previewProgress.style.display='none';
            }
            previewTimeout = setTimeout(function (){
                wrapper.display='block'
                },250);
        }

        function showFLVPreview(wrapper,heading,title,src,width,height) {
            var flvBlock = '' +
            '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" style="display:block" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '">' +
            '<param name="allowScriptAccess" value="sameDomain" />' +
            '<param name="allowFullScreen" value="true" />' +
            '<param name="quality" value="high">' +
            '<param name="menu" value="false">' +
            '<param id="nameValueFLV" name="movie" value="/images/popup-player.swf?titleVideo=' + src + '" />' +
            '<param name="quality" value="high" />' +
            '<param name="bgcolor" value="#010101" />' +
            '<embed src="/images/popup-player.swf?titleVideo=' + src + '" quality="high" menu="false" bgcolor="#010101" width="' + width + '" height="' + height + '" name="video" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>' +
            '</object>';
            $('#templatePreviewBody').prepend(flvBlock);
            $('#templatePreviewProgressBar').css('display', 'none');
            heading.innerHTML=title;
            previewTimeout = setTimeout(function (){
                wrapper.display='block'
                },250);
        }

        function hidePreview(wrapper,heading,image) {
            clearTimeout(previewTimeout);
            $('#templatePreviewBody').empty();
            wrapper.display='none';
        }

        function previewMouseFollow(event,wrapper,width,height,winWidth,winHeight,topOffset) {
            pageX=event.pageX;
            pageY=event.pageY;
            previewOffsetTop=(winHeight-height)/2;
            previewOffsetLeft=(winWidth-width)/2;
            correctedTopOffset=previewOffsetTop+topOffset;
            offset=30;
            centered=false;
            if (winHeight > height) {
                if (pageY<correctedTopOffset-offset) {
                    pageY=pageY+offset;
                }
                else if (pageY>correctedTopOffset+height+offset) {
                    pageY=pageY-offset-height;
                }
                else {
                    pageY=correctedTopOffset;
                    centered=true;
                }
            }
            else {
                pageY=topOffset;
                centered=true;
            }
            if (centered) {
                if (pageX<winWidth/2) {
                    pageX+=offset;
                }
                else {
                    pageX=pageX-width-offset;
                }
            }
            else {
                if (pageX<previewOffsetLeft-offset) {
                    pageX=pageX+offset;
                }
                else if (pageX>previewOffsetLeft+width+offset) {
                    pageX=pageX-width-offset;
                }
                else {
                    pageX=previewOffsetLeft;
                }
            }
            wrapper.left=pageX+'px';
            wrapper.top=pageY+'px';
        }

        var currentWindow=$(window);
        var windowObj = new Object();
        windowObj.width = currentWindow.width();
        windowObj.height = currentWindow.height();
        windowObj.scrollTop = currentWindow.scrollTop();
        var previewWrapper=document.getElementById('templatePreviewWrapper').style;
        var previewHeading=document.getElementById('templatePreviewHeading');
        var previewProgress;
        var previewImage;

        currentWindow.resize(function(){
            windowObj.width=$(this).width();
            windowObj.height=$(this).height();
        }).scroll(function(){
            windowObj.scrollTop=$(this).scrollTop();
        });

        $('.product-thumbnail').each(function() {
            var currentTemplate = $(this);
            var previewInfo = currentTemplate.attr('id').split('_');
            var widthOffset = 32;
            var heightOffset = 53;
            var display;

            eval('var previewObject = ' + $.base64Decode(previewInfo[2]));

            if (previewObject.width > 0) {
                previewObject.id = previewInfo[1];
                currentTemplate.hover(
                    function() {
                        var fileExt = previewObject.img.substr(previewObject.img.length-4, 4).toLowerCase();
                        switch (fileExt) {
                            case '.flv':
                                $('#templatePreviewBody').html('<div id="templatePreviewProgressBar">Loading template preview...</div>');
                                previewProgress = document.getElementById('templatePreviewProgressBar');
                                break;
                            default:
                                $('#templatePreviewBody').html('<img id="templatePreviewImage" height="" width="" src="" alt=""/><div id="templatePreviewProgressBar">Loading template preview...</div>');
                                previewProgress = document.getElementById('templatePreviewProgressBar');
                                previewImage = document.getElementById('templatePreviewImage');
                                previewImage.onload=function() {
                                    previewProgress.style.display='none';
                                }
                                break;
                        }
                        previewProgress.style.display="block";
                        previewWidth=previewObject.width+widthOffset;
                        previewHeight=previewObject.height+heightOffset;
                        if (windowObj.width > previewWidth) {
                            display = true;
                        } else {
                            display = false;
                        }
                        if (display) {
                            switch (fileExt) {
                                case '.flv':
                                    showFLVPreview(previewWrapper,previewHeading,'Template ' + previewObject.id,'http://scr.templatemonster.com/' + Math.floor(previewObject.id / 100) + '00/' + previewObject.img,previewObject.width,previewObject.height);
                                    break;
                                default:

                                    showPreview(previewWrapper,previewHeading,'Template ' + previewObject.id,'http://scr.templatemonster.com/' + Math.floor(previewObject.id / 100) + '00/' + previewObject.img,previewObject.width,previewObject.height);
                                    break;
                            }
                        }
                    },
                    function() {
                        var fileExt = previewObject.img.substr(previewObject.img.length-4, 4).toLowerCase();
                        hidePreview(previewWrapper,previewHeading);
                    }
                    ).mousemove(function(event) {
                    if (display) {
                        previewMouseFollow(event,previewWrapper,previewWidth,previewHeight,windowObj.width,windowObj.height,windowObj.scrollTop);
                    }
                });
            }
        });

    }

    /* --- Template preview (end) --- */

    /* --- Price hints (begin) --- */

    if ($('.altTitle').length > 0) {

        var hintTimeout;
        var priceHint=document.getElementById('altDiv');
        var hint = new Object();

        function showPriceHint(hint,currentElement,hintType) {
            var hintValue='';
            if (hintType=='price') {
                var elemId=currentElement.data('id');
                var priceTitle=document.getElementById(elemId);
                hintValue=priceTitle.innerHTML;
            }
            else if (hintType=='type') {
                hintValue='<p>'+currentElement.data('alt')+'</p>';
            }
            hint.innerHTML=hintValue;
            hint.style.display='block';
            hintTimeout = setTimeout(function (){hint.style.visibility='visible';},250);
        }

        function hidePriceHint (hint) {
            hint.style.display='none';
            hint.style.visibility='hidden';
            clearTimeout(hintTimeout);
        }

        function hintMouseFollow(event,priceHint,windowHeight,windowWidth,hintHeight,hintWidth,topOffset) {
            var x=event.pageX+15;
            var y=event.pageY;
            var correctedY=windowHeight-10-hintHeight+topOffset
            var correctedX=windowWidth-10-hintWidth;
            if (correctedY<y) {y=correctedY;}
            if (correctedX<x) {x=x-hintWidth-30}
            priceHint.style.left=x+'px';
            priceHint.style.top=y+'px';
        }

        $("span.price-label.altTitle, a.last.altTitle").each(function() {
            var currentElement=$(this);
            currentElement.data('id',currentElement.prop('title')).prop('title','');
        }).hover(function() {
            showPriceHint(priceHint,$(this),'price');
            hint.height=priceHint.clientHeight;
            hint.width=priceHint.clientWidth;
        }, function() {
            hidePriceHint(priceHint);
        }).mousemove(function(event) {
            hintMouseFollow(event,priceHint,$(window).height(),$(window).width(),hint.height,hint.width,$(window).scrollTop());
        });

        $("a.productType.altTitle").each(function() {
            currentElement=$(this);
            currentElement.data('alt',currentElement.prop('title')).prop('title','');
        }).hover(function() {
            if ($(this).data('alt')!='') {
                showPriceHint(priceHint,$(this),'type');
                hint.height=priceHint.clientHeight;
                hint.width=priceHint.clientWidth;
            }
        }, function() {
            hidePriceHint(priceHint);
        }).mousemove(function(event) {
            hintMouseFollow(event,priceHint,$(window).height(),$(window).width(),hint.height,hint.width,$(window).scrollTop());
        });

    }

    /* --- Price hints (end) --- */

    /* --- Discount hints (begin) --- */

    if ($('.prThTempl').length > 0) {

        var DISCOUNT_HINT_CLASS = 'popupAltTitleDiscountPrice';
        VERTICAL_OFFSET = 15;
        var discountPopup = $('#altDiv');
        var discountHintTimeout;

        if ($('#livedemo').length > 0) {
            VERTICAL_OFFSET = -25;
        }

        function getDiscountText(element) {
			var prthtempl = element.prev('.popupAltTitleDiscountPrice');
            if (prthtempl.length > 0) {
                return prthtempl.html();
            } else if ($('#livedemo').length > 0) {
                return $('.' + DISCOUNT_HINT_CLASS).html();
            } else {
                return element.closest('td').find('.' + DISCOUNT_HINT_CLASS).html();
            }
        }

        function showDiscountHint(text) {
            discountPopup.html(text).addClass(DISCOUNT_HINT_CLASS).css({'display':'block','left':'-100px','top':'-100px'});
            discountHintTimeout = setTimeout(function() {
                discountPopup.css('visibility','visible');
            },250);
        }

        function followMouseHint(event) {
            var correctX = event.pageX - discountPopup.width() / 2;
            var correctY = event.pageY - discountPopup.height() - VERTICAL_OFFSET;
            discountPopup.css({'left':correctX+'px', 'top':correctY+'px'});
        }

        function hideDiscountHint() {
            discountPopup.html('').css({'visibility':'hidden','display':'none'}).removeClass(DISCOUNT_HINT_CLASS);
            clearTimeout(discountHintTimeout);
        }

        $('.prThTempl').hover(function() {
            showDiscountHint(getDiscountText($(this)));
        },
        function() {
            hideDiscountHint();
        }).mousemove(function(event) {
            followMouseHint(event);
        });

    }

    if ($('#delicious_social_icon').length > 0) {

        function initCorrectUrlForDelicious() {
            var delicious_icon = document.getElementById('delicious_social_icon');
            var title_cont = document.getElementsByTagName('title')[0].innerHTML;
            try {
                var meta = document.getElementsByName('description')[0].content;
            } catch(e) {
                meta = '';
            }
            delicious_icon.href += '?url='+location.href+'&title='+title_cont+'&notes='+meta;
        }

        initCorrectUrlForDelicious();

    }

    /* --- Delicious url (end) --- */

    /* --- Text testimonials switch (begin) --- */

    if ($('#testimonials').length > 0) {

        var testimonials = document.getElementById('testimonials').getElementsByTagName('li');
        var testimonials_count = testimonials.length;
        for (i=0; i<testimonials_count; i++) {
            var id_number = i + 1;
            testimonials[i].setAttribute('id', 'testimonial_' + id_number);
        }

        var testimonials_list = $('#testimonials ul');

        var PAUSED_SWITCH_CLASS = 'paused_testimonial_switch';
        var ACTIVE_CLASS = 'active_testimonial';
        if (!$.browser.msie) {
            $('li',testimonials_list).filter(function(){
                return !$(this).hasClass(ACTIVE_CLASS);
            }).css('display','none');
        }
        var switchTestimonialTimeout;
        var paused_testimonial_switch = false;
        function switch_testimonial(slide_direction) {
            var current_testimonial = $('.' + ACTIVE_CLASS ,testimonials_list);
            if (slide_direction == 'prev') {
                if (current_testimonial.prev().length > 0) {
                    testimonial_to_activate = current_testimonial.prev();
                } else {
                    testimonial_to_activate = $('#testimonial_' + testimonials_count);
                }
            } else {
                if (current_testimonial.next().length > 0) {
                    testimonial_to_activate = current_testimonial.next();
                } else {
                    testimonial_to_activate = $('#testimonial_' + 1);
                }
            }
            current_testimonial.removeClass(ACTIVE_CLASS);
            testimonial_to_activate.addClass(ACTIVE_CLASS);
            if (!$.browser.msie) {
                current_testimonial.fadeOut();
                testimonial_to_activate.fadeIn();
            }
        }
        function auto_switch_testimonial() {
            switchTestimonialTimeout = setTimeout(function() {
                switch_testimonial('next');
                auto_switch_testimonial();
            }, 10000);
        }
        $('#next_testimonial').click(function() {
            if (!paused_testimonial_switch) {
                clearTimeout(switchTestimonialTimeout);
                auto_switch_testimonial();
            }
            switch_testimonial('next');
            return false;
        });
        $('#previous_testimonial').click(function() {
            if (!paused_testimonial_switch) {
                clearTimeout(switchTestimonialTimeout);
                auto_switch_testimonial();
            }
            switch_testimonial('prev');
            return false;
        });
        $('#stop_play_testimonial').click(function() {
            if ($(this).hasClass(PAUSED_SWITCH_CLASS)) {
                paused_testimonial_switch = false;
                $(this).removeClass(PAUSED_SWITCH_CLASS);
                auto_switch_testimonial();
            } else {
                paused_testimonial_switch = true;
                clearTimeout(switchTestimonialTimeout);
                $(this).addClass(PAUSED_SWITCH_CLASS);
            }
            return false;
        });
        auto_switch_testimonial();
    }

    /* --- Text testimonials switch (end) --- */

    /* --- Video testimonial popup (begin) --- */

    if ($('#video_testimonial_thumbnail').length > 0) {

        var testimonial_popup = new Object();

        testimonial_popup.current_window = $(window);
        testimonial_popup.good_browser = true;
        testimonial_popup.show_node = $('#video_testimonial_thumbnail');
        testimonial_popup.hide_node = $('#close_testimonial_popup');
        testimonial_popup.popup_node = $('#testimonial_popup');
        testimonial_popup.layout_node = $('<div id="popup_back_layout"></div>');
        testimonial_popup.video_container = $('#video_wrapper');
        testimonial_popup.video_object = '';
        testimonial_popup.calculate_vertical_offset = function() {
            var vertical_offset = (this.current_window.height() - this.popup_node.height())/2;
            if (!this.good_browser) {
                vertical_offset = vertical_offset + this.current_window.scrollTop();
            }
            if (vertical_offset < 0) {
                vertical_offset = 0;
            }
            return vertical_offset;
        }
        testimonial_popup.show_popup = function() {
            var popup_obj = this;
            popup_obj.video_container.html(popup_obj.video_object);
            $('body').addClass('popup_related');
            var popup = popup_obj.popup_node;
            popup.css('display','block');
            var vertical_offset = popup_obj.calculate_vertical_offset();
            var popup_width = popup.width();
            var horizontal_offset = popup_width/2 - popup_width;
            if (popup_obj.good_browser) {
                popup_obj.layout_node.css('display','block');
            } else {
                popup_obj.layout_node.css({
                    'display':'block',
                    'height':$('body').outerHeight()
                });
            }
            popup.css({
                'top' : vertical_offset,
                'margin-left' : horizontal_offset,
                'visibility' : 'visible',
                'width':popup_width
            });
        }
        testimonial_popup.hide_popup = function() {
            var popup_obj = this;
            $('body').removeClass('popup_related');
            popup_obj.popup_node.css({
                'display':'none',
                'visibility':'hidden'
            });
            popup_obj.video_container.html('');
            popup_obj.layout_node.css('display','none');
        }
        testimonial_popup.init = function(video) {
            $('body').append(this.layout_node);
            var popup_obj = this;
            popup_obj.video_object = video;
            if ($('body').hasClass('isIE6')) {
                popup_obj.good_browser = false;
            }
            popup_obj.show_node.click(function() {
                popup_obj.show_popup();
                return false;
            });
            popup_obj.layout_node.click(function() {
                popup_obj.hide_popup();
            });
            popup_obj.hide_node.click(function() {
                popup_obj.hide_popup();
                return false;
            });
            popup_obj.current_window.resize(function() {
                popup_obj.popup_node.css('top',popup_obj.calculate_vertical_offset());
            });
            if (!popup_obj.good_browser) {
                popup_obj.current_window.scroll(function() {
                    popup_obj.popup_node.stop().animate({
                        top:popup_obj.calculate_vertical_offset()
                    },500);
                }).resize(function() {
                    popup_obj.layout_node.css('height',$('body').outerHeight());
                });
            }
        }
        testimonial_popup.init('<object style="height: 390px; width: 640px"><param name="movie" value="http://www.youtube.com/v/1YMxpeIkxbA?version=3"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="http://www.youtube.com/v/1YMxpeIkxbA?version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390"></object>');

    }

    /* --- Video testimonial popup (end) --- */

    /* --- Search properties dropdown menu (begin) --- */

    if ($('#search_properties').length > 0) {

        $(document).click(function(event) {
            if ((event.target.className != 'ajax-checklist-select-value') && (event.target.className != 'ajax-checklist-select-control')) {
                var list1 = $('#ShowResultsList');
                var list2 = $('#ShowResultsList2');
                list1.hide();
                list2.hide();
            }
        });
        $('#ShowResultsLabel').click(function() {
            var list = $('#ShowResultsList');
            var tmplist = $('#ShowResultsList2');
                tmplist.hide();
            if (list.css('display')!='none') {
                list.hide();
            } else {
                list.show();
            }
        });
        $('#ShowResultsLabel2').click(function() {
            var list = $('#ShowResultsList2');
            var tmplist = $('#ShowResultsList');
                tmplist.hide();
            if (list.css('display')!='none') {
                list.hide();
            } else {
                list.show();
            }
        });
        $('#ShowResultsList ul li').each(function(){
            $(this).css('cursor','pointer').mouseover(function() {
                $(this).css('background-color','#B6D7F0');
            }).mouseout(function(){
                $(this).css('background-color','');
            }).click(function(){
                $('#sp_srb').val($(this).attr('val'));
                document.forms.researchform.submit();
            });
        });
        $('#ShowResultsList2 ul li').each(function(){
            $(this).css('cursor','pointer').mouseover(function() {
                $(this).css('background-color','#B6D7F0');
            }).mouseout(function(){
                $(this).css('background-color','');
            }).click(function(){
                $('#sp_rpp').val($(this).attr('val'));
                document.forms.result_per_page.submit();
            });
        });

    }

    /* --- Search properties dropdown menu (end) --- */

    /* --- Cart pages functions and events (begin) --- */

		function initBillingContactPhones() {
			$('#billing-phone-help').bind('mouseenter', function() {
				showDiscount("phone-question");
			}).bind('mousemove', function(event) {
				moveDiscount(event,'300px');
			}).bind('mouseout', function() {
				hideDiscount();
			});
			$('#billing-rphone-help').bind('mouseenter', function(event) {
				showDiscount("rphone-question");
			}).bind('mousemove', function(event) {
				moveDiscount(event,'300px');
			}).bind('mouseout', function() {
				hideDiscount();
			});
		}

		if ($('body').hasClass('profile-page')) {
			initBillingContactPhones();
		}

	if ($('#shopping-cart-2').length > 0) {

        /* --- Cart - Common (begin) --- */

            $('.alttitle').each(function() {
                $(this).find('.price-type').alttitle('div#alttitle_' + $(this).attr('for'));
            });

            $('strike.fullPrice').live('mouseenter', function() {
                if ($(this).data('id')=='' || $(this).data('id')==undefined) {
                    $(this).data('id',$(this).prop('title')).removeAttr('title');
                }
                showDiscount($(this).data('id'));
            }).live('mousemove', function(event) {
                moveDiscount(event,'auto');
            }).live('mouseout', function() {
                hideDiscount();
            });

        /* --- Cart - Common (begin) --- */

        /* --- Cart - Step 1 (begin) --- */

            if ($('body').hasClass('first-step')) {

                function cartAction(action) {
                    $('#action')[0].value = action;
                    $('#form')[0].submit();
                }

                function offerState(tId, oId, state) {
                    var el = document.getElementById('off_'+tId+'_'+oId);
                    if (el != null) {
                        el.value = state;
                        var action = 'templateOffersLoad';
                        if (tId == 'onCart') action = 'onCartOffersLoad';
                        $.jajax('/jajaxserver.php?app=SystemCart&controller=CartRender&action='+action, {
                            fun:updateInfo,
                                formid:'form',
                            post: page_meta.session_name + '=' + page_meta.session_ID + '&tId='+tId
                        });
                    }
                }

                function cartCalculate(event) {
                    if (event != false) {
                        event.cancelBubble=true;
                    }
                    $.jajax('/jajaxserver.php?app=SystemCart&controller=CartCalculation&action=cartCalculation', {
                        fun:updateInfo,
                        formid:'form',
                        post: page_meta.session_name + '=' + page_meta.session_ID
                    });
                    return false;
                }

                $('.click-box h3').live('click',function() {
                    var common_slide_area = $('.slide-area:visible',$(this).closest('.cart-slide-box'));
                    var current_slide_area = $('.slide-area',$(this).closest('.click-box'));
                    var button_box = $('.button-box',$(this).closest('.click-box'));
                    if ((current_slide_area.get(0) !== common_slide_area.get(0)) && (common_slide_area.length > 0)) {
                        common_slide_area.css('display','none');
                        $('.button-box',common_slide_area.closest('.click-box')).addClass('bg-off');
                    }
                    if (current_slide_area.is(':visible')) {
                        current_slide_area.css('display','none');
                        button_box.addClass('bg-off');
                    } else {
                        current_slide_area.css('display','block');
                        button_box.removeClass('bg-off');
                    }
                });

                $('#form').submit(function() {
                    cartCalculate(false);
                    return false;
                });

                $('.cart-template-cont input[type=radio]').change(function(event) {
                    cartCalculate(event);
                });

                $('.checkout-link').click(function() {
                    return verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step);
                });

                $('.continue-shopping-link').click(function() {
                    cartAction('shopping')
                    return false;
                });

                $('.refresh-cart-link').click(function() {
                    cartAction('update');
                    return false;
                });

                $('.offer-state-change').live('click',function() {
                    var offer_params = $(this).attr('id').split('_');
                    offerState(offer_params[1],offer_params[2],offer_params[3]);
                    return false;
                });


                if (!($('.cart-template-box').length > 0) && !($('#oncart-checked-offers')[0].childNodes.length > 0)) {
                    $('body').addClass('empty-cart');
                    $('#total').text('0');
                }

                $('.template-price').each(function() {

                    if ($('input',$(this)).is(':checked')) {
                        $(this).addClass('selected');
                    }

                    $('input',$(this)).click(function(event) {
                        if (!$(this).closest('label').hasClass('selected')) {
                            $(this).closest('p').find('label').toggleClass('selected');
                        }
                        event.stopPropagation();
                    });

                });

                /* - Shopping cart captcha (begin) - */

                    function addCaptcha() {
                        $('#verificationCode')[0].value = $('#sendVerificationCode')[0].value;
                        $('#sendCaptcha')[0].submit();
                    }

                    $('#apply_cart_captcha_verification_code').click(function() {
                        addCaptcha();
                        return false;
                    });

                    $('#sendVerificationCode').keypress(function(event) {
                        if (((event.keyCode == 10) ||(event.keyCode==13))) {
                            addCaptcha();
                        }
                    });

                /* - Shopping cart captcha (end) - */

            }

        /* --- Cart - Step 1 (end) --- */

        /* --- Cart - Step 2 (begin) --- */

            if ($('body').hasClass('second-step')) {
                $('#apply_promo_code').click(function() {
					var promocode = $('#promo_field').val();
					$.jajax('/jajaxserver.php?app=SystemCart&controller=CartCalculation&action=cartDetailsCalculation', {
						fun:$.jajaxparse,
						post: page_meta.session_name + '=' + page_meta.session_ID + '&codes=' + promocode
					});
                });
				$('#promo_field').keypress(function(e) {
					if (isEnterPressed(e)) {
						$('#apply_promo_code').click();
						return false;
					}
				});

                function OnCountryChange(selCountry) {
                    if (!page_meta.cart_empty) {
                        $.jajax('/jajaxserver.php?app=SystemCart&controller=CountryChange&action=onCountryChange', {
                            fun:$.jajaxparse,
                            post:'country=' + selCountry.value + '&step=' + page_meta.cart_step + '&' + page_meta.session_name + '=' + page_meta.session_ID + '&gift=' + (true == page_meta.gift_certificate ? 'on' : 'off')
                        });
                    }
                }

                function prepareSimpleSlider() {
                    $('.slide-area').css({
                        'display':'none'
                    });
                    $('.click-box').each(function() {
                        var button = $(this).children('.button-box');
                        var slidearea = $(this).children('.slide-area');
                        button.click(function() {
                            slidearea.toggle();
                            button.toggleClass('bg-off');
                            button.children('.img').toggleClass('open');
                        });
                    });
                }

                prepareSimpleSlider();

                $('#form').submit(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step);
                    return false;
                });
					
				function checkCartDetailsField(field) {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField='+field.name, (trim(field.value) != ''));
				}

                $('#billing-email').blur(function() {
                    checkCartDetailsField(this);
                });
				checkCartDetailsField($('#billing-email')[0]);

                $('#new-password').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=new-password', (trim(this.value) != ''));
                });

                $('#reenter-password').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=reenter-password', (trim(this.value) != ''));
                });

                $('#billing-phone').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=phone', (trim(this.value) != ''));
                });

                $('#billing-rphone').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=rphone', (trim(this.value) != ''));
                });

                $('#billing-fullname').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=name', (trim(this.value) != ''));
                });

                $('#billing-address').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=address', (trim(this.value) != ''));
                });

                $('#billing-city').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=city', (trim(this.value) != ''));
                });

                $('#billing-postalcode').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=code', (trim(this.value) != ''));
                });

                $('#billing-country').change(function() {
                    OnCountryChange(this);
                }).blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=country', (trim(this.value) != ''));
                });

                $('#stateFiled').blur(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=state', (trim(this.value) != ''));
                });

                $('#c_have_read').change(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=have_read');
                });

                $('#antifraud-check').change(function() {
                    verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField=antifraud');
                });

				initBillingContactPhones();

				$('#billing-new-password-help').bind('mouseenter', function(event) {
                    showDiscount("new-pass-question");
                }).bind('mousemove', function(event) {
                    moveDiscount(event,'300px');
                }).bind('mouseout', function() {
                    hideDiscount();
                });

				$('#billing-re-enter-password-help').bind('mouseenter', function(event) {
                    showDiscount("re-enter-pass-question");
                }).bind('mousemove', function(event) {
                    moveDiscount(event,'300px');
                }).bind('mouseout', function() {
                    hideDiscount();
                });

                $('.cart-details-popup').click(function() {
                    $.jajax('/jajaxserver.php?app=SystemCart&controller=Popups&action=popup', {
                        fun:function(html) {
                            $('#ajax-cart-details-popup').html(html).popup('open');
                        },
                        datatype:'text',
                        post:'name=' + $(this).attr('href').substr(1, 3)
                    });
                    return false;
                });

            }

        /* --- Cart - Step 2 (end) --- */

    }

    /*--- Cart pages functions and events (end) --- */

    /* --- Live demo page (begin) --- */

    if ($('#livedemo').length > 0) {

        function resizeIframe() {
            wdb = document.body.scrollHeight;
            $('#livedemo').height(wdb - 110 + 'px');
            if ($.browser.msie || $.browser.safari || $.browser.chrome) {
                bdb = document.body.offsetHeight;
                $('#livedemo').height(bdb - 110 + 'px');
            }
        }
        $('.liveclosei2').click(function () {
            $('#tellfrend').slideToggle('slow');
            if ($('#reportabug').css('display','block')) {
                $('#reportabug').css('display','none');
            }
        });
		/*
        $('.liveclosei3').click(function () {
            $('#bookshare').slideToggle('slow');
            if ($('#tellfrend').css('display','block')) {
                $('#tellfrend').css('display','none');
            }
        });
		*/
        $('#tellfrend form, #reportabug form').submit(function() {
            $(this).find('a.submit').click();
            return false;
        });

        $('#reportButton').click(function () {
            $('#reportabug').slideToggle('slow');
            if ($('#tellfrend').css('display','block')) {
                $('#tellfrend').css('display','none');
            }
        });

        resizeIframe();

    }

    /* --- Live demo page (end) --- */

    /* --- Block align -> delivery page (begin) --- */

    if ($('#delivery-page-content').length > 0) {

        function initializeBlocksAligner(wrappers) {
            // jQuery is required
            // ujeen
            function calculateOthers(wrappers) {
                var max_elem_num = wrappers.length-1;
                var max_elem_padding = parseInt(wrappers[max_elem_num].css('padding-top'))+parseInt(wrappers[max_elem_num].css('padding-bottom'));
                for (var i = 0 ; i < wrappers.length-1 ; i++) {
                    var temp_var1 = parseInt(wrappers[i].css('padding-top'))+parseInt(wrappers[i].css('padding-bottom'));
                    wrappers[i].height(wrappers[max_elem_num].height()-(temp_var1-max_elem_padding));
                }
            }
            function sortFromMax(wrappers) {
                for (var i = 0 ; i < wrappers.length ; i++) {
                    var temp_var;
                    if (typeof wrappers[i+1] != 'undefined') {
                        if (wrappers[i].height() > wrappers[i+1].height()) {
                            temp_var = wrappers[i+1];
                            wrappers[i+1] = wrappers[i];
                            wrappers[i] = temp_var;
                        }
                    }
                }
                return wrappers;
            }
            if ((wrappers != null) && (typeof wrappers == 'object')) {
                for (var i = 0 ; i < wrappers.length ; i++) {
                    wrappers[i] = $(wrappers[i]);
                }
                calculateOthers(sortFromMax(wrappers));
            }
        }

        initializeBlocksAligner($('#purchase-main-details .content-wrapper'));
        initializeBlocksAligner($('#purchase-additional-bonuses .bonuse'));

    }

    /* --- Block align -> delivery page (end) --- */

    /* --- McAfee Banner (begin) --- */

    if ($('#McAfeeBox').length > 0) {

        function ShowMcAfeeBanner(id) {
            var McAfee_html = '<a target="_blank" href="https://www.mcafeesecure.com/RatingVerify?ref=www.templatemonster.com"><img width="65" height="37" border="0" src="https://images.scanalert.com/meter/www.templatemonster.com/55.gif" alt="McAfee Secure sites help keep you safe from identity theft, credit card fraud, spyware, spam, viruses and online scams" oncontextmenu="alert(\'Copying Prohibited by Law - McAfee Secure is a Trademark of McAfee, Inc.\'); return false;" /></a>';
            var box = document.getElementById(id);
            box.innerHTML = McAfee_html;
        }

        function initializeMcAfeeBanner() {
            if (typeof (McAfeeBannerInitialized) == 'undefined') {
                ShowMcAfeeBanner('McAfeeBox')
                McAfeeBannerInitialized = true;
            }
        }

        initializeMcAfeeBanner();

    }

    /* --- McAfee Banner (end) --- */

});

/* ------------------------------------------ INIT AFTER DOM READY (END) ------------------------------------------ */

function callBannerWithGA(bannerId, bannerFile)
{
	var banner = $('#'+bannerId);
	banner.click(function(e) {
		e.data = bannerFile;
		e.bid = bannerId;
		onclikGAHandler(e);
	});
	banner.mouseup(function(e) {
		e.data = bannerFile;
		e.bid = bannerId;
		onmouseupGAHandler(e);
	});
}

function onclikGAHandler(e) {
	ga_track_banner(e)
}

function onmouseupGAHandler(e) {
	if ( ($.browser.mozilla ||  $.browser.opera) && e.button==1) {
		ga_track_banner(e);
	}
}

function replaceFlashContent(status) {
	if (status) {
		var ifr = $('#iframe' + this.flem);
		ifr.css('display', 'none');
		$('#prv-fl-bl-cust').css('width', ifr.css('width')).css('height', ifr.css('height')).css('display', 'block');
	} else {
		$('#prv-fl-bl-cust').css('display', 'none');
		$('#iframe' + this.flem).css('display', 'block');
	}
}

function showCustomizationPopup(tid, sid) {
	this.flem = sid;
	$('#popup-customization-content-v1').css('display', 'block');
	$('#popup-customization-content-v2').css('display', 'none');
	$('#popup-customization-form').each(function() {
		this.reset();
	});
	var full_name = $('#popup-customization-form input[name="y_name"]:first').parent().parent().find('.popup-customization-form-error:first');
	var email = $('#popup-customization-form input[name="y_mail"]:first').parent().parent().find('.popup-customization-form-error:first');
	var tido = $('#popup-customization-form input[name="t_number"]:first').parent().parent().find('.popup-customization-form-error:first');
	var comment = $('#popup-customization-form textarea[name="y_comments"]:first').parent().parent().find('.popup-customization-form-error:first');
	full_name.css('display', 'none');
	email.css('display', 'none');
	tido.css('display', 'none');
	comment.css('display', 'none');
	lockcustomizationform = false;
	$('#error-customization-server').css('display', 'none');
	$('#popup-customization-content-form input[name="t_number"]:first').val(tid);
	replaceFlashContent(true);
	trackEventCustomization(1);
	$('#popup-customization').popup('open', {scroll:true});
	return false;
}

var lockcustomizationform = false;

function responseCustomizationForm(type, result, event) {
	var full_name = $('#popup-customization-form input[name="y_name"]:first').parent().parent().find('.popup-customization-form-error:first');
	var email = $('#popup-customization-form input[name="y_mail"]:first').parent().parent().find('.popup-customization-form-error:first');
	var tid = $('#popup-customization-form input[name="t_number"]:first').parent().parent().find('.popup-customization-form-error:first');
	var comment = $('#popup-customization-form textarea[name="y_comments"]:first').parent().parent().find('.popup-customization-form-error:first');
	var checkField = '';
	if (false == type) {
		checkField = $(event).attr('name');
	}
	if (('' == checkField) || ('y_name' == checkField)) {
		full_name.css('display', 'none');
	}
	if (('' == checkField) || ('y_mail' == checkField)) {
		email.css('display', 'none');
	}
	if (('' == checkField) || ('t_number' == checkField)) {
		tid.css('display', 'none');
	}
	if (('' == checkField) || ('y_comments' == checkField)) {
		comment.css('display', 'none');
	}
	$('#error-customization-server').css('display', 'none');
	if ('undefined' != typeof result.errors) {
		if ('undefined' != typeof result.errors.full_name) {
			full_name.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.email) {
			email.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.tid) {
			tid.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.comment) {
			comment.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.invalid_request) {
			$('#error-customization-server').css('display', 'block');
		}
	}
	if ('undefined' != typeof result.ok) {
		$('#popup-customization-content-v1').toggle();
		$('#popup-customization-content-v2').toggle();
	}
}

function submitCustomizationForm(type, event) {
	if (lockcustomizationform) {
		return false;
	}
	if (true == type) {
		trackEventCustomization(3);
		lockcustomizationform = true;
		$('#button-customization-form .ajax-loader-c:first').css('display', 'block');
		$('#button-customization-form .regular_button:first').removeClass('primary_action').addClass('disabled_action');
		$.jajax('/jajaxserver.php?app=Customization', {
			fun:function(result) {
				responseCustomizationForm(type, result, event);
				$('#button-customization-form .regular_button:first').removeClass('disabled_action').addClass('primary_action');
				$('#button-customization-form .ajax-loader-c:first').css('display', 'none');
				if ('undefined' != typeof result.ok) {
					lockcustomizationform = true;
				} else {
					lockcustomizationform = false;
				}
			},
			formid:'popup-customization-form'
		});
	} else {
		var result = {
			errors:{}
		};
		var full_name = $('#popup-customization-form input[name="y_name"]:first');
		var email = $('#popup-customization-form input[name="y_mail"]:first');
		var tid = $('#popup-customization-form input[name="t_number"]:first');
		var comment = $('#popup-customization-form textarea[name="y_comments"]:first');
		var field = $(event).attr('name');
		if (('y_name' == field) && ('' == full_name.val())) {
			result.errors.full_name = true;
		}
		if (('y_mail' == field) && ('' == email.val())) {
			result.errors.email = true;
		}
		if (('t_number' == field) && (('' == tid.val()) || (0 >= tid.val()))) {
			result.errors.tid = true;
		}
		if (('y_comments' == field) && ('' == comment.val())) {
			result.errors.comment = true;
		}
		responseCustomizationForm(0, result, event);
	}
}
var offerTracker = [];
function init_cart_offer_tracker() {
	$(document).scrollEvent({
		'eclass':'.offer_cart',
		'fun':function(id, is_visible, position) {
			var idinfo = id.split('_');
			if ((is_visible) && (-1 == $.inArray(idinfo[2], offerTracker))) {
				offerTracker.push(idinfo[2]);
				eval($.base64Decode(idinfo[3]));
			}
		},
		'autostart':true
	});
}

$(document).ready(function() {
	$('#popup-customization-header-fon a:first').click(function() {
		replaceFlashContent(false);
		trackEventCustomization(2);
		$('#popup-customization').popup('close');
		return false;
	});
	$('#popup-customization-form').submit(function() {
		return false;
	});
	$('#button-customization-form a:first').click(function() {
		submitCustomizationForm(true, this);
	});
	$('#popup-customization-form input').keypress(function(e) {
		if (isEnterPressed(e)) {
			submitCustomizationForm(true, this);
		}
	});
	$.countryState('#billing-country', '#stateFiled');
	$.countryState('#i5', '#i7');
	$.countryState('#country', '#state');
	$('#profile-tabs').uitabs();
	init_cart_offer_tracker();
});

function close_fb_popup(clear) {
	$('#popup_facebook_comment').popup('close');
	if (clear) {
		fb_popup_cancel = true;
		$('#popup_facebook_comment_text').val('');
	} else {
		fb_popup_cancel = false;
	}
	return false;
}
