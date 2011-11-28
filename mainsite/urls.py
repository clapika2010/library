from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$','library.mainsite.home'),
	url(r'^category/(?P<cate>\w{20})/$','library.mainsite.category'),
	url(r'^subject$/(?P<sub>\w{20})/$','library.mainsite.subject'),
	url(r'^login$','library.mainsite.log_in'),
	url(r'^logout$','library.mainsite.log_out'),
	url(r'^register$','library.mainsite.register'),
	url(r'^upload','library.mainsite.upload'),
	url(r'^search','library.mainsite.search'),
	url(r'^view/(?P<ebook>\w+/)$','library.mainsite.view'),
)
