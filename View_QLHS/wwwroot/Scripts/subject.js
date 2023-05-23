var _subjectId = '';
$(document).ready(function () {
    getSubjectData();
    $("#btnEditSubject").click(function () {
        editSubject(_subjectId);
    });
});

function addSubject() {
    var url = "http://localhost:5113/api/Subject"
    var obj = {};
    if ($('#subjectName').val() === '') {
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.name = $('#subjectName').val();
        if (obj) {
            //$.ajax({
            //    url: url,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: JSON.stringify(obj),
            //    type: "Post",
            //    success: function () {
            //        alert("Thêm mới thành công");
            //        clearForm();
            //        getSubjectData();
            //    },
            //    error: function (msg) {
            //        alert("Thất bại");
            //    }
            //});
            $.ajax({
                type: 'Post',
                url: url,
                contentType: 'application/json',
                data: JSON.stringify(obj),
            }).done((respJson) => {
                alert(respJson);
                clearForm();
                getSubjectData();
            }).fail((jqXhr, textStatus, errorThrow) => {
                alert('Thêm thất bại');
            });
        }
    }
}

function editSubject(subjectId) {
    var url = "http://localhost:5113/api/Subject/" + subjectId
    var obj = {};
    if ($('#subjectName').val() === ''){
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.subjectId = subjectId;
        obj.name = $('#subjectName').val();
        if (obj) {
            //$.ajax({
            //    url: url,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: JSON.stringify(obj),
            //    type: "Put",
            //    success: function () {
            //        alert("Sửa thành công");
            //        getSubjectData();

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
                clearForm();
                getClassData();
            }).fail((jqXhr, textStatus, errorThrow) => {
                alert('Sửa thất bại');
            });
        }
    }
}


function deleteSubject(subjectId) {
    var url = "http://localhost:5113/api/Subject/" + subjectId
    //$.ajax({
    //    url: url,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    type: "Delete",
    //    success: function () {
    //        alert("Đã xoá: " + subjectId);
    //        getSubjectData();

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
        clearForm();
        getSubjectData();
    }).fail((jqXhr, textStatus, errorThrow) => {
        alert('Xóa thất bại');
    });
}

function getSubjectData() {
    var url = "http://localhost:5113/api/Subject";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnAddSubject").prop('disabled', false);
                $("#btnEditSubject").prop('disabled', true);
                clearForm();
                $('#subjectData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {

                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].subjectId + "</td>"
                        + "<td>" + result[i].name+ "</td>"
                        + "<td>  <a class='btn btn-warning' onclick='getSubjectById(" + result[i].subjectId + ")'> Sửa </a> <button class='btn btn-danger' type='submit' onclick='deleteSubject(" + result[i].subjectId + ")'> Xoá </button> </td>"
                }
                if (row != '') {
                    $('#subjectData').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getSubjectById(subjectId) {
    var url = "http://localhost:5113/api/Subject/" + subjectId
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            $("#btnAddSubject").prop('disabled', true);
            $("#btnEditSubject").prop('disabled', false);
            if (result) {
                _subjectId = result.subjectId;
                $('#subjectId').val(result.subjectId);

                $('#subjectName').val(result.name);
            }
        },
        error: function (msg) {
            alert("Thất bại");
        }
    });
}

function clearForm() {
    $('#subjectName').val('');
    $('#subjectId').val('');
}