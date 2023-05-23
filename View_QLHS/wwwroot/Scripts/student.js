var stdId = '';


$(document).ready(function () {
    getStudentData();
    loadClass();
    $("#btnEditStudent").click(function () {
        editStudent(stdId);
    });
    $("#btnSearchStudentByClassId").click(function () {

        getStudentsByClassId($('#txtSearchStudentByClassId').val());

    });
   
    $("#btnSearchStudentByName").click(function () {
        getStudentsByStudentName($('#txtSearchStudentByName').val());
    });

    $("#btnSearchStudentByRank").click(function () {
        getStudentsByRank($('#txtSearchStudentByRank').val());
    });

    $("#btnDownloadExport").click(function () {
        exportToPDF($('#txtSearchStudentByClassId').val());
    });
});
// add student
function addStudent() {
    var url = "http://localhost:5113/api/Student"
    var obj = {};
    if ($('#studentName').val() === '' || $('#studentClassId').val() === '') {
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.name = $('#studentName').val();
        obj.classId = $('#studentClassId').val();
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
            //        getStudentData();
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
                getStudentData();
            }).fail((jqXhr, textStatus, errorThrow) => {
                alert('Thêm thất bại');
            });
            
        }
    }
}
// edit student
function editStudent(studentId) {
    var url = "http://localhost:5113/api/Student/" + studentId
    var obj = {};
    if ($('#studentName').val() === '' || $('#studentClassId').val() === '') {
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.studentId = studentId;

        obj.name = $('#studentName').val();
        obj.classId = $('#studentClassId').val();
        //if (obj) {
        //    $.ajax({
        //        url: url,
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        data: JSON.stringify(obj),
        //        type: "Put",
        //        done: function (res) {
        //            alert(res);
        //            getStudentData();

        //        }
        //    });
        //}
        $.ajax({
            type: 'Put',
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(obj),
        }).done((respJson) => {
            alert(respJson);
            clearForm();
            getStudentData();
        }).fail((jqXhr, textStatus, errorThrow) => {
            alert('Sửa thất bại');
        });

    }
}

//delete student
function deleteStudent(studentId) {
    var url = "http://localhost:5113/api/Student/" + studentId
    //$.ajax({
    //    url: url,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    type: "Delete",
    //    success: function () {
    //        alert("Đã xoá: " + studentId);
    //        getStudentData();

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
        getStudentData();
    }).fail((jqXhr, textStatus, errorThrow) => {
        alert('Xóa thất bại');
    });

}
// get all students
function getStudentData() {
    var url = "http://localhost:5113/api/Student";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnAddStudent").prop('disabled', false);
                $("#btnEditStudent").prop('disabled', true);
                clearForm();
                loadClass();
                $('#studentData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].name + "</td>"
                        + "<td>" + result[i].classId + "</td>"
                        + "<td>  <a class='btn btn-warning' onclick='getStudentById(" + result[i].studentId +")'> Sửa </a> <button class='btn btn-danger' type='submit' onclick='deleteStudent(" + result[i].studentId +")'> Xoá </button> </td>"                     
                }
                if (row != '') {
                    $('#studentData').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
// get students by classId
function getStudentsByClassId(_clsId) {
    var url = "http://localhost:5113/api/Student/" + _clsId +"/classStudents";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnAddStudent").prop('disabled', false);
                $("#btnEditStudent").prop('disabled', true);
                $("#btnDownloadExport").prop('disabled', false);

                clearForm();
                $('#studentData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].studentName + "</td>"
                        + "<td>" + result[i].className + "</td>"
                        + "<td>" + result[i].gpa + "</td>"
                        + "<td>" + result[i].rankName + "</td>"
                }
                if (row != '') {
                    $('#studentData').append(row);
                }
            }         
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
// get students by Name
function getStudentsByStudentName(_name) {
    var url = "http://localhost:5113/api/Student/" + _name + "/nameStudents";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnAddStudent").prop('disabled', false);
                $("#btnEditStudent").prop('disabled', true);
                clearForm();
                $('#studentData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].name + "</td>"
                        + "<td>" + result[i].classId + "</td>"
                        + "<td>  <a class='btn btn-warning' onclick='getStudentById(" + result[i].studentId + ")'> Sửa </a> <button class='btn btn-danger' type='submit' onclick='deleteStudent(" + result[i].studentId + ")'> Xoá </button> </td>"
                }
                if (row != '') {
                    $('#studentData').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
// get students by rank
function getStudentsByRank(_rank) {
    var url = "http://localhost:5113/api/Student/" + _rank + "/rankStudents";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnAddStudent").prop('disabled', false);
                $("#btnEditStudent").prop('disabled', true);
                clearForm();
                $('#studentData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {
                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].studentName + "</td>"
                        + "<td>" + result[i].className + "</td>"
                        + "<td>" + result[i].gpa + "</td>"
                        + "<td>" + result[i].rankName + "</td>"
                       
                }
                if (row != '') {
                    $('#studentData').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}
// download  export
function exportToPDF(classId) {
    var url = "http://localhost:5113/api/Student/" + classId + "/generatepdf";
    $.ajax({
        url: url,
        contentType: "application/pdf; charset=utf-8",
        type: "Get",
        success: function () {
            $("#btnDownloadExport").prop('disabled', true);
        }
    });
}
//load droplist Class
function loadClass() {
    var url = "http://localhost:5113/api/Class";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            var listItems = '';
            listItems = ('<option selected="selected" value="0">Chọn lớp..</option>');
            for (var i = 0; i < result.length; i++) {
                listItems += "<option value='" + result[i].classId + "'>" + result[i].name + "</option>";
            }
            $("#txtSearchStudentByClassId").html(listItems);
        }
    });
}


// get student by studentId
function getStudentById(studentId) {
    var url = "http://localhost:5113/api/Student/" + studentId
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            $("#btnAddStudent").prop('disabled', true);
            $("#btnEditStudent").prop('disabled', false);
            if (result) {
                stdId = result.studentId;
                $('#studentName').val(result.name);
                $('#studentClassId').val(result.classId);
            }
        },
        error: function (msg) {
            alert("Thất bại");
        }
    });
}
// clear input
function clearForm() {
    $('#studentName').val('');
    $('#studentClassId').val('');
}
