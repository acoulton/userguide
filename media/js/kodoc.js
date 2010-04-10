$(document).ready(function()
{
	// Translation selector
	$('#topbar form select').change(function()
	{
		$(this).parents('form').submit();
	});
	
	// Syntax highlighter
	$('pre:not(.debug) code').each(function(){
		$(this).addClass('brush: php');
	});
	
	SyntaxHighlighter.config.tagName = 'code';
	// Don't show the toolbar or line-numbers.
	SyntaxHighlighter.defaults.toolbar = false;
	SyntaxHighlighter.defaults.gutter = false;
	SyntaxHighlighter.all();

	// Striped tables
	$('#content tbody tr:even').addClass('alt');

	// Toggle menus
	$('#menu ol li strong').each(function()
	{
		var link = $(this);
		var menu = link.parent().find('ol:first, ul:first');
		var togg = $('<span class="toggle">+</span>').appendTo(link);

		link.click(function()
		{
			if (menu.is(':visible'))
			{
				// Hide visible menus
				togg.html('+');
				menu.stop(true, true).slideUp('fast');
			}
			else
			{
				// Show hidden menus
				togg.html('&ndash;');
				menu.stop(true, true).slideDown('fast');
			}
		});

		// Hide all menus that do not contain the active link
		menu.not(':has(a[href="'+ window.location.pathname +'"])').hide();

		if (menu.is(':visible'))
		{
			// Display the toggle as being open
			togg.html('&ndash;');
		}
	});

	// Collapsable class contents
	$('#content #toc').each(function()
	{
		var header  = $(this);
		var content = $('#content div.toc').hide();

		$('<span class="toggle">[ + ]</span>').toggle(function()
		{
			$(this).html('[ &ndash; ]');
			content.stop(true, true).slideDown();
		},
		function()
		{
			$(this).html('[ + ]');
			content.stop(true, true).slideUp();
		})
		.appendTo(header);
	});
	
	// Show source links
	$('#content .method-source').each(function(){
		$(this).find('h6').each(function(){ $(this).append(' <a class="toggler" href="#">[show]</a>') });
		var link = $(this).find('.toggler');
		var code = $(this).find('pre');

		var show = function()
		{
			code.stop(true, true).slideDown();
			link.html(' [hide]');
		};

		var hide = function()
		{
			code.stop(true, true).slideUp();
			link.html(' [show]');
		};

		link.toggle(show,hide);

		code.hide();
	});
});
