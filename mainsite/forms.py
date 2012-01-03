from django.forms import ModelForm, Form
from django import forms
from django.forms.widgets import HiddenInput
from library.mainsite.models import *

class EbookForm(ModelForm):
	class Meta:
		model=Ebook
		exclude=('slug','upload_time','uploader','comments','rates','downloads','ave_rate','rate_times')
		
class UploadForm(ModelForm):
	class Meta:
		model=Ebook
		fields=('name','description','category','subject','published_date','authors')
	def __init__(self, *args, **kwargs):
		super(UploadForm, self).__init__(*args, **kwargs)
		self.fields['published_date'].widget=HiddenInput()
		self.fields['authors'].widget=HiddenInput()
				
class ExtraFieldsForm(Form):
	title = forms.CharField(max_length = 100, required = False)
	
	SEMESTER_CHOICES = ((0, "Unknow"), (1, "1"), (2, "2"), (3, "3"), (4, "4"), (5, "5"), (6, "6"), 
						(7, "Optional",))
	semester = forms.IntegerField(widget=forms.Select(choices=SEMESTER_CHOICES))
							
class ExtraFieldsForm2(Form):
	CATEGORY_CHOICES = [["Unknown", 'Unknown']]
	for cate in Category.objects.only('name').order_by('name').distinct('name'):
		CATEGORY_CHOICES.append([cate, str(cate)])		
	category = forms.ChoiceField(choices=CATEGORY_CHOICES)
	
	LEVEL_CHOICES = ((0, "Unknown"), (1, "Beginner"), (2, "Intermediate"), (3, "Advanced"),)
	level = forms.IntegerField(widget=forms.Select(choices=LEVEL_CHOICES))
	
	AUTHOR_CHOICES = [["Unknown", 'Unknown']]
	for author in Author.objects.only('name').order_by('name').distinct('name'):
		AUTHOR_CHOICES.append([author, str(author)])
	author = forms.ChoiceField(choices=AUTHOR_CHOICES)
	
	YEAR_CHOICES = [[0, 'Unknown']]
	year = 1991
	MAX_YEAR = datetime.datetime.now().year
	while year <= MAX_YEAR:
		YEAR_CHOICES.append([year, str(year)])
		year+=1
	
	from_year_publish = forms.IntegerField(widget=forms.Select(choices=YEAR_CHOICES))
	to_year_publish = forms.IntegerField(widget=forms.Select(choices=YEAR_CHOICES))
	
	RATE_CHOICES = ((0, "Unknown"), (1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5'))
	from_rate = forms.IntegerField(widget=forms.Select(choices=RATE_CHOICES))
	to_rate = forms.IntegerField(widget=forms.Select(choices=RATE_CHOICES))


class LoginForm(forms.Form):
    name = forms.CharField(label='Username')
    password = forms.CharField(widget=forms.PasswordInput,label='Password')
	
class RegisterForm(forms.Form):
	firstname = forms.CharField(label='Firstname')
	lastname = forms.CharField(label='Lastname')
	username = forms.CharField(label='Username')
	password = forms.CharField(widget=forms.PasswordInput,label='Password')
	email = forms.EmailField(label='Email')
