$(document).ready(function() {
  var switched = false;
  var updateTables = function() {
    if (($('section').width() <= 685) && !switched ){
      switched = true;
	  
	//  $(".responsive").before("<div class='swipe-to-view-table'><p>Please swipe left or right to view all content</p></div>");	
	  $(".swipe-to-view-table").toggle();
	  
      $("table.responsive").each(function(i, element) {
        splitTable($(element));
      });
	  

	  
      return true;
    }
    else if (switched && ($('section').width() >= 685)) {
      switched = false;
      $("table.responsive").each(function(i, element) {
        unsplitTable($(element));
      });
	  
	  $(".swipe-to-view-table").toggle();
    }
  };
   
  $(window).load(updateTables);
  $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
  jQuery(window).resize(function () { setTimeout(function() { updateTables(); }, 50); } );
   
	
 	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
			
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("responsive");
		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

 //   setCellHeights(original, copy);
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
