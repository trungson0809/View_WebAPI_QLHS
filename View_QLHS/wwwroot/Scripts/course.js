var _courseId = '';
$(document).ready(function () {
    getCourseData();
    $("#btnEditCourse").click(function () {
        editCourse(_courseId);
    });
});

function addCourse() {
    var url = "http://localhost:5113/api/Course"
    var objSubject = {};
    if ($('#courseName').val() === '') {
        alert("Cần nhập đủ thông tin.")
    }
    else {
        objSubject.name = $('#courseName').val();
        if (objSubject) {
            //$.ajax({
            //    url: url,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: JSON.stringify(objSubject),
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
                getCourseData();
            }).fail((jqXhr, textStatus, errorThrow) => {
                alert('Thêm thất bại');
            });
        }
    }
}

function editCourse(courseId) {
    var url = "http://localhost:5113/api/Course/" + courseId
    var obj = {};
    if ($('#courseName').val() === ''){
        alert("Cần nhập đủ thông tin.")
    }
    else {
        obj.courseId = courseId;
        obj.studentId = $('#studentId').val();
        obj.subjectId = $('#subjectId').val();
        obj.mark = $('#courseMark').val();


        if (obj) {
            //$.ajax({
            //    url: url,
            //    contentType: "application/json; charset=utf-8",
            //    dataType: "json",
            //    data: JSON.stringify(obj),
            //    type: "Put",
            //    success: function () {
            //        alert("Sửa thành công");
            //        getCourseData();

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
                getCourseData();
            }).fail((jqXhr, textStatus, errorThrow) => {
                alert('Sửa thất bại');
            });
        }
    }
}


function deleteCourse(courseId) {
    var url = "http://localhost:5113/api/Course/" + courseId
    //$.ajax({
    //    url: url,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    type: "Delete",
    //    success: function () {
    //        alert("Đã xoá: " + courseId);
    //        getCourseData();

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
        getCourseData();
    }).fail((jqXhr, textStatus, errorThrow) => {
        alert('Xóa thất bại');
    });
}

function getCourseData() {
    var url = "http://localhost:5113/api/Course";
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            if (result) {
                $("#btnAddCourse").prop('disabled', false);
                $("#btnEditCourse").prop('disabled', true);
                clearForm();
                $('#courseData').html('');
                var number = 1;
                var row = '';
                for (let i = 0; i < result.length; i++) {

                    row = row
                        + "<tr>"
                        + "<td>" + number++ + "</td>"
                        + "<td>" + result[i].studentId + "</td>"
                        + "<td>" + result[i].subjectId + "</td>"
                        + "<td>" + result[i].mark+ "</td>"
                        + "<td>  <a class='btn btn-warning' onclick='getCourseById(" + result[i].courseId + ")'> Sửa </a> <button class='btn btn-danger' type='submit' onclick='deleteCourse(" + result[i].courseId + ")'> Xoá </button> </td>"
                }
                if (row != '') {
                    $('#courseData').append(row);
                }
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}

function getCourseById(courseId) {
    var url = "http://localhost:5113/api/Course/" + courseId
    $.ajax({
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "Get",
        success: function (result) {
            $("#btnAddCourse").prop('disabled', true);
            $("#btnEditCourse").prop('disabled', false);
            if (result) {
                _courseId = result.courseId;
                $('#studentId').val(result.studentId);
                $('#subjectId').val(result.subjectId);
                $('#courseMark').val(result.mark);
            }
        },
        error: function (msg) {
            alert("Thất bại");
        }
    });
}

function clearForm() {
    $('#studentId').val('');
    $('#subjectId').val('');
    $('#courseMark').val('');

}