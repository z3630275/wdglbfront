"""wdglbfront URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
import xadmin
from users.views import LoginView, IndexView, LogoutView
from market.views import MarketView

urlpatterns = [
    path('xadmin/', xadmin.site.urls),
    # TemplateView.as_view会将template转换为view
    # path('', TemplateView.as_view(template_name= "index.html"), name=  "index"),
    path('', IndexView.as_view(), name="index"),
    # 基于类方法实现登录,这里是调用它的方法
    path('login/', LoginView.as_view(), name="login"),
    # 退出功能url
    path('logout/', LogoutView.as_view(), name="logout"),
    # 验证码url
    path('captcha/', include('captcha.urls')),
    # 营销活动列表页
    path('market/', MarketView.as_view(), name='market'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)