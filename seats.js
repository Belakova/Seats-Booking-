  	 //http://socwebtech1.napier.ac.uk/~40122079/cw1/index.html
 $(function(){  
	 //Get flight details from the server
 $.getJSON('booking1.json',function(d){
	 
	  
	 
		$('td.n').empty();
 
		$('#whereFrom').text(d.whereFrom);	 
		$('#whereTo').text(d.whereTo);	 
		$('#whereTo1').text(d.whereTo);	 
	  // Date and time -> Step 2
		var leave = new Date(d.departAt);	
		$('#takeOffTime').text(leave.toUTCString()); 
		var goBack = new Date(d.arriveAt);	 
		$('#landTime').text(goBack.toUTCString()); 
  		$('#numSeats').text(d.numSeats);
		$('#numSeats1').text(d.numSeats);		
		$('#unitPrice').text(d.unitPrice);
		totalPrice = (d.numSeats * (d.unitPrice));
		$('#subTotal').text(totalPrice);
		
    
	    var i=0;  //serves as a counter for every td n for d.alloc
		 
		 

		
 $('#plan td.n').each(function(){
	     console.log(d.pricing[1].range[0]); 
		 if(d.alloc[i]=='1'){	//seat is already taken, no more actions	
			$($('td.n')[i]).addClass('taken');
		  }
		 
		 else if (d.alloc[i]=='0'){
				//seat is free 
				$(this).text("");
				$(this).addClass('available');
				
				//pricing:Array[5] -> range[2]				
				var range0=0;
				var range1=0;
				var range2=0;
				var range3=0;
				var range4=0;				
				//console.log(d.pricing[4].range[1]);
				if (d.pricing[0]){
					var a = d.pricing[0].range[0];
					var b = d.pricing[0].range[1];
					range0 = (b.slice(1,2)-a.slice(1,2)+1)*6;//2a - 1 row only -> 1a-1f
					 
					}
				if (d.pricing[1]){
					var a = d.pricing[1].range[0];
					var b = d.pricing[1].range[1];
					range1 = range0+(b.slice(1,2)-a.slice(1,2)+1)*6-1;  //2a-6f
					//console.log(range0);
					//6 + (6-2)*6-1 =5 rows 
					//console.log(a.slice(1,2)); 
					 }
				if (d.pricing[2]){
					var a = d.pricing[2].range[0];
					var b = d.pricing[2].range[1];
					range2 = range1+(b.slice(1,3)-a.slice(1,2)+1)*6; //7a-11f
					}
				if (d.pricing[3]){
					var a = d.pricing[3].range[0];
					var b = d.pricing[3].range[1];
					range3 = range2+(b.slice(1,3)-a.slice(1,3)+1)*6;//12a-13f 
					}
				if (d.pricing[4]){
					var a = d.pricing[4].range[0];
					var b = d.pricing[4].range[1];
					range4 = range3+(b.slice(1,3)-a.slice(1,3)+1)*6; //14a-23f
					}
			  
					//comparing the ranges and showing the price on hover
				  if(i<=range0){  
						   $(this).append('<span class ="showPrice">'+('&pound;')+d.pricing[0].price+'</span><span class="seatOption">'+d.pricing[0].cat+'</span>');
										//+('&pound;')
										}
				   
				  else if(i<=range1){  
				  
						   $(this).append('<span class ="showPrice">'+('&pound;')+d.pricing[1].price+'</span><span class="seatOption">'+d.pricing[1].cat+'</span>');
						
				   }
				  else if(i<=range2){  
						   $(this).append('<span class ="showPrice">'+('&pound;')+d.pricing[2].price+'</span><span class="seatOption">'+d.pricing[2].cat+'</span>');
						
				   }
				  else if(i<=range3){  
						   $(this).append('<span class ="showPrice">'+('&pound;')+d.pricing[3].price+'</span><span class="seatOption">'+d.pricing[3].cat+'</span>');
						
				   }
				   
				  else if(i<=range4){  
						   $(this).append('<span class ="showPrice">'+('&pound;')+d.pricing[4].price+'</span><span class="seatOption">'+d.pricing[4].cat+'</span>');
						
				   }
	      } 
	  i++;
	  
			var index=1; 
			$("td:nth-child(4)" ).each(function(index){
			$(this).html(index+1);
			 });  
	
  });  
   });	
   
 
       
		 
		
		
	
    $('#plan td.n').click(function(){
		var finalPrice = totalPrice;	 // *need to add to this after
		 
		x = ($(this).attr("id")); // id of the selected seat	 
	    var selectedSeat = (parseInt(document.getElementById('seatsAlloc').innerHTML)) ; 
		var TotalSeats = (parseInt(document.getElementById('numSeats2').innerHTML));	 
		var a = document.getElementById(x); //the actual html element	
		var additionalPrice =a.getElementsByClassName('showPrice')[0].innerHTML; //price for chosen seat [0]-> only one
	    
		 var arr =[]; 
		 var ids = [];
		if($(this).hasClass('available')){  
			   
				if(selectedSeat!=TotalSeats){		
				
				    ($(this).removeClass('available'));
					($(this).addClass('selected'));
					 $('#seatsAlloc').text(selectedSeat+1); //counting how many seats were chosen
					 
					 console.log('Seat : '+x.slice(1) +  ' Price: ' +additionalPrice); 			
					 
				   //extra cost calculation
				   $('td.selected').each(function(){
					   
				   var summary =  ($(this).children('span.showPrice').html()).slice(1);
				   arr.push(summary);    	
				   var s = eval((arr).join("+"));
				   $('#summary').html('<span>'+s+ '</span>'); 
			       $('#subTotal').html((finalPrice+s).toFixed(2)) ;	
				   goNext =1;
				  //change price if the seat is reselected 
				   if(('td.selected').remove){ 				   	 
				   s = eval((arr).join("-")); 			   	
				   $('#summary').prepend('<span>'+s+'</span>');
				  }
			  	}); 
				}
				
			  else{ 	
					 	
			 
			  $('#continue').html('<button id="btn" type="button">Continue</button>'); 
			  $('#radio').css('visibility', 'visible');
			 }			
		}
			else if($(this).hasClass('selected')){ 
 				 $(this).children('span.label').remove();	 
				  $('#continue').empty();
			      if(selectedSeat!=0){
				 ($(this).removeClass('selected'));			 
				 ($(this).addClass('available'));
				 $('#seatsAlloc').text(selectedSeat -1);
			 }
		 	};
				
		 
	});
	
	 //adding 2% to the final	
	 $('input[type="radio"]').click(function(){
		finalPrice = (parseInt(document.getElementById('subTotal').innerHTML));
			if($(this).attr("value")=="CreditCard"){		
			
				finalPrice = finalPrice + (finalPrice* 0.02);
				$('#subTotal').text((finalPrice).toFixed(2));
			}
			else{				
				finalPrice = (finalPrice- (finalPrice* 0.02));
				$('#subTotal').text(finalPrice).toFixed(2);
			}
	 	});   
		
	    $('#continue').click(function() {
		if (goNext==1){
			document.getElementById('continue').onmouseclick = hide('content');
		    show('next');
			 
		}
	});
	
	  $('#goBackbtn').click(function() {
		  document.getElementById('goBackbtn').onmouseclick = show('content');
});

function show(target) {
		document.getElementById(target).style.display = 'block';
		document.getElementById('goBackbtn').style.display = 'none';
		document.getElementById('name').innerHTML = "welcome";
}
		
function hide(target) {
	  document.getElementById(target).style.display = 'none';
	  document.getElementById('name').innerHTML = "Thank you for booking the seats";
	  document.getElementById('name').style.fontSize = "xx-large";
	  document.getElementById('goBackbtn').style.display = 'block';
} 
	 });
	 
 
    
  