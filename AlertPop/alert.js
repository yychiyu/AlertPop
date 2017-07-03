var Alert = function(data) {
    if (!data)
        return;
    //设置内容
    this.content = data.content;
    //创建提示框面板
    this.panel = document.createElement('div');
    //创建提示内容组件
    this.contentNode = document.createElement('p');
    //创建确定按钮组件
    this.confirmBtn = document.createElement('span');
    //创建关闭按钮组件
    this.closeBtn = document.createElement('b');
    //创建遮罩层
    this.overlay = document.createElement('div');
    //为提示框面板添加类
    this.panel.className = 'alert';
    //为关闭按钮添加类
    this.closeBtn.className = 'a-close';
    //为确定按钮添加类
    this.confirmBtn.className = 'a-confirm';
    this.overlay.className = 'overlay';
    //为确定按钮添加文本
    this.confirmBtn.innerHTML = data.confirm || '确认';
    //为提示内容添加文本
    this.contentNode.innerHTML = this.content;
    //点击确定按钮执行方法，如果data中有success方法则为success方法，否则为空函数
    this.success = data.success || function() {};
    //点击关闭按钮执行方法
    this.fail = data.fail || function() {};
}

//提示框原型方法
Alert.prototype = {
    init: function() {
        //生成提示框
        this.panel.appendChild(this.closeBtn);
        this.panel.appendChild(this.contentNode);
        this.panel.appendChild(this.confirmBtn);
        // this.panel.appendChild(this.overlay);
        //插入页面
        document.body.appendChild(this.panel);
        document.body.appendChild(this.overlay);
        //绑定事件
        this.bindEvent();
        //显示提示框
        this.show();
    },
    bindEvent: function() {
        var me = this;
        this.closeBtn.onclick = function() {
            me.fail();
            me.hide();
        }
        this.confirmBtn.onclick = function() {
            me.success();
            me.hide();
        }
    },
    hide: function() {
        this.panel.style.display = 'none';
        this.overlay.style.display = 'none';
    },
    show: function() {
        this.panel.style.display = 'block';
       this.overlay.style.display = 'block';

    }
}

//右侧按钮提示框
var RightAlert = function(data) {
    Alert.call(this, data);
    this.confirmBtn.className = this.confirmBtn.className + ' right';
}

RightAlert.prototype = new Alert();
//标题提示框
var TitleAlert = function(data) {
        Alert.call(this, data);
        this.title = data.title;
        this.titleNode = document.createElement('h3');
        this.titleNode.innerHTML = this.title;
        this.confirmBtn.className =  this.confirmBtn.className+"middle";
    }
    //继承基本提示框方法
TitleAlert.prototype = new Alert();

TitleAlert.prototype.init = function() {
    this.panel.insertBefore(this.titleNode, this.panel.firstChild);
    Alert.prototype.init.call(this);
}

TitleAlert({
    title: "哈哈"
});

var CancelAlert = function(data) {
    TitleAlert.call(this, data);
    this.cancel = data.cancel;
    this.cancelBtn = document.createElement('span');
    this.cancelBtn.className = 'cancel';
    this.cancelBtn.innerHTML = this.cancel || '取消';
    this.confirmBtn.className =  'a-confirm';
}

CancelAlert.prototype = new Alert();
CancelAlert.prototype.init = function() {
    TitleAlert.prototype.init.call(this);
    this.panel.appendChild(this.cancelBtn);
}

CancelAlert.prototype.bindEvent = function() {
    var me = this;
    TitleAlert.prototype.bindEvent.call(me);
    this.cancelBtn.onclick = function() {
        me.fail();
        me.hide();
    }
}
