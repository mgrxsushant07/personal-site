from django.db import models

# Create your models here.

class Project(models.Model):
    project_no = models.IntegerField(unique=True)
    photo = models.ImageField(upload_to='project_photos/')
    name = models.CharField(max_length=200)
    description = models.TextField()
    view_more_link = models.URLField(blank=True)

    def __str__(self):
        return f"{self.project_no} - {self.name}"
