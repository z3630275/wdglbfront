from datetime import datetime

from django.shortcuts import render
from django.views.generic import View

from .models import MarketActivity, CityDict, Tag

from pure_pagination import Paginator, EmptyPage, PageNotAnInteger


class MarketView(View):
    def get(self, request):
        all_cities = CityDict.objects.all()
        all_tags = Tag.objects.all()
        all_markets = MarketActivity.objects.all()

        # 筛选城市
        city_id = request.GET.get('city', '')
        if city_id:
            all_markets = all_markets.filter(city_id=int(city_id))
        # 筛选游戏
        all_tickets = (
            ("ssq", "双色球"),
            ("dz", "动物总动员"),
            ("3d", "3D"),
            ("qlc", "七乐彩"),
            ("jkp", "即开票"),
        )
        ct_ticket = request.GET.get('ct', '')
        if ct_ticket:
            all_markets = all_markets.filter(category_ticket=ct_ticket)

        # 筛选年份
        year = request.GET.get('year', '')
        if year:
            all_markets = all_markets.filter(start_date__year=year)

        # 筛选完成情况
        status = request.GET.get('status','')
        if status:
            if status=='future':
                all_markets = all_markets.filter(start_date__gt=datetime.now())
            elif status=='doing':
                all_markets = all_markets.filter(start_date__lte=datetime.now(),end_date__gte=datetime.now())
            else:
                all_markets = all_markets.filter(end_date__lt=datetime.now())
        count = all_markets.count()

        try:
            page = request.GET.get('page', 1)
        except PageNotAnInteger:
            page = 1

        p = Paginator(all_markets, 5, request=request)
        page_markets = p.page(page)
        return render(request, 'market/market-list.html',
                      {'all_cities': all_cities,
                       'page_markets': page_markets,
                       'all_tags': all_tags,
                       'count': count,
                       'city_id': city_id,
                       'all_tickets': all_tickets,
                       'ct_ticket': ct_ticket,
                       'year': year,
                       'status':status
                       })
