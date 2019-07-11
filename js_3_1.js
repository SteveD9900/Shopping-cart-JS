window.onload = function() {
    var allSelect = document.getElementById('selectAll');
    var allSelect2 = document.getElementById('all_click_2');
    var list = document.getElementsByName('cb');
    var images = document.getElementsByClassName('sample_img');
    var item_number = 0;
    var flag_triangle = 0;
    var prod_img_list = document.getElementsByClassName('prod_img');
    var cancel_list = document.getElementsByClassName('cancel_botton');
    // click the top click all checbox
    allSelect.onclick = function() { 
        for(var i=0;i<list.length;i++) {
            list[i].checked = this.checked;
        }
        allSelect2.checked = this.checked;
        item_number = get_item();
        if(item_number == 0 && flag_triangle==1){
            var count = $('#cart_box tr').length;
            close_cell();
        }
        get_item_number();
        if (flag_triangle==1){
            add_img();
        }
    };
     // click the bottom click all checbox
    allSelect2.onclick = function() {
        for(var i=0;i<list.length;i++) {
            list[i].checked = this.checked;
        }
        allSelect.checked = this.checked;
        item_number = get_item();
        if(item_number == 0 && flag_triangle==1){
            var count = $('#cart_box tr').length;
            close_cell();
        }
        get_item_number();
        if (flag_triangle==1){
            add_img();
        }
        
    };

    for(var i=0;i<list.length;i++) {
        var select = list[i];
        select.onclick = function() {
            var flag = false;
            for(var j=0;j<list.length;j++) {
                if(!list[j].checked) {
                    flag=true;
                    break;
                }
            }
            allSelect.checked = !flag;// whether the click all bex is checked
            allSelect2.checked = !flag;
            item_number = get_item();
            get_item_number();
            
            if(item_number == 0 && flag_triangle==1){
                var count = $('#cart_box tr').length;
                close_cell();
            }else if(flag_triangle==1 && item_number>0){
                add_img();
            }
        };
    };
    
    function get_item_number(){// set the number and do the calculation of the whole price
        // alert(item_number);
        var number = document.getElementById('total_items');
        while( number.firstChild) {
            number.removeChild( number.firstChild );
        }
        number.appendChild(document.createTextNode(item_number));
        get_sum();
    }

    function get_item(){// get the number of all items
        var num = $('.number');
        var x = 0;
        for(var i=0; i<num.length;i++){
            if (list[i].checked){
                x = x + parseInt(num[i].value);
            }
        }
        return x;
    }

    function get_sum(){// do the calculation of the whole price
        var sum = 0.00;
        var num = $('.number');
        for(var i=0; i<num.length;i++){
            if (list[i].checked){
                sum = sum + parseFloat(num[i].value) * parseFloat(num[i].getAttribute("data-unit-price"));
            }
        }
        var span = document.getElementById('sum_total');
    
        while( span.firstChild) {
            span.removeChild( span.firstChild );
        }
        span.appendChild(document.createTextNode(sum.toFixed(2)));
    }

    function get_single_sum(){// function get single item total price
        var num = $('.number');
        var single_sum = $('.single_total');
        for(var i=0; i<num.length;i++){
            single_total =  parseFloat(num[i].value) * parseFloat(num[i].getAttribute("data-unit-price"));
            var span = single_sum[i];
            while( span.firstChild) {
                span.removeChild( span.firstChild );
            }
            span.appendChild(document.createTextNode(single_total.toFixed(2)));
        }
    }
    
    $('.minus-btn').on('click', function() {
        // e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('form').find('input');
        var value = parseInt($input.val());

        if (value > 1) {
            value = value - 1;
        } else {
            value = 1;
        }
        $input.val(value);
        get_single_sum();
        item_number = get_item();
        get_item_number();
    });

    $('.plus-btn').on('click', function() {
        // e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('form').find('input');
        var value = parseInt($input.val());

        if (value < 100) {
        value = value + 1;
        } else {
            value =100;
        }

        $input.val(value);
        get_single_sum();
        item_number = get_item();
        get_item_number();
    });

    $('#triangle-up').on('click', function(){
        if (flag_triangle==0 && item_number!=0){
            add_cell();
        }else if(item_number!=0 && flag_triangle==1) {
            close_cell();
        }
    });

    function add_cell(){//add new row in the table
        $('#triangle-up').css("border-top", "10px solid #555");
        $('#triangle-up').css("border-bottom", "0px");
        flag_triangle = 1;
        var table = document.getElementById("cart_box");
        var row = table.insertRow(5);
        var cell = row.insertCell();
        cell.colSpan = "6";
        var new_div = document.createElement("div");
        cell.appendChild(new_div);
        new_div.id = "picture";
        add_img();
    }

    function close_cell(){// delete the new row and flip the triangle
        $('#triangle-up').css("border-top", "0px");
        $('#triangle-up').css("border-bottom", "10px solid #555");
        flag_triangle = 0;
        var row = document.getElementById("cart_box");
        row.deleteRow(5);
    }

    function add_img(){// add image in this new row
        var src = document.getElementById("picture");
        while (src.firstChild) {
            src.removeChild(src.firstChild);
        }
        var len = images.length;
        for(var i = 0; i<len; i++){
            if(list[i].checked){
                var img_div = document.createElement("div");
                var img = document.createElement("img");//create img element
                img.src = images[i].src;
                img_div.className="div_img";
                // img_div.style.backgroundImage = images[i].src;
                var cancel_btn = document.createElement("button");//create button element
                cancel_btn.innerHTML="取消选择";
                cancel_btn.className="cancel_botton";
                cancel_btn.value=i;
                cancel_btn.style.top = src.parentElement.offsetTop +140+ 'px';
                cancel_btn.style.left = ($(document).width()-775)/2+97*prod_img_list.length +"px";//set button position
                img_div.appendChild(cancel_btn);
                img_div.appendChild(img);
                src.appendChild(img_div);
                img_div.className = "prod_img";
                
            }
            $('.cancel_botton').on('click', function(){//click cancel button on the image
                var fired_button = $(this).val();
                var slideIndex = $(this).closest('.prod_img');
                slideIndex[0].parentNode.removeChild(slideIndex[0]);
                list[fired_button].checked = false;
                allSelect.checked = false;
                allSelect2.checked = false;
                item_number = get_item();
                get_item_number();
                for (var j = 0; j < cancel_list.length; j++){// reorder the button position
                    cancel_list[j].style.left = ($(document).width()-775)/2+97*j +"px";
                }
                if(item_number == 0 && flag_triangle==1){
                    close_cell();
                }
            });    
        }
        
    }

    window.onresize = function(){
        add_img();
    }

}

$(document).ready(function () {//hide
    $(document).on('mouseenter', '.prod_img', function () {
        $(this).find(":button").show();
    }).on('mouseleave', '.prod_img', function () {
        $(this).find(":button").hide();
    });
});
