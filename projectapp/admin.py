from django.contrib import admin
from .models import Project

# Register your models here.

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('project_no', 'name', 'description', 'view_more_link')
    search_fields = ('name', 'description')
    list_filter = ('project_no',)
