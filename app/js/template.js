/**
 * Created by Zolotarev.K on 05.05.2017.
 */
(function() {

    //dropDownMenu
    function dropDownMenu() {
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






    dropDownMenu();
    sortAlphabet();
})();

