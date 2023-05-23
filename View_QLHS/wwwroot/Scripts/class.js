var _classId = '';
$(document).ready(function () {
    getClassData();
    $("#btnEditClass").click(function () {
        editClass(_classId);
    });
});

function addClass() {
    var url = "http://localhost:5113/api/Class"
    var obj = {};
    if ($('#ClassName').val() === '') {
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.name = $('#className').val();
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
            //        getClassData();
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
                getClassData();
            }).fail((jqXhr, textStatus, errorThrow) => {
                alert('Thêm thất bại');
            });
        }
    }
}

function editClass(classId) {
    var url = "http://localhost:5113/api/Class/" + classId
    var obj = {};
    if ($('#className').val() === ''){
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.ClassId = classId;
        obj.name = $('#className').val();
        if (obj) {
            //$.ajax({
            //    url: url,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: JSON.stringify(obj),
            //    type: "Put",
            //    success: function () {
            //        alert("Sửa thành công");
            //        getClassData();

            //    },
            //    error: function (msg) {
            //        alert("Thất bại");
            //    }
            //});
            $.ajax({
                type: 'Put',
                url: url,
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


function deleteClass(classId) {
    var url = "http://localhost:5113/api/Class/" + classId
    //$.ajax({
    //    url: url,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    type: "Delete",
    //    success: function () {
    //        alert("Đã xoá: " + classId);
    //        getClassData();

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
        getClassData();
    }).fail((jqXhr, textStatus, errorThrow) => {
        alert('Xóa thất bại');
    });
}

function getClassData() {
    var url = "http://localhost:5113/api/Class";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnAddClass").prop('disabled', false);
                $("#btnEditClass").prop('disabled', true);
                clearForm();
                $('#classData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {

                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].classId + "</td>"
                        + "<td>" + result[i].name+ "</td>"
                        + "<td>  <a class='btn btn-warning' onclick='getClassById(" + result[i].classId + ")'> Sửa </a> <button class='btn btn-danger' type='submit' onclick='deleteClass(" + result[i].classId + ")'> Xoá </button> </td>"
                }
                if (row != '') {
                    $('#classData').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getClassById(classId) {
    var url = "http://localhost:5113/api/Class/" + classId
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            $("#btnAddClass").prop('disabled', true);
            $("#btnEditClass").prop('disabled', false);
            if (result) {
                _classId = result.classId;
                $('#classId').val(result.classId);

                $('#className').val(result.name);
            }
        },
        error: function (msg) {
            alert("Thất bại");
        }
    });
}

function clearForm() {
    $('#className').val('');
    $('#classId').val('');
}