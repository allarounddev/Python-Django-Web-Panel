# Generated by Django 4.2.2 on 2023-07-21 17:43

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("myapp", "0003_server_status"),
    ]

    operations = [
        migrations.AlterField(
            model_name="server",
            name="status",
            field=models.BooleanField(default=False),
        ),
    ]
