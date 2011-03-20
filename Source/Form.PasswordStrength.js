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

if (!this.Form) this.Form = {};

Form.PasswordStrength = new Class({
	
	Implements: [Options, Events],
	
	options: {
		//onUpdate: $empty,
		element: null,
		threshold: 66,
		primer: '',
		height: 5,
		opacity: 1,
		bgcolor: 'transparent'
	},
	
	element: null,
	fx: null,
	value: '',
	
	initialize: function(options){
		this.setOptions(options);
		this.element = $(this.options.element);
		if (this.options.primer) this.options.threshold = this.options.primer.strength();
		var c = this.element.getCoordinates();
		var b = new Element('div', {
			styles: {
				'position': 'absolute',
				'top': c.top + c.height,
				'left': c.left,
				'width': c.width,
				'height': this.options.height,
				'opacity': this.options.opacity,
				'background-color': this.options.bgcolor
			}
		}).inject(document.body, 'bottom');
		var m = new Element('div', {
			styles: {
				'width': 0,
				'height': '100%'
			}
		}).inject(b);
		this.fx = new Fx.Morph(m, {
			duration: 'short',
			link: 'cancel',
			unit: '%'
		});
		this.element.addEvent('keyup', this.animate.bind(this));
		if (this.element.get('value')) this.animate();
	},
	
	animate: function(){
		var v = this.element.get('value');
		if (v == this.value) return;
		this.value = v;
		var c, s = v.strength(), r = (s / this.options.threshold).round(2).limit(0, 1);
		if (r < 0.5) c = ('rgb(255, ' + (255 * r * 2).round() + ', 0)').rgbToHex();
		else c = ('rgb(' + (255 * (1 - r) * 2).round() + ', 255, 0)').rgbToHex();
		this.fx.start({
			'width': 100 * r,
			'background-color': c
		});
		this.fireEvent('update', [s, r]);
	}
});

String.implement({
	strength: function(){
		var n = 0;
		if (this.match(/\d/)) n += 10;
		if (this.match(/[a-z]+/)) n += 26;
		if (this.match(/[A-Z]+/)) n += 26;
		if (this.match(/[^\da-zA-Z]/)) n += 33;
		return (n == 0) ? 0 : (this.length * n.log() / (2).log()).round();
	}
});
