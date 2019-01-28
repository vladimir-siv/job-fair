HTMLElement.prototype.getIntProp = function(prop)
{
	var value = window.getComputedStyle(this, null).getPropertyValue(prop);
	return parseInt(value.substring(0, value.length - 2));
}
