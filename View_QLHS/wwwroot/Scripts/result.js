var _resultId = '';
$(document).ready(function () {
    getResultData();
    $("#btnEditResult").click(function () {
        editResult(_resultId);
    });
});

function updateAll() {
    var url = "http://localhost:5113/api/Result/results"
    //$.ajax({
    //    url: url,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    type: "Post",
    //    success: function () {
    //        alert("Cập nhật thành công");
    //        getResultData();
    //    },
    //    error: function (msg) {
    //        alert("Thất bại");
    //    }
    //});
    $.ajax({
        url: url,
        type: 'Post',
        contentType: 'application/json',
    }).done((respJson) => {
        alert(respJson);
        getResultData();
    }).fail((jqXhr, textStatus, errorThrow) => {
        alert('Cập nhật thất bại');
    });
}

function editResult(resultId) {
    var url = "http://localhost:5113/api/Result/" + resultId
    var obj = {};
    if ($('#resultGPA').val() === ''){
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.resultId = resultId;
        obj.studentId = $('#studentId').val();
        obj.gpa = $('#resultGPA').val();

        if (obj) {
            //$.ajax({
            //    url: url,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: JSON.stringify(obj),
            //    type: "Put",
            //    success: function () {
            //        alert("Sửa thành công");
            //        getResultData();

            //    },
            //    error: function (msg) {
            //        alert("Thất bại");
            //    }
            //});
            $.ajax({
                url: url,
                type: 'Put',
                contentType: 'application/json',
                data: JSON.stringify(obj),
            }).done((respJson) => {
                alert(respJson);
                getResultData();
            }).fail((jqXhr, textStatus, errorThrow) => {
                alert('Sửa thất bại');
            });
        }
    }
}


function deleteResult(resultId) {
    var url = "http://localhost:5113/api/Result/" + resultId
    //$.ajax({
    //    url: url,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    type: "Delete",
    //    success: function () {
    //        alert("Đã xoá: " + resultId);
    //        getResultData();

    //    },
    //    error: function (msg) {
    //        alert("Thất bại");
    //    }
    //});
    $.ajax({
        url: url,
        type: 'Delete',
        contentType: 'application/json',
    }).done((respJson) => {
        alert(respJson);
        getResultData();
    }).fail((jqXhr, textStatus, errorThrow) => {
        alert('Xóa thất bại');
    });
}

function getResultData() {
    var url = "http://localhost:5113/api/Result";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnUpdateAll").prop('disabled', false);
                $("#btnEditResult").prop('disabled', true);
                clearForm();
                $('#resultData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {

                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].studentId + "</td>"
                        + "<td>" + result[i].gpa + "</td>"
                        + "<td>  <a class='btn btn-warning' onclick='getResultById(" + result[i].resultId + ")'> Sửa </a> <button class='btn btn-danger' type='submit' onclick='deleteResult(" + result[i].resultId + ")'> Xoá </button> </td>"
                }
                if (row != '') {
                    $('#resultData').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getResultById(resultId) {
    var url = "http://localhost:5113/api/Result/" + resultId
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            $("#btnUpdateAll").prop('disabled', true);
            $("#btnEditResult").prop('disabled', false);
            if (result) {
                _resultId = result.resultId;
                $('#studentId').val(result.studentId);
                $('#resultGPA').val(result.gpa);
            }
        },
        error: function (msg) {
            alert("Thất bại");
        }
    });
}

function clearForm() {
    $('#studentId').val('');
    $('#resultGPA').val('');
}