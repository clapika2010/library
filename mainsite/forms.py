from django.forms import ModelForm, Form
from django import forms
from django.forms.widgets import HiddenInput
from library.mainsite.models import *

class EbookForm(ModelForm):
	class Meta:
		model=Ebook
		exclude=('slug','upload_time','uploader')
		
class UploadForm(ModelForm):
	class Meta:
		model=Ebook
		fields=('name','description','category','subject','published_date','authors')
	def __init__(self, *args, **kwargs):
		super(UploadForm, self).__init__(*args, **kwargs)
		self.fields['published_date'].widget=HiddenInput()
		self.fields['authors'].widget=HiddenInput()