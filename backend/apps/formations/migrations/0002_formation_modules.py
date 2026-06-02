import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('formations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='formation',
            name='description_longue',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='formation',
            name='certification',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='formation',
            name='programme',
            field=models.TextField(blank=True),
        ),
        migrations.CreateModel(
            name='FormationModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=200)),
                ('ordre', models.PositiveSmallIntegerField(default=1)),
                ('duree_heures', models.PositiveSmallIntegerField(default=1)),
                ('objectifs', models.TextField(blank=True)),
                ('contenu', models.TextField(blank=True)),
                ('video_url', models.URLField(blank=True, null=True)),
                ('video_disponible', models.BooleanField(default=False)),
                ('formation', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='modules',
                    to='formations.formation',
                )),
            ],
            options={
                'verbose_name': 'Module',
                'verbose_name_plural': 'Modules',
                'ordering': ['ordre'],
            },
        ),
    ]
