var am = new AlertManager();
var results;
var displayNum = 5;
var idRecord;

$(function () {
    start();
});

function start() {
    $('#pageing').children().remove();
    getFromDB();
    getLocally(0, displayNum - 1);
    pagination(1);
    //Add, Save, Edit and Delete functions code 
    $(".btnEdit").bind("click", Edit);
    $(".btnDelete").bind("click", Delete);
    $("#btnAdd").bind("click", Add);
    $("ul.pagination li a").click(function (data) {
        var a = $(this).text();
        getLocally(((a - 1) * displayNum), a * displayNum - 1);
        changeActiveness($(".pagination").children(), a - 1);
    });

    $("tbody").on('click', ".selectImage", function () {
        $("#txtSearch").val('');
        idRecord = $(this).attr('name');
        $("#images").children().remove();
        getImageURL(function (url) {
            if (url == null || url == undefined || url === "unselected") {
                getRelatedImages("");
            } else {
                getImage(url);
            }
        });
    });

    $("#txtSearch").change(function () {
        $("#images").children().remove();
        var txtSearch = $(this).val();
        getRelatedImages(txtSearch);
    })

    $('#images').on('click', 'img', function () {
        var imageId = $(this).attr('src');
        $.ajax({
            url: "/items",
            type: "POST",
            data: { id: idRecord, image: imageId },
            success: function (data) {
                $("#imageModal").modal('toggle');
                location.reload();
            }
        });
    });
}

function getImage(_url) {
    $("#images").children().remove();
    $.ajax({
        url: "/images",
        type: "GET",
        data: { url: _url },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var someimage = $("<img src='" + data[i].url + "' class='col-md-3 thumbnail alignleft alignright' height='100' width='50'/>") //make the image element however with whatever data you get
                $("#images").append(someimage);
            }
        }
    });
    $("#imageModal").modal();
}

function getImageURL(callback) {
    $.ajax({
        url: "/items",
        type: "GET",
        data: { _id: idRecord },
        success: function (data) {
            callback(data[0].image);
        }
    });
}

function getRelatedImages(regex) {
    $("#images").children().remove();
    $.ajax({
        url: "/images",
        type: "GET",
        data: { name: regex },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var someimage = $("<img src='" + data[i].url + "' class='col-md-3 thumbnail alignleft alignright' height='100' width='50'/>") //make the image element however with whatever data you get
                $("#images").append(someimage);
            }
        }
    });
    $("#imageModal").modal();
}

function Add() {
    $("#tblData tbody").append(
        "<tr class='trow'>" +
        "<td class='col-md-1'><input class='col-md-12' type='text'/></td>" +
        "<td class='col-md-1'><input class='col-md-12' type='text'/></td>" +
        "<td class='col-md-1'><input class='col-md-12' type='number'/></td>" +
        "<td class='col-md-6'><input class='col-md-12' type='text'/></td>" +
        "<td class='col-md-1'><input class='col-md-12' type='number'/></td>" +
        "<td class='col-md-1'><a class='btnImage'>unselected</a></td>" +
        "<td class='col-md-1'><img src='images/disk.png' class='btnSave'><img src='images/delete.png' class='btnDelete'/></td>" +
        "</tr>");
    $(".btnSave").bind("click", save);
    $(".btnDelete").bind("click", Delete);
};

function save() {
    var par = $(this).parent().parent(); //tr 
    var tdName = par.children("td:nth-child(1)");
    var tdType = par.children("td:nth-child(2)");
    var tdPrice = par.children("td:nth-child(3)");
    var tdDescrip = par.children("td:nth-child(4)");
    var tdDiscount = par.children("td:nth-child(5)");
    var tdImage = par.children("td:nth-child(6)");
    var tdButtons = par.children("td:nth-child(7)");

    var nameVal = tdName.children("input[type=text]").val();
    var typeVal = tdType.children("input[type=text]").val();
    var priceVal = tdPrice.children("input[type=number]").val();
    var descripVal = tdDescrip.children("input[type=text]").val();
    var discountVal = tdDiscount.children("input[type=number]").val();
    var imageVal = tdImage.children("input[type=text]").val();
    if (nameVal == '' || priceVal == '') {
        am.showAlert('Data is incomplete!', 'Please enter at least name and price.', 'Close');
    } else {
        $.ajax({
            url: "/items", type: "POST",
            data: { name: nameVal, type: typeVal, price: priceVal, descript: descripVal, discount: discountVal, image: "unselected" },
            success: function (result, status) {
                console.log('helooooo'); /// ????
            }
        });
        tdName.html(nameVal);
        tdType.html(typeVal);
        tdPrice.html(priceVal);
        tdDescrip.html(descripVal);
        tdDiscount.html(discountVal);
        tdImage.html(imageVal);
        tdButtons.html("<img src='images/delete.png' class='btnDelete'/><img src='images/pencil.png' class='btnEdit'/>");
        $(".btnEdit").bind("click", Edit);
        $(".btnDelete").bind("click", Delete);
        location.reload()
    }
};

function Edit() {
    var par = $(this).parent().parent(); //tr 
    var tdName = par.children("td:nth-child(1)");
    var tdType = par.children("td:nth-child(2)");
    var tdPrice = par.children("td:nth-child(3)");
    var tdDescrip = par.children("td:nth-child(4)");
    var tdDiscount = par.children("td:nth-child(5)");
    var tdImage = par.children("td:nth-child(6)");
    var tdButtons = par.children("td:nth-child(7)");

    tdName.html("<input class='form-control' type='text' id='txtName' value='" + tdName.html() + "'/>");
    tdType.html("<input class='form-control' type='text' id='txtType' value='" + tdType.html() + "'/>");
    tdPrice.html("<input class='form-control' type='number' id='txtPrice' value='" + tdPrice.html() + "'/>");
    tdDescrip.html("<input class='form-control' type='text' id='txtDescrip' value='" + tdDescrip.html() + "'/>");
    tdImage.html("<a class='getImage'>" + tdImage.html() + "</a>");
    tdDiscount.html("<input class='form-control' type='number' id='txtDiscount' value='" + tdDiscount.html() + "'/>");
    tdButtons.html("<img src='images/disk.png' class='btnSave'/>");

    $(".btnSave").bind("click", save);
};

function Delete() {
    // are you sure must be added
    var par = $(this).parent().parent(); //tr 
    var nameVal = par.children("td:nth-child(1)").text();
    var typeVal = par.children("td:nth-child(2)").text();
    var priceVal = par.children("td:nth-child(3)").text();
    var descripVal = par.children("td:nth-child(4)").text();
    var discountVal = par.children("td:nth-child(5)").text();
    var tdImage = par.children("td:nth-child(6)").text();
    $.ajax({
        url: "/items", type: "DELETE",
        data: { name: nameVal, type: typeVal, price: priceVal, descript: descripVal, discount: discountVal, image: tdImage }
    });
    par.remove();
};

function getFromDB() {
    var namef = $("#namef").val();
    var typef = $("#typef").val();
    var descripf = $("descripf").val();
    $.ajax({
        url: "/items", type: "GET", 'async': false, data: { name: namef, type: typef, descript: descripf }, success: function (data) {
            results = data;
        }
    });
}

function getLocally(start, end) {
    $(".trow").remove();
    if (results != undefined && results != null) {
        for (var i = start; i <= Math.min(end, results.length - 1); i++) {
            element = results[i];
            if (element.image !== "unselected") {
                element.image = "selected";
            }
            $("#tblData tbody").append(
                "<tr class='trow'>" +
                "<td>" + element.name + "</td>" +
                "<td>" + element.type + "</td>" +
                "<td>" + element.price + "</td>" +
                "<td>" + element.descript + "</td>" +
                "<td>" + element.discount + "</td>" +
                "<td><a class='selectImage' name='" + element._id + "'>" + element.image + "</a></td>" +
                "<td><img src='images/delete.png' class='btnDelete'/><img src='images/pencil.png' class='btnEdit'/></td>" +
                "</tr>");
            $(".btnDelete").bind("click", Delete);
            $(".btnEdit").bind("click", Edit);
        }
    }
}

function pagination(active) {
    resultsLength = results.length;
    var str = "<nav aria-label='Page navigation'>" + "<ul class='pagination'>";
    if (resultsLength > 2) {
        // if (resultsLength > 5 * displayNum) {
        //     str = str.concat("<li id='pre' aria-label='Previous'></li>");
        // }
        var until = Math.ceil(resultsLength / displayNum);
        for (var j = 1; j < until + 1; j++) {
            if (active == j) {
                str = str.concat("<li class='active'><a>" + j + "</a></li>");
            } else {
                str = str.concat("<li><a>" + j + "</a></li>");
            }
        }
        // if (resultsLength > 5 * displayNum) {
        //     str = str.concat("<li id='pre' aria-label='Next'><a></a></li>");
        // }
        str = str.concat("</ul></nav>");
        $('#pageing').append(str);
    }
}

function changeActiveness(items, active) {
    for (var j = 0; j < items.length; j++) {
        if (active == j) {
            items[j].classList.add("active");
        } else {
            items[j].classList.remove("active");
        }
    }
}
