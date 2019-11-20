PO = {
    Save: function () {
        var poID = $('#id-po').val();
        var poCode = $('#code-po').val();
        var poDate = $('#date-po').val();
        var poSupplier = $('#supplier-po').val();
        var poRemark = $('#remarks-po').val();
        var _url;
        if (poID == '') {
            _url = App.baseApiUrl + '/PO/Add';
        } else {
            _url = App.baseApiUrl + '/PO/Update';
        }
        var dataFor = {
            ID: poID,
            Code: poCode,
            PurchaseDate: poDate,
            SupplierID: poSupplier,
            Remarks: poRemark
        }
        $.ajax({
            type: 'POST',
            url: _url,
            data: dataFor,
            success: function (data) {
                var poID = $('#id-po').val(data.ID);
                PO.ShowPODetail();
                console.log(data);
                if (poID == '') {
                    $('#tbl-po > tbody').append('\
                        <tr> \
                            <td>' + data.ID + '</td> \
                            <td>' + data.Code + '</td> \
                            <td>' + data.PurchaseDate + '</td> \
                            <td>' + data.SupplierID + '</td> \
                            <td>' + data.Remarks + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="PO.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="PO.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
                            </td> \
                        </tr> \
                    ');
                    $('#frm-setup').modal('toggle');
                } else {
                    $('#tbl-po > tbody').empty();
                    $('#frm-setup').modal('toggle');
                    PO.LoadData();
                }
            },
            error: function () { },
        })
        PO.ShowPODetail();
    },
    ShowPODetail: function () {
        $('#table-container-pod').show();
        $('#btnAddPOD-container').show();
        $('#tblpod-container').show();
    },
    HidePODetail: function () {
        //$('#table-container-pod').hide();
        //$('#table-container-pod').css('display', '');
        //$('#btnAddPOD-container').css('display', '');
        //$('#tblpod-container').css('display', '');
        //$('#btnAddPOD-container').hide();
        //$('#tblpod-container').hide();
    },
    LoadData: function () {
        $.ajax({
            type: 'GET',
            url: App.baseApiUrl + '/PO/GetAll',
            success: function (data) {
                $.each(data, function (i) {
                    $('#tbl-po > tbody').append('\
                        <tr> \
                            <td>' + data[i].ID + '</td> \
                            <td>' + data[i].Code + '</td> \
                            <td>' + data[i].PurchaseDate + '</td> \
                            <td>' + data[i].SupplierID + '</td> \
                            <td>' + data[i].Remarks + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="PO.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="PO.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
                            </td> \
                        </tr> \
                    ');
                });
            },
            error: function () { }
        });
        PO.HidePODetail();
    },
    onEditClick: function (e) {
        var row = $(e.target).closest('tr');
        var poID = row.find('td').get(0).innerText;
        var poCode = row.find('td').get(1).innerText;
        var poDate = row.find('td').get(2).innerText;
        var poSupplier = row.find('td').get(3).innerText;
        var poRemark = row.find('td').get(4).innerText;

        $('#id-po').val(poID);
        $('#code-po').val(poCode);
        $('#date-po').val(poDate);
        $('#supplier-po').val(poSupplier);
        $('#remarks-po').val(poRemark);
        $('#frm-setup').modal('show');
        this.onAddClick();
    },
    onDeleteClick: function (e) {
        var row = $(e.target).closest('tr');
        var poID = row.find('td').get(0).innerText;

        $.ajax({
            type: 'POST',
            url: App.baseApiUrl + '/PO/Remove',
            data: {
                Id: poID
            },
            success: function () {
                $('#tbl-po > tbody').empty();
                PO.LoadData();
            },
            error: function () { }
        })
    },
    onAddClick: function () {
        $('#table-container').hide();
        $('#form-container').show();
        $('#btnSave-container').removeClass('hidden');
        $('#btnSave-container').show();
        $('#btnAdd-container').hide();
        $('#btnCancel-container').removeClass('hidden');
        $('#btnCancel-container').show();
        PO.HidePODetail();
    },
    CancelPO: function () {
        $('#table-container').show();
        $('#form-container').hide();
        $('#btnSave-container').hide();
        $('#btnAdd-container').show();
        $('#btnCancel-container').hide();
    },

    SaveLine: function () {
        var poID = $('#id-pod').val();
        var poCode = $('#code-pod').val();
        var poDate = $('#date-po').val();
        var poSupplier = $('#supplier-po').val();
        var poRemark = $('#remarks-po').val();
        var _url;
        if (poID == '') {
            _url = App.baseApiUrl + '/PO/Add';
        } else {
            _url = App.baseApiUrl + '/PO/Update';
        }
        var dataFor = {
            ID: poID,
            Code: poCode,
            PurchaseDate: poDate,
            SupplierID: poSupplier,
            Remarks: poRemark
        }
        $.ajax({
            type: 'POST',
            url: _url,
            data: dataFor,
            success: function (data) {
                var poID = $('#id-po').val(data.ID);
                PO.ShowPODetail();
                console.log(data);
                if (poID == '') {
                    $('#tbl-po > tbody').append('\
                        <tr> \
                            <td>' + data.ID + '</td> \
                            <td>' + data.Code + '</td> \
                            <td>' + data.PurchaseDate + '</td> \
                            <td>' + data.SupplierID + '</td> \
                            <td>' + data.Remarks + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="PO.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="PO.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
                            </td> \
                        </tr> \
                    ');
                    $('#frm-setup').modal('toggle');
                } else {
                    $('#tbl-po > tbody').empty();
                    $('#frm-setup').modal('toggle');
                    PO.LoadData();
                }
            },
            error: function () { },
        })
        PO.ShowPODetail();
    },
    LoadDataLines: function () {
        $.ajax({
            type: 'GET',
            url: App.baseApiUrl + '/PO/GetAll',
            success: function (data) {
                $.each(data, function (i) {
                    $('#tbl-po > tbody').append('\
                        <tr> \
                            <td>' + data[i].ID + '</td> \
                            <td>' + data[i].Code + '</td> \
                            <td>' + data[i].PurchaseDate + '</td> \
                            <td>' + data[i].SupplierID + '</td> \
                            <td>' + data[i].Remarks + '</td> \
                            <td> \
                                <a class="btn btn-sm btn-default" onclick="PO.onEditClick(event)"><span class="glyphicon glyphicon-pencil"></span ></a > \
                                <a class="btn btn-sm btn-default" onclick="PO.onDeleteClick(event)"><span class="glyphicon glyphicon-trash"></span ></a > \
                            </td> \
                        </tr> \
                    ');
                });
            },
            error: function () { }
        });
        PO.HidePODetail();
    },
    onEditLineClick: function (e) {
        var row = $(e.target).closest('tr');
        var poID = row.find('td').get(0).innerText;
        var poCode = row.find('td').get(1).innerText;
        var poDate = row.find('td').get(2).innerText;
        var poSupplier = row.find('td').get(3).innerText;
        var poRemark = row.find('td').get(4).innerText;

        $('#id-po').val(poID);
        $('#code-po').val(poCode);
        $('#date-po').val(poDate);
        $('#supplier-po').val(poSupplier);
        $('#remarks-po').val(poRemark);
        $('#frm-setup').modal('show');
        this.onAddClick();
    },
    onDeleteLineClick: function (e) {
        var row = $(e.target).closest('tr');
        var poID = row.find('td').get(0).innerText;

        $.ajax({
            type: 'POST',
            url: App.baseApiUrl + '/PO/Remove',
            data: {
                Id: poID
            },
            success: function () {
                $('#tbl-po > tbody').empty();
                PO.LoadData();
            },
            error: function () { }
        })
    }
};