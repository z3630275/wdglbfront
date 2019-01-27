function showdatetime() {
    var t = new Date();
    var year = t.getFullYear();
    var month = t.getMonth()+1;
    var day = t.getDate();
    var week = t.getDay();
    var arr = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var showTime = year + '年' + month + '月' + day + '日  ' + arr[week];
    $('.top .wp .fl p').empty().append(showTime)
}
$(function () {
   showdatetime()
});