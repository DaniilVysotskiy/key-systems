/**
 * Created by Zolotarev.K on 05.05.2017.
 */
$(document).ready(function(){


    $('.left-catalog-menu > li.dropdown').on('click',function(){

        var link_li  = $(this);
        var link_a = link_li.children('a');

        if(link_a.hasClass('active')){
            console.log(1);
            link_a.removeClass('active');
            link_li.children('.dropdown-menu').hide();
        }else{
            console.log(2);
            link_a.addClass('active');
            link_li.children('.dropdown-menu').show();
        }




        return false
    });

});