from django.db import models
from django.contrib.auth.models import User
import datetime
# Create your models here.

class Ebook (models.Model):
	name=models.CharField(max_length=100)
	review=models.TextField()
	upload_time=models.DateField(default=datetime.date.today())
	download_link=models.URLField()
	rates=models.ManyToManyField('UserInfo',through='Rate',related_name='ebook_rate')
	category=models.ManyToManyField('Category',through='Level')
	comments=models.ManyToManyField('UserInfo',through='Comment',related_name='ebook_comment')
	uploader=models.ForeignKey('UserInfo',related_name='ebook_uploader')
	slug=models.SlugField(unique=True)
	
	@models.permalink
	def get_absolute_url():
		return ('library.mainsite.views.view',self.slug)
		
		
	
class Category(models.Model):
	name=models.CharField(max_length=100)
	category_info=models.CharField(max_length=300)
	learning_route=models.CharField(max_length=100)
	slug=models.SlugField(unique=True)
	
	class Meta:
		verbose_name_plural='Categories'
		
	@models.permalink
	def get_absolute_url():
		return ('library.mainsite.views.category',self.slug)
	
class Subject(models.Model):
	name=models.CharField(max_length=100,primary_key=True)
	subject_info=models.CharField(max_length=300)
	semester=models.IntegerField()
	slug=models.SlugField(unique=True)
	
	@models.permalink
	def get_absolute_url():
		return ('library.mainsite.views.subject',self.slug)
	
class UserInfo(models.Model):
	user=models.ForeignKey(User)
	user_info=models.CharField(max_length=300)
	download_list=models.ManyToManyField(Ebook,through='Download')
User.profile = property(lambda u: PubProfile.objects.get_or_create(user=u)[0])
	

class Download(models.Model):
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	download_time=models.DateField(default=datetime.date.today())

class Level(models.Model):
	category=models.ForeignKey(Category)
	ebook=models.ForeignKey(Ebook)
	user=models.ForeignKey(UserInfo)
	level=models.IntegerField()	
	
class Comment(models.Model):
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	content=models.TextField()
	
class Rate(models.Model):
	user=models.ForeignKey(UserInfo)
	ebook=models.ForeignKey(Ebook)
	rate=models.IntegerField()
	
	
#class EbookAdmin(models.ModelAdmin):
#	prepopulated_fields={'slug':['name']}




