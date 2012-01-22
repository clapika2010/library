from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User
import datetime
# Create your models here.

class Ebook (models.Model):
	CHOICES=((1,'Beginner'),(2,'Intermediate'),(3,'Advanced'))
	isbn=models.IntegerField(unique=True,blank=True)
	name=models.CharField(max_length=100)
	description=models.TextField()
	upload_time=models.DateField(default=datetime.date.today())
	published_date=models.DateField()
	avg_rate=models.FloatField(default=0.0)
	rate_times=models.IntegerField(default=0)
	rates=models.ManyToManyField('UserInfo',through='Rate',related_name='ebook_rate')
	downloads=models.ManyToManyField('UserInfo',through='Download',related_name='ebook_download')
	category=models.ForeignKey('Category',null=True,blank=True)
	level=models.IntegerField(choices=CHOICES,null=True,blank=True)	
	subject=models.ManyToManyField('Subject',null=True,blank=True)
	comments=models.ManyToManyField('UserInfo',through='Comment',related_name='ebook_comment')
	uploader=models.ForeignKey('UserInfo',related_name='ebook_uploader')
	slug=models.SlugField(unique=True)
	image_link=models.URLField()
	authors=models.CharField(max_length=300)
	@models.permalink
	def get_absolute_url():
		return ('library.mainsite.views.view',self.slug)	
	def __unicode__(self):
		return self.name
	def get_model_name(self):
		return self.__class__.__name__ 
	
class Link(models.Model):
	download_link=models.URLField()
	is_alive=models.BooleanField()
	ebook=models.ForeignKey(Ebook)
	
class Category(models.Model):
	name=models.CharField(max_length=100)
	category_info=models.TextField()
	learning_route=models.CharField(max_length=100)
	slug=models.SlugField(unique=True)
	major=models.ForeignKey('Major')
	
	class Meta:
		verbose_name_plural='Categories'
		
	@models.permalink
	def get_absolute_url():
		return ('library.mainsite.views.category',self.slug)
	def __unicode__(self):
		return self.name
	def get_model_name(self):
		return self.__class__.__name__ 
		
class Subject(models.Model):
	CHOICES=((1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'5'),(6,'6'),(7,'Optional'),)
	name=models.CharField(max_length=100,primary_key=True)
	subject_info=models.TextField()
	semester=models.IntegerField(choices=CHOICES)
	slug=models.SlugField(unique=True)
	
	@models.permalink
	def get_absolute_url():
		return ('library.mainsite.views.subject',self.slug)
	def __unicode__(self):
		return self.name
	def get_model_name(self):
		return self.__class__.__name__ 
	
class UserInfo(models.Model):
	user=models.ForeignKey(User)
	user_info=models.CharField(max_length=300)
	download_list=models.ManyToManyField(Ebook,through='Download')
	
	class Meta:
		verbose_name_plural="User Infos"
		
	def __unicode__(self):
		return self.user.username
		
User.profile = property(lambda u: UserInfo.objects.get_or_create(user=u)[0])
	

class Download(models.Model):
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	download_time=models.DateField(default=datetime.date.today())
	
class Comment(models.Model):
	ebook=models.ForeignKey(Ebook)
	user=models.ForeignKey(UserInfo)
	content=models.TextField()
	
class Rate(models.Model):
	CHOICES=((1,'1'),(2,'2'),(3,'3'),(4,'4'),(5,'5'))
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	rate=models.IntegerField(choices=CHOICES)
	
class Question(models.Model):
	question = models.CharField(max_length=300)
	answer = models.CharField(max_length=100)                     

	def __unicode__(self):
		return "Question "+str(self.id)

class Major(models.Model):
	name=models.CharField(max_length=200)
	major_info=models.TextField()
	
	def __unicode__(self):
		return self.name
