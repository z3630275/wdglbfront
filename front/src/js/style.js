function Index() {
    this.personal = $('.personal');
    this.userdetail = $('.userdetail');
    this.future = $('#future');
    this.future1 = $('.future');
    this.doing = $('#doing');
    this.doing1 = $('.doing');
    this.done = $('#done');
    this.done1 = $('.done');
    this.navleft=$('#nav-left li');
}

//绑定首页个人信息弹框
Index.prototype.headerHover = function () {
    var self = this;
    self.personal.hover(function () {
        self.userdetail.stop(true).show();
    }, function () {
        self.userdetail.stop(true).hide();
    });
};
//绑定首页营销活动显示
Index.prototype.activeHover = function () {
    var self = this;
    self.future.mouseover(function () {
        self.future.addClass('active').siblings().removeClass('active');
        self.future1.css({'display':'block'}).siblings().css({'display':'none'});
    });
    self.doing.mouseover(function () {
        self.doing.addClass('active').siblings().removeClass('active');
        self.doing1.css({'display':'block'}).siblings().css({'display':'none'});
    });
     self.done.mouseover(function () {
        self.done.addClass('active').siblings().removeClass('active');
        self.done1.css({'display':'block'}).siblings().css({'display':'none'});
    });
};
//绑定导航栏显示
Index.prototype.navHover=function () {
     this.navleft.mouseover(function () {
         $(this).addClass('active').siblings().removeClass('active');
     })

};

Index.prototype.areaHover=function () {
    $('.area-list').hover(function(){
		// $(this).find('.score').stop(true,true).fadeToggle(200);
        $(this).css({'background':'#717171'}).find('.circle').css({'border-color':'#fff'}).find('h2').css({'color':'#fff'})
	},function () {
        $(this).css({'background':'#fff'}).find('.circle').css({'border-color':'#717171'}).find('h2').css({'color':'#717171'});
    });
};

//绑定运行方法
Index.prototype.run = function () {
    this.headerHover();
    this.activeHover();
    this.navHover();
    this.areaHover();
};

//页面加载完后执行js代码
$(function () {
    var index = new Index();
    index.run();
});

