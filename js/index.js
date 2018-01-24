Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
	var today = new Date().Format("yyyy.MM.dd")
	var index = 0;
	var row = function () {
		this.zlzk = '合格';
		this.hash = index++;
		return this
	}
	$scope.a = {
		title: "辽宁富昌隆大药房连锁企业经营项目管理有限公司调拨单",
		stock: '总部库',
		receiveStock: '长青分公司',
		kuqu: 'OTC',
		date: today,
		count: 0,
		uid: `ZBKT${today}Z110003`,
		rows: [new row()]

	}
	$scope.addRow = function () {
		$scope.a.rows.push(new row())
	}
	$scope.removeRow = function (selectRow, rows) {
		_.remove(rows, function (n) {
			return _.isEqual(n, selectRow)
		})
		if (rows.length == 0) {
			var new_row = new row();
			rows.push(new_row)
		}
	}
	$scope.preview = function(){
		localStorage.printData = JSON.stringify($scope.a)
		window.open('index2.html')
	}
});