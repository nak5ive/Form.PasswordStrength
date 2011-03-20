Form.PasswordStrength
=====================

Places an animated meter below an input element, displaying the strength of a password calculated using simple [http://en.wikipedia.org/wiki/Entropy_(information_theory) information entropy].

![Screenshot](http://nak5ive.github.com/Form.PasswordStrength/screenshot.png)


How to use
----------

Include Form.PasswordStrength.js on your site, in addition to MooTools 1.3 core. Instantiate a new Form.PasswordStrength object and set it's options:

Javascript:
	var ps = new Form.PasswordStrength({
		element: 'mypassword'
	});

HTML:
	<input id="mypassword" type="password" name="mypassword" value=""/>