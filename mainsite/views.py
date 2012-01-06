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
from django.db.models import Count
import random
from django.core import serializers
from itertools import chain
import datetime

def home(request):
	book_list = Ebook.objects.all()
	# sach cho ke sach, moi hang 5 cuon, sach moi up len, demo nen dung 2
	book_row_1 = list(book_list.order_by('upload_time'))[0:2]
	book_row_2 = list(book_list.order_by('upload_time'))[2:4]

	# sach cho top download
	# TODO: tinh ra book_top la list 5 sach so lan tai nhieu nhat
	book_top = Ebook.objects.annotate(donwload_times=Count('downloads')).order_by('donwload_times')[0:5]

	# mybook bac nao lam csdl lam cho le
	# TODO: book_my la list 5 sach cua thang dang dang nhap
	if not request.user.is_anonymous():
		book_my = list(Ebook.objects.filter(uploader__user=request.user))
		if len(book_my) > 5:
			book_my =  book_my[0:5]
	else:
		book_my=[]

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
	
def register(request):
	errors = []
	form2=RegisterForm()
	que = Question.objects.get(id=((int)(random.random()*10))%6+1).question
	if request.method == 'POST':		
		form1 = RegisterForm(request.POST)	
		if form1.is_valid():
			try:
				date = datetime.datetime.now()
				cd = form1.cleaned_data		
				users = User.objects.get(username=cd['username'])
				return redirect("/login")
			except User.DoesNotExist:
				try:
					users1 = User.objects.get(email=cd['email'])
				except User.DoesNotExist:
					try:		
						print(request.POST.get('question'))
						questions = Question.objects.get(answer = request.POST.get('answer'), question= request.POST.get('question'))
						
					except Question.DoesNotExist:	
						errors.append('Answer is wrong')
						return render_to_response('register.html', {'form': form1, 'errors':errors, 'question':que})						
					else:
						p1 = User.objects.create(username=cd['username'],  first_name=cd['firstname'], last_name=cd['lastname'],
											email = cd['email'], password = cd['password'], is_staff=True, is_active = True, is_superuser= False,
											last_login=date, date_joined=date)							
						return render_to_response('login_success.html',{'firstname': p1.first_name,'lastname': p1.last_name })
						
				else:
					errors.append('Email: %s is exist' %cd['email'])
					return render_to_response('register.html', {'form': form1, 'errors':errors,'question': que})
			else:
				errors.append('Username: %s is exist' %cd['username'])
				return render_to_response('register.html', {'form': form1, 'errors':errors, 'question':que})
				
	else:
		form1 = RegisterForm()
	return render_to_response('register.html', {'form': form1, 'errors':errors, 'question': que})


def log_in(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
			try:
				cd = form.cleaned_data
				users = User.objects.get(username=cd['name'],password=cd['password']) 
			except User.DoesNotExist:
				return render_to_response('login.html',{'form':form, 'error': True, 'account':cd['name']})
			else:
				users.last_login = datetime.datetime.now()
				users.save()
				return render_to_response('login_success.html',{'firstname': users.first_name,'lastname': users.last_name })			
    else:
        form = LoginForm()
    return render_to_response('login_fail.html', {'form': form, 'error':False})
	
def log_out(request):
	return redirect("/home")		

@login_required(login_url="/login")
def upload(request):
	if request.method == "POST":
		form = UploadForm(request.POST)
		if form.is_valid():
			form.save()
	else: 
		form = UploadForm()			
	return render_to_response("upload2.html",{"form":form},context_instance=RequestContext(request))		
			
	
def create(request):
	if request.method == "POST":
		form = EbookForm(request.POST)
		if form.is_valid():
			form.save()
	else:
		form = EbookForm()
	return render_to_response("create.html",{"form":form},context_instance=RequestContext(request))

def advanced_search(request):
	searchResults = None
	results_per_page = 5
	result = Ebook.objects.all()

	if request.method == "POST":	
		extraFieldForm = ExtraFieldsForm(request.POST)
		
		if extraFieldForm.is_valid():
			
			try:
				searchKey = extraFieldForm.cleaned_data['title']
				request.session['searchKey'] = searchKey
			except KeyError:
				searchKey = request.session['searchKey']
			try:
				page = request.GET['page']
			except KeyError:
				page = 1	

			title = extraFieldForm.cleaned_data['title']
			subject = extraFieldForm.cleaned_data['subject']
			category = extraFieldForm.cleaned_data['category']
			from_year_publish = extraFieldForm.cleaned_data['from_year_publish']
			to_year_publish = extraFieldForm.cleaned_data['to_year_publish']
			level = extraFieldForm.cleaned_data['level']
			author = extraFieldForm.cleaned_data['author']
			from_rate = extraFieldForm.cleaned_data['from_rate']
			to_rate = extraFieldForm.cleaned_data['to_rate']
			semester = extraFieldForm.cleaned_data['semester']
					
			if subject != "Unknown":
				result = result.filter(subject = subject)
			if category != "Unknown": 
			 	result = result.filter(category__name = category)			
			if author != "Unknown":
				result = result.filter(author__icontains = author)
			if level != 0:
				result = result.filter(category__level = level)
			if from_year_publish != 0:
				result = result.filter(published_date__gte = datetime.date(from_year_publish,1,1))
			if to_year_publish != 0:
			    result = result.filter(published_date__lte = datetime.date(to_year_publish,12,31))
			if from_rate != 0:
				result = result.filter(avg_rate__gte = from_rate)
			if  to_rate != 0:
				result = result.filter(avg_rate__lte = to_rate)
				
			if title:
				result = result.filter(name__icontains = title)
			
			paginator = Paginator(result,results_per_page)
			
			try:
				searchResults = paginator.page(page)
			except PageNotAnInteger:
				searchResults = paginator.page(1)
			except EmptyPage:
				searchResults = paginator.page(paginator.num_pages)
			
	else:
		extraFieldForm = ExtraFieldsForm()
		
	return render_to_response("advanced_search.html", {"searchResults": searchResults,"extraFieldForm": extraFieldForm,}, context_instance=RequestContext(request))

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
	
	cate = Category.objects.filter(name__icontains = searchKey)
	sub = Subject.objects.filter(name__icontains = searchKey)
	eb = Ebook.objects.filter(name__icontains = searchKey)
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
