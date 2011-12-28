from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$','library.mainsite.views.home'),
	url(r'^information$', 'library.mainsite.views.information'),
	url(r'^category$','library.mainsite.views.category'),
	url(r'^subject$/(?P<sub>\w{20})/$','library.mainsite.views.subject'),
	url(r'^login$','library.mainsite.views.log_in'),
	url(r'^logout$','library.mainsite.views.log_out'),
	url(r'^register$','library.mainsite.views.register'),
	url(r'^upload$','library.mainsite.views.upload'),
	url(r'^create$','library.mainsite.views.create'),
	url(r'^search$','library.mainsite.views.search'),
	url(r'^view/(?P<ebook>\w+/)$','library.mainsite.views.view'),
)
