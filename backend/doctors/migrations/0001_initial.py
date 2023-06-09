# Generated by Django 4.1.7 on 2023-05-20 09:17

import datetime
from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('role', models.CharField(choices=[('Regular', 'Regular'), ('Moderator', 'Moderator'), ('Admin', 'Admin')], default='Regular', max_length=30)),
                ('confirmation_code', models.CharField(blank=True, max_length=20, null=True, unique=True)),
                ('confirmation_start', models.DateTimeField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Clinic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=500)),
                ('address', models.CharField(max_length=50)),
                ('beds', models.IntegerField()),
                ('nrRooms', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Missing name', max_length=50)),
                ('title', models.CharField(default='Missing Title', max_length=30)),
                ('salary', models.IntegerField(default=0)),
                ('university_gpa', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='DoctorsDonors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('doctor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.doctor')),
            ],
        ),
        migrations.CreateModel(
            name='UserDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.CharField(max_length=200, null=True)),
                ('location', models.CharField(max_length=100, null=True)),
                ('birthday', models.DateField(null=True)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=2, null=True)),
                ('marital', models.CharField(choices=[('M', 'Married'), ('R', 'Relationship'), ('S', 'Single')], max_length=2, null=True)),
                ('paginationValue', models.IntegerField(default=25)),
                ('userName', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Donor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone', models.CharField(default='Missing phone', max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('birthday', models.DateField()),
                ('citizenship', models.CharField(max_length=25)),
                ('description', models.CharField(default='Missing name', max_length=500)),
                ('doctors', models.ManyToManyField(through='doctors.DoctorsDonors', to='doctors.doctor')),
            ],
        ),
        migrations.AddField(
            model_name='doctorsdonors',
            name='donor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.donor'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='donors',
            field=models.ManyToManyField(related_name='donors_set', through='doctors.DoctorsDonors', to='doctors.donor'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='hospital',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='doctors_set', to='doctors.clinic'),
        ),
        migrations.CreateModel(
            name='BloodBag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=450)),
                ('date', models.DateField(default=datetime.date.today)),
                ('source', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='doctors.doctorsdonors')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='doctorsdonors',
            unique_together={('donor', 'doctor')},
        ),
    ]
