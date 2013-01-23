// This is a manifest file that'll be compiled into public.js, which will include all the files
//= require dashboard/jQuery/jquery-1.7.2.min
//= require dashboard/Flot/jquery.flot
//= require dashboard/Flot/jquery.flot.resize
//= require dashboard/Flot/jquery.flot.pie
//= require dashboard/DataTables/jquery.dataTables.min
//= require dashboard/ColResizable/colResizable-1.3
//= require dashboard/jQueryUI/jquery-ui-1.8.21.min
//= require dashboard/Uniform/jquery.uniform
//= require dashboard/Tipsy/jquery.tipsy
//= require dashboard/Elastic/jquery.elastic
//= require dashboard/ColorPicker/colorpicker
//= require dashboard/SuperTextarea/jquery.supertextarea.min
//= require dashboard/UISpinner/ui.spinner
//= require dashboard/MaskedInput/jquery.maskedinput-1.3
//= require dashboard/ClEditor/jquery.cleditor
//= require dashboard/FullCalendar/fullcalendar
//= require dashboard/ColorBox/jquery.colorbox
//= require jquery.fancybox.pack
//= require dhtmlxcalendar
//= require dashboard/kanrisha
//= require stripe
//= require jquery_ujs
//= require swfobject

// Contacts
$(function() {
  $( "#dialog" ).dialog({
    autoOpen: false,
    show: "blind",
    hide: "explode",
    width:'auto'
  });

  $( "#new_list_link" ).click(function() {
    $( "#dialog" ).dialog( "open" );
    $(".w_Options.i_16_add").trigger('click');
    return false;
  });
  
  $( "#new_list_link_1" ).click(function() {
    $( "#dialog" ).dialog( "open" );
    return false;
  });

  $("form#new_list").submit(function(){
    var action = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: action,
      data: $(this).serialize(),
      dataType: "script"
    });
    $("#contact-lists-table .ajax-loading").show();
    $("#dialog").dialog("close");
    return false;
  });

  $("form#list_delete_link").live("submit", function(){
    if (confirm('By deleting this list, all contacts within this list will be erased. Do you want to proceed?')) {
      var action = $(this).attr("action");
      $.ajax({
        type: 'DELETE',
        url: action,
        data: $(this).serialize(),
        dataType: "script"
      });
      $("#contact-lists-table .ajax-loading").show();
    }
    return false;
  });

  $("form#contact_delete_link").live("submit", function(){
    if (confirm('Are you sure to delete!')) {
      var action = $(this).attr("action");
      $.ajax({
        type: 'DELETE',
        url: action,
        data: $(this).serialize(),
        dataType: "script"
      });
      $("#contacts-table .ajax-loading").show();
    }
    return false;
  });
});

//Fix file uploader click event
$(function(){
  $(".uploader span.action").click(function(){
    $(this).parent(".uploader").children(".simple_form").click();
  });
});

//Import Contacts
$(function(){
  $('#import_file_name').change(function(){
    var ext = $('#import_file_name').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['xls','xlsx','csv']) == -1) {
      alert('You may only upload an xls, xlsx, or csv file');
    }
  });

  $("#new_import").submit(function(){
    var ext = $('#import_file_name').val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['xls','xlsx','csv']) == -1) {
      alert('You may only upload an xls, xlsx, or csv file');
      return false;
    }else {
      return true;
    }
  });
});