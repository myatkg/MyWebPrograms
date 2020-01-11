// Extra JavaScript for DatePicker added manually
	    $(document).ready(function(){
	        var date_input=$('input[name="date"]'); //our date input has the name "date"
	        var container=$('#calendar-form').length>0 ? $('#calendar-form').parent() : "body";
	        date_input.datepicker({
	        	language: "ja",
	            format: "mm月dd日yyyy年",
	            container: container,
	            startDate: "01/01/1950",
    			endDate: "31/12/2200",
    			clearBtn: true,
	            todayHighlight: true,
	            autoclose: true,
	            toggleActive: true,
	            
	        });
	    });