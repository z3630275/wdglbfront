#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.shortcuts import HttpResponseRedirect
from django.urls import reverse


class AuthMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        self.EXCLUDE_URL = ('/login/', '/xadmin/')
        super().__init__()

    def process_request(self, request):
        url_path = request.path
        print(request.path)
        try:
            if url_path in self.EXCLUDE_URL or request.user.is_authenticated:
                return None
            elif url_path.startswith('/captcha/image/') or url_path.startswith('/captcha/refresh/'):
                return None
            else:
                return HttpResponseRedirect(reverse('login'))
        except AttributeError:
            return HttpResponseRedirect(reverse('login'))

    def __call__(self, request):
        response = None
        if hasattr(self, 'process_request'):
            response = self.process_request(request)
        if not response:
            response = self.get_response(request)
        if hasattr(self, 'process_response'):
            response = self.process_response(request, response)
        return response
