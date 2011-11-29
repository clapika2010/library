# Create your views here.
from django.shortcuts import render_to_response
from django.template import RequestContext

def home(request):
	return render_to_response('home.html', {'title': 'Home'}, context_instance=RequestContext(request))
	
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
