from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import TemplateView
import os
from django.conf import settings

class IndexView(TemplateView):
    template_name = 'index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

def api_status(request):
    """Simple API endpoint to check backend status"""
    return JsonResponse({
        'status': 'success',
        'message': 'Django backend is running',
        'version': '1.0.0'
    })
