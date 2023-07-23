# from django.shortcuts import render
import errno
import json
from django.http import HttpResponse
from django.template import loader
from .models import Server
from requests import Response
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import sys
import socket
import paramiko
import ping3
# from django.core.mail import send_mail
from django.core.mail import EmailMessage, get_connection
from django.conf import settings
from django.core import mail
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required

# Create your views here.

@login_required(login_url='/login/')
def dashboard(request):
    serverList = Server.objects.all()

    return render(request, 'dashboard.html', {'server_list':serverList})

@csrf_exempt
def run_bashcode(request):

    result = json.loads(request.body.decode('UTF-8'))
    server_list = Server.objects.all()
    bash_code = result['bash_code']

    for server in server_list:

        try:
            client = paramiko.client.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            client.connect(server.ip, username=server.root_user, password=server.root_pass)
            if client is not None:
                print("Connected")
            else:
                print("Not Connected")

            _stdin, _stdout,_stderr = client.exec_command(bash_code)
            print(_stdout.read().decode())

            result = "Connected!"
        except socket.error as v:
            e_code = v
            print(e_code)

            result = e_code

    return HttpResponse(result)

@csrf_exempt
def update_server(request):
    # serverList = Server.objects.all()
    result = json.loads(request.body.decode('UTF-8'))

    update = Server.objects.get(id=result['id'])
    update.domain = result['domain']
    update.ip = result['ip']
    update.root_user = result['root_user']
    update.root_pass = result['root_pass']
    update.email_port = result['email_port']
    update.email_user = result['email_user']
    update.email_password = result['email_password']
    update.fromemail = result['fromemail']
    update.some_notes = result['some_notes']

    update.save()
    update = Server.objects.all()
    json_data = serializers.serialize('json', update)

    return HttpResponse(json_data)

@csrf_exempt
def delete_server(request):
    result = json.loads(request.body.decode('UTF-8'))
    update = Server.objects.get(id=result['id'])
    print(result['id'])
    update.delete()
    update = Server.objects.all()
    json_data = serializers.serialize('json', update)

    return HttpResponse(json_data)

@csrf_exempt
def add_server(request):
    result = json.loads(request.body.decode('UTF-8'))

    server = Server(domain=result['domain'], ip=result['ip'], root_user=result['root_user'], root_pass=result['root_pass'], email_port=result['email_port'], 
                    email_user=result['email_user'], email_password=result['email_password'], fromemail=result['fromemail'], some_notes=result['some_notes'])
    server.save()
    server = Server.objects.all()
    json_data = serializers.serialize('json', server)

    return HttpResponse(json_data)

@csrf_exempt
def email_status(request):
    print(settings.EMAIL_HOST)
    server_list = Server.objects.all()
    for server in server_list:

        try:
            send_mail(
                subject = 'That’s your subject',
                message = 'That’s your message body',
                from_email = server.fromemail,
                auth_user = server.email_user,
                auth_password = server.email_password,
                recipient_list = ['example@example.org',],
                fail_silently = False,
            )
            server.status_email = True
            server.save()
        except:
            print("Mail Sending Failed!")
            server.status_email = False
            server.save()

    server_list = Server.objects.all()
    json_data = serializers.serialize('json', server_list)

    return HttpResponse(json_data)


@csrf_exempt
def ping_status(request):
    # result = json.loads(request.body.decode('UTF-8'))
    server_list = Server.objects.all()
    result = ''
    ping3.EXCEPTIONS = True
    for server in server_list:
        # domain check
        try:
            ping3.ping(server.domain)
            print('good')
            result = "Connected!"
            server.status_domain = True
            server.save()

        except ping3.errors.HostUnknown:  # Specific error is catched.
            print("Host unknown error raised.")
            result = "Host unknown error raised."
            server.status_domain = False
            server.save()

        except ping3.errors.PingError:  # All ping3 errors are subclasses of `PingError`.
            print("A ping error raised.")
            result = "A ping error raised."
            server.status_domain = False
            server.save()

        # ip check
        try:
            ping3.ping(server.ip)
            print('good')
            result = "Connected!"
            server.status_ip = True
            server.save()
        except ping3.errors.HostUnknown:  # Specific error is catched.
            print("Host unknown error raised.")
            result = "Host unknown error raised."
            server.status_ip = False
            server.save()

        except ping3.errors.PingError:  # All ping3 errors are subclasses of `PingError`.
            print("A ping error raised.")
            result = "A ping error raised."
            server.status_ip = False
            server.save()

    server_list = Server.objects.all()
    json_data = serializers.serialize('json', server_list)

    return HttpResponse(json_data)
