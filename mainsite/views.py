# Create your views here.
from library.mainsite.models import *  
from library.mainsite.forms import *
from django.shortcuts import render_to_response, redirect
from django.template.context import RequestContext
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.core.mail import send_mail, BadHeaderError
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Count
import random
from django.core import serializers
from itertools import chain
import datetime
import logging
from django.forms.models import inlineformset_factory

# Get an instance of a logger
logger = logging.getLogger(__name__)

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

def category(request,name):
	if name=="":
		majors_list=Major.objects.all()
		return render_to_response('category.html',{'title':'Categories','majors':majors_list},context_instance=RequestContext(request))
	else:
		cate=Category.objects.get(name__iexact=name)
		book_ids=Ebook.objects.filter(category__name__iexact=name)
		book_list=[i.ebook for i in book_ids]
		paginator = Paginator(book_list,10)
		try:
			page = request.GET['page']
		except KeyError:
			page = 1
		try:
			results = paginator.page(page)
		except PageNotAnInteger:
			results = paginator.page(1)
		except EmptyPage:
			results = paginator.page(paginator.num_pages)
		return render_to_response('list.html', {'title': 'Category '+ cate.name,'results' : results},context_instance = RequestContext(request))
	
def subject(request, name):
	if name=="":
		s1=Subject.objects.filter(semester=1)
		s2=Subject.objects.filter(semester=2)
		s3=Subject.objects.filter(semester=3)
		s4=Subject.objects.filter(semester=4)
		s5=Subject.objects.filter(semester=5)
		s6=Subject.objects.filter(semester=6)
		s7=Subject.objects.filter(semester=7)
		s8=Subject.objects.filter(semester=8)
		s9=Subject.objects.filter(semester=9)
		return render_to_response('subject.html',{'s1':s1,'s2':s2,'s3':s3,'s4':s4,'s5':s5,'s6':s6,'s7':s7,'s8':s8,'s9':s9,'title':'Subjects'},context_instance=RequestContext(request))
	else:
		book_list = Ebook.objects.filter(subject__name__iexact=name)
		paginator = Paginator(book_list,10)
		try:
			page = request.GET['page']
		except KeyError:
			page = 1
		try:
			results = paginator.page(page)
		except PageNotAnInteger:
			results = paginator.page(1)
		except EmptyPage:
			results = paginator.page(paginator.num_pages)
		return render_to_response('list.html',{'title' : name,'results' : results},context_instance = RequestContext(request))
	
def register(request):
	form2=RegisterForm()
	que = Question.objects.get(id=((int)(random.random()*10))%2+1).question
	if request.method == 'POST':
		try:
			cd = request.POST
			user = User.objects.get(username=cd['username'])
		except User.DoesNotExist:
			try:
				user = User.objects.get(email=cd['email'])
			except User.DoesNotExist:
				try:		
					questions = Question.objects.get(question= cd['question'],answer=cd['answer'])
				except Question.DoesNotExist:	
					return render_to_response('register.html', {'title':'Register','errors':'Answer is wrong', 'question':que})						
				else:
					p1 = User.objects.create_user(username=cd['username'],email = cd['email'], password = cd['password'])							
					return render_to_response('notice.html', {'title':'Login', 'error':False},context_instance=RequestContext(request))
			else:
				return render_to_response('register.html', {'title':'Register','errors':'Email is already in use', 'question':que})
		else:
			return render_to_response('register.html', {'title':'Register','errors':'Account already exists', 'question':que})
	return render_to_response('register.html', {'title':'Register','question': que})

@login_required(login_url="/login")	
def setting_user(request):
	if request.method == "POST":
		cd = request.POST
		user = User.objects.get(username = request.user)
		if user.check_password(cd['current_password']):
			if cd['new_password'] != '':
				user.set_password(cd['new_password'])
			if cd['email'] != '':
				try:
					user1 = User.objects.get(email = cd['email'])
				except User.DoesNotExist:
					user.email = cd['email']
				else:
					return render_to_response('setting_user.html', {'title': 'SettingUser', 'errors': 'Email is already in use'},context_instance=RequestContext(request))
			user.save()
			return render_to_response('notice.html', {'title':'Login', 'error':False},context_instance=RequestContext(request))
		else:
			return render_to_response('setting_user.html', {'title': 'SettingUser', 'errors': 'The password you gave is incorrect.'},context_instance=RequestContext(request))
	return render_to_response('setting_user.html', {'title': 'SettingUser'}, context_instance=RequestContext(request))
		
	
def log_in(request):
	if request.method == 'POST':
		username=request.POST["username"]
		password=request.POST["password"]
		user = authenticate(username=username,password=password)
		if user is not None:
			login(request,user)
			return redirect('/')	
	return render_to_response('login_fail.html', {'title':'Login', 'error':False},context_instance=RequestContext(request))

def log_out(request):
	logout(request)
	return redirect("/")		

	
@login_required(login_url="/login")
def upload(request):
	LinkFormSet = inlineformset_factory(Ebook,Link,fields=('download_link',),extra=1,can_delete=False)
	if request.method == "POST":
		form = UploadForm(request.POST)
		link = LinkFormSet(request.POST)
		if form.is_valid():
			ins=form.save()	
			link=LinkFormSet(request.POST,instance=ins)
			if link.is_valid():
				link.save()
			return redirect("/")
	else: 
		t = Ebook(uploader=request.user.profile)
		form = UploadForm(instance=t)
		link = LinkFormSet()
	return render_to_response("upload.html",{'title':'Upload',"form":form,"link":link},context_instance=RequestContext(request))		
			
@login_required(login_url="/login")	
def create(request):
	if request.method == "POST":
		form = EbookForm(request.POST)
		if form.is_valid():
			form.save()
	else:
		form = EbookForm()
	return render_to_response("create.html",{'title':'Upload',"form":form},context_instance=RequestContext(request))
	


def advanced_search(request):
	searchResults = None
	results_per_page = 10
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
		
	return render_to_response("advanced_search.html", {"title":"Advanced Search","results": searchResults,"extraFieldForm": extraFieldForm,}, context_instance=RequestContext(request))

def search(request):
	results_per_page =10
	try:
		searchKey = request.GET['searchTxt']
		request.session['searchKey'] = searchKey
	except KeyError:
		searchKey = request.session['searchKey']
	try:
		page = request.GET['page']
	except KeyError:
		page = 1
		
	cate = Category.objects.filter(name__icontains = searchKey).annotate(count=Count("ebook"))
	sub = Subject.objects.filter(name__icontains = searchKey).annotate(count=Count("ebook"))
	eb = Ebook.objects.filter(name__icontains = searchKey)
	result_list = list(chain(cate,sub,eb))
	paginator = Paginator(result_list,results_per_page)
	try:
		searchResults = paginator.page(page)
	except PageNotAnInteger:
		searchResults = paginator.page(1)
	except EmptyPage:
		searchResults = paginator.page(paginator.num_pages)
	return render_to_response('list.html', {"title":"Search","results": searchResults},context_instance=RequestContext(request))

def view(request, name):
	book=Ebook.objects.get(slug=name)
	link=Link.objects.get(ebook=book)
	return render_to_response('info.html', 
	{'title': book.name,'book':book, 'link':link},
	context_instance = RequestContext(request))
