$(document).ready(function() {
	scanImportableFiles();
	setInterval(function() {
		scanImportableFiles();
	}, 1000);
	
	$('#delete-import').click(function(event) {
		event.stopPropagation();
		var $this = $(this);
		$this.attr('disabled', true);
		$.get('/delete-exports', function() {
			$this.removeAttr('disabled');
		});
	});
});

function scanImportableFiles() {
	var import_button = $('#start-import');
	$.get('/exports', function(data) {	
		var disabled = false;
		$.each(data, function(index, val) {
			data[index] = val.toUpperCase();
		});

		$('span.export-file').each(function(index, val) {
			var file = $(this).text().toUpperCase();
			if($.inArray(file, data) == -1) {
				$(this).css('color', '#FF5656');
				disabled = true;
			} else {
				$(this).css('color', '#50E550');
			}
		});

		if(disabled) {
			import_button.attr('disabled', true);
		} else {
			if(!import_button.data('import_started')) {
				import_button.removeAttr('disabled');
			}
		}
	});
}
