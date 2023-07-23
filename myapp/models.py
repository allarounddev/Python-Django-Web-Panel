from django.db import models
from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
class Server(models.Model):
    id = models.BigAutoField(primary_key=True)
    domain = models.CharField(max_length=200)
    ip = models.CharField(max_length=200)
    root_user = models.CharField(max_length=200)
    root_pass = models.CharField(max_length=200)
    email_port = models.CharField(max_length=200)
    email_user = models.CharField(max_length=200)
    email_password = models.CharField(max_length=200)
    fromemail = models.CharField(max_length=200)
    some_notes = models.CharField(max_length=200)
    status_ip = models.BooleanField(default=False)
    status_domain = models.BooleanField(default=False)
    status_email = models.BooleanField(default=False)
