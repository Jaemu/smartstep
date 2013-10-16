from django.db import models
from djangotoolbox.fields import ListField, EmbeddedModelField


class Post(models.Model):
    title = models.TextField()
    text = models.TextField()
    tags = ListField()
    comments = ListField()