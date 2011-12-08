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
	pass
	
def search(request):
	pass
	
def view(request, name):
#	book.html
	pass
