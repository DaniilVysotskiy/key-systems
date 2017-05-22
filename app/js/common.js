$(function() {

	//Currency formater
	/*
	 * @param integer n: length of decimal
	 * @param integer x: length of whole part
	 * @param mixed   s: sections delimiter
	 * @param mixed   c: decimal delimiter
	 */
	Number.prototype.format = function(n, x, s, c) {
	    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
	        num = this.toFixed(Math.max(0, ~~n));

	    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	};


	// Custom JS
	//dropDownMenu
	function dropDownMenu() {
	    $('.left-catalog-menu > li.dropdown').on('click',function(){
	        var link_li  = $(this);
	        var link_a = link_li.children('a');
	        if(link_a.hasClass('active')){

	            link_a.removeClass('active');
	            link_li.children('.dropdown-menu').hide();
	        }else{

	            link_a.addClass('active');
	            link_li.children('.dropdown-menu').show();
	        }
	        return false;
	    });
	}
	//dropDownMenu END

	//sortAlphabet
	function sortAlphabet() {
	    $('.-g__sort-link').on('click',function(){
	        var item = $(this);
	        var text_block = $('.g__sort-link__letters');
	        var str = $('.g__sort-link__letters').text();
	        var new_str = str.split("").reverse().join("");
	        if(item.hasClass('active')){
	            item.removeClass('active');
	            text_block.text(new_str);
	        }else{
	            item.addClass('active');
	            text_block.text(new_str);

	        }
	        return false;
	    });
	}
	//sortAlphabet END

	// sliderInit
	function sliderInit() {
		$('.owl-carousel').owlCarousel({
			items: 1,
			nav: true,
			dots: false,
			margin: 0,
			navText: ['',''],
		});
	}
	// sliderInit END

	// Tab menu functionality
	function tabMenuHandle(){
		$('.section-tabs__menu').on('click', 'a', function(event) {
			event.preventDefault();
			var link = $(this).attr('href');

			$(this)
				.parent('li')
				.addClass('active')
				.siblings('li')
				.removeClass('active');
			$(link)
				.addClass('active')
				.siblings('.tab')
				.removeClass('active');
		});
	}
	// Tab menu functionality END

	// Table functionality
	function tableHandle() {
		$('.table.product-parameters').on('mousedown', '.spinner-btn', function(e){
			var btn = this;
			var input = $(this).siblings('input');
			var inputVal = parseInt($(input).val());
			var link = $(input).closest('tr').find('.default-link');

			if($(btn).data('item') == 'minus' && inputVal > 0){
				$(input).focus();
				inputVal--;
				$(input).val(inputVal);
			} else if ($(btn).data('item') == 'plus') {
				$(input).focus();
				inputVal++;
				$(input).val(inputVal);
			}

			if(inputVal > 0) {
				$(link).removeClass('disabled');
			} else {
				$(link).addClass('disabled');
			}
		});

		$('.table.product-parameters').on('input', 'input', function(){
			var input = this;
			var inputVal = parseInt($(input).val());
			var link = $(input).closest('tr').find('.default-link');

			if(inputVal > 0) {
				$(link).removeClass('disabled');
			} else {
				$(link).addClass('disabled');
			}
		});
	}
	// Table functionality END

	// Cart functionality
	function cartHandle() {

		var input = $('.quantity-spinner'),
			priceTotal = $('[data-item="price-total"]'),
			priceNds = $('[data-item="price-nds"]'),
			NDS_RATE = 0.18,
			wrapper = $( ".file_upload" ),
	        inp = wrapper.find( "input" ),
	        btn = wrapper.find( ".button" ),
	        lbl = wrapper.find( "mark" ),
	        file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;
			
		//On initial load
		for (var i = 0; i < input.length; i++) {
			var qnt = parseFloat($(input[i]).val()),
				itemBasePrice = parseFloat($(input[i]).closest('tr').find('.item-base-price').data('price')),
				totalSumCell = $(input[i]).closest('tr').find('.total-item-price'),
				totalSum;

			totalSum = qnt * itemBasePrice;
			totalSumCell.data('price', totalSum);
			totalSum = totalSum.toFixed(2).toString().replace('.', ',');

			if(!isNaN(qnt)) {
				totalSumCell.text(totalSum + ' ₽');
			} else {
				totalSumCell.text('0 ₽');
			}

			// calculateTotalAndNdsPrice();
		}

		//On using spinners buttons
		$('.table.cart').on('mousedown', '.spinner-btn', function(){
			var btn = this,
				input = $(this).siblings('input'),
				qnt = parseInt($(input).val()),
				item = $(this).closest('tr');
				itemBasePrice = parseFloat($(input).closest('tr').find('.item-base-price').data('price')),
				totalSumCell = $(input).closest('tr').find('.total-item-price'),
				totalSum;
			
			if($(btn).data('item') == 'minus' && qnt > 0){
				$(input).focus();
				qnt--;
				$(input).val(qnt);
			} else if ($(btn).data('item') == 'plus') {
				$(input).focus();
				qnt++;
				$(input).val(qnt);
			}

			totalSum = qnt * itemBasePrice;
			totalSumCell.data('price', totalSum);
			totalSum = totalSum.toFixed(2).toString().replace('.', ',');

			if(!isNaN(qnt)) {
				totalSumCell.text(totalSum + ' ₽');
			} else {
				totalSumCell.text('0 ₽');
			}

			calculateTotalAndNdsPrice();
			
		});

		//On direct input
		$('.quantity-spinner').on('input', function(){
			var input = this,
				qnt = parseFloat($(input).val()),
				itemBasePrice = parseFloat($(input).closest('tr').find('.item-base-price').data('price')),
				totalSumCell = $(input).closest('tr').find('.total-item-price'),
				totalSum;

			totalSum = qnt * itemBasePrice;
			totalSumCell.data('price', totalSum);
			totalSum = totalSum.toFixed(2).toString().replace('.', ',');		

			if(!isNaN(qnt)) {
				totalSumCell.text(totalSum + ' ₽');
			} else {
				totalSumCell.text('0,00 ₽');
			}

			calculateTotalAndNdsPrice();
		})

		//File upload functionality
	    btn.focus(function(){
	        inp.focus()
	    });
	    // Crutches for the :focus style:
	    inp.focus(function(){
	        wrapper.addClass( "focus" );
	    }).blur(function(){
	        wrapper.removeClass( "focus" );
	    });


        inp.change(function(){
            var file_name;
            if( file_api && inp[ 0 ].files[ 0 ] )
                file_name = inp[ 0 ].files[ 0 ].name;
            else
                file_name = inp.val().replace( "C:\\fakepath\\", '' );

            if( !file_name.length )
                return;

            if( lbl.is( ":visible" ) ){
                lbl.text( file_name );
                btn.text( "Выбрать файл" );
            }else
                btn.text( file_name );
        }).change();

        $( window ).resize(function(){
            $( ".file_upload input" ).triggerHandler( "change" );
        });


        //Helper functions
        function calculateTotalAndNdsPrice() {
        	var totalSumOfItem = $('.total-item-price'),
        		totalSumOfOrder = 0,
        		nds = 0;

        	for (var i = 0; i < totalSumOfItem.length; i++) {
        		var totalSumOfItemVal = parseFloat($(totalSumOfItem[i]).data('price'));

        		totalSumOfOrder += totalSumOfItemVal;
        	}

        	nds = (totalSumOfOrder * NDS_RATE).format(2, 3, ' ', ',');
        	totalSumOfOrder = totalSumOfOrder.format(2, 3, ' ', ',');


        	priceTotal.text(totalSumOfOrder + ' ₽');
        	priceNds.text(nds + ' ₽');
        }

	};
	// Cart functionality END

	$(document).ready(function(){
		dropDownMenu();
		sortAlphabet();
		sliderInit();
		tabMenuHandle();
		tableHandle();
		cartHandle();
	})	
});
