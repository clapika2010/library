from django.db import models
from django.contrib.auth import User
import datetime
# Create your models here.

class Ebook (models.Model):
	name=models.CharField(max_length=100)
	review=models.CharField(max_length=500)
	upload_time=models.DateField(default=datetime.date.today())
	download_link=models.URLField()
	rates=models.ManyToManyField(UserInfo,through='Rate')
	category=models.ManyToManyField(Category,through='Level')
	comments=models.ManyToManyField(UserInfo,through='Comment')
	uploader=models.ForeignKey(UserInfo)
	
class Category(models.Model):
	name=models.CharField(max_length=100)
	category_info=models.CharField(max_length=300)
	learning_route=models.CharField(max_length=100)
	
class Subject(models.Model):
	name=models.CharField(max_length=100,primary_key=True)
	subject_info=models.CharField(max_length=300)
	semester=models.IntegerField()

class UserInfo(models.Model):
	user=models.ForeignKey(User)
	user_info=models.CharField(max_length=300)
	download_list=models.ManyToManyField(Ebook,through='Download')
	

class Download(models.Model):
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	download_time=models.DateField(default=datetime.date.today())

class Level(models.Model):
	category=models.ForeignKey(Category)
	ebook=models.ForeignKey(Ebook)
	level=models.IntegerField()	
	
class Comment(models.Model):
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	content=models.CharField(max_length=500)
	
class Rate(models.Model):
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	rate=models.IntegerField()
	

	
	




