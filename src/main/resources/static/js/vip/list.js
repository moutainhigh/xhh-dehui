var prefix = "/back/api/vip"
$(function() {
	load();
});

function load() {
	
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/page", // 服务器数据的加载地址
						showRefresh : true,
						showToggle : true,
						showColumns : true,
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						// queryParamsType : "limit",
						// //设置为limit则会发送符合RESTFull格式的参数
						singleSelect : true, // 设置为true将禁止多选
						// contentType : "application/x-www-form-urlencoded",
						// //发送到服务器的数据编码类型
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						search : false, // 是否显示搜索框
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
						// "server"
						queryParams : function(params) {
							return {
								// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit : params.limit,
								offset : params.offset,
								userName : $('#userName').val(),
								userPhone : $('#userPhone').val(),
								startDate : $('#startDate').val(),
								endDate : $('#endDate').val(),
								vipType : $('#vipType').val()
								
								/*goodsType : "3",*/
							// username:$('#searchName').val()
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								/*{
									checkbox : true
								},*/
								{
									field : '', // 列字段名
									title : '序号', // 列标题
									align : 'center',
									visible : true,
									formatter : function(value, row, index) {
										
										return index+1;
									}
								},
								{
									visible : true,
									field : 'userName',
									align : 'center',
									title : '姓名'
								},
								{
									visible : true,
									field : 'userPhone',
									align : 'center',
									title : '手机号'
								},
								{
									visible : true,
									field : 'vipType',
									align : 'center',
									title : '会员类型',
									formatter : function(value, row, index) {
										if (row.vipType == '0') {
											return '<span class="label label-primary">月会员</span>';
										}
										if (row.vipType =='1') {
											return '<span class="label label-success">季会员</span>';
										}
										if (row.vipType == '2') {
											return '<span class="label label-warning">年会员</span>';
										}
									}
									
								},
								{
									visible : true,
									field : 'vipPrice',
									align : 'center',
									title : '价格'
								},
								{
									visible : true,
									field : 'vipDiscount',
									align : 'center',
									title : '折扣'
								},
								{
									visible : true,
									field : 'term',
									align : 'center',
									title : '会员期限'
								},
								
								{
									visible : true,
									field : 'vipStart',
									align : 'center',
									title : '开始时间'
								},
								{
									visible : true,
									field : 'vipEnd',
									align : 'center',
									title : '结束时间'
								},
								{
									visible : true,
									field : 'createTime',
									align : 'center',
									title : '创建时间'
								}
								/*{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.vipId
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ row.vipId
												+ '\')"><i class="fa fa-remove"></i></a> ';
										return e + d;
									}
								}*/
								]
					});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

function add() {
	// iframe层
	layer.open({
		type : 2,
		title : '新增vip用户',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '70%', '70%' ],
		content : '/back/vip/add' // iframe的url
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : 'vip用户修改',
		maxmin : true,
		shadeClose : true, // 点击遮罩关闭层
		area : [  '70%', '70%' ],
		content : ' /back/vip/edit?id=' + id // iframe的url
	});
}


function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url :"/back/api/vip/delete",
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.ret == '0') {
					layer.msg(r.msg);
					reLoad();
					load();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	})
}


function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			var a=row['vipId'];
			ids[i] = row['vipId'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : '/back/api/vip/batchRemove',
			success : function(r) {
				if (r.ret =='0') {
					layer.msg(r.msg);
					reLoad();
					load();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}
function reset(){
	$("#userName").val("");
	$("#userPhone").val("");
	$("#startDate").val("");
    $("#endDate").val("");
    $(".selectpicker").selectpicker('val', "");
    reLoad();
    load();
} 


