# Create your views here.
from library.mainsite.models import *  
from library.mainsite.forms import *
from django.shortcuts import render_to_response, redirect
from django.template.context import RequestContext
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.core.mail import send_mail, BadHeaderError
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from itertools import chain

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
	results_per_page = 4
	try:
		searchKey = request.GET['searchTxt']
		request.session['searchKey'] = searchKey
	except KeyError:
		searchKey = request.session['searchKey']
	try:
		page = request.GET['page']
	except KeyError:
		page = 1
	
	cate = Category.objects.filter(name__contains = searchKey)
	sub = Subject.objects.filter(name__contains = searchKey)
	eb = Ebook.objects.filter(name__contains = searchKey)
	result_list = list(chain(cate,sub,eb))
	paginator = Paginator(result_list,results_per_page)
	
	try:
		searchResults = paginator.page(page)
	except PageNotAnInteger:
		searchResults = paginator.page(1)
	except EmptyPage:
		searchResults = paginator.page(paginator.num_pages)
	return render_to_response('searchResult.html', {"searchResults": searchResults},context_instance=RequestContext(request))
def view(request, name):
#	book.html
	pass
