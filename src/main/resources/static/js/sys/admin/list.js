var prefix = "/back/api/admin"
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
						// showRefresh : true,
						showToggle : true,
						// showColumns : true,
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
						// search : true, // 是否显示搜索框
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
													// "server"
						queryParams : function(params) {
							return {
								// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit : params.limit,
								offset : params.offset,
								adminUsername : $('#adminUsername').val(),
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
									visible : true,
									formatter : function(value, row, index) {
										
										return index+1;
									}
								},
								{
									field : 'adminUsername',
									title : '账户',
									align : 'center'
								},
								{
									field : 'adminPassword',
									title : '密码',
									align : 'center'
								},
								
								{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var e = '<a  class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.adminId
												+ '\')"><i class="fa fa-edit "></i></a> ';
										var d = '<a class="btn  btn-danger btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="dl(\''
												+ row.adminId
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-success btn-sm '+s_resetPwd_h+'" href="#" title="重置密码"  mce_href="#" onclick="resetPwd(\''
												+ row.adminId
												+ '\')"><i class="fa fa-key"></i></a> ';
										return e + d + f;
									}
								} ]
					});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function add() {
	// iframe层
	layer.open({
		type : 2,
		title : '新增用户',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '60%', '60%' ],
		content : '/back/admin/add' // iframe的url
	});
}
function dl(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : "/back/api/admin/delete",
			type : "post",
			data : {
				'id' : id
			},
			success : function(r) {
				if (r.code == '0') {
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
function edit(id) {
	layer.open({
		type : 2,
		title : '用户编辑',
		maxmin : true,
		shadeClose : true, // 点击遮罩关闭层
		area : [ '60%', '50%' ],
		content : ' /back/admin/edit?id=' + id // iframe的url
	});
}
function resetPwd(id) {
	layer.open({
		type : 2,
		title : '重置密码',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '60%', '50%' ],
		content : '/back/admin/resetPwd?id=' + id // iframe的url
	});
}
