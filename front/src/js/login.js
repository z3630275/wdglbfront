var Dml = {};
Dml.fun = {
    showValidateError: function ($elem, tips) {
        var $tips = arguments[2] || '';
        $elem.focus();
        setTimeout(function () {
            $elem.parent().addClass('errorput');
            if ($tips) {
                $tips.html(tips).show();
            } else {

                $elem.parent().siblings('.error').html(tips).show();

            }
        }, 10);
        return false;
    }


};
Dml.regExp = {
    phone: /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/,
    tel: /(^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$)|(^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    phMail: /(^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$)|(^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+)/,
    number: /^[0-9]*$/,
    float: /^\d+(\.\d+)?$/,
    zsNumber: /^(-?[1-9]\d*|0)$/,
    name: /^[\u4e00-\u9fa5a-zA-Z]+$/,
    pwd: /^([^\u4e00-\u9fa5]{6,20})$/,
    verifyCode: /^[a-zA-Z]{4}$/,
    phoneCode: /^\d{6}$/,
    emailCode: /^\d{4}$/,
    rsiName: /^[\u4e00-\u9fa5\-a-zA-Z0-9]{2,30}$/,
    //rsiName: /^([\u4e00-\u9fa5])([\u4e00-\u9fa5a-zA-Z0-9]+)$/,
    idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
};
Dml.Msg = {
    epUserName: '请输入登录手机或邮箱！',
    erUserName: '请输入正确的登录手机或邮箱！',
    epPhone: '请输入您的手机号码！',
    erPhone: '请输入正确的手机号码！',
    epTel: '请输入您的电话号码！',
    erTel: '请输入正确的电话号码，固定电话：区号-号码！',
    epVerifyCode: '请输入验证码！',
    erVerifyCode: '请输入正确的验证码！',
    epMail: '请输入您的邮箱！',
    erMail: '请输入正确的邮箱！',
    epPwd: '请输入登录密码！',
    erPwd: '密码为6-20位非中文字符！',
    epResetPwd: '请输入密码！',
    erResetPwd: '密码为6-20位非中文字符！',
    epRePwd: '请重复输入密码！',
    erRePwd: '两次密码输入不一致！',
    epPhCode: '请输入手机验证码！',
    erPhCode: '请输入正确的手机验证码！',
    epEmCode: '请输入邮箱验证码！',
    erEmCode: '请输入正确的邮箱验证码！',
    epName: '请输入您的姓名！',
    epNickName: '请输入昵称！',
};


//刷新验证码
function refresh_captcha(event) {
    $.get("/captcha/refresh/?" + Math.random(), function (result) {
        $('#' + event.data.form_id + ' .captcha').attr("src", result.image_url);
        $('#id_captcha_0').attr("value", result.key);
    });
    return false;
}


$('#login_form .captcha').click({'form_id': 'login_form'}, refresh_captcha);

//登录
$('#jsLoginBtn').on('click', function () {
    return login_form_submit();
});

//登录表单提交
function login_form_submit() {

    verify = verifyDialogSubmit(
        [
            {
                id: '#account_l',
                tips: Dml.Msg.epUserName,
                errorTips: Dml.Msg.erUserName,
                regName: 'phMail',
                require: true,
                minlength:6,

            },
            {id: '#password_l', tips: Dml.Msg.epPwd, errorTips: Dml.Msg.erPwd, regName: 'pwd', require: true},
            {
                id: '#id_captcha_1',
                tips: Dml.Msg.epVerifyCode,
                errorTips: Dml.Msg.erVerifyCode,
                regName: 'verifyCode',
                require: true
            }

        ]
    );

    return verify;

}


function verifyDialogSubmit(array) {
    var i = 0,
        length = array.length,
        validata = true;
    for (i; i < length; i++) {
        var obj = array[i],
            _this = $(obj.id);
        validata = validate(obj, _this);
        if (!validata) {
            return validata;
        }
    }

    return validata;
}

function validate(obj, _this) {
    var tips = obj.tips,
        errorTips = obj.errorTips,
        regName = obj.regName,
        require = obj.require,
        minlength = obj.minlength,

        value = $.trim(_this.val());
    //为空验证
    if (require && !value) {
        return Dml.fun.showValidateError(_this, tips);
    } else {
        if (regName && !Dml.regExp[regName].test(value)) {
            return Dml.fun.showValidateError(_this, errorTips);
        }

        //最小长度
        if (minlength != undefined && value.length <= minlength) {
            return Dml.fun.showValidateError(_this, '输入长度需大于' + minlength + '位');
        }


        //长度
        if (strlength != undefined && value.length != strlength) {
            return Dml.fun.showValidateError(_this, '输入长度必须为' + strlength + '位');
        }


        //重复密码校验
        if (repwd != undefined && value != $(repwd).val()) {
            return Dml.fun.showValidateError(_this, Dml.Msg.erRePwd);
        }

    }
    _this.parent().removeClass('errorput');
    _this.parent().siblings('.error').hide();
    return true;
}


//input的focus和blur效果
$('input[type=text]').focus(function () {
    $(this).parent().removeClass('blur').addClass('focus');
});
$('input[type=text]').blur(function () {
    $(this).parent().removeClass('focus').addClass('blur');
});
//input的focus和blur效果
$('input[type=password]').focus(function () {
    $(this).parent().removeClass('blur').addClass('focus');
});
$('input[type=password]').blur(function () {
    $(this).parent().removeClass('focus').addClass('blur');
});

