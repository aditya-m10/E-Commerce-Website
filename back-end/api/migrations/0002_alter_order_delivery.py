# Generated by Django 4.1.5 on 2023-01-19 20:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="delivery",
            field=models.DateField(
                default=datetime.datetime(2023, 1, 26, 20, 47, 2, 866651)
            ),
        ),
    ]