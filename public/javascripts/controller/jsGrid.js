$(function() {

    var itemType = [
        { Name: "", Id: 0 },
        { Name: "Type1", Id: 1 },
        { Name: "Type2", Id: 2 },
        { Name: "Type3", Id: 3 },
        { Name: "Type4", Id: 4 },
        { Name: "Type5", Id: 5 },
    ];

    $("#jsGrid").jsGrid({
        // height: "70%",
        width: "100%",
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete item?",
        controller: {
            loadData: function(filter) {
                return $.ajax({
                    type: "GET",
                    url: "/items",
                    data: filter
                });
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/items",
                    data: item
                })
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/items",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/items",
                    data: item
                });
            }
        },
        fields: [
            { name: "Name", type: "text", width: 150 },
            { name: "Type", type: "select", items: itemType, valueField: "Id", textField: "Name", filtering: false },
            { name: "Price", type: "number", width: 50, filtering: false },
            { name: "Description", type: "text", width: 400 },
            { name: "Available", type: "checkbox", title: "Is Available", sorting: false },
            { type: "control" }
        ]
    });
    
});


