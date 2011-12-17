# Create your views here.
from library.mainsite.models import *  
from library.mainsite.forms import *
from django.shortcuts import render_to_response, redirect
from django.template.context import RequestContext
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.core.mail import send_mail, BadHeaderError

def home(request):
	return render_to_response('home.html',
	{'title': 'Home'},
	context_instance = RequestContext(request))
	
def category(request, name):
	pass
	
def subject(request, name):
	pass
	
def log_in(request):
	pass

def register(request):
	pass
	
def log_out(request):
	pass

def upload(request):
	if request.method == "POST":
		form = UploadForm(request.POST)
		if form.is_valid():
			form.save()
	else: 
		form = UploadForm()			
	return render_to_response("upload.html",{"form":form},context_instance=RequestContext(request))		
			
	
def create(request):
	if request.method == "POST":
		form = EbookForm(request.POST)
		if form.is_valid():
			form.save()
	else:
		form = EbookForm()
	return render_to_response("create.html",{"form":form},context_instance=RequestContext(request))
			
def search(request):
	pass
	
def view(request, name):
#	book.html
	pass
