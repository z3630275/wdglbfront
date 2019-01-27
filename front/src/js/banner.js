//面向对象
//1.添加属性，类似于python，通过shis关键字绑定，并制定他的值
//2.给类添加或绑定方法，原型链，Banner.prototype.greet =function (arg) {console.log('这个是构造函数111');};


// function Banner() {
//     //这个里面写的代码，相当于python的__init__
//     console.log('这个是构造函数');
//     this.person=111;
// }
// Banner.prototype.greet =function () {
//       console.log('这个是构造函数111');
// };
//
// var banner = new Banner();
// console.log(banner.person);
//
// banner.greet()

function Banner() {
    this.bannerGroup = $("#banner-group");
    this.bannerUl = $('#banner-ul');
    this.bannerCount = this.bannerUl.children('li').length;
    this.index = 0;
    this.bannerImg=$('#banner-ul li');
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    this.arrow = $('.arrow');
    this.pageControl=$('.page-control');
    this.Width = $('.banner-group').width()//轮播图窗口宽度
}

//绑定初始化轮播图个数
Banner.prototype.initPageControl = function () {
    var self = this;
    for (var i = 0; i < self.bannerCount; i++) {
        var circle = $('<li>');
        // var circle = document.createElement('li');
        self.pageControl.append(circle);
        if(i===0){
            circle.addClass('active');
        }
    }
    self.pageControl.css({'width':self.bannerCount*12+8*2+16*(self.bannerCount-1)})
};
//绑定初始化轮播图片宽度
Banner.prototype.initBannerWidth = function () {
  this.bannerUl.css({'width':this.width*this.bannerCount})
};

//绑定鼠标监听显示与隐藏方法
Banner.prototype.toggleArrow = function () {
    var self = this;
    self.arrow.toggle();


};
//绑定鼠标监听方法
Banner.prototype.listenBannerHover = function () {
    var self = this;
    this.bannerGroup.hover(function () {
        clearInterval(self.timer);
        self.toggleArrow();
    }, function () {
        self.bannerLoop();
        self.toggleArrow();

    })


};
//绑定轮播动画
Banner.prototype.bannerAnimate = function () {
    this.bannerImg.eq(this.index).fadeIn().siblings().fadeOut();
    this.pageControl.children('li').eq(this.index).addClass('active').siblings().removeClass('active');
};
//绑定轮播方法
Banner.prototype.bannerLoop = function () {
    var self = this;
    this.timer = setInterval(function () {
        if (self.index >= self.bannerCount-1) {
            self.index = 0
        } else {
            self.index++
        }
        self.bannerAnimate();
    }, 2000)

};
//绑定鼠标点击左右按钮方法
Banner.prototype.listenArrowClick = function () {
    var self = this;
    self.leftArrow.click(function () {
        if (self.index === 0) {
            self.index = self.bannerCount - 1;
        } else {
            self.index--;
        }
        self.bannerAnimate();
    });
    self.rightArrow.click(function () {
        if (self.index === self.bannerCount - 1) {
            self.index = 0;
        } else {
            self.index++;
        }

        self.bannerAnimate();
    });
};
//绑定鼠标点击轮播按钮方法
Banner.prototype.listenPageControlClick=function () {
    var self = this;
    self.pageControl.children('li').each(function (index,obj) {
        $(obj).click(function () {
            self.index= index;
            self.bannerAnimate();
        })
    })
};

//绑定运行方法
Banner.prototype.run = function () {
    this.bannerLoop();
    this.listenArrowClick();
    this.listenBannerHover();
    this.initPageControl();
    this.initBannerWidth();
    this.listenPageControlClick();

 };

//页面加载完后执行js代码
$(function () {
    var banner = new Banner();
    banner.run();
});