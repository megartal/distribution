var am = new AlertManager();

function Add() {
    $("#tblData tbody").append(
        "<tr>" +
        "<td><input type='text'/></td>" +
        "<td><input type='text'/></td>" +
        "<td><input type='number'/></td>" +
        "<td><input type='text'/></td>" +
        "<td><input type='number'/></td>" +
        // "<td><input type='image'/></td>" +
        "<td><img src='images/disk.png' class='btnSave'><img src='images/delete.png' class='btnDelete'/></td>" +
        "</tr>");
    $(".btnSave").bind("click", Save);
    $(".btnDelete").bind("click", Delete);
};

function Save() {
    var par = $(this).parent().parent(); //tr 
    var tdName = par.children("td:nth-child(1)");
    var tdType = par.children("td:nth-child(2)");
    var tdPrice = par.children("td:nth-child(3)");
    var tdDescrip = par.children("td:nth-child(4)");
    var tdDiscount = par.children("td:nth-child(5)");
    // var tdImage = par.children("td:nth-child(6)"); 
    var tdButtons = par.children("td:nth-child(6)");

    var nameVal = tdName.children("input[type=text]").val();
    var typeVal = tdType.children("input[type=text]").val();
    var priceVal = tdPrice.children("input[type=number]").val();
    var descripVal = tdDescrip.children("input[type=text]").val();
    var discountVal = tdDiscount.children("input[type=number]").val();
    // var imageVal = tdImage.children("input[type=text]").val();
    if (nameVal == '' || priceVal == '') {
        am.showAlert('Data is incomplete!', 'Please enter at least name and price.', 'Close');
    } else {
        $.ajax({
            url: "/items", type: "POST",
            data: { name: nameVal, type: typeVal, price: priceVal, descript: descripVal, discount: discountVal, image: "" },
            success: function (result, status) {
                tdName.html(nameVal);
                tdType.html(typeVal);
                tdPrice.html(priceVal);
                tdDescrip.html(descripVal);
                tdDiscount.html(discountVal);
                // tdImage.html(imageVal);
                tdButtons.html("<img src='images/delete.png' class='btnDelete'/><img src='images/pencil.png' class='btnEdit'/>");

                $(".btnEdit").bind("click", Edit);
                $(".btnDelete").bind("click", Delete);
            }
        });
    }
};


function Edit() {
    var par = $(this).parent().parent(); //tr 
    var tdName = par.children("td:nth-child(1)");
    var tdType = par.children("td:nth-child(2)");
    var tdPrice = par.children("td:nth-child(3)");
    var tdDescrip = par.children("td:nth-child(4)");
    var tdDiscount = par.children("td:nth-child(5)");
    // var tdImage = par.children("td:nth-child(6)");
    var tdButtons = par.children("td:nth-child(6)");

    tdName.html("<input type='text' id='txtName' value='" + tdName.html() + "'/>");
    tdType.html("<input type='text' id='txtType' value='" + tdType.html() + "'/>");
    tdPrice.html("<input type='number' id='txtPrice' value='" + tdPrice.html() + "'/>");
    tdDescrip.html("<input type='text' id='txtDescrip' value='" + tdDescrip.html() + "'/>");
    tdDiscount.html("<input type='number' id='txtDiscount' value='" + tdDiscount.html() + "'/>");
    // tdImage.html("<input type='image' id='txtImage' value='" + tdImage.html() + "'/>");
    tdButtons.html("<img src='images/disk.png' class='btnSave'/>");

    $(".btnSave").bind("click", Save);
    $(".btnEdit").bind("click", Edit);
    $(".btnDelete").bind("click", Delete);
};

function Delete() {
    // are you sure must be added
    var par = $(this).parent().parent(); //tr 
    var nameVal = par.children("td:nth-child(1)").text();
    var typeVal = par.children("td:nth-child(2)").text();
    var priceVal = par.children("td:nth-child(3)").text();
    var descripVal = par.children("td:nth-child(4)").text();
    var discountVal = par.children("td:nth-child(5)").text();
    // var tdImage = par.children("td:nth-child(6)"); 
    $.ajax({
        url: "/items", type: "DELETE",
        data: { name: nameVal, type: typeVal, price: priceVal, descript: descripVal, discount: discountVal, image: "" }
    });
    par.remove();
};

$(function () {
    get();
    //Add, Save, Edit and Delete functions code 
    $(".btnEdit").bind("click", Edit);
    $(".btnDelete").bind("click", Delete);
    $("#btnAdd").bind("click", Add);
    $('.datatable').dataTable({
        "sPaginationType": "bs_four_button"
    });	
    $('.datatable').each(function(){
        var datatable = $(this);
        // SEARCH - Add the placeholder for Search and Turn this into in-line form control
        var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
        search_input.attr('placeholder', 'Search');
        search_input.addClass('form-control input-sm');
        // LENGTH - Inline-Form control
        var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
        length_sel.addClass('form-control input-sm');
    });
});


function get() {
    $(".trow").remove();
    var namef = $("#namef").val();
    var typef = $("#typef").val();
    var descripf = $("descripf").val();
    $.ajax({
        url: "/items", type: "GET", data: { name: namef, type: typef, descript: descripf }, success: function (results) {
            if (results != undefined && results != null) {
                results.forEach(function (element) {
                    $("#tblData tbody").append(
                        "<tr class='trow'>" +
                        "<td>" + element.name + "</td>" +
                        "<td>" + element.type + "</td>" +
                        "<td>" + element.price + "</td>" +
                        "<td>" + element.descript + "</td>" +
                        "<td>" + element.discount + "</td>" +
                        // "<td><input type='image'/></td>" +
                        "<td><img src='images/delete.png' class='btnDelete'/><img src='images/pencil.png' class='btnEdit'/></td>" +
                        "</tr>");
                    $(".btnDelete").bind("click", Delete);
                    $(".btnEdit").bind("click", Edit);
                });
            }
        }
    });
}
