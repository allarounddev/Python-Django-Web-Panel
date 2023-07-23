from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('update_server/', views.update_server, name='update_server'),
    path('delete_server/', views.delete_server, name='delete_server'),
    path('add_server/', views.add_server, name='add_server'),
    path('ping_status/', views.ping_status, name='ping_status'),
    path('email_status/', views.email_status, name='email_status'),
    path('run_bashcode/', views.run_bashcode, name='run_bashcode'),

]
