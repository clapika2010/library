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
	
	SUBJECT0_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.only('name').distinct('name'):
		SUBJECT0_CHOICES.append([sub, str(sub)])
	subject0 = forms.ChoiceField(label = "Subject0", choices= SUBJECT0_CHOICES)
	
	SUBJECT1_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.filter(semester = 1).only('name').distinct('name'):
		SUBJECT1_CHOICES.append([sub, str(sub)])
	subject1 = forms.ChoiceField(label = "Subject1", choices= SUBJECT1_CHOICES)
	
	SUBJECT2_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.filter(semester = 2).only('name').distinct('name'):
		SUBJECT2_CHOICES.append([sub, str(sub)])
	subject2 = forms.ChoiceField(label = "Subject2", choices= SUBJECT2_CHOICES)
	
	SUBJECT3_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.filter(semester = 3).only('name').distinct('name'):
		SUBJECT3_CHOICES.append([sub, str(sub)])
	subject3 = forms.ChoiceField(label = "Subject3", choices= SUBJECT3_CHOICES)
	
	SUBJECT4_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.filter(semester = 4).only('name').distinct('name'):
		SUBJECT4_CHOICES.append([sub, str(sub)])
	subject4 = forms.ChoiceField(label = "Subject4", choices= SUBJECT4_CHOICES)
	
	SUBJECT5_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.filter(semester = 5).only('name').distinct('name'):
		SUBJECT5_CHOICES.append([sub, str(sub)])
	subject5 = forms.ChoiceField(label = "Subject5", choices= SUBJECT5_CHOICES)
	
	SUBJECT6_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.filter(semester = 6).only('name').distinct('name'):
		SUBJECT6_CHOICES.append([sub, str(sub)])
	subject6 = forms.ChoiceField(label = "Subject6", choices= SUBJECT6_CHOICES)
	
	SUBJECT7_CHOICES = [['Unknown', 'Unknown']]
	for sub in Subject.objects.filter(semester = 7).only('name').distinct('name'):
		SUBJECT7_CHOICES.append([sub, str(sub)])
	subject7 = forms.ChoiceField(label = "Subject7", choices= SUBJECT7_CHOICES)
							
	CATEGORY_CHOICES = [["Unknown", 'Unknown']]
	for cate in Category.objects.only('name').order_by('name').distinct('name'):
		CATEGORY_CHOICES.append([cate, str(cate)])		
	category = forms.ChoiceField(choices=CATEGORY_CHOICES)
	
	LEVEL_CHOICES = ((0, "Unknown"), (1, "Beginner"), (2, "Intermediate"), (3, "Advanced"),)
	level = forms.IntegerField(widget=forms.Select(choices=LEVEL_CHOICES))
	
	author = forms.CharField()
	
	YEAR_CHOICES = [[0, 'Unknown']]
	year = 1991
	MAX_YEAR = datetime.datetime.now().year
	while year <= MAX_YEAR:
		YEAR_CHOICES.append([year, str(year)])
		year+=1
	
	from_year_publish = forms.IntegerField(widget=forms.Select(choices=YEAR_CHOICES))
	to_year_publish = forms.IntegerField( widget=forms.Select(choices=YEAR_CHOICES),initial=[MAX_YEAR, str(MAX_YEAR)])
	
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
