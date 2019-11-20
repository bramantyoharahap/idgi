Product = {
    Save: function () {
        var productID = $('#id-product').val();
        var productCode = $('#code-product').val();
        var productName = $('#name-product').val();
        var _url;
        if (productID == '') {
            _url = App.baseApiUrl + '/Product/Add';
        } else {
            _url = App.baseApiUrl + '/Product/Update';
        }
        var dataFor = {
            ID: productID,
            Code: productCode,
            Name: productName
        }
        $.ajax({
            type: 'POST',
            url: _url,
            data: dataFor,
            success: function (data) {
                console.log(data);
                if (productID == '') {
                    $('#tbl-product > tbody').append('\
                        <tr> \
                            <td>' + data.ID + '</td> \
                            <td>' + data.Code + '</td> \
                            <td>' + data.Name + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="Product.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="Product.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
                            </td> \
                        </tr> \
                    ');
                    $('#frm-setup').modal('toggle');
                } else {
                    $('#tbl-product > tbody').empty();
                    $('#frm-setup').modal('toggle');
                    Product.LoadData();
                }
            },
            error: function () { },
        })
    },
    LoadData: function () {
        $.ajax({
            type: 'GET',
            url: App.baseApiUrl + '/Product/GetAll',
            success: function (data) {
                $.each(data, function (i) {
                    $('#tbl-product > tbody').append('\
                        <tr> \
                            <td>' + data[i].ID + '</td> \
                            <td>' + data[i].Code + '</td> \
                            <td>' + data[i].Name + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="Product.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="Product.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
                            </td> \
                        </tr> \
                    ');
                });
            },
            error: function () { }
        });
    },
    onEditClick: function (e) {
        var row = $(e.target).closest('tr');
        var productID = row.find('td').get(0).innerText;
        var productCode = row.find('td').get(1).innerText;
        var productName = row.find('td').get(2).innerText;

        $('#id-product').val(productID);
        $('#code-product').val(productCode);
        $('#name-product').val(productName);
        $('#frm-setup').modal('show');
    },
    onDeleteClick: function (e) {
        var row = $(e.target).closest('tr');
        var productID = row.find('td').get(0).innerText;
        var productName = row.find('td').get(1).innerText;

        $.ajax({
            type: 'POST',
            url: App.baseApiUrl + '/Product/Remove',
            data: {
                Id: productID
            },
            success: function () {
                $('#tbl-product > tbody').empty();
                Product.LoadData();
            },
            error: function () { }
        })
    }
};

