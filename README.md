# AlertPop
##使用说明
引入alert.js文件

在需要弹出框的代码中
```javascript
 new TitleAlert({
    title:'提示内容',
	content:'提示阿斯蒂芬',
	success:function(){
		console.log('ok');
	},
	fail:function(){
		console.log('cancel');
	}
}).init();
```
可以new各种不同类型的弹出框 titleAlert 确认框 cancel 带取消按钮的确认框
