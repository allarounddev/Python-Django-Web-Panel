# Generated by Django 4.2.2 on 2023-07-22 13:15

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("myapp", "0004_alter_server_status"),
    ]

    operations = [
        migrations.RenameField(
            model_name="server",
            old_name="status",
            new_name="status_domain",
        ),
        migrations.AddField(
            model_name="server",
            name="status_email",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="server",
            name="status_ip",
            field=models.BooleanField(default=False),
        ),
    ]