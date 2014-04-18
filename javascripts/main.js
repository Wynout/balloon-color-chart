(function(){

	var $images = $('.balloon-color-chart').find('img');

	$('#button-wrapper button').on('click', function (event) {

		var $this = $(this);
		console.log(this);

		$images.removeClass();
		$images.addClass($this.attr('class'));




	});
})();