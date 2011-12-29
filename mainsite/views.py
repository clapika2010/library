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
	book_list = Ebook.objects.all()
	# sach cho ke sach, moi hang 5 cuon, sach moi up len, demo nen dung 2
	book_row_1 = list(book_list.order_by('upload_time'))[0:2]
	book_row_2 = list(book_list.order_by('upload_time'))[2:4]

	# sach cho top download
	# TODO: tinh ra book_top la list 5 sach so lan tai nhieu nhat
	book_top = list()

	# mybook bac nao lam csdl lam cho le
	# TODO: book_my la list 5 sach cua thang dang dang nhap
	book_my = list()

	return render_to_response('home.html',
	{'title' : 'Home',
	 'book_row_1' : book_row_1, 'book_row_2' : book_row_2,
	 'book_top' : book_top,
	 'book_my' : book_my },
	context_instance = RequestContext(request))

def information(request):
	#TODO: tra ve cuon sach duoc yeu cau biet thong tin
	return render_to_response('info.html', 
	{'title': 'Information'},
	context_instance = RequestContext(request))

def category(request):
	book_list = Ebook.objects.all()
	#TODO: lay sach theo category tra ve book_list
	return render_to_response('list.html', 
	{'title': 'Category',
	 'book_list' : book_list},
	context_instance = RequestContext(request))
	
def subject(request, name):
	#TODO: tra ve book_list la sach theo chu de la name
	book_list = list(Ebook.objects.all())
	return render_to_response('list.html',
	{'title' : name,
	 'book_list' : book_list},
	context_instance = RequestContext(request))
	
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
	
	return render_to_response('list.html', {"book_list": searchResults.object_list},context_instance=RequestContext(request))

def view(request, name):
#	book.html
	pass
