from django.conf.urls.defaults import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$','library.mainsite.views.home'),
	url(r'^category/(?P<name>.*)$','library.mainsite.views.category'),
	url(r'^subject/(?P<name>.*)$','library.mainsite.views.subject'),
	url(r'^login$','library.mainsite.views.log_in'),
	url(r'^logout$','library.mainsite.views.log_out'),
	url(r'^register$','library.mainsite.views.register'),
	url(r'^upload$','library.mainsite.views.upload'),
	url(r'^create$','library.mainsite.views.create'),
	url(r'^search$','library.mainsite.views.search'),
	url(r'^view/(?P<name>.+)$','library.mainsite.views.view'),
	url(r'^advanced_search$', 'library.mainsite.views.advanced_search'),
	url(r'^admin/jsi18n/', 'django.views.i18n.javascript_catalog'),
	url(r'^setting$', 'library.mainsite.views.setting_user'),
)
