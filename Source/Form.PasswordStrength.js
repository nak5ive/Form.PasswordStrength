/*
---
description: Form.PasswordStrength class.

license: MIT-style

authors:
- Al Kent

requires:
- core/1.3.1: '*'

provides: [Form.PasswordStrength, String.strength]

*/

if (!window.Form) window.Form = {};

var Form.PasswordStrength = new Class({
	
	Implements: [Options, Events],
	
	options: {
		//onChange: $empty,
		element: null,
		threshhold: 65,
		height: 5,
		opacity: 100,
		bgcolor: 'transparent'
	},
	
	element: null,
	fx: null,
	
	initialize: function(options){
		this.setOptions(options);
		this.element = $(this.options.element);
		var coor = this.element.getCoordinates();
		var bar = new Element('div', {
			styles: {
				'position': 'absolute',
				'top': coor.top + coor.height,
				'left': coor.left,
				'width': coor.width,
				'height': this.options.height,
				'opacity': this.options.opacity,
				'background-color': this.options.bgcolor
			}
		}).inject(document.body);
		var meter = new Element('div', {
			styles: {
				'width': 0,
				'height': '100%'
			}
		}).inject(bar);
		this.fx = new Fx.Morph(meter, {
			duration: 'short',
			link: 'cancel',
			unit: '%'
		});
		this.element.addEvent('keyup', function(){
			var s = this.element.get('value').strength();
			var p = (s / this.options.threshhold).limit(0, 1);
			if (p < 0.5) var c = ('rgb(255, ' + (255 * p * 2).round() + ', 0)').rgbToHex();
			else var c = ('rgb(' + (255 * (1 - p) * 2).round() + ', 255, 0)').rgbToHex();
			this.fx.start({
				'width': (100 * p).round(),
				'background-color': c
			});
			this.fireEvent('change', [s]);
		}.bind(this));
	}
});

String.implement({
	strength: function(){
		var n = 0;
		if (this.match(/[0-9]+/)) n += 10;
		if (this.match(/[a-z]+/)) n += 26;
		if (this.match(/[A-Z]+/)) n += 26;
		if (this.match(/[^a-zA-Z0-9]+/)) n += 32;
		return (n == 0) ? 0 : (this.length * n.log() / (2).log()).round();
	}
});
