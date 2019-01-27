#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django import forms
# 引入验证码field
from captcha.fields import CaptchaField


# 登录表单验证
class LoginForm(forms.Form):
    # 用户名密码不能为空
    username = forms.CharField(required=True)
    # 密码不能小于5位
    password = forms.CharField(required=True, min_length=5)
    captcha = CaptchaField(error_messages={"invalid": u"验证码错误"})
