from django.shortcuts import render
from .models import Project

# Create your views here.

def project_list(request):
    projects = Project.objects.all().order_by('project_no')
    return render(request, 'projectapp/project_list.html', {'projects': projects})
