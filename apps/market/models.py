from datetime import datetime

from django.db import models


# Create your models here.

# 城市字典
class CityDict(models.Model):
    name = models.CharField(max_length=20, verbose_name=u"城市", unique=True)
    # 城市描述：备用不一定展示出来
    desc = models.CharField(max_length=200, verbose_name=u"描述")
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = u"城市名称"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField('名称', max_length=16)
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = "标签"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class MarketActivity(models.Model):
    TICKET_CHOICES = (
        ("ssq", "双色球"),
        ("dz", "动物总动员"),
        ("3d", "3D"),
        ("qlc", "七乐彩"),
        ("jkp", "即开票"),
    )
    PERSON_CHOICES = (
        ('1', '业主'),
        ('2', '彩民'),
        ('3', '彩民和业主'),

    )

    title = models.CharField(verbose_name='活动标题', max_length=50)
    start_date = models.DateField(verbose_name='开始日期')
    end_date = models.DateField(verbose_name='结束日期')
    category_ticket = models.CharField(max_length=10, choices=TICKET_CHOICES, verbose_name="活动票种", default="dz")
    category_person = models.CharField(max_length=10, choices=PERSON_CHOICES, verbose_name="针对人群", default="1")
    tag = models.ManyToManyField(Tag, verbose_name='标签',related_name="market_tag")
    content = models.TextField(verbose_name='具体内容')
    city = models.ForeignKey(CityDict, on_delete=models.CASCADE, verbose_name="所在城市")
    click_nums = models.IntegerField(default=0, verbose_name="阅读数")
    click_stars = models.IntegerField(default=0, verbose_name="点赞数")
    image = models.ImageField(upload_to="org/%Y/%m", verbose_name=u"Logo", max_length=100, default='org/default.png')
    add_time = models.DateTimeField(default=datetime.now, verbose_name='添加时间')

    class Meta:
        verbose_name = u"营销活动"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
