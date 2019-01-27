from django.shortcuts import render
# Django自带的用户验证,login
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.backends import ModelBackend
from django.http import HttpResponseRedirect
from django.urls import reverse
# 并集运算
from django.db.models import Q
# 基于类实现需要继承的view
from django.views.generic.base import View

from .models import UserProfile
from .forms import LoginForm


class CustomBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            # 不希望用户存在两个，get只能有一个。两个是get失败的一种原因 Q为使用并集查询
            user = UserProfile.objects.get(Q(mobile=username) | Q(email=username))
            # django的后台中密码加密：所以不能password==password
            # UserProfile继承的AbstractUser中有def check_password(self,
            # raw_password):
            # print(user)
            if user.check_password(password):
                return user
        except Exception as e:
            return None


class LogoutView(View):
    def get(self, request):
        # django自带的logout
        logout(request)
        # 重定向到首页,
        return HttpResponseRedirect(reverse("login"))


class LoginView(View):
    # 直接调用get方法免去判断
    def get(self, request):
        # render就是渲染html返回用户
        # render三变量: request 模板名称 一个字典写明传给前端的值
        login_form = LoginForm()
        redirect_url = request.GET.get('next', '')
        return render(request, "login/login.html", {
            "redirect_url": redirect_url,
            "login_form": login_form
        })

    def post(self, request):
        # 类实例化需要一个字典参数dict:request.POST就是一个QueryDict所以直接传入
        # POST中的username，password，会对应到form中
        login_form = LoginForm(request.POST)

        # is_valid判断我们字段是否有错执行我们原有逻辑，验证失败跳回login页面
        if login_form.is_valid():
            # 取不到时为空，username，password为前端页面name值
            username = request.POST.get("username", "")
            password = request.POST.get("password", "")

            # 成功返回user对象,失败返回null
            user = authenticate(request, username=username, password=password)

            # 如果不是null说明验证成功
            if user is not None:
                # 只有当用户激活时才给登录
                if user.is_active:
                    # login_in 两参数：request, user
                    # 实际是对request写了一部分东西进去，然后在render的时候：
                    # request是要render回去的。这些信息也就随着返回浏览器。完成登录
                    login(request, user)
                    # 跳转到首页 user request会被带回到首页
                    # 增加重定向回原网页。
                    redirect_url = request.POST.get('next', '')
                    if redirect_url:
                        return HttpResponseRedirect(redirect_url)
                    # 跳转到首页 user request会被带回到首页
                    return HttpResponseRedirect(reverse("index"))
                # 即用户未激活跳转登录，提示未激活
                else:
                    return render(
                        request, "login/login.html", {
                            "login_form": login_form,
                            "msg": "用户名未激活! 请前往邮箱进行激活"})
            # 仅当用户真的密码出错时
            else:
                return render(request, "login/login.html", {"login_form": login_form, "user": user, "msg": "用户名或密码错误!"})
        # 验证不成功跳回登录页面
        # 没有成功说明里面的值是None，并再次跳转回主页面
        else:
            return render(request, "login/login.html", {"login_form": login_form})


class IndexView(View):
    def get(self, request):

        return render(request, 'index/index.html')
