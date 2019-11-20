var Supplier = {
    Save: function () {
        var supplierID = $('#id-supplier').val();
        var supplierCode = $('#code-supplier').val();
        var supplierName = $('#name-supplier').val();
        var supplierCity = $('#city-supplier').val();
        var _url;
        if (supplierID == '') {
            _url = App.baseApiUrl + '/Supplier/Add';
        } else {
            _url = App.baseApiUrl + '/Supplier/Update';
        }
        var dataFor = {
            ID: supplierID,
            Code: supplierCode,
            Name: supplierName,
            City: supplierCity
        }
        $.ajax({
            type: 'POST',
            url: _url,
            data: dataFor,
            success: function (data) {
                console.log(data);
                if (supplierID == '') {
                    $('#tbl-supplier > tbody').append('\
                        <tr> \
                            <td>' + data.ID + '</td> \
                            <td>' + data.Code + '</td> \
                            <td>' + data.Name + '</td> \
                            <td>' + data.City + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="Supplier.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="Supplier.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
                            </td> \
                        </tr> \
                    ');
                    $('#frm-setup').modal('toggle');
                } else {
                    $('#tbl-supplier > tbody').empty();
                    $('#frm-setup').modal('toggle');
                    Supplier.LoadData();
                }
            },
            error: function () { },
        })
    },
    LoadData: function () {
        $.ajax({
            type: 'GET',
            url: App.baseApiUrl + '/Supplier/GetAll',
            success: function (data) {
                $.each(data, function (i) {
                    $('#tbl-supplier > tbody').append('\
                        <tr> \
                            <td>' + data[i].ID + '</td> \
                            <td>' + data[i].Code + '</td> \
                            <td>' + data[i].Name + '</td> \
                            <td>' + data[i].City + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="Supplier.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="Supplier.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
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
        var supplierID = row.find('td').get(0).innerText;
        var supplierCode = row.find('td').get(1).innerText;
        var supplierName = row.find('td').get(2).innerText;
        var supplierCity = row.find('td').get(3).innerText;

        $('#id-supplier').val(supplierID);
        $('#code-supplier').val(supplierCode);
        $('#name-supplier').val(supplierName);
        $('#city-supplier').val(supplierCity);
        $('#frm-setup').modal('show');
    },
    onDeleteClick: function (e) {
        var row = $(e.target).closest('tr');
        var supplierID = row.find('td').get(0).innerText;
        var supplierName = row.find('td').get(1).innerText;

        $.ajax({
            type: 'POST',
            url: App.baseApiUrl + '/Supplier/Remove',
            data: {
                Id: supplierID
            },
            success: function () {
                $('#tbl-supplier > tbody').empty();
                Supplier.LoadData();
            },
            error: function () { }
        });
    }
};
