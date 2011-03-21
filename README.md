Form.PasswordStrength
=====================

Places an animated meter below an input element, displaying the strength of a password calculated using simple information entropy.

![Screenshot](http://nak5ive.github.com/Form.PasswordStrength/screenshot.png)


How to use
----------

Include Mootools.Core and Form.PasswordStrength in your document:

	<script type="text/javascript" src="mootools-1.3.1-core-yc.js"></script>
	<script type="text/javascript" src="Form.PasswordStrength-yc.js"></script>

Instantiate a new Form.PasswordStrength object and set it's options:

	<input id="mypassword" type="password" name="mypassword" value=""/>
	
	<script type="text/javascript">
		new Form.PasswordStrength('mypassword', {options});
	</script>


Options
-------

**threshold** - An entropy value that represents the *highest* password strength to measure. In this application, entropy is a measure of strength dependent on the length of a string and the sample size of characters for which a brute force attack must consider when looking for a match. Defaults to 66 (the entropy value for a 10-character string consisting of at least 1 number, 1 lowercase letter, 1 uppercase letter, and 1 special character).

**primer** - A sample string that represents the *highest* password strength to measure. Since strength in entropy is relative to what is considered to be "strong", it can be difficult to guess a number value to represent **threshold**. Set this option with a string that has all the characteristics you would expect in a "strong" password. This option will override the **threshold** option. Defaults to ''.

**height** - The height of the strength meter, in px. Defaults to 5.

**opacity** - The opacity of the strength meter, from 0 to 1. Defaults to 1.

**bgcolor** - The background-color style attribute on the strength meter. Defaults to 'transparent'.


Events
------

**onUpdate** - Fired every time the value of the input field changes. Arguments available [*element*, *strength*, *threshold*].
