$(document).ready(function() {
	var switched = false, switched1 = false, switched2 = false, switched3 = false;
	var updateTables = function() {
		if (($('section').width() <= 860) && !switched1 ){
			switched1 = true;
			$("table.big-compare-4-table").each(function(i, element) {
				splitTable($(element));
			});
			$(".big-compare-4 .swipe-to-view").show();
		} else if (switched1 && ($('section').width() >= 860)) {
			switched1 = false;
			$("table.big-compare-4-table").each(function(i, element) {
				unsplitTable($(element));
			});
			$(".big-compare-4 .swipe-to-view").hide();
		}
//---
		if (($('section').width() <= 760) && !switched3 ){
			switched3 = true;
			$("table.big-compare-3-table").each(function(i, element) {
				splitTable($(element));
			});
			$(".big-compare-3 .swipe-to-view").show();
		} else if (switched3 && ($('section').width() >= 760)) {
			switched3 = false;
			$("table.big-compare-3-table").each(function(i, element) {
				unsplitTable($(element));
			});
			$(".big-compare-3 .swipe-to-view").hide();
		}
//---		
		if (($('section').width() <= 520) && !switched2 ){
			switched2 = true;
			$("table.big-compare-2-table").each(function(i, element) {
				splitTable($(element));
			});
			$(".big-compare-2 .swipe-to-view").show();
		} else if (switched2 && ($('section').width() >= 520)) {
			switched2 = false;
			$("table.big-compare-2-table").each(function(i, element) {
				unsplitTable($(element));
			});
			$(".big-compare-2 .swipe-to-view").hide();
		}
  };
   
  $(window).load(updateTables);
  $(window).on("redraw",function(){switched1=false;switched2=false;switched3=false;updateTables();}); // An event to listen for
  $(window).on("resize", updateTables);
   
	
 	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
			
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");
		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }
  

});
